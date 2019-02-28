<template>
  <div class="app-container">

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="课程编号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.courseid }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250px" align="center" label="开课时间">
        <template slot-scope="scope">
          <span>{{ scope.row.academicyear }}学年第{{ scope.row.semester }}学期</span>
        </template>
      </el-table-column>

      <el-table-column width="230px" align="center" label="课程名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/course/signHistory/' + scope.row.courseid">
            <el-button type="success" size="small" icon="el-icon-circle-check-outline">查看历史</el-button>
          </router-link>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(scope.row.courseid)">签到</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteCourse(scope.row.courseid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :visible.sync="dialogFormVisible" title="时间设定" >
      <el-form ref="temp" :rules="rules" :model="temp" label-position="left" label-width="170px" style="width: 280px; margin-left:10px;">
        <el-form-item label="请设定二维码有效时间">
          <el-select v-model="temp.time" placeholder="2" style="width: 80px" prop="time" clearable>
            <el-option label="2" value="2"/>
            <el-option label="3" value="3"/>
            <el-option label="5" value="5"/>
          </el-select>   min
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="getImage">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="deleteDialog" title="修改提示" width="30%">
      <span>确认删除该课程的所有内容吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="reCancel">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="imageDialog" title="二维码签到" width="38%">
      <el-form>
        <el-form-item>
          <span><img :src="imageUrl"></span>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getCourse, deleteCourse } from '@/api/course'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { Message } from 'element-ui'

export default {
  name: 'CourseList',
  components: { Pagination },
  data() {
    const validateTime = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请设置有效时间'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      temp: {
        time: 2,
        signCourse: 0
      },
      rules: {
        time: [{ required: true, trigger: 'blur', validator: validateTime }]
      },
      dialogFormVisible: false,
      deleteDialog: false,
      imageDialog: false,
      tempData: 0,
      imageUrl: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getCourse(this.listQuery.page, this.listQuery.limit).then(response => {
        this.list = response.data.courses
        this.total = response.data.total
        this.listLoading = false
      }).catch(error => {
        Message({
          message: '获取课程失败！',
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
    handleUpdate(id) {
      this.dialogFormVisible = true
      this.temp.signCourse = id
    },
    deleteCourse(id) {
      this.deleteDialog = true
      this.tempData = id
    },
    reCancel() {
      this.deleteDialog = false
      deleteCourse(this.tempData).then(response => {
        if (response.data) {
          this.getList()
          Message({
            message: '删除成功！',
            type: 'success',
            duration: 1 * 1000
          })
        }
      }).catch(error => {
        Message({
          message: '删除失败！',
          type: 'error',
          duration: 1 * 1000
        })
        console.log(error)
      })
    },
    getImage() {
      this.dialogFormVisible = false
      // console.log(this.temp.time)
      const url = 'https://qr.nobler.xyz/apis/admin/signin/create?courseid=' + this.temp.signCourse + '&duration=' + this.temp.time
      this.imageUrl = url
      console.log(url)
      this.imageDialog = true
      if (this.imageDialog) {
        setTimeout(() => this.change(), this.temp.time * 60 * 1000)
      }
      this.temp.time = 2
    },
    change() {
      this.imageDialog = false
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
