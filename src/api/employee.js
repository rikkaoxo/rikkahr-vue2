import request from '@/utils/request'
// 获取表格数据
export const getEmployeeList = (params) => {
  return request.get('/sys/user', { params })
}

// 导出excel

// 删除员工
export const delEmployee = (id) => {
  return request.delete(`/sys/user/${id}`)
}

// 新增员工
export const addEmployee = (data) => {
  return request.post('/sys/user', data)
}

// 查询员工信息
export const getEmployeeDetail = (id) => {
  return request.get(`/sys/user/${id}`)
}

// 修改员工信息
export const updateEmployee = (data) => {
  return request.put(`/sys/user/${data.id}`, data)
}
