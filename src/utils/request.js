import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API === '/prod-api' ? '/prod-api' : '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 注入token
//  this.$store.getters
  // store.getters.token => 请求头里面
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const { data, message, success } = response.data // 默认json格式
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  // error.message
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service
