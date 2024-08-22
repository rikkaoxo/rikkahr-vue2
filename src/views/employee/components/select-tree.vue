<template>
  <el-cascader
    size="mini"
    :options="treeData"
    :props="props"
    separator="-"
    :value="value"
    @change="changeValue"
  />
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      treeData: [],
      props: {
        label: 'name', // 要展示的字段
        value: 'id' // 要存储的字段
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const data = await getDepartment()
      this.treeData = transListToTreeData(data, 0)
    },
    changeValue(value) {
      if (value.length > 0) {
        this.$emit('input', value[value.length - 1])
      } else {
        this.$emit('input', null)
      }
    }
  }

}
</script>
