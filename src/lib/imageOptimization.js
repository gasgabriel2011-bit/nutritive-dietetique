export function getOptimizedImageUrl(src, { width = 700, quality = 76 } = {}) {
  if (!src) {
    return src;
  }

  try {
    const url = new URL(src);

    if (url.hostname.includes("images.unsplash.com")) {
      url.searchParams.set("w", String(width));
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("q", String(quality));
      return url.toString();
    }
  } catch {
    return src;
  }

  return src;
}
