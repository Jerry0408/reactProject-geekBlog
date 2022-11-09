import { makeAutoObservable, runInAction } from "mobx"
import { http } from "../utils"

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    const res = await http.get('/user/profile')
    runInAction(() => {
      this.userInfo = res.data.data
    })
  }
}

export default UserStore