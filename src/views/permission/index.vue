<template>
  <div class="container">
    <div class="app-container">
      <el-button class="btn-add" type="primary" size="mini" @click="addchild(0)">添加权限</el-button>
      <el-table default-expand-all :data="list" row-key="id">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button v-if="row.type===1" type="text" @click="addchild(row.id)">添加</el-button>
            <el-button type="text" @click="editchild(row.id)">编辑</el-button>
            <el-button type="text" @click="deletechild(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="600px"
      @close="btnCancel"
    >
      <template>
        <el-form ref="perForm" label-width="120px" :rules="rules" :model="formData" @close="btnCancel">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" size="mini" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" size="mini" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input
              v-model="formData.description"
              type="textarea"
              size="mini"
              style="width:90%"
              :rows="3"
            />
          </el-form-item>
          <el-form-item>
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="primary" size="mini" @click="btnOk">确定</el-button>
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-row>

          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getPermissionList, getPermissionDetail, updatePermission, delPermission } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
import { addPermission } from '@/api/permission'
export default {
  name: 'Permission',
  data() {
    return {
      list: [],
      dialogVisible: false,
      ischange: false,
      title: '新增id',
      formData: {
        name: '', // 权限点名字
        code: '', // 权限点标识
        description: '', // 权限点描述
        type: '', // 权限点类型 当type为1时，为一级权限，当type为2时，为二级权限
        pid: '', // 权限点父级id 页面权限点pid值为'0', 按钮权限点值为所属页面权限点的id值
        enVisible: '0' // 权限点开启状态 0关闭, 1开启. (暂时无需判断, 前端逻辑上默认全都有效直接用)
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }

    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取页面数据
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), 0)
      // console.log(this.list)
    },
    // 点击确定
    async btnOk() {
      await this.$refs.perForm.validate()
      // 是编辑
      if (this.ischange) {
        // console.log(234)
        await updatePermission(this.formData)
        this.$message.success('修改成功')
      } else { // 是添加
        // console.log(123)
        await addPermission(this.formData)
        this.$message.success('添加成功')
      }
      this.getPermissionList()
      this.btnCancel()
    },
    // 点击取消
    btnCancel() {
      this.formData = {
        name: '', // 权限点名字
        code: '', // 权限点标识
        description: '', // 权限点描述
        type: '', // 权限点类型 当type为1时，为一级权限，当type为2时，为二级权限
        pid: '', // 权限点父级id 页面权限点pid值为'0', 按钮权限点值为所属页面权限点的id值
        enVisible: '0' // 权限点开启状态 0关闭, 1开启. (暂时无需判断, 前端逻辑上默认全都有效直接用)
      }
      this.dialogVisible = false
      this.$refs.perForm.resetFields()
    },
    // 显示弹框
    addchild(id) {
      this.title = '添加'
      this.ischange = false
      this.dialogVisible = true
      if (id === 0) {
        this.formData.type = 1
        this.formData.pid = 0
      } else {
        this.formData.type = 2
        this.formData.pid = id
      }
    },
    // 点击编辑
    async editchild(id) {
      this.title = '编辑'
      this.ischange = true
      this.dialogVisible = true
      const data = await getPermissionDetail(id)
      this.formData = data
    },
    // 点击删除
    async deletechild(id) {
      await this.$confirm('确定要删除该数据吗')
      await delPermission(id)
      this.$message.success('删除成功')
      this.getPermissionList()
    }
  }
}
</script>
<style scoped>
.btn-add{
  margin:10px
}
</style>
