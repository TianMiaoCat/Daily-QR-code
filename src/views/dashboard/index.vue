<template>
  <div class="dashboard-container">
    <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
      <box-card/>
    </el-col>
  </div>
</template>

<script>
import BoxCard from './components/BoxCard'

export default {
  name: 'Dashboard',
  components: {
    BoxCard
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
