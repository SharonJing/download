<template>
  <div class="login_container">
    <!-- <div class="title">地质灾害培训平台</div> -->
    <div class="login_box">
      <!-- 表单区域 -->
      <Form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        :label-width="120"
        class="login_form"
      >
        <FormItem label="姓名" prop="Name">
          <Input v-model="loginForm.Name"></Input>
        </FormItem>
        <FormItem label="电话号码" prop="Tel">
          <Input v-model="loginForm.Tel"></Input>
        </FormItem>
        <FormItem class="btns">
          <Button type="primary" @click="login">登录</Button>
          <Button @click="loginFormReset" style="margin-left: 30px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import { loginReq } from "../api/user";
  export default {
    created() {
      let that = this;
      document.onkeypress = function (e) {
        var keycode = document.all ? event.keyCode : e.which;
        if (keycode == 13) {
          that.login(); // 登录方法名
          return false;
        }
      };
    },
    data() {
      return {
        // 这是登陆表单的验证对象
        loginForm: {
          Name: "",
          Tel: "",
        },
        // 这是表单的验证规则对象
        loginFormRules: {
          Name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10个字符", trigger: "blur" },
          ],
          Tel: [
            { required: true, message: "请输入电话号码", trigger: "blur" },
            {
              min: 6,
              max: 15,
              message: "长度在 6 到 15 个字符",
              trigger: "blur",
            },
          ],
        },
      };
    },
    methods: {
      loginFormReset() {
        this.$refs.loginFormRef.resetFields();
      },
      login() {
        loginReq({ Name: this.loginForm.Name, Tel: this.loginForm.Tel }).then(
          (res) => {
            // console.log(res);
            if (res.data.success) {
              this.$router.push({ name: "home" });
            } else {
              this.$Message.error(res.data.errmsg);
            }
          }
        );
      },
    },
  };
</script>
<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-65%, -50%);
  }
  // .title {
  //   padding-top: 150px;
  //   font-size: 35px;
  //   font-weight: 500;
  //   letter-spacing: 20px;
  //   text-align: center;
  //   color: #fff;
  // }
  .login_form {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: center;
  }
</style>
<style lang="less">
  .login_box {
    .ivu-form .ivu-form-item-label {
      color: white;
    }
  }
</style>
