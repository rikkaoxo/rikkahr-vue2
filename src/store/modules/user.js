import { getToken, setToken, removeToken } from '@/utils/auth'
import { apilogin } from '@/api/user'
const state = {
  token: getToken()
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
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
