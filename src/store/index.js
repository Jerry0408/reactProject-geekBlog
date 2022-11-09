import React from "react"
import ChannelStore from "./channel.Store"
import LoginStore from './login.Store'
import UserStore from "./user.Store"
class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)