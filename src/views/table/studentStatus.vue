<template>
  <div class="app-container">

    <div class="filter-container" style="margin-bottom:30px; margin-left:30px">
      <el-input v-model="listQuery.searchId" placeholder="学生学号" style="width: 200px;" clearable class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.status" placeholder="出勤状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusOptions" :label="item" :key="item" :value="item"/>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <router-link :data="courseId" :to="'/course/signHistory/' + courseId">
        <el-button type="info" icon="el-icon-d-arrow-left">返回</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 75%; margin:auto">

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

      <el-table-column class-name="status-col" align="center" label="出勤状态" width="220">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="170">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status=='published'" type="success" size="small" icon="el-icon-refresh" @click="reset(scope.row)">重置</el-button>
          <el-button v-if="scope.row.status=='deleted'" type="primary" size="small" icon="el-icon-edit" @click="add(scope.row)">补签</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList } from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  name: 'StudentStatus',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 30,
      listQuery: {
        page: 1,
        limit: 20,
        searchId: '',
        status: ''
      },
      statusOptions: ['published', 'deleted'],
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    add(row) {
      row.status = 'published'
      this.$message({
        message: '补签成功',
        type: 'success'
      })
    },
    reset(row) {
      row.status = 'deleted'
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
