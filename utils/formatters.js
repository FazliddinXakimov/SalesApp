export function numberFilter(num) {
  if (!num) return 0

  return parseInt(num)
    .toString()
    .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
}

export function formatDateTime(date) {
  const dateObj = new Date(date)
  return `${dateObj.getDate().toString().padStart(2, '0')}.${(
    dateObj.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${dateObj.getFullYear()} ${dateObj
    .getHours()
    .toString()
    .padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`
}

export function returnNumber(str) {
  if (!str) return ''
  return str
    .toString()
    .trim()
    .replace(/[^0-9]/g, '')
}

