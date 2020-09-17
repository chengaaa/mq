<template>
  <div class="login">
    <loading v-show="LOADING"></loading>
    <div class="login-A">
      <div class="login-AA">
        <div class="header">
          <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home" />
        </div>
        <div class="login-logoo">
          <div class="login-logo">
            <h1>{{$t('m.Hello')}}，</h1>
            <p>{{$t('m.Welcometo')}} B BOOK 8</p>
            <!-- <router-link to="/register"> -->
            <!-- </router-link> -->
          </div>
        </div>
        <div class="login-A1">
          <div>
            <input
              type="text"
              :placeholder="$t('m.Mobilenumber')"
              autocomplete="off"
              id="username"
              v-model="data.loginName"
              @input="check"
            />
          </div>
          <div class="input">
            <input
              :type="passwords"
              :placeholder="$t('m.Password')"
              id="password"
              v-model="data.password"
              @input="check"
            />
            <i
              v-show="passwords === 'text'"
              class="iconfont icon-xiaoyanjing-zheng"
              @click="changetype"
            ></i>
            <i
              v-show="passwords === 'password'"
              class="iconfont icon-xiaoyanjing-bi"
              @click="changetype"
            ></i>
          </div>
          <input type="button" class="mr-button" :value="$t('m.Login')" v-show="but===true" />
          <input
            type="button"
            class="mt-button"
            :value="$t('m.Login')"
            @click="login"
            v-show="but===false"
          />
        </div>
        <div class="login-forget">
          <div class="forget">
            <span>{{$t('m.Forgetthepassword')}}</span>
          </div>
          <div>
            <span>{{$t('m.Noaccount')}}？</span>
            <span class="qie" @click="register">{{$t('m.Registernow')}}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      style="width:100%;height:100%;position:absolute;top:0;background:rgba(0,0,0,.5);"
      v-if="recode"
    >
      <div class="Recommendation">
        <div class="input">
          <input
            id="focus"
            type="text"
            v-model="referralcode"
            :placeholder="$t('m.Referral')"
            @focus="focus"
            @blur="blur"
          />
        </div>
        <div class="button">
          <button @click="close">{{$t('m.Cancellation')}}</button>
          <button @click="open">OK</button>
        </div>
      </div>
    </div>
    <div
      style="width:100%;height:100%;position:absolute;top:0;background:rgba(0,0,0,.5);"
      v-if="norecode"
    >
      <div class="Recommendation">
        <div class="inputs">
          {{$t('m.Error')}}
          <!-- <input id="focus" type="text" v-model="referralcode" :placeholder="$t('m.Referral')" @focus="focus" @blur="blur" /> -->
        </div>
        <div class="button">
          <button @click="close2">{{$t('m.Cancellation')}}</button>
          <button @click="open2">OK</button>
        </div>
      </div>
    </div>
    <!-- <a href="https://www.freeforexapi.com/api/live?pairs=USDCNY">点击吧</a> -->
  </div>
