<template>
  <div class="app-container">

    <div class="filter-container" style="margin-bottom:30px; margin-left:30px">
      <el-input v-model="listQuery.id" placeholder="学生学号" style="width: 200px;" clearable class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-input v-model="newStudent.newId" placeholder="新增学生学号" style="width: 200px;" clearable class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="newStudent.newName" placeholder="新增学生姓名" style="width: 200px;" clearable class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
      <router-link :to="'/example/course3/'">
        <el-button v-waves class="filter-item" type="info" icon="el-icon-d-arrow-left" style="margin-left: 40px">返回</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 75%; margin:auto">

      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="学号" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="211px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="170">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-error">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/table'

export default {
  name: 'StudentList',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        id: undefined
      },
      newStudent: {
        newId: undefined,
        newName: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalTitle = v.title //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    add(row) {
      this.$message({
        message: '补签成功',
        type: 'success'
      })
    },
    reset(row) {
      this.$message({
        message: '重置成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
