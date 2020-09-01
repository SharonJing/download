<template>
  <div>
    <div class="header">
      后台管理
      <div class="quit" @click="btnExit">退出</div>
    </div>
    <div class="content">
      <div class="tabs">
        <Tabs :animated="false" v-model="tabName" @on-click="clickTabs">
          <TabPane label="登录列表" name="loginList"></TabPane>
          <TabPane label="下载列表" name="downloadList"></TabPane>
        </Tabs>
        <Input
          class="search"
          v-model="queryInfo.Name"
          placeholder="请输入搜索姓名"
          search
          enter-button="搜索"
          @on-search="search"
        />
        <Table :columns="columns1" :data="data1" border stripe></Table>
      </div>
      <div class="page">
        <Page
          :total="total"
          :current="queryInfo.PageIndex"
          :page-size="queryInfo.PageSize"
          :page-size-opts="[10,20,30,40]"
          @on-change="onChangePage"
          @on-page-size-change="onChangeSize"
          show-elevator
          show-sizer
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { getList } from "../api/user";

  export default {
    data() {
      return {
        queryInfo: {
          Name: "",
          Operation: 1,
          PageSize: 10,
          PageIndex: 1,
        },
        data1: [],
        total: 0,

        columns1: [
          {
            type: "index",
            width: 60,
            align: "center",
          },
          {
            title: "姓名",
            key: "Name",
          },
          {
            title: "电话号码",
            key: "Tel",
          },
          {
            title: "操作类型",
            key: "OperationName",
          },
          {
            title: "操作时间",
            key: "OperationDate",
          },
          {
            title: "操作文件",
            key: "Remark",
          },
        ],
      };
    },
    created() {
      this.tabName = "loginList";
      this.clickTabs("loginList");
    },
    methods: {
      clickTabs(name) {
        if (name === "loginList") {
          this.queryInfo.Operation = 1;
        } else {
          this.queryInfo.Operation = 2;
        }
        this.queryInfo.Name = "";
        this.getList();
      },
      getList() {
        getList({ ...this.queryInfo }).then((res) => {
          console.log(res);
          this.data1 = res.data.data.data;
          this.total = res.data.data.count;
          console.log(this.total);
        });
      },
      search() {
        this.getList();
      },
      onChangePage(newpage) {
        this.queryInfo.PageIndex = newpage;
        this.getList();
      },
      onChangeSize(newsize) {
        this.queryInfo.PageSize = newsize;
        this.getList();
      },
      getRole() {
        getCookie().then((res) => {
          this.role = res.data.urole;
        });
      },
      btnExit() {
        this.$router.push("/home");
      },
    },
  };
</script>

<style lang="less" scoped>
  .header {
    font-size: 28px;
    font-weight: 500;
    color: #ffffff;
    // padding: 10px 0 10px 30px;
    text-align: center;
    background-color: #1e2b51;
    padding: 5px 0;
  }
  .page {
    margin: 20px 0;
    text-align: center;
    // transform: translateX(50%);
  }
  .search {
    width: 30%;
    margin: 10px 0;
  }
  .quit {
    float: right;
    font-size: 18px;
    margin: 10px 40px 10px 10px;
    cursor: pointer;
  }
</style>
