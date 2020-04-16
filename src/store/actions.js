import types from './types'
import { Message } from 'view-design'
import { getuserinfo } from '@/api/main.js'
export default {
  [types.USERINFO]: ({ commit }, params) => {
    console.log(params)
    // getuserinfo().then(data => {
    //   commit(`${types.USERINFO}`, data)
    // }).catch(err => {
    //   Message.error(`${err.message}`)
    // })
  }
}
