<template>
  <div>
    <div v-show="showLogin" class="login-container" >
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <h3 class="title">二维码签到系统</h3>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入教师工号" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:48.5%;" @click.native.prevent="handleLogin">
            登录
          </el-button>
          <el-button style="width:48%;" @click="ToRegister" >注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="showRegister" class="login-container" >
      <el-form ref="signUpForm" :model="signUpForm" :rules="signupRules" class="login-form" auto-complete="on" label-position="left">
        <h3 class="title">二维码签到系统</h3>
        <p v-show="showTishi">{{ tishi }}</p>
        <el-form-item prop="newUsername">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="signUpForm.newUsername" name="newUsername" type="text" auto-complete="on" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="newPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="pwdType"
            v-model="signUpForm.newPassword"
            name="newPassword"
            auto-complete="on"
            placeholder="请输入密码"/>
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item prop="againPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="pwdType"
            v-model="signUpForm.againPassword"
            name="againPassword"
            auto-complete="on"
            placeholder="请确认密码"
            @keyup.enter.native="signUp" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="signUp">
            注册
          </el-button>
        </el-form-item>
        <span class="back" @click="ToLogin"><a href="">已有账号？马上登录</a></span>
      </el-form>
    </div>
  </div>
</template>

<script>

import { isNumber } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isNumber(value)) {
        callback(new Error('请输入正确的5位工号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 10) {
        callback(new Error('密码不能小于10位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      signUpForm: {
        newUsername: '',
        newPassword: '',
        againPassword: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      signupRules: {
        newUsername: [{ required: true, trigger: 'blur', validator: validateUsername }],
        newPassword: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      tishi: '',
      showTishi: false,
      showLogin: true,
      showRegister: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            console.log('error submit!!')
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ToRegister() {
      this.showRegister = true
      this.showLogin = false
    },
    ToLogin() {
      this.showRegister = false
      this.showLogin = true
    },
    signUp() {
      if (this.signUpForm.newPassword !== this.signUpForm.againPassword) {
        console.log('erroeeee!')
        this.$message({
          message: '两次密码不一致！',
          type: 'error'
        })
        this.signUpForm.newPassword = ''
        this.signUpForm.againPassword = ''
        this.loading = false
        return false
      }
      this.$refs.signUpForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('SignUp', this.signUpForm).then(() => {
            this.loading = false
            this.$message({
              message: '注册成功！',
              type: 'success'
            })
            this.loginForm.username = ''
            this.loginForm.password = ''
            this.signUpForm.newUsername = ''
            this.signUpForm.newPassword = ''
            this.signUpForm.againPassword = ''
            setTimeout(function() {
              this.showRegister = false
              this.showLogin = true
              this.showTishi = false
            }.bind(this), 1000)
          }).catch(() => {
            this.loading = false
            this.signUpForm.newUsername = ''
            this.signUpForm.newPassword = ''
            this.signUpForm.againPassword = ''
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .back {
    margin: auto 140px;
  }
}
</style>
