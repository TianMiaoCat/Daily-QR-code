<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="教师姓名">
        <el-input v-model="form.name" style="width: 20%;"/>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone" style="width: 20%;"/>
      </el-form-item>
      <el-form-item label="办公地址">
        <el-input v-model="form.address" style="width: 40%;"/>
      </el-form-item>
      <el-form-item label="修改密码">
        <el-input v-model="form.newPassword" style="width: 20%;" placeholder="输入新密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-right: 80px; margin-top: 50px" @click="onSubmit" >确认修改</el-button>
        <el-button @click="onCancel">取消修改</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogFormVisible" title="修改提示" width="30%">
      <span>确认修改您的信息吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="reSubmit">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible2" title="修改提示" width="30%">
      <span>您没有修改信息</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2 = false">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

// import { getInfo, submitInfo } from '@/api/teacherInfo'

export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        newPassword: ''
      },
      temp: {
        name: '',
        phone: '',
        address: ''
      },
      dialogFormVisible: false,
      dialogFormVisible2: false
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      // getInfo(this.$store.getters.token).then(response => {
      //   this.form.name = response.data.name
      //   this.form.phone = response.data.phone
      //   this.form.address = response.data.address
      //   this.temp = response.data
      // })
    },
    onSubmit() {
      if (this.form.name === this.temp.name && this.form.phone === this.temp.phone && this.form.address === this.temp.address && this.form.newPassword === '') {
        this.dialogFormVisible2 = true
      } else {
        this.dialogFormVisible = true
      }
    },
    onCancel() {
      this.form.newPassword = ''
      this.form.name = this.temp.name
      this.form.phone = this.temp.phone
      this.form.address = this.temp.address
    },
    reSubmit() {
      this.dialogFormVisible = false
      // console.log(JSON.parse(JSON.stringify(this.form)))
      // console.log(this.form)
      // submitInfo(this.form)
      this.$message('修改成功!')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

