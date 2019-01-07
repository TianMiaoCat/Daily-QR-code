<template>
  <div class="app-container">

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="课程编号" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="210px" align="center" label="开课时间">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="230px" align="center" label="课程名称">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="30px" label="学生人数">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{path: '/example/course3/', query: {courseId:scope.row.id}}">
            <el-button type="success" size="small" icon="el-icon-circle-check-outline">查看历史</el-button>
          </router-link>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(scope.row.id)">签到</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteCourse(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :visible.sync="dialogFormVisible" title="时间设定" >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="170px" style="width: 280px; margin-left:10px;">
        <el-form-item label="请设定二维码有效时间" prop="time">
          <el-select v-model="temp.time" placeholder="" style="width: 80px">
            <el-option label="2" value="2"/>
            <el-option label="3" value="3"/>
          </el-select>   min
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="deleteDialog" title="修改提示" width="30%">
      <span>确认删除该课程的所有内容吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="reCancel">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList } from '@/api/table'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CourseList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 30,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      temp: {
        time: ''
      },
      rules: {
        time: [{ required: true, message: '请设置有效时间', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      deleteDialog: false,
      tempData: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        // this.total = response.data.total
        this.listLoading = false
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
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    deleteCourse(id) {
      this.deleteDialog = true
      this.tempData = id
    },
    reCancel() {
      // 传给后端id-tempData
      this.deleteDialog = false
      this.getList()
      this.$message({
        message: '删除成功！',
        type: 'success'
      })
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
