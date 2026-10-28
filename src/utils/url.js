export const isUrl = (s) => {
  try { return /^https?:$/.test(new URL(s).protocol) } catch { return false }
}
