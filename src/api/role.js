import request from '@/utils/request'

//  获取员工列表
export const getRoleList = (params) => {
  return request.get('/sys/role', { params })
}

// 新增员工列表
export const addRole = (data) => {
  return request.post('/sys/role', data)
}

// 修改员工列表
export const updateRole = (data) => {
  return request.put(`/sys/role/${data.id}`, data)
}

// 删除员工列表
export const delRole = (id) => {
  return request.delete(`/sys/role/${id}`)
}

// 获取角色详情
export const getPermissionList = () => {
  return request.get(`/sys/permission`)
}

// 获取详情id
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
