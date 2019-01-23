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
          {{ scope.$index+(listQuery.page - 1) * listQuery.limit + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="学号" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.studentid }}</span>
        </template>
      </el-table-column>

      <el-table-column width="211px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="176">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-error" @click="deleteStu(scope.row.studentid)">删除</el-button>
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
import { getStudent, deleteStudent, searchStudent, newStudent } from '@/api/student'
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'

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
        limit: 20
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
      getStudent(this.courseId, this.listQuery.page, this.listQuery.limit).then(response => {
        this.list = response.data.studentDTOs
        this.total = response.data.total
        this.listLoading = false
      }).catch(error => {
        Message({
          message: '获取学生失败！',
          type: 'error',
          duration: 1 * 1000
        })
        console.log(error)
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
      this.listQuery.page = 1
      if (this.searchId === '') {
        this.getList()
      } else {
        searchStudent(this.courseId, this.listQuery.page, this.listQuery.limit, this.searchId).then(response => {
          this.list = response.data.studentDTOs
          if (Object.keys(this.list).length === 0) {
            this.total = 0
          } else {
            this.total = 1
          }
          this.listLoading = false
        }).catch(error => {
          Message({
            message: '查询学生失败！',
            type: 'error',
            duration: 1 * 1000
          })
          console.log(error)
        })
      }
    },
    deleteStu(id) {
      this.deleteDialog = true
      this.studentId = id
    },
    reCancel() {
      this.deleteDialog = false
      deleteStudent(this.courseId, this.studentId).then(response => {
        if (response.data) {
          Message({
            message: '删除成功！',
            type: 'success',
            duration: 1 * 1000
          })
          this.getList()
        }
      }).catch(error => {
        Message({
          message: '删除学生失败！',
          type: 'error',
          duration: 1 * 1000
        })
        console.log(error)
      })
    },
    addStudent() {
      if (this.newStudent.newId === '' || this.newStudent.newName === '') {
        this.$message({
          message: '学号姓名不能为空！',
          type: 'error'
        })
      } else {
        newStudent(this.courseId, this.listQuery.page, this.listQuery.limit, this.newStudent.newId, this.newStudent.newName).then(response => {
          this.list = response.data.studentDTOs
          this.total = response.data.total + 1
          if (Object.keys(this.list).length !== 0) {
            Message({
              message: '添加成功！',
              type: 'success',
              duration: 1 * 1000
            })
            this.newStudent.newId = ''
            this.newStudent.newName = ''
          } else {
            Message({
              message: '添加失败！',
              type: 'error',
              duration: 1 * 1000
            })
          }
        }).catch(error => {
          Message({
            message: '添加学生失败！',
            type: 'error',
            duration: 1 * 1000
          })
          console.log(error)
        })
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
