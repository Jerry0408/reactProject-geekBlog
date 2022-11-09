// 所以工具函数在这里导入，再统一导出
// 外面就可以 import {http} from '/utils'了


import { http } from './http'
import { setToken, getToken, removeToken } from './token'
import { history } from './history'







export {
  http,
  setToken,
  getToken,
  removeToken,
  history
}