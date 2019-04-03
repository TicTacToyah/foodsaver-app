export function split(str) {
  return str
    ? str
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length)
    : []
}
