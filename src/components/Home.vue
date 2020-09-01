<template>
  <div>
    <div class="header">
      千名“驻县进乡”地质队员全员培训资料下载
      <div class="backstage" @click="btnclick" v-show="role==='管理员'">后台管理</div>
    </div>
    <div class="content">
      <div class="item" v-for="item in VideoList" :key="item.Id">
        <!-- <img v-if="item.Type==='ppt'||item.Type==='pptx'" class="img" src="../assets/ppt.png" alt /> -->
        <video
          v-if="item.Type !== 'ppt' || item.Type !== 'pptx'"
          class="video"
          controls="controls"
          controlslist="nodownload"
        >
          <!-- 开发 -->
          <!-- <source :src="'http://192.168.21.39:89' + item.FilePath" type="video/mp4" /> -->
          <!-- 发布 -->
          <source :src="item.FilePath" type="video/mp4" />
        </video>
        <p class="text">{{ item.Name }}</p>
        <div>
          <Button style="margin-right:20px" type="info" @click="download(item.FilePath)">下载视频</Button>
          <Button
            type="info"
            @click="download(item.PPTPath)"
            :disabled="item.PPTPath ? false : true"
          >下载PPT</Button>
        </div>
      </div>
      <!-- <img class="img" src="../assets/ppt.png" alt /> -->
    </div>
  </div>
</template>

<script>
  import { getListReq } from "../api/user";
  import { downloadVideo } from "../api/user";
  import { getCookie } from "../api/user";
  export default {
    data() {
      return {
        Name: "",
        VideoList: [],
        ID: null,
        role: "",
      };
    },
    created() {
      this.getVideoList();
      // this.onplay();
      this.getRole();
    },
    methods: {
      getVideoList() {
        getListReq({ Name: this.Name }).then((res) => {
          // console.log(res.data.data);
          this.VideoList = res.data.data;
          console.log(this.VideoList);
          if (!res.data.success) {
            this.$Message.error(res.data.errmsg);
          }
        });
      },
      download(path) {
        if (path) {
          window.open("/VideoInfo/Download?FilePath=" + path);
        } else {
          this.$Message.error("改文件不存在");
        }
        //   console.log(path);
      },
      btnclick() {
        this.$router.push("/backstage");
      },
      getRole() {
        getCookie().then((res) => {
          this.role = res.data.urole;
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .header {
    height: 40px;
    font-size: 28px;
    font-weight: 500;
    // line-height: 50px;
    color: #ffffff;
    text-align: center;
    background: url("../assets/header.png");
    .backstage {
      color: #fff;
      float: right;
      font-size: 18px;
      padding: 3px 10px;
      margin: 6px 15px 0 0;
      border-radius: 2px;
      cursor: pointer;
      background-color: #394555;
      // background-color: gray;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    padding: 0 30px;
    .item {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      .text {
        margin: 5px 0;
        font-size: 16px;
      }
      .video {
        width: 320px;
        height: 240px;
      }
      .img {
        width: 320px;
        height: 240px;
      }
    }
  }
</style>
