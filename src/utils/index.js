import Vue from 'vue'

export const isServer = Vue.prototype.$isServer

export function noop () {}

export function isEmpty (value) {
  const type = typeof value
  return (!value || (type === 'string' && !value.trim()) || value.length === 0)
}

export function isBlank (value) {
  return (!value || /^\s*$/.test(value))
}

export function isDef (value) {
  return value !== undefined && value !== null
}

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
