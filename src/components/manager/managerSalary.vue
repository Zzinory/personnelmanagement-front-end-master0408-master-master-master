<template>
  <div>
   <div class="top-wrapper">
      <el-form :inline="true" ref="form" :model="info" label-width="80px">
      <el-form-item label="姓名">
       <el-input
            placeholder="请输入姓名"
            v-model="info.name"
          ></el-input>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
      <el-button type="primary" @click="publish">工资发放</el-button>
   </div>
    <el-table :data="tableData" height="800" border style="width: 100%">
      <el-table-column prop="payTime" label="发放时间" width="180">
      </el-table-column>
      <el-table-column prop="baseSalary" label="基础工资"> </el-table-column>
      <el-table-column prop="overtimeSalary" label="加班补贴"> </el-table-column>
      <el-table-column prop="deductSalary" label="请假扣除"> </el-table-column>
      <el-table-column prop="grossSalary" label="实发工资"> </el-table-column>
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
    <el-dialog title="发放工资" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="基础工资">
          <el-input v-model="form.base"></el-input>
        </el-form-item>
        <el-form-item label="加班补贴">
          <el-input v-model="form.overTime"></el-input>
        </el-form-item>
        <el-form-item label="请假扣除">
          <el-input v-model="form.leave"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onOk">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import submitLeave from "../../api/submitLeave";
import getSalaryList from "../../api/getSalaryList";
export default {
  data() {
    return {
      tableData: [],
      count: 0, //数据总数
      currentPage: 1, //当前页数
      dialogFormVisible:false,
      form:{},//发放工资信息
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },

      info: {
        time: "",
        leaveReason: "",
        //姓名
        name:""
      },
    };
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //调用接口分页
    },
    publish(){
      this.dialogFormVisible = true;
    },
    onOk(){
      //todo  this.form 拿到表单值 提交接口
    },
    onSubmit() {
      let data = {
        leaveState: "待审批",
        applicantName: this.$store.state.userName,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      submitLeave(data).then((resp) => {
        console.log(resp);
        alert("提交成功！");
      });
    },

  },
  created() {
    getSalaryList().then(resp=>{
      this.tableData=resp.data.data;
      // console.log(resp);
    })

  }
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
