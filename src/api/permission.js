import request from '@/utils/request'
// 获取权限页面列表
export const getPermissionList = () => {
  return request.get('/sys/permission')
}

// 新增节点
export const addPermission = (data) => {
  return request.post('/sys/permission', data)
}

// 用id查询节点信息
export const getPermissionDetail = (id) => {
  return request.get(`/sys/permission/${id}`)
}

// 修改节点
export const updatePermission = (data) => {
  return request.put(`/sys/permission/${data.id}`, data)
}

// 删除节点
export const delPermission = (id) => {
  return request.delete(`/sys/permission/${id}`)
}
