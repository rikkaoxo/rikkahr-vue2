<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="close">

    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" placeholder="2-10个字符" style="width: 80%" size="mini">
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />

        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" placeholder="1-100个字符" type="textarea" size="mini" :rows="4" style="width: 80%" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary" @click="btnOK">
              确认
            </el-button>
            <el-button size="mini" @click="close">
              取消
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>
<script>
import { getDepartment, getManagerList, addDepartment, getDepartmentDetail, updateDepartment } from '@/api/department'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人id
        name: '', // 部门名称
        pid: '' // 父级部门的id
      },
      rules: {
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur'
          },
          {
            trigger: 'blur',
            // 自定义校验模式
            validator: async(rule, value, callback) => {
              // value就是输入的编码
              let result = await getDepartment()
              if (this.formData.id) {
                result = result.filter((item) => { item !== this.formData.id })
              }
              // result数组中是否存在 value值
              if (result.some(item => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            }
          }
        ], // 部门编码
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, {
          min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur'
        }], // 部门介绍
        managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }], // 部门负责人id
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur'
          },
          {
            trigger: 'blur',
            // 自定义校验模式
            validator: async(rule, value, callback) => {
              // value就是输入的编码
              let result = await getDepartment()
              if (this.formData.id) {
                result = result.filter((item) => { item !== this.formData.id })
              }
              // result数组中是否存在 value值
              if (result.some(item => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            }
          }] // 部门名称
        // pid: '' // 父级部门的id 不需要做校验
      },
      managerList: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
      // return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      this.$refs.addDept.resetFields()
      this.formData =
        {
          code: '', // 部门编码
          introduce: '', // 部门介绍
          managerId: '', // 部门负责人id
          name: '', // 部门名称
          pid: '' // 父级部门的id
        }
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
      // console.log(this.managerList)
    },
    async btnOK() {
      let msg = '新增'
      await this.$refs.addDept.validate()
      if (this.formData.id) {
        msg = '修改'
        await updateDepartment(this.formData)
      } else {
        await addDepartment({ ...this.formData, pid: this.currentNodeId })
      }
      this.$emit('updateDepartment')
      this.$message.success(`${msg}部门成功`)
      this.close()
    },
    async getDepartmentDetail() {
      // alert(123)
      const data = await getDepartmentDetail(this.currentNodeId)
      this.formData = data
    }
  }
}
</script>
