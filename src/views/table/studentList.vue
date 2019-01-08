<template>
  <div class="app-container">

    <div class="filter-container" style="margin-bottom:40px; margin-left:30px; margin-top:20px">
      <el-input v-model="searchId" placeholder="学生学号" style="width: 200px;" clearable class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-input v-model="newStudent.newId" placeholder="新增学生学号" style="width: 200px;" clearable class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="newStudent.newName" placeholder="新增学生姓名" style="width: 200px;" clearable class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addStudent">新增</el-button>
      <router-link :data="courseId" :to="'/course/signHistory/' + courseId">
        <el-button class="filter-item" type="info" icon="el-icon-d-arrow-left" style="margin-left: 40px">返回</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 64%; margin:auto">

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

      <el-table-column align="center" label="操作" width="176">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-error" @click="deleteStu(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :visible.sync="deleteDialog" title="修改提示" width="30%">
      <span>确认从名单中删除该学生吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="reCancel">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList } from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  name: 'StudentList',
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 30,
      listQuery: {
        page: 1,
        limit: 10
      },
      searchId: '',
      newStudent: {
        newId: '',
        newName: ''
      },
      courseId: 0,
      studentId: 0,
      deleteDialog: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.courseId = this.$route.params && this.$route.params.courseId
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleFilter() {
      // 传给后端学生id-searchId
      this.listQuery.page = 1
      this.getList()
    },
    deleteStu(id) {
      this.deleteDialog = true
      this.studentId = id
    },
    reCancel() {
      // 传给后端课程id-courseId，学生id-studentId
      this.deleteDialog = false
      this.getList()
      this.$message({
        message: '删除成功！',
        type: 'success'
      })
    },
    addStudent() {
      if (this.newStudent.newId === '' || this.newStudent.newName === '') {
        this.$message({
          message: '学号姓名不能为空！',
          type: 'error'
        })
      } else {
        // 将学生id和姓名传给后端
        this.getList()
        this.$message({
          message: '新增成功！',
          type: 'success'
        })
        this.newStudent.newId = ''
        this.newStudent.newName = ''
      }
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
