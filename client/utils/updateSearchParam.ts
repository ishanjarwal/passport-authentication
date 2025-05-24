export function updateSearchParam(
  key: string,
  value: string,
  replaceState = false
): void {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  if (replaceState) {
    window.history.replaceState({}, "", url.toString());
  } else {
    window.history.pushState({}, "", url.toString());
  }
}
