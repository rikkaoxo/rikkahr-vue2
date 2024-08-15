import request from '@/utils/request'

// 登录请求
export const apilogin = (data) => {
  return request.post('/sys/login', data)
}

// 获取信息请求
export const getUserInfo = () => {
  return request.get('/sys/profile')
}

// 修改密码
export const updatePassword = (data) => {
  return request.put('/sys/user/updatePass', data)
}
