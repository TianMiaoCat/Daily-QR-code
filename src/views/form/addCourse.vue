<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="课程名称">
        <el-input v-model="form.name" style="width: 28%;"/>
      </el-form-item>
      <el-form-item label="开课时间">
        <el-select v-model="form.year" placeholder="" style="width: 13%;">
          <el-option label="2018-2019" value="2018-2019"/>
          <el-option label="2019-2020" value="2019-2020"/>
        </el-select>
        学年  第
        <el-select v-model="form.term" placeholder="" style="width: 6%;">
          <el-option label="1" value="1"/>
          <el-option label="2" value="2"/>
        </el-select> 学期
      </el-form-item>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
      <el-table :data="tableData" border highlight-current-row style="width: 80%;margin:20px auto;">
        <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item" align="center"/>
      </el-table>
      <el-form-item>
        <center><el-button type="primary" style="margin-left: -150px; margin-right: 80px; margin-top: 40px" @click="onSubmit" >确认添加</el-button>
        <el-button @click="onCancel">取消添加</el-button></center>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogFormVisible" title="修改提示" width="30%">
      <span>确认添加课程信息吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="reSubmit">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible2" title="修改提示" width="30%">
      <span>确认放弃添加该课程信息吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="reCancel">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { submitInfo, submitExcel } from '@/api/newCourse.js'
import { Message } from 'element-ui'

export default {
  components: { UploadExcelComponent },
  data() {
    return {
      form: {
        name: '',
        year: '',
        term: ''
      },
      tableData: [],
      tableHeader: [],
      header: [],
      student: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      courseid: null
    }
  },
  methods: {
    //提交信息合法校验
    onSubmit() {
      if (this.form.name === '') {
        Message({
          message: '课程名称不能为空！',
          type: 'error',
          duration: 1 * 1000
        })
      } else if (this.form.term === '') {
        Message({
          message: '开课时间不能为空！',
          type: 'error',
          duration: 1 * 1000
        })
      } else if (Object.keys(this.tableHeader).length === 0) {
        Message({
          message: '请导入学生名单后再创建课程！',
          type: 'error',
          duration: 1 * 1000
        })
      } else if (Object.keys(this.tableHeader).length !== 2 || this.tableHeader[0].trim() !== '学号' || this.tableHeader[1].trim() !== '姓名') {
        Message({
          message: '文件内容只能包含以“学号”和“姓名”为首行的两列！',
          type: 'error',
          duration: 1 * 1000
        })
      } else {
        this.dialogFormVisible = true
      }
    },
    //发送请求新增课程信息+上传学生名单
    reSubmit() {
      this.dialogFormVisible = false
      // console.log(JSON.parse(JSON.stringify(this.form)))
      // console.log(JSON.parse(JSON.stringify(this.tableData)))
      submitInfo(this.form.name, this.form.year, this.form.term).then(response => {
        if (response.data.courseid) {
          this.courseid = response.data.courseid
          submitExcel(this.courseid, this.student).then(response => {
            if (response.data) {
              Message({
                message: '添加课程成功!',
                type: 'success',
                duration: 3 * 1000
              })
              this.reCancel()
            }
          }).catch(error => {
            Message({
              message: '添加失败！',
              type: 'error',
              duration: 1 * 1000
            })
            console.log(error)
          })
        } else {
          Message({
            message: '添加失败！',
            type: 'error',
            duration: 1 * 1000
          })
        }
      }).catch(error => {
        Message({
          message: '添加失败！',
          type: 'error',
          duration: 1 * 1000
        })
        console.log(error)
      })
    },
    onCancel() {
      this.dialogFormVisible2 = true
    },
    reCancel() {
      this.form.name = ''
      this.form.term = ''
      this.form.year = ''
      this.tableData = []
      this.tableHeader = []
      this.dialogFormVisible2 = false
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      Message({
        message: '文件大小不能超过1M.',
        type: 'warning',
        duration: 1 * 1000
      })
      return false
    },
    //上传学生名单
    handleSuccess({ results, header }) {
      // // console.log(JSON.parse(JSON.stringify(results)))
      this.tableData = []
      for (var j = 0; j < 10; j++) {
        this.tableData.push(results[j])
      }
      // this.tableData = results
      results = JSON.parse(JSON.stringify(results))
      for (var i = 0; i < results.length; i++) {
        results[i]['studentid'] = results[i]['学号']
        delete results[i]['学号']
        results[i]['studentid'] = results[i]['studentid'] + ''
        results[i]['name'] = results[i]['姓名']
        delete results[i]['姓名']
      }
      this.student = results
      console.log(this.tableData)
      // console.log(JSON.stringify(this.student))
      // this.student = JSON.stringify(this.student)
      this.tableHeader = header
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
