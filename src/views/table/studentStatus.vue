<template>
  <div class="app-container">

    <div class="filter-container" style="margin-bottom:30px; margin-left:30px">
      <el-input v-model="listQuery.searchId" placeholder="学生学号" style="width: 200px;" clearable class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.status" placeholder="出勤状态" clearable class="filter-item" style="width: 130px">
        <el-option label="已签到" value="1"/>
        <el-option label="未签到" value="0"/>
        <el-option label="新增学生" value="2"/>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <router-link :data="courseId" :to="'/course/signHistory/' + courseId">
        <el-button type="info" icon="el-icon-d-arrow-left">返回</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 75%; margin:auto">

      <el-table-column align="center" label="学号" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.studentid }}</span>
        </template>
      </el-table-column>

      <el-table-column width="211px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.studentname }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="出勤状态" width="220">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" :type="scope.row.status | statusFilter">未签到</el-tag>
          <el-tag v-if="scope.row.status == 1" :type="scope.row.status | statusFilter">已签到</el-tag>
          <el-tag v-if="scope.row.status == 2" :type="scope.row.status | statusFilter">新增学生</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="170">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success" size="small" icon="el-icon-refresh" @click="handleStatusChange(scope.row)">重置</el-button>
          <el-button v-if="scope.row.status == 0" type="primary" size="small" icon="el-icon-edit" @click="handleStatusChange(scope.row)">补签</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { getStatus, changeStatus } from '@/api/student'
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'

export default {
  name: 'StudentStatus',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger',
        2: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        searchId: null,
        status: null
      },
      courseId: '',
      signId: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.courseId = this.$route.params && this.$route.params.courseId
      this.signId = this.$route.params && this.$route.params.signId
      // console.log(this.courseId, this.signId)
      this.listLoading = false
      this.listQuery.searchId = null
      this.listQuery.status = null
      getStatus(this.courseId, this.signId, this.listQuery.page, this.listQuery.limit, this.listQuery.searchId, this.listQuery.status).then(response => {
        if (response.data) {
          this.list = response.data.signins
          this.total = response.data.total
          this.listLoading = false
        }
      }).catch(error => {
        Message({
          message: '获取签到详情失败！',
          type: 'error',
          duration: 1 * 1000
        })
        console.log(error)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      getStatus(this.courseId, this.signId, this.listQuery.page, this.listQuery.limit, this.listQuery.searchId, this.listQuery.status).then(response => {
        if (response.data) {
          this.list = response.data.signins
          this.total = response.data.total
          this.listLoading = false
        }
      }).catch(error => {
        Message({
          message: '查询失败！',
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
    handleStatusChange(row) {
      changeStatus(this.courseId, this.signId, row.studentid).then(response => {
        if (response.data) {
          this.getList()
        }
      }).catch(error => {
        Message({
          message: '更改状态失败！',
          type: 'error',
          duration: 1 * 1000
        })
        console.log(error)
      })
    },
    add(row) {
      row.status = 1
      this.$message({
        message: '补签成功',
        type: 'success'
      })
    },
    reset(row) {
      row.status = 0
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
