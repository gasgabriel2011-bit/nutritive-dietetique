import { supabase } from "./supabase"

const STORAGE_KEY = "nutrivie_tracking"
const TRACKING_METADATA_KEY = "tracking_entries"
const MAX_REMOTE_ENTRIES = 120

function getTodayDateString() {
  return new Date().toISOString().split("T")[0]
}

function normalizeTrackingData(data) {
  const entries = Array.isArray(data?.entries)
    ? data.entries
        .filter((entry) => entry?.date)
        .map((entry) => ({ ...entry }))
        .sort((a, b) => a.date.localeCompare(b.date))
    : []

  return { entries }
}

function getLocalTrackingData() {
  if (typeof window === "undefined") {
    return { entries: [] }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { entries: [] }
    }

    return normalizeTrackingData(JSON.parse(raw))
  } catch {
    return { entries: [] }
  }
}

function saveLocalTrackingData(data) {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeTrackingData(data)))
}

function getRemoteTrackingData(user) {
  return normalizeTrackingData({
    entries: user?.user_metadata?.[TRACKING_METADATA_KEY] || [],
  })
}

function trimTrackingEntries(entries) {
  return [...entries].sort((a, b) => a.date.localeCompare(b.date)).slice(-MAX_REMOTE_ENTRIES)
}

function isEntryNewer(currentEntry, nextEntry) {
  const currentUpdatedAt = currentEntry?.updatedAt || currentEntry?.date || ""
  const nextUpdatedAt = nextEntry?.updatedAt || nextEntry?.date || ""
  return nextUpdatedAt >= currentUpdatedAt
}

function mergeTrackingData(primaryData, secondaryData) {
  const entryMap = new Map()

  for (const entry of secondaryData.entries || []) {
    entryMap.set(entry.date, entry)
  }

  for (const entry of primaryData.entries || []) {
    const currentEntry = entryMap.get(entry.date)

    if (!currentEntry || isEntryNewer(currentEntry, entry)) {
      entryMap.set(entry.date, entry)
    }
  }

  return normalizeTrackingData({
    entries: trimTrackingEntries([...entryMap.values()]),
  })
}

function hasSameEntries(firstData, secondData) {
  return JSON.stringify(normalizeTrackingData(firstData).entries) === JSON.stringify(normalizeTrackingData(secondData).entries)
}

async function resolveTrackingUser(user) {
  if (!supabase) {
    return null
  }

  if (user?.id) {
    return user
  }

  const { data, error } = await supabase.auth.getUser()
  if (error) {
    throw error
  }

  return data.user ?? null
}

async function persistRemoteTrackingData(data, user) {
  if (!supabase || !user?.id) {
    return
  }

  const metadata = {
    ...(user.user_metadata || {}),
    [TRACKING_METADATA_KEY]: trimTrackingEntries(normalizeTrackingData(data).entries),
  }

  const { error } = await supabase.auth.updateUser({ data: metadata })
  if (error) {
    throw error
  }
}

export async function getTrackingData(user) {
  const localData = getLocalTrackingData()
  const remoteUser = await resolveTrackingUser(user)

  if (!remoteUser) {
    return localData
  }

  const remoteData = getRemoteTrackingData(remoteUser)
  const mergedData = mergeTrackingData(localData, remoteData)

  saveLocalTrackingData(mergedData)

  if (!hasSameEntries(remoteData, mergedData)) {
    try {
      await persistRemoteTrackingData(mergedData, remoteUser)
    } catch (error) {
      console.warn("Tracking sync failed:", error)
    }
  }

  return mergedData
}

export async function saveTrackingData(data, user) {
  const normalizedData = normalizeTrackingData(data)
  saveLocalTrackingData(normalizedData)

  const remoteUser = await resolveTrackingUser(user)
  if (!remoteUser) {
    return normalizedData
  }

  await persistRemoteTrackingData(normalizedData, remoteUser)
  return normalizedData
}

export async function getTodayEntry(user) {
  const today = getTodayDateString()
  const data = await getTrackingData(user)
  return data.entries.find((entry) => entry.date === today) || null
}

export async function saveTodayEntry(entry, user) {
  const today = getTodayDateString()
  const data = await getTrackingData(user)
  const idx = data.entries.findIndex((currentEntry) => currentEntry.date === today)
  const fullEntry = {
    ...entry,
    date: today,
    updatedAt: new Date().toISOString(),
  }

  if (idx >= 0) {
    data.entries[idx] = fullEntry
  } else {
    data.entries.push(fullEntry)
  }

  await saveTrackingData(data, user)
  return fullEntry
}

export async function getWeekEntries(user) {
  const data = await getTrackingData(user)
  const today = new Date()
  const week = []

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split("T")[0]
    const entry = data.entries.find((currentEntry) => currentEntry.date === dateString)

    week.push({
      date: dateString,
      dayLabel: date.toLocaleDateString("fr-FR", { weekday: "short" }),
      ...(entry || {}),
    })
  }

  return week
}

export async function countSavedDays(user) {
  const data = await getTrackingData(user)
  return data.entries.filter((entry) => entry.saved).length
}

export async function getConstancyScore(user) {
  const week = await getWeekEntries(user)
  const filledDays = week.filter((entry) => entry.saved).length
  return Math.round((filledDays / 7) * 100)
}

export function generateTimeSlots(startHour, startMin, endHour, endMin) {
  const slots = []
  let hour = startHour
  let minute = startMin

  while (hour < endHour || (hour === endHour && minute <= endMin)) {
    slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)
    minute += 15

    if (minute >= 60) {
      minute = 0
      hour += 1
    }
  }

  return slots
}

export function calcSleepDuration(bedtime, waketime) {
  if (!bedtime || !waketime) {
    return null
  }

  const [bedHour, bedMinute] = bedtime.split(":").map(Number)
  const [wakeHour, wakeMinute] = waketime.split(":").map(Number)

  let bedTotalMinutes = bedHour * 60 + bedMinute
  let wakeTotalMinutes = wakeHour * 60 + wakeMinute

  if (wakeTotalMinutes <= bedTotalMinutes) {
    wakeTotalMinutes += 24 * 60
  }

  return ((wakeTotalMinutes - bedTotalMinutes) / 60).toFixed(1)
}
