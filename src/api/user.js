import request from '@/utils/request'

// 登录请求
export const apilogin = (data) => {
  return request.post('/sys/login', data)
}

