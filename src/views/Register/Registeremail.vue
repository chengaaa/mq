<template>
  <div class="login">
    <div class="login-A">
      <div class="login-AA">
        <div class="login-A1">
          <h4>{{$t('m.MailboxRegistration')}}</h4>
          <router-link to="/login">
            <h5>{{$t('m.Login')}}</h5>
          </router-link>
        </div>

        <div class="login-A2">
          <div>
            <input
              type="text"
              :placeholder="$t('m.enterusername')"
              id="userName"
              v-model="data.name"
            />
            <div id="messages" class="message none">{{$t('m.Pleaseenterusername')}}</div>
          </div>
          <div>
            <input type="text" :placeholder="$t('m.Email')" id="emailNumber" v-model="data.email" />
            <div id="message" class="message none">{{$t('m.Pleaseenterthecorrectemail')}}</div>
          </div>

          <div class="login-A2a">
            <div>
              <input
                type="text"
                :placeholder="$t('m.Pleaseentervalidatingcode')"
                id="rega"
                v-model="data.validateCode"
              />
              <div id="message2" class="message none">{{$t('m.Pleaseenterdigitverificationcode')}}</div>
            </div>
            <div>
              <input
                v-show="Verification"
                class="getCodeBtn"
                id="send"
                type="button"
                :value="$t('m.SendCode')"
                @click="handleClick"
              />
              <input
                v-show="!Verification"
                class="getCodeBtn"
                id="send"
                type="button"
                :value="timer + 's'"
              />
            </div>
          </div>
          <div>
            <input
              type="password"
              :placeholder="$t('m.Pleaseenterpassword')"
              id="pwd1"
              v-model="data.password"
            />
            <div id="message3" class="message none">{{$t('m.passwordTip')}}</div>
          </div>
          <!-- <div>
            <input type="text" placeholder="确认密码" id="pwd2" />
          </div>-->

          <div class="button1" :disabled="isAble" id="button">
            <!-- <input type="button" value="注册" /> -->
            <Button class="mt-button" @click.native="register">
              <!-- <div slot="login">登录</div> -->
              <div slot="login">{{$t('m.Register')}}</div>
            </Button>
          </div>
          <router-link to="/registerphone" tag="div" class="emaill">{{$t('m.Switchtomobileregistration')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  .getCodeBtn {
    background: #0066ff;
    color: white;
    text-align: center;
    padding: 0rem /* 0/75 */;
    font-size: 0rem /* 0/75 */;
    cursor: pointer;
    -webkit-appearance: none;
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
    left: 0.266667rem /* 20/75 */;
  }
  #messages {
    color: red;
    position: relative;
    top: -0.7rem;
    left: 0.266667rem /* 20/75 */;
  }
  #message2 {
    color: red;
    position: relative;
    top: -0.7rem;
    left: 0.266667rem /* 20/75 */;
  }
  #message3 {
    color: red;
    position: relative;
    top: -0.7rem;
    left: 0.266667rem /* 20/75 */;
  }

  display: flex;

  justify-content: center;

  align-items: center;
  .login-A {
    background: white;
    width: 8.533333rem /* 640/75 */;
    // height: 772px;
    margin-top: 0.666667rem /* 50/75 */;

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
          font-size: 0.533333rem /* 40/75 */;
          color: #787878;
        }
        h5 {
          font-size: 0.426667rem /* 32/75 */;
          color: #6095f2;
        }
      }
      .login-A2 {
        input {
          width: 7.626667rem /* 572/75 */;
          height: 1.466667rem /* 110/75 */;
          // border-top: none;

          border: 0.018667rem /* 1.4/75 */ solid #cccccc;
          margin-bottom: 0.8rem /* 60/75 */;
          box-sizing: border-box;
          border-radius: 0.213333rem /* 16/75 */;
          padding-left: 0.373333rem /* 28/75 */;
          font-size: 0.373333rem /* 28/75 */;
          &:focus {
            border: 0.018667rem /* 1.4/75 */ solid #ff6537;
            outline: none;
            border-radius: 0.213333rem /* 16/75 */;
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
  .emaill {
    color: royalblue;
    font-size: 0.4rem /* 30/75 */;
    // padding-left: .266667rem /* 20/75 */;
  }
}
.mint-toast-text {
  font-size: 16px;
}
.none {
  display: none;
}
</style>
<script>
const Button = ()=> import("../../components/Button");
//验证码
import { emailtimer } from "../../tools/check.js";
// import { checkPassword } from "../tools/check.js";
//注册按钮
import { checkemailUser } from "../../tools/check";
import { baseURL1, baseURL2 } from "../../utls";

// import { checkUser } from '../tools/check.js'

export default {
  data() {
    return {
      Verification: true,
      timer: 60,
      isAble: true,
      emaildata: "",

      data: {
        name: "",
        email: "",
        password: "",
        validateCode: ""
      }
    };
  },
  components: {
    Button
  },
  methods: {
    handleClick() {
      emailtimer();
      var phoneNumberReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

      if (phoneNumberReg.test(emailNumber.value) && userName.value != "") {
        this.emaildata = emailNumber.value;
        this.$http
          .post(
            baseURL2 +
              "/user/email/sendRegisterValidateCode?email=" +
              this.emaildata
            // this.$qs.stringify({email:this.emaildata}) ,
            //  JSON.stringify({email:this.emaildata}) ,
            // {
            //   headers: {
            //     "x-api-token": "TypwwEg8E21FlKYZ",
            //     "x-api-tenantid": "T002509",
            //     "Content-Type": "application/json",
            //     "cache-control": "no-cache"
            //   }
            // }
          )
          .then(({ data }) => {
            console.log(data, "data");
            if (data.mcode === "m0000000") {
             this.$toast(this.$t("m.Codesent"));
            
            } else if (data.mcode === "PUB_AUTH_0000001") {
             this.$toast(this.$t("m.Pleaseentercorrectemailaddress"));

            } else if (data.mcode === "PUB_AUTH_0000007") {
             this.$toast(this.$t("m.Ready"));
            
              
            }
          });

        this.Verification = false;
        let auth_timer = setInterval(() => {
          //定时器设置每秒递减
          this.timer--; //递减时间
          if (this.timer <= 0) {
            this.Verification = true; //60s时间结束还原v-show状态并清除定时器
            clearInterval(auth_timer);
          }
        }, 1000);
      }
    },
    //发送验证码
    // check() {
    //     console.log("fa")
    // emailtimer()
    // var phoneNumberReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

    //     if(emailNumber.value == "" || userName.value == "" || phoneNumberReg.test(emailNumber.value) === false ) {
    //         return
    //     } else  {
    //         console.log("可以了");
    //         this.emaildata = emailNumber.value
    //     this.$http
    //       .post(
    //         baseURL2 +
    //           "/user/email/sendRegisterValidateCode?email=" + this.emaildata,
    //       // this.$qs.stringify({email:this.emaildata}) ,
    //     //  JSON.stringify({email:this.emaildata}) ,
    //         // {
    //         //   headers: {
    //         //     "x-api-token": "TypwwEg8E21FlKYZ",
    //         //     "x-api-tenantid": "T002509",
    //         //     "Content-Type": "application/json",
    //         //     "cache-control": "no-cache"
    //         //   }
    //         // }
    //       )
    //       .then(({ data }) => {
    //         console.log(data, "data");
    //         if (data.mcode === "m0000000") {
    //           Toast({
    //             message: "发送成功",
    //             duration: 2000
    //           });
    //         } else if (data.mcode === "PUB_AUTH_0000001") {
    //           Toast({
    //             message: "邮箱格式错误",
    //             duration: 2000
    //           });
    //         } else if (data.mcode === "PUB_AUTH_0000007") {
    //              Toast({
    //             message: "邮箱已经被注册",
    //             duration: 2000
    //           });
    //         }
    //       });
    //   }
    // },
    //注册
    register() {
      checkemailUser();
      var phoneNumberReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

      var reg = /^\d{6}$/;
      var psw = /^.*(?=.{8,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;

      if (
        userName.value != "" &&
        phoneNumberReg.test(emailNumber.value) &&
        reg.test(rega.value) &&
        psw.test(pwd1.value)
      ) {
        this.$http
          .post(baseURL2 + "/user/email/registerWithValidateCode", this.data, {
            headers: {
              "x-api-token": "TypwwEg8E21FlKYZ",
              "x-api-tenantid": "T002509",
              "Content-Type": "application/json",
              "cache-control": "no-cache"
            }
          })
          .then(({ data }) => {
            console.log(data, "000000");
            if (data.mcode === "m0000000") {
             this.$toast(this.$t("m.Registrationsuccess"));
              this.$router.push("/login");
            } else if (data.mcode === "PUB_AUTH_0000007") {
               this.$toast(this.$t("m.Ready"));
            } else if (data.mcode === "PUB_AUTH_0000101") {
             this.$toast(this.$t("m.Verificationcodeerror"));

              
            }
          });
      }
      // if(this.a=true){
      //    console.log("发送")
      // }
    }

    // ha() {
    //   console.log("ha")
    // }
  },
  mounted() {
    // timer();
  }
};
</script>
