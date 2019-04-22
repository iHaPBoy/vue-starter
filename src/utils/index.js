export function noop () {}

export function isObj (value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

export function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}

export function isAndroid () {
  return /android/i.test(navigator.userAgent)
}

export function isIOS () {
  return /ios|iphone|ipad|ipod/i.test(navigator.userAgent)
}

export function range (num, min, max) {
  return Math.min(Math.max(num, min), max)
}

export function isInDocument (element) {
  return document.body.contains(element)
}
