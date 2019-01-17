<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545990637008&di=7892ed83ea27fc15e96f3599c0f91a8f&imgtype=0&src=http%3A%2F%2Fimglf2.ph.126.net%2FKEw-Zu5Qml9UiMFtrhRVrQ%3D%3D%2F6598102208076291452.jpg">
    </div>
    <div style="position:relative;">
      <pan-thumb :image="avatar" class="panThumb"/>
      <mallki class-name="mallki-text" text="vue-element-admin"/>
      <div style="padding-top:35px;" class="progress-item">
        <span> {{ time }} </span>
      </div>
      <div class="progress-item">
        <span v-if="num==2">{{ year - 1 }} - {{ year }} 学年 第 {{ num }} 学期</span>
        <span v-else>{{ year }} - {{ year + 1 }} 学年 第 {{ num }} 学期</span>
      </div>
      <div class="progress-item">
        <span>教师姓名：{{ name }}</span>
      </div>
      <div class="progress-item">
        <span>联系方式：{{ phone }}</span>
      </div>
      <div class="progress-item">
        <span>办公地点：{{ address }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInfo } from '@/api/teacherInfo'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { PanThumb, Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      time: null,
      year: null,
      num: null,
      name: null,
      phone: null,
      address: null
    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  created() {
    this.showTime()
  },
  methods: {
    showTime() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var today = date.getDate()
      this.time = year + '年' + month + '月' + today + '日'
      this.year = year
      if (month >= 9) {
        this.num = 1
      } else {
        this.num = 2
      }
      console.log(this.$store.getters.name)
      getInfo().then(response => {
        // console.log(response.data)
        this.name = response.data.name
        this.phone = response.data.phonenum
        this.address = response.data.address
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component {
  width: 300px;
  .box-card-header {
    position: relative;
    height: 220px;
    width: 350px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
