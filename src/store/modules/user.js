import { getToken, setToken, removeToken } from '@/utils/auth'
import { apilogin, getUserInfo } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {}
}
const getters = {
}
const mutations = {
  setToken(state, data) {
    state.token = data
    setToken(data)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, data) {
    state.userInfo = data
  }

}
const actions = {
  async login(context, data) {
    // console.log(data)
    // 利用data发送请求
    // 让token接收数据
    const cnt = await apilogin(data)
    // console.log(cnt)
    context.commit('setToken', cnt)
  },
  async getUserInfo(context) {
    const data = await getUserInfo()
    context.commit('setUserInfo', data)
  },
  logout(context) {
    context.commit('setUserInfo', {})
    context.commit('removeToken')
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
