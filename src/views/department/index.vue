<template>
  <div class="container">
    <div class="app-container">
      <el-tree default-expand-all :expand-on-click-node="false" :data="depts" :props="defaultProps">
        <template v-slot="{ data }">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="6">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="operateDept($event,data.id)">
                <span class="el-dropdown-link">
                  管理<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <AddDept ref="addDept" :show-dialog.sync="showDialog" :current-node-id="currentNodeId" @updateDepartment="getDepartment" />
  </div>
</template>
<script>
import { getDepartment, delDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from '@/views/department/commponents/add-dept.vue'
export default {
  name: 'Department',
  components: {
    AddDept
  },
  data() {
    return {
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showDialog: false,
      currentNodeId: null
    }
  }, created() {
    this.getDepartment()
  }, methods: {
    async getDepartment() {
      const datalist = await getDepartment()
      this.depts = transListToTreeData(datalist, 0)
      // console.log(this.depts)
    },
    operateDept(type, id) {
      // console.log(type)
      if (type === 'add') {
        this.showDialog = true
        this.currentNodeId = id
      } else if (type === 'edit') {
        this.showDialog = true
        this.currentNodeId = id
        // 组件调用函数内方法
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail()
        })
      } else {
        this.$confirm('您确定删除此部门吗', '提示', { confirmButtonText: '确定',
          cancelButtonText: '取消' }).then(async() => {
          await delDepartment(id)
          this.$message.success('删除成功')
          this.getDepartment()
        })
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 30px;
}
</style>
