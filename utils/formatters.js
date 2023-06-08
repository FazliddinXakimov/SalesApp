export function numberFilter(num) {
  if (!num) return 0

  return parseInt(num)
    .toString()
    .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
}
