// 登录模块
import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from '../utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  getToken = async ({ mobile, code }) => {

    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    this.token = res.data.data.token
    setToken(this.token)
  }
  clearToken = () => {
    this.token = ''
    removeToken()
  }
}
export default LoginStore