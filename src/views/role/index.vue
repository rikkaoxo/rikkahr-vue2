<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showDialog=true">
          新增
        </el-button>
      </div>
      <div>
        <el-table :data="list">
          <el-table-column prop="name" width="200" label="角色" align="center">
            <template v-slot="{ row }">
              <span v-if="!row.isEdit">{{ row.name }}</span>
              <el-input v-else v-model="row.editRow.name" size="mini" />
            </template>
          </el-table-column>
          <el-table-column prop="state" width="200" label="启用" align="center">
            <template v-slot="{ row }">
              <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
              <span v-else> {{ row.state===1 ? "以启用" : row.state===0 ?"未启用": "无" }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" align="center">
            <template v-slot="{ row }">
              <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" />
              <span v-else>{{ row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="{ row }">
              <template v-if="!row.isEdit">
                <el-button size="mini" type="text">分配权限</el-button>
                <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
                <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="confirmDel(row.id)">
                  <el-button slot="reference" style="margin-left:10px" size="mini" type="text">删除</el-button>
                </el-popconfirm>
              </template>
              <template v-else>
                <el-button type="primary" size="mini" @click="btnEditOK(row)">确认</el-button>
                <el-button size="mini" @click="row.isEdit=false">取消</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row type="flex" style="height=60px" justify="end" align="middle">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageParams.pagesize"
          :total="pageParams.total"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <el-dialog width="500px" title="新增角色" :visible.sync="showDialog" @close="btnCancel">
      <!-- 表单内容 -->
      <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item prop="state" label="启用">
          <el-switch v-model="roleForm.state" size="mini" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOk">确定</el-button>
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, addRole, updateRole, delRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list: [],
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页多少条
        total: 0
      },
      showDialog: false,
      // 表单元素
      roleForm: {
        name: '',
        description: '',
        state: 0 // 默认未1启用 关闭 0 打开1
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取数据
    async getRoleList() {
      const data = await getRoleList(this.pageParams)
      // console.log(data)
      this.list = data.rows
      this.pageParams.total = data.total
      this.list.forEach((item) => {
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          'name': item.name,
          'state': item.state,
          'description': item.description
        })
      })
    },
    changePage(page) {
      this.pageParams.page = page
      this.getRoleList()
    },
    async btnOk() {
      await this.$refs.roleForm.validate()
      await addRole(this.roleForm)
      this.$message.success('添加成功')
      this.getRoleList()
      this.btnCancel()
    },
    btnCancel() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    async btnEditOK(row) {
      if (row.editRow.description && row.editRow.name) {
        await updateRole({ ...row.editRow, id: row.id })
        this.$message.success('修改成功')
        Object.assign(row, {
          ...row.editRow,
          isEdit: false // 退出编辑模式
        })
      } else {
        this.$message.error('角色名和描述不能为空')
      }
    },
    async confirmDel(id) {
      await delRole(id)
      this.$message.success('删除角色成功')
      if (this.list.length === 1) this.pageParams.page--
      this.getRoleList()
    }
  }
}
</script>

<style scoped>
  .role-operate{
    padding: 10px;
  }
  .el-input__inner, .el-button{
    border-radius: 6px;
  }
</style>
