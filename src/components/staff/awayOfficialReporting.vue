<template>
  <div style="display: flex">
    <div style="margin-right: 20px">
      <el-form ref="form" :model="info" label-width="80px">
        <el-button @click="test">test</el-button>

        <el-form-item label="出差事由">
          <el-input
            type="textarea"
            placeholder="请输入加班事由"
            :rows="10"
            v-model="info.businesstripReason"
          ></el-input>
        </el-form-item>
        <el-form-item label="出差地点">
          <el-cascader
            ref="cascader"
            :props="{ emitPath: false }"
            style="width: 100%"
            value="businesstripPlace"
            :options="areaOptions"
            @change="placeOnChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="出差时间">
          <el-date-picker
            v-model="info.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            format="MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交审批</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="flex: 1">
      <el-table :data="tableData" height="800" border style="width: 100%">
        <el-table-column prop="businesstripId" label="ID" width="180">
        </el-table-column>
        <el-table-column
          prop="businesstripPlace"
          label="出差地点"
          width="180"
        ></el-table-column>
        <el-table-column prop="businesstripReason" label="出差事由">
        </el-table-column>
        <el-table-column prop="businesstripTime" label="出差时间">
        </el-table-column>
        <el-table-column prop="censorName" label="审批人"> </el-table-column>
        <el-table-column prop="censorState" label="审批状态"> </el-table-column>
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
    </div>
  </div>
</template>
<script>
import submitLeave from "../../api/submitLeave";
import { getArea } from "../../area";
import getBusinesstripListById from "../../api/getBusinesstripListById";
import { businesstripSubmit } from "../../api/businesstripSubmit";
export default {
  data() {
    return {
      tableData: [],
      count: 0, //数据总数
      currentPage: 1, //当前页数
      areaOptions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      businesstripPlace:{},
      info: {
        time: "",
        leaveReason: "",
        area: "",
      },
    };
  },

  methods: {
    placeOnChange(){
      let businesstripPlace = this.$refs["cascader"].getCheckedNodes();
      this.businesstripPlace = businesstripPlace[0].pathLabels.join('/')

    },
    test() {
      console.log(this.businesstripPlace);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //调用接口分页
    },
    onSubmit() {
      const firstDate = this.$data.info.time[0];
      const secondDate = this.$data.info.time[1];
      let data = {
        userId: this.$store.state.userId,
        censorState: "待审批",
        businesstripTime: firstDate + "至" + secondDate,
        businesstripReason: this.info.businesstripReason,
        businesstripPlace: this.businesstripPlace
      };
      console.log(data)

      businesstripSubmit(data).then(resp=>{
        alert("提交成功！")
        console.log(resp);
      })
    },
  },
  mounted() {
    const area = getArea();
    this.areaOptions = area.children[0].children;
  },
  created() {
    let data = { userId: this.$store.state.userId };
    getBusinesstripListById(data).then((resp) => {
      this.tableData = resp.data.data;
      console.log(resp);
    });
  },
};
</script>


<style scoped>
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
</style>
