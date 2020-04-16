import Vue from 'vue'
import moment from 'moment'
import store from '@/store'

/**
 * 工具函数
*/

/**
 * 时间格式化函数
*/
Vue.filter('formateTime', function (value) {
  return moment(value).format('YYYY/MM/DD hh:mm')
})
/**
 * 校验图片路径有效性
*/
export const validImgPath = (src) => {
  const img = new Image()
  img.setAttribute('src', src)
  return img.naturalWidth !== 0
}

export const verificationVaildInfo = (verificatedInfo, verificateParams, verificationRules = voidParam) => {
}
/**
 * 简单校验
*/
export const simpleCheck = (args) => {
  return args.some(item => {
    return voidParam(item)
  })
}
/**
 * 防抖
*/
export const debounce = (fn, sec) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, sec)
  }
}
/**
 * 节流
*/
export const throttle = (fn, sec) => {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, sec)
  }
}

/**
 * @params name { String } cookie name
 * @description 获取cookie
*/
export const getCookie = () => {
  const reg = new RegExp('(?<==).*')
  const result = getUrl('search').match(reg)[0]
  return result
}
/**
 * 获取token
*/
export const GET_TOKEN = () => {
  return store.state.TOKEN
}

// ------------------------- helper -------------------------

export function noop () {}

export function voidParam (params = '') { return !params }

export function elementType (obj) {
  return Object.prototype.toString.call(obj).slice(1, -1).split(' ')[1].toLowerCase()
}

export function findIndex (arr, index) {
  return arr.findIndex(item => item === index)
}

export function uuid () {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export function millisecond (time) {
  return Date.parse(moment(time)._d)
}

// 获取路径
export function getUrl (prop) {
  return window.location[prop]
}
