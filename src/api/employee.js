import request from '@/utils/request'
// 获取表格数据
export const getEmployeeList = (params) => {
  return request.get('/sys/user', { params })
}

// 导出excel

// 删除员工
export const delEmployee = (id) => {
  request.delete(`/sys/user/${id}`)
}
