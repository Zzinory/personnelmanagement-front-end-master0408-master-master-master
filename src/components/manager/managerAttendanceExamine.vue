<template>
  <div>
    <div class="top-wrapper">
      <el-form :inline="true" ref="form" :model="info" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="info.name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="onAdd">新增</el-button>
    </div>

    <el-table :data="tableData" height="800" border style="width: 100%">
      <el-table-column prop="time" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="attendanceTime" label="签到时间">
      </el-table-column>
      <el-table-column prop="exitTime" label="签退时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="count"
      >
      </el-pagination>
    </div>
    <el-dialog
      v-if="editShow"
      title="修改"
      :visible.sync="editShow"
      append-to-body
      width="90%"
    >
      <el-form ref="form" :model="editInfo" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-input v-model="editInfo.time"></el-input>
        </el-form-item>
        <el-form-item label="签到时间">
          <el-input v-model="editInfo.attendanceTime"></el-input>
        </el-form-item>
        <el-form-item label="签退时间">
          <el-input v-model="editInfo.exitTime"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editShow: false,
      tableData: [
        {
          id: "1",
          time: "2023-01-01",
          name: "主管",
          attendanceTime: "2023-01-01 08:01",
          exitTime: "2023-01-01 18:01",
        },
        {
          id: "2",
          time: "2023-01-01",
          name: "主管2",
          attendanceTime: "2023-01-01 08:01",
          exitTime: "2023-01-01 18:01",
        },
      ],
      count: 0, //数据总数
      currentPage: 1, //当前页数
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },

      info: {
        name: "",
      },
      editInfo: {
        time: "",
        name: "",
        attendanceTime: "",
        exitTime: "",
      },
    };
  },

  methods: {
    onAdd() {
      this.editShow = true;
      this.editInfo = {
        time: "",
        name: "",
        attendanceTime: "",
        exitTime: "",
      };
    },
    editSubmit() {
      //todo  this.editInfo 提交修改或者新增的信息
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //调用接口分页
    },
    handleDelete(scope) {
      const $index = scope.$index;
      this.tableData = this.tableData.filter((item, index) => index !== $index);
    },
    handleEdit(row) {
      this.editShow = true;
      this.editInfo = row;
    },
    onSubmit() {
      console.log(this.leaveInfo);

      // let data = {
      //   leaveState: "待审批",
      //   applicantName: this.$store.state.userName,
      //   startTime: this.startTime,
      //   endTime: this.endTime,
      // };
      // submitLeave(data).then((resp) => {
      //   console.log(resp);
      //   alert("提交成功！");
      // });
    },
  },
};
</script>


<style scoped>
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.top-wrapper{
    display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;

}
.top-wrapper .el-form-item{
  margin-bottom: 0;
}
</style>