</template>
<style lang="scss" scoped>
.login {
  .login-A {
    padding-left: 0.64rem /* 48/75 */;
    .login-AA {
      .header {
        height: 1.173333rem /* 88/75 */;
        line-height: 2rem /* 150/75 */;
      }
      .login-logoo {
        display: table;
        .login-logo {
          height: 2.666667rem /* 200/75 */;
          display: table-cell;
          vertical-align: middle;
          font-size: 0.533333rem /* 40/75 */;
          h1 {
            margin-bottom: 0.32rem /* 24/75 */;
          }
          h1,
          p {
            color: #111111;
            font-weight: 700;
          }
        }
      }
      .login-A1 {
        #username,
        #password {
          width: 8.733333rem /* 655/75 */;
          height: 1.173333rem /* 88/75 */;
          border-bottom: 1px solid #eeeeee;
          border-radius: 0px;
          appearance: none;
          // outline:black;
          font-size: 0.426667rem /* 32/75 */;
        }
      }
      .login-forget {
        display: flex;
        justify-content: space-between;
        padding-right: 0.666667rem /* 50/75 */;
        font-size: 0.373333rem /* 28/75 */;

        .qie {
          color: #127df6;
          font-size: 0.4rem /* 30/75 */;
        }
      }
    }
  }
  .Recommendation {
    width: 90%;
    height: 5.333333rem /* 400/75 */;
    // border: 1px solid red;
    border-radius: 6px;
    background: white;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .input,.inputs {
      text-align: center;
      margin-top: 1.3rem;
      input {
        width: 80%;
        height: 1rem /* 75/75 */;
        text-align: center;
        border: 1px solid #cfcccc;
        font-size: 13px;
        appearance: none;
      }
    }
    .inputs {
      font-size: 20px;
    }
    .button {
      margin-top: 1.333333rem /* 100/75 */;
      text-align: right;
      // margin-left: 1.8rem /* 200/75 */;
      width: 90%;
      button {
        width: 20%;
        height: 0.8rem /* 60/75 */;
        margin-left: 0.266667rem /* 20/75 */;
        appearance: none;
        border-radius: 4px;
        font-size: 14px;
      }
      :nth-child(1) {
        background: white;
        border: 1px solid #cfcccc;
      }
      :nth-child(2) {
        background: #127df6;
        border: 1px solid #cfcccc;
        color: white;
      }
    }
  }
}
</style>
<style lang="scss">
#van-icon {
  font-size: 0.56rem /* 42/75 */;
}
.icon-xiaoyanjing-bi {
  font-size: 0.426667rem /* 32/75 */;
  position: relative;
  left: -0.266667rem;
}
.icon-xiaoyanjing-zheng {
  font-size: 0.426667rem /* 32/75 */;
  position: relative;
  left: -0.266667rem;
}
.mt-button {
  margin-top: 1.146667rem /* 86/75 */;
  margin-bottom: 0.666667rem /* 50/75 */;
  width: 8.733333rem /* 655/75 */;
  height: 1.226667rem /* 92/75 */;
  background: #127df6;
  color: white;
  font-size: 0.48rem /* 36/75 */;
  appearance: none;
  border-radius: 4px;
}
.mr-button {
  margin-top: 1.146667rem /* 86/75 */;
  margin-bottom: 0.666667rem /* 50/75 */;
  width: 8.733333rem /* 655/75 */;
  height: 1.226667rem /* 92/75 */;
  background: #88befa;
  color: white;
  font-size: 0.48rem /* 36/75 */;
  appearance: none;
  border-radius: 4px;
}
</style>
<script>
import { mapMutations, mapState } from "vuex";
import init from "../../tools/websocket";
import { getUTCtime } from "../../tools/check.js";
const Loading = () => import("../../components/Loading");
var api = require("../../api/api");
export default {
  data() {
    return {
      data: {
        loginName: "",
        password: "",
      },
      userId: "",
      passwords: "password",
      but: true,
      referralcode: "",
      useremail: "",
      recode: false,
      norecode: false,
    };
  },
  components: {
    Loading,
  },
  created() {
    this.$store.commit("hideLoading");
  },
  methods: {
    ...mapMutations(["setToken"]),
    ...mapMutations(["setUserId"]),
    //url2
    ...mapMutations(["setUser"]),
    ...mapMutations(["delUser"]),
    ...mapMutations(["setAccountName"]),
    home() {
      this.$router.push("/");
    },
    focus() {
      document.getElementById("focus").style.borderColor = "#127df6";
    },
    blur() {
      document.getElementById("focus").style.borderColor = "#cfcccc";
    },
    close() {
      this.recode = false;
    },
    close2() {
      this.norecode = false;
    },
    
    open() {
      // this.recode = false;
      this.$store.commit("showLoading");
      if (this.referralcode) {
        this.$http
          .get(api.referralcode, { params: { code: this.referralcode } })
          .then(({ data }) => {
            // console.log(data, "789123");
            if (data.result === 1) {
              this.open2();
            } else if (data.result === 0) {
              this.$store.commit("hideLoading");
              this.norecode = true;
              this.referralcode = "";
            }
          });
      } else {
        this.open2();
      }
    },
    open2() {
      this.$store.commit("showLoading");
      this.$http
        .post(api.OpenURL, {
          userId: this.userId,
          accountName: this.accountName,
          email: "17600765487@163.com",
          phone: "17600765487",
          countryCode: "+86",
          referral_code: this.referralcode,
          user_email: this.useremail,
        })
        .then(({ data }) => {
          console.log(data, "shazi");
          if (data.mcode === "m0000000") {
            this.data.account = data.data.login;
            this.setUserId(this.data.account);
            console.log(this.data.account, this.data.password);
            this.$http
              // post请求
              .post(api.Loginmt5URL, {
                account: this.data.account,
                userId: this.userId,
              })
              .then(({ data }) => {
                // 如果登录成功
                if (data.code === 0) {
                  this.$toast(this.$t("m.Loginsuccessfully"));
                  this.$store.commit("hideLoading");
                  this.$router.push("/");
                  localStorage.setItem(
                    "token",
                    "Bearer" + " " + data.access_token
                  );
                  // this.setToken("Bearer" + " " + data.access_token);
                  console.log(data.access_token);
                  init();
                }
              });
          }
        });
    },

    nihao() {
      this.$http.get("https://www.freeforexapi.com/api/live?pairs=USDCNY");
    },
    register() {
      this.$router.push("/register");
    },
    changetype() {
      this.passwords = this.passwords === "password" ? "text" : "password";
    },
    check() {
      if (this.data.loginName != "" && this.data.password != "") {
        this.but = false;
      } else {
        this.but = true;
      }
    },
    login() {
      let username = document.getElementById("username");
      let password = document.getElementById("password");
      var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
      var emailNumberReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      // var emailNumberReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (
        phoneNumberReg.test(username.value) ||
        emailNumberReg.test(username.value)
      ) {
        this.$store.commit("showLoading");
        this.$http
          // post请求
          .post(api.LoginURL, this.data, {
            headers: {
              "x-api-token": "TypwwEg8E21FlKYZ",
              "x-api-tenantid": "T002509",
              "Content-Type": "application/json",
              "cache-control": "no-cache",
            },
          })
          // 监听数据返回
          .then(({ data }) => {
            // 如果登录成功
            if (data.mcode === "m0000000") {
              this.delUser();
              this.userId = data.data.userId;
              this.setUser(this.userId);
              this.getaccount();
            } else if (data.mcode === "PUB_AUTH_0000052") {
              this.$store.commit("hideLoading");
              this.$toast(this.$t("m.Wrongusernameorpassword"));
            } else if (data.mcode === "PUB_AUTH_0000017") {
              this.$store.commit("hideLoading");
              this.$toast(this.$t("m.Wrongusernameorpassword"));
            }
          });
      } else {
        this.$toast(this.$t("m.Please"));
        return;
      }
    },
    getaccount() {
      this.$http.get(api.DeailURL + this.userId, {}).then(({ data }) => {
        this.accountName = data.data.nickname;
        this.setAccountName(this.accountName);
        this.accounts = data.data.accounts[0];
        if (data.data.email) {
          this.useremail = data.data.email;
        } else {
          this.useremail = "";
        }
        console.log(data, "ac");
        if (this.accounts) {
          this.data.account = this.accounts.accountId;
          this.setUserId(this.data.account);
          this.$http
            // post请求
            .post(api.Loginmt5URL, {
              account: this.data.account,
              userId: this.userId,
            })
            .then(({ data }) => {
              // 如果登录成功
              if (data.code === 0) {
                this.$toast(this.$t("m.Loginsuccessfully"));
                this.$store.commit("hideLoading");
                this.$router.push("/");
                localStorage.setItem(
                  "token",
                  "Bearer" + " " + data.access_token
                );
                // this.setToken("Bearer" + " " + data.access_token);
                console.log(data.access_token);
                init();
              } else {
                this.$store.commit("hideLoading");
                this.$toast(this.$t("m.Loginfailed"));
              }
            });
        } else {
          this.recode = true;
          this.$store.commit("hideLoading");
        }
      });
    },
  },
  computed: {
    ...mapState(["LOADING"]),
  },
};
</script>
