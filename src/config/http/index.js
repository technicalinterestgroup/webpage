import { Axios } from './interceptors'
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object|String} params [请求时携带的参数]
 */
export const get = function(url, params) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
        params
      })
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        console.error(err.data)
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object|String} params [请求时携带的参数]
 */
export const post = function(url, params, config = {}) {
  return new Promise((resolve, reject) => {
    Axios.post(url, params, config)
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
  })
}
export const put = function(url, params, config = {}) {
  return new Promise((resolve, reject) => {
    Axios.put(url, params, config)
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
  })
}
