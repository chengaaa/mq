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
    padding: 0rem /* 0/75 */;
    font-size: 0rem /* 0/75 */;
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
    top: -0.666667rem;
    left: .266667rem /* 20/75 */;
  }

  display: flex;

  justify-content: center;

  align-items: center;
  .login-A {
    background: white;
    width: 8.533333rem /* 640/75 */;
    // height: 772px;
    margin-top: .666667rem /* 50/75 */;

    border-radius: 2%;
    .login-AA {
      width: 7.626667rem /* 572/75 */;
      // height: 644px;
      // border: 1px solid black;
      margin: auto;
      // margin-top: 60px;

      .login-A1 {
        display: flex;
        justify-content: space-between;
        line-height: 2.453333rem /* 184/75 */;
        h4 {
          font-size: .8rem /* 60/75 */;
          color: #787878;
        }
        h5 {
          font-size: .426667rem /* 32/75 */;
          color: #6095f2;
        }
      }
      .login-A2 {
        .button1 input {
          font-size: .533333rem /* 40/75 */;
          text-align: center;
        }

        input {
          width: 7.626667rem /* 572/75 */;
          height: 1.466667rem /* 110/75 */;
          border: .013333rem /* 1/75 */ solid #cccccc;
          margin-bottom: .8rem /* 60/75 */;
          box-sizing: border-box;
          border-radius: 4%;
          padding-left: .373333rem /* 28/75 */;
          font-size: .373333rem /* 28/75 */;

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
            width: 3.2rem /* 240/75 */;
          }
        }
      }
      .mt-button {
         height: 1.333333rem /* 100/75 */;
  font-size: 0.4rem /* 30/75 */;
  margin-bottom: 0.333333rem /* 25/75 */;
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
