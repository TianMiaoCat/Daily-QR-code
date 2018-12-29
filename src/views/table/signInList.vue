<template>
  <div class="app-container">
    <div class="button" style="margin-bottom:20px">
      <router-link :to="'/example/student1/'">
        <el-button type="primary" size="small" icon="el-icon-document">当前学生名单</el-button>
      </router-link>
      <el-button type="primary" size="small" icon="el-icon-download">导出签到表</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row
      style="width: 80%;margin:auto">
      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="签到时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出勤人数" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缺勤人数" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/example/student/'">
            <el-button type="success" size="small" icon="el-icon-circle-check-outline">查看详情</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-error" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
