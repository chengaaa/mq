<template>
  <div class="login">
    <div class="login-A">
      <div class="login-AA">
        <div class="login-A1">
          <h4>注册</h4>
          <router-link to="/login">
          <h5>登录</h5>
          </router-link>
        </div>

        <div class="login-A2">
          <div>
            <input type="text" placeholder="请输入手机号" id="phoneNumber" />
            <div id="message" class="message none"></div>
          </div>

          <div class="login-A2a">
            <div>
              <input type="text" placeholder="6位验证码" id="rega" />
            </div>
            <div>
              <input class="getCodeBtn" id="send" type="button" value="发送验证码" />
            </div>
          </div>
          <div>
            <input type="text" placeholder="请输入密码" id="pwd1" />
          </div>
          <div>
            <input type="text" placeholder="确认密码" id="pwd2" />
          </div>
          <div class="button1">
            <!-- <input type="button" value="注册" /> -->
            <Button class="mt-button" @click.native="register">
              <!-- <div slot="login">登录</div> -->
              <div slot="login">注册</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.login {
  .getCodeBtn {
    background: #0066ff;
    color: white;
    text-align: center;
    padding: 0px;
    font-size: 0px;
    cursor: pointer;
  }
  .disabled {
    background: #ddd;
    border-color: #ddd;
    color: #57a3f3;
    cursor: not-allowed;
  }
  #message {
    color: red;
    position: relative;
    top: -50px;
    left: 20px;
  }

  display: flex;

  justify-content: center;

  align-items: center;
  .login-A {
    background: white;
    width: 640px;
    // height: 772px;
    margin-top: 50px;

    border-radius: 2%;
    .login-AA {
      width: 572px;
      // height: 644px;
      // border: 1px solid black;
      margin: auto;
      // margin-top: 60px;

      .login-A1 {
        display: flex;
        justify-content: space-between;
        line-height: 184px;
        h4 {
          font-size: 60px;
          color: #787878;
        }
        h5 {
          font-size: 32px;
          color: #6095f2;
        }
      }
      .login-A2 {
        .button1 input {
          font-size: 40px;
          text-align: center;
        }

        input {
          width: 572px;
          height: 110px;
          border: 1px solid #cccccc;
          margin-bottom: 60px;
          box-sizing: border-box;
          border-radius: 4%;
          padding-left: 28px;
          font-size: 28px;

          // 去除未选中状态边框
          outline: none;
          &:focus {
            border: 1px solid #3075ee;
            outline: none;
            border-radius: 2%;
          }
        }

        .login-A2a {
          display: flex;
          justify-content: space-between;
          input {
            width: 240px;
          }
        }
      }
      .mt-button {
        height: 100px;
        font-size: 30px;
        margin-bottom: 50px;
      }
    }
  }
}
</style>
<script>
import Button from "../components/Button";

import { timer } from "../tools/check.js";
import { checkPassword } from "../tools/check.js";
// import { checkUser } from '../tools/check.js'

export default {
  components: {
    Button
  },
  methods: {
    register() {
      console.log("你好");
      // checkUser()
      timer();
      checkPassword();
      this.$http
        // post请求
        .post("/admin/login", this.data)
        // 监听数据返回
        .then(({ data }) => {
          // 如果登录成功
          if (data.errno === 0) {
            // 进入首页
            this.$store.commit("udpateUsername", data.data);
          } else {
            // 提示错误
            // alert(data.msg)
            this.$alert(data.msg);
          }
        });
    }
  },
  mounted() {
    timer();
  }
};
</script>
