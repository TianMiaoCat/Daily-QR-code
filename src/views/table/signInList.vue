<template>
  <div class="app-container">
    <div class="button" style="margin-bottom:20px">
      <router-link :data="courseId" :to="'/course/studentList/' + courseId">
        <el-button type="primary" size="small" icon="el-icon-document">当前学生名单</el-button>
      </router-link>
      <el-button type="primary" size="small" icon="el-icon-download" @click="handleDownload">导出签到表</el-button>
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
          {{ scope.row.signinid }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="签到时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.starttime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出勤人数" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.signinnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缺勤人数" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.studentnum - scope.row.signinnum }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :data="courseId" :to="'/course/student/' + courseId + '/' + scope.row.signinid">
            <el-button type="success" size="small" icon="el-icon-circle-check-outline">查看详情</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-error" @click="deleteRec(scope.row.signinid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="deleteDialog" title="修改提示" width="30%">
      <span>确认删除该次签到记录吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="reCancel">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getSign } from '@/api/course'
import { getRecord, deleteSignin } from '@/api/signup'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      courseId: 0,
      list: null,
      filelist: null,
      listLoading: true,
      deleteDialog: false,
      signId: 0,
      downloadLoading: false,
      filename: '签到表',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.courseId = this.$route.params && this.$route.params.id
      console.log(this.courseId)
      this.listLoading = true
      getSign(this.courseId).then(response => {
        this.list = response.data
        for (var i = 0; i < this.list.length; i++) {
          var d = new Date(this.list[i]['starttime'])
          this.list[i]['starttime'] = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + this.addZero(d.getHours()) + ':' + this.addZero(d.getMinutes())
        }
        this.listLoading = false
      }).catch(error => {
        Message({
          message: '获取签到记录失败！',
          type: 'error',
          duration: 1 * 1000
        })
        console.log(error)
      })
    },
    deleteRec(id) {
      this.deleteDialog = true
      this.signId = id
    },
    reCancel() {
      // 传给后端课程id-tempData，签到id-signId
      deleteSignin(this.signId).then(response => {
        if (response.data) {
          this.deleteDialog = false
          this.fetchData()
          Message({
            message: '删除成功！',
            type: 'success',
            duration: 1 * 1000
          })
        }
      }).catch(error => {
        Message({
          message: '获取签到记录失败！',
          type: 'error',
          duration: 1 * 1000
        })
        console.log(error)
      })
    },
    handleDownload() {
      this.downloadLoading = true
      getRecord(this.courseId).then(response => {
        this.filelist = response.data.studentSigninInfos
        console.log(this.filelist)
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['学号', '姓名', '出勤次数']
          const filterVal = ['studentid', 'studentname', 'signintime']
          const list = this.filelist // 导入数据
          console.log(list)
          const data = this.formatJson(filterVal, list)
          // console.log(data)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
      }).catch(error => {
        Message({
          message: '获取签到记录失败！',
          type: 'error',
          duration: 1 * 1000
        })
        console.log(error)
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    addZero(val) {
      if (val < 10) {
        return '0' + val
      } else {
        return val
      }
    }
  }
}
</script>
