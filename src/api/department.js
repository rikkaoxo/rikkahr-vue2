import request from '@/utils/request'

export const getDepartment = () => {
  return request.get('/company/department')
}

// 获取下拉菜单数据
export const getManagerList = () => {
  return request.get('/sys/user/simple')
}

// 新增部门
export const addDepartment = (data) => {
  return request.post('/company/department', data)
}

// 查询部门信息
export const getDepartmentDetail = (id) => {
  return request.get(`/company/department/${id}`)
}

// 编辑部门信息
export const updateDepartment = (data) => {
  return request.put(`/company/department/${data.id}`, data)
}

// 删除部门信息
export const delDepartment = (id) => {
  return request.delete(`/company/department/${id}`)
}
