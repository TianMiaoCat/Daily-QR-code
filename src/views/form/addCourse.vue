<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="课程名称">
        <el-input v-model="form.name" style="width: 28%;"/>
      </el-form-item>
      <el-form-item label="开课时间">
        <el-select v-model="form.year" placeholder="2018-2019" style="width: 13%;">
          <el-option label="2018-2019" value="y1"/>
          <el-option label="2019-2020" value="y2"/>
        </el-select>
        学年  第
        <el-select v-model="form.term" placeholder="1" style="width: 6%;">
          <el-option label="1" value="t1"/>
          <el-option label="2" value="t2"/>
        </el-select> 学期
      </el-form-item>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
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
      dialogFormVisible: false,
      dialogFormVisible2: false
    }
  },
  methods: {
    onSubmit() {
      this.dialogFormVisible = true
    },
    reSubmit() {
      this.dialogFormVisible = false
      this.$message({
        message: '提交成功！',
        type: 'success'
      })
    },
    onCancel() {
      this.dialogFormVisible2 = true
    },
    reCancel() {
      this.form.name = '',
      this.form.term = '',
      this.form.year = '',
      this.tableData = [],
      this.tableHeader = [],
      this.dialogFormVisible2 = false
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
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
