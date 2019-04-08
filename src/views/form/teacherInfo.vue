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

import { getInfo, submitInfo, submitInfoNo } from '@/api/teacherInfo'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        newPassword: null
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
      //获取教师信息请求
      getInfo().then(response => {
        this.form.name = response.data.name
        this.form.phone = response.data.phonenum
        this.form.address = response.data.address
        this.temp.name = response.data.name
        this.temp.phone = response.data.phonenum
        this.temp.address = response.data.address
      })
    },
    onSubmit() {
      if (this.form.name === this.temp.name && this.form.phone === this.temp.phone && this.form.address === this.temp.address && this.form.newPassword === null) {
        this.dialogFormVisible2 = true
      } else {
        this.dialogFormVisible = true
      }
    },
    onCancel() {
      this.form.newPassword = null
      this.form.name = this.temp.name
      this.form.phone = this.temp.phone
      this.form.address = this.temp.address
    },
    //修改教师信息请求
    reSubmit() {
      this.dialogFormVisible = false
      // console.log(JSON.parse(JSON.stringify(this.form)))
      // console.log(this.form)
      if (this.form.newPassword !== null) {
        submitInfo(this.form.name, this.form.newPassword, this.form.phone, this.form.address).then(response => {
          if (response.data.name) {
            Message({
              message: '修改成功！请重新登录',
              type: 'success',
              duration: 2 * 1000
            })
            this.$store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        }).catch(error => {
          Message({
            message: '修改失败！密码不能少于10位',
            type: 'error',
            duration: 2 * 1000
          })
          console.log(error)
          this.onCancel()
        })
      } else {
        submitInfoNo(this.form.name, this.form.phone, this.form.address).then(response => {
          if (response.data.name) {
            Message({
              message: '修改成功!',
              type: 'success',
              duration: 2 * 1000
            })
            this.get()
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

