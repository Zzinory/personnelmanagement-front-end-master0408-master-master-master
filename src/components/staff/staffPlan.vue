<template>
  <div>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column
        prop="fileUploadTime"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' },
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="fileIntro" label="标题"> </el-table-column>
      <el-table-column prop="op" label="查看文件" width="180">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)">预览文件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="previewShow"
      title="预览"
      :visible.sync="previewShow"
      append-to-body
      width="90%"
    >
      <!-- PDF显示的地方 -->
      <iframe ref="pdf" :src="previewUrl" width="100%"></iframe>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="previewShow = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import getDownloadFile from "../../api/getDownloadFile";
import getFileList from "../../api/getFileList";
export default {

  data() {
    return {
      previewShow: false,
      previewUrl: "",
      tableData: [{
        fileUploadTime: '2016-05-02',
        fileIntro:'公告详情111',
        fileName:"16d53f9a99c84ea583e595d3b66c9fce.pdf"

      }, {
        date: '2016-05-04',
       title: '公告2',
        desc:'公告详情222',
         fileName:"公告2"
      }, {
        date: '2016-05-01',
        title: '公告3',
         desc:'公告详情333',
          fileName:"公告3"
      }, {
        date: '2016-05-03',
        title: '公告4',
         desc:'公告详情444',
          fileName:"公告4"
      }]
    }
  },
  methods: {
    handleDetail(row){
      this.previewShow = true;
      this.previewUrl = "http://localhost:8888/file/download/"+row.fileName;
      this.$nextTick(() => {
        this.$refs.pdf.height = document.documentElement.clientHeight;
      })
      getDownloadFile(row.fileName).then(res=>{
        //todo res是什么格式修改一下


      })
      // this.previewUrl = "https://www.gjtool.cn/pdfh5/git.pdf";



    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  },
  created() {
    getFileList().then(resp=>{
      this.tableData=resp.data.data;
    })
  }
}
</script>

<style scoped>
</style>
