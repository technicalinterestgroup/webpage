import axios from 'axios'
// import router from '@/router'
import { Message } from 'view-design'
const Qs = require('qs')
// 创建服务
export const Axios = axios.create({
  timeout: 60000
  // baseURL: process.env.VUE_APP_BASE_URL
})
// 处理 post 请求
// axios.defaults.headers.common['withCredentials'] = true
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// Axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
Axios.interceptors.request.use(config => {
  // let token = GET_TOKEN()
  // if (token) {
  //   config.headers['TOKEN'] = token
  // }
  // config
  if (!config.uploader) {
    if ((config.method === 'post' || config.method === 'put') && config.headers[config.method]['Content-Type'].indexOf('application/json') !== -1) {
      config.transformRequest = [function(data, header) {
        data = Qs.stringify(data)
        return data
      }]
    }
  }
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
Axios.interceptors.response.use(response => {
  const responseCode = response.status
  // 如果返回的 200 - 300 或者 返回 304 那么成功回调
  if ((responseCode >= 200 && responseCode < 300) || responseCode === 304) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  console.info(error)
  // 断网时处理
  if (!error.response) {
    // 请求超时
    if (error.message.includes('timeout')) {
      console.log('超时了')
      Message.error('请求超时，请检查网络是否连接正常')
    } else {
      console.log('断网了')
      Message.error('请求失败，请检查网络是否已连接')
      // 。。。断网的组件
    }
    return
  }
  // 失败的回调
  const responseCode = error.response.status
  switch (responseCode) {
    case 401: // 未登录
      // 。。。处理登录
      break
    case 403: // token 过期
      Message({
        type: 'error',
        message: '登录信息过期，请重新登录'
      })
      // 清除token
      localStorage.removeItem('token')
      // 。。。 处理登录
      break
    case 404:
      Message({
        type: 'error',
        message: '当前请求不存在'
      })
    break
    default:
      Message({
        message: error.response.data.message,
        type: 'error'
      })
  }
  return Promise.reject(error)
})

export const uploadFile = formData => {
  const res = Axios.request({
    method: 'post',
    // 上传文件的路径
    url: process.env.UPLOAD_URL,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return res
}


// export default {
//   Axios, // 服务地址
//   uploadFile // 上传文件地址
// }
