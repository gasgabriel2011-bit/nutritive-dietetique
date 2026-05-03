import { useEffect, useState } from "react";

const DISPLAY_MODE_QUERIES = [
  "(display-mode: standalone)",
  "(display-mode: fullscreen)",
  "(display-mode: minimal-ui)",
];

export const APP_START_PATH = "/recettes";

export function getIsInstalledAppMode() {
  if (typeof window === "undefined") {
    return false;
  }

  const isDisplayModeApp =
    typeof window.matchMedia === "function" &&
    DISPLAY_MODE_QUERIES.some((query) => window.matchMedia(query).matches);

  const isIosHomeScreen = window.navigator?.standalone === true;
  const isAndroidTrustedWebActivity =
    typeof document !== "undefined" && document.referrer.startsWith("android-app://");

  const capacitor = window.Capacitor;
  const isNativeCapacitor =
    typeof capacitor?.isNativePlatform === "function"
      ? capacitor.isNativePlatform()
      : typeof capacitor?.getPlatform === "function" && capacitor.getPlatform() !== "web";

  return isDisplayModeApp || isIosHomeScreen || isAndroidTrustedWebActivity || isNativeCapacitor;
}

export function useInstalledAppMode() {
  const [isInstalledApp, setIsInstalledApp] = useState(getIsInstalledAppMode);

  useEffect(() => {
    const refreshMode = () => {
      setIsInstalledApp(getIsInstalledAppMode());
    };

    refreshMode();

    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQueries = DISPLAY_MODE_QUERIES.map((query) => window.matchMedia(query));

    mediaQueries.forEach((mediaQuery) => {
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", refreshMode);
      } else if (typeof mediaQuery.addListener === "function") {
        mediaQuery.addListener(refreshMode);
      }
    });

    window.addEventListener("focus", refreshMode);
    document.addEventListener("visibilitychange", refreshMode);

    return () => {
      mediaQueries.forEach((mediaQuery) => {
        if (typeof mediaQuery.removeEventListener === "function") {
          mediaQuery.removeEventListener("change", refreshMode);
        } else if (typeof mediaQuery.removeListener === "function") {
          mediaQuery.removeListener(refreshMode);
        }
      });

      window.removeEventListener("focus", refreshMode);
      document.removeEventListener("visibilitychange", refreshMode);
    };
  }, []);

  return isInstalledApp;
}

export function getAuthRedirectPath(fromPath, fallback = APP_START_PATH) {
  if (!fromPath || fromPath === "/" || fromPath === "/login" || fromPath === "/signup") {
    return fallback;
  }

  return fromPath;
}
