import { getToken, setToken, removeToken } from '@/utils/auth'
import { apilogin, getUserInfo } from '@/api/user'
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'
const state = {
  token: getToken(),
  userInfo: {},
  routes: constantRoutes
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
  },
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 静态路由 + 动态路由
  }

}
const actions = {
  async login(context, data) {
    // 利用data发送请求
    // 让token接收数据
    const cnt = await apilogin(data)
    // console.log(cnt)
    context.commit('setToken', cnt)
  },
  async getUserInfo(context) {
    const data = await getUserInfo()
    context.commit('setUserInfo', data)
    return data
  },
  logout(context) {
    context.commit('setUserInfo', {})
    context.commit('removeToken')
    resetRouter()
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
