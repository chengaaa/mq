<template>
  <div class="login">
    <!-- <loading v-show="LOADING"></loading> -->

    <div class="login-A">
      <div class="login-AA">
        <div class="header">
          <van-icon name="arrow-left" color="#c9c9c9" id="van-icon" @click="home" />
        </div>
        <div class="login-logoo">
          <div class="login-logo">
            <h1>{{$t('m.Hello')}}，</h1>
            <p>{{$t('m.Welcometoregister')}} B BOOK 8</p>
          </div>
        </div>

        <div class="login-A1">
          <div>
            <input
              type="text"
              :placeholder="$t('m.Mobilenumber')"
              autocomplete="off"
              id="username"
              v-model="data.registerName"
              @input="check"
            />
          </div>
          <div class="passwordcode">
            <input
              type="number"
              :placeholder="$t('m.Pleaseentervalidatingcode')"
              id="code"
              v-model="data.code"
              @input="check"
            />
            <span class="code" v-show="Verification" @click="handleClick">{{$t('m.SendCode')}}</span>
            <span class="code" v-show="!Verification">{{timer}}s</span>
          </div>

          <!-- <input type="button" class="mr-button" :value="$t('m.Next')" v-show="but===true" />
          <input
            type="button"
            class="mt-button"
            :value="$t('m.Next')"
            @click="next"
            v-show="but===false"
          />-->

          <input
            type="text"
            :placeholder="$t('m.Pleaseenterusername')"
            id="user"
            v-model="datas.name"
            @input="check"
          />
           <input
            type="text"
            :placeholder="$t('m.Referral')"
            id="refelcode"
            v-model="datas.referral_code"
            @input="check"
          />
            <!-- <input
           style="marginTop:10px"
            type="text"
            placeholder="请输入推荐码(非必填)"
            id="user"
            v-model="datas.recommend_code"
            
          /> -->

          <input
            :type="passwords"
            :placeholder="$t('m.Password')"
            autocomplete="off"
            id="password"
            v-model="datas.password"
            @input="check"
          />
          <i v-show="passwords === 'password'" class="iconfont icon-xiaoyanjing-bi" @click="changetype"></i>
          <i v-show="passwords === 'text'" class="iconfont icon-xiaoyanjing-zheng" @click="changetype"></i>
           <p>{{$t('m.passwordTip')}}</p>
          <!-- <input
            :type="passwords2"
            :placeholder="$t('m.Passwordagain')"
            id="passwordagain"
            @keyup="check"
          />
          <i class="iconfont icon-xiaoyanjing-bi" @click="changetype2"></i> -->
         
        </div>
      </div>
      <input type="button" class="mr-button" :value="$t('m.Finish')" v-show="but===true" />
      <input
        type="button"
        class="mt-button"
        :value="$t('m.Finish')"
        @click="finish"
        v-show="but===false"
      />

      <div class="login-forget">
        <div>
          <span style="color:#c9c9c9">{{$t('m.Existingaccount')}}？</span>
          <span class="qie" @click="login">{{$t('m.Signinnow')}}</span>
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
  </div>
</template>
<style lang="scss" scoped>
.login {
  background: #262626;
  position: fixed;
  width: 100%;
  height: 100%;
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
            color: #c9c9c9;
            font-weight: 700;
          }
        }
      }
      .login-A1 {
       
        #username,
        #password,
        #passwordagain,
        #user,#refelcode{
          width: 8.733333rem /* 655/75 */;
          height: 1.173333rem /* 88/75 */;
          border-bottom: 1px solid #c9c9c9;
          transform: rotateZ(360deg);
          border-radius: 0px;
          appearance: none;
          // outline:black;
          font-size: 16px;
          background: #262626;
          color: #c9c9c9;
        }
        #code {
          font-size: 16px;
          background: #262626;
          color: #c9c9c9;
        }
        
         #username::placeholder{
           color: #c9c9c9;

         }
         #password::placeholder{
           color: #c9c9c9;
           
         }
         #passwordagain::placeholder{
           color: #c9c9c9;
           
         }
          #user::placeholder{
           color: #c9c9c9;
           
         }
          #refelcode::placeholder{
           color: #c9c9c9;
           
         }
          #code::placeholder{
           color: #c9c9c9;
           
         }
       
        p {
          color: red;
          padding-top: .133333rem /* 10/75 */;
          font-size: 14px;
        }
        .passwordcode {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #c9c9c9;
          font-size: 0.346667rem /* 26/75 */;

          margin-right: 0.64rem /* 48/75 */;
          #code {
            width: 8.733333rem /* 655/75 */;
            height: 1.173333rem /* 88/75 */;
          }

          span {
            font-size: 0.346667rem /* 26/75 */;
            color: #127df6;
            position: relative;
            left: 0.32rem /* 24/75 */;
            width: 2.666667rem /* 200/75 */;
          }
          input::-webkit-input-placeholder {
            /* placeholder颜色  */
            // color: #127df6;
          }
          
        }
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
  border-radius: 4px;
  font-size: 0.48rem /* 36/75 */;
  appearance: none;
}
.mr-button {
  margin-top: .746667rem /* 56/75 */;
  margin-bottom: 0.666667rem /* 50/75 */;
  width: 8.733333rem /* 655/75 */;
  height: 1.226667rem /* 92/75 */;
  background: #88befa;
  color: white;
  border-radius: 4px;
  font-size: 0.48rem /* 36/75 */;
  appearance: none;
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
</style>
<script>
const Loading = () => import("../../components/Loading");
var api = require("../../api/api")
export default {
  data() {
    return {
      norecode:false,
      data: {
        registerName: "",
        code: ""
      },
      datas: {
        name: "",
        password: "",
        phone: "",
        email: "",
        validateCode: "",
        referral_code:""
      },
      passwords: "password",
      passwords2: "password",
      but: true,
      Verification: true,
      timer: 60,
      a:true
    };
  },
  components: {
    Loading
  },
  created() {
    this.$store.commit("hideLoading");
  },
  methods: {
    home() {
      this.$router.go(-1);
    },
    login() {
      this.$router.push("/login");
    },
    changetype() {
      this.passwords = this.passwords === "password" ? "text" : "password";
    },
    changetype2() {
      this.passwords2 = this.passwords2 === "password" ? "text" : "password";
    },
    check() {
      var user = document.getElementById("user").value;
      var password = document.getElementById("password").value;
      // var passwordagain = document.getElementById("passwordagain").value;

      var reg = /^\d{6}$/;
      var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
      var emailNumberReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  
      if (
        phoneNumberReg.test(this.data.registerName) &&
        reg.test(this.data.code) &&
        password != "" &&
        // passwordagain != "" &&
        user != ""
      ) {
        this.but = false;
        this.datas.email = "";
        this.datas.phone = this.data.registerName;
      } else if (
        emailNumberReg.test(this.data.registerName) &&
        reg.test(this.data.code) &&
        password != "" &&
        // passwordagain != "" &&
        user != ""
      ) {
        this.but = false;
        this.datas.phone = "";

        this.datas.email = this.data.registerName;
      } else {
        this.but = true;
      }
    },

    handleClick() {
      var username = document.getElementById("username").value;
      var code = document.getElementById("code").value;
      var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
      var emailNumberReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (phoneNumberReg.test(username)) {
        this.$http
          .post(api.CodeURL, {
            email: "",
            phone: this.data.registerName
          })
          .then(({ data }) => {
            if (data.mcode === "m0000000") {
              this.$toast(this.$t("m.Codesent"));
            } else if (data.mcode === "PUB_AUTH_0000008") {
              this.$toast(this.$t("m.Mobilenumberhasbeenregistered"));
            }
          });

        this.Verification = false;
        let auth_timer = setInterval(() => {
          //定时器设置每秒递减
          this.timer--; //递减时间
          if (this.timer <= 0) {
            this.Verification = true; //60s时间结束还原v-show状态并清除定时器
           this.timer = 60
           clearInterval(auth_timer);
          }
        }, 1000);
      } else if (emailNumberReg.test(username)) {
        this.$http
          .post(api.CodeURL, {
            email: this.data.registerName,
            phone: ""
          })
          .then(({ data }) => {
            if (data.mcode === "m0000000") {
              this.$toast(this.$t("m.Codesent"));
            } else if (data.mcode === "PUB_AUTH_0000008") {
              this.$toast(this.$t("m.Mobilenumberhasbeenregistered"));
            } else if(data.mcode === "PUB_AUTH_0000001") {
              this.$toast(this.$t("m.Pleaseentercorrectemailaddress"))
              //邮箱格式错误
            }
          });

        this.Verification = false;
        let auth_timer = setInterval(() => {
          //定时器设置每秒递减
          this.timer--; //递减时间
          if (this.timer <= 0) {
            this.Verification = true; //60s时间结束还原v-show状态并清除定时器
           this.timer = 60
            clearInterval(auth_timer);
          }
        }, 1000);
      } else if(this.a === true){
        this.$toast(this.$t("m.Please"));
        this.a = false
        setTimeout(()=>{
        this.a = true
       
        },1000)
      } 
      
    },


    finish() {
       if (this.datas.referral_code) {
        this.$http
          .get(api.referralcode, { params: { code: this.datas.referral_code } })
          .then(({ data }) => {
            if (data.result === 1) {
              this.open2();
            } else if (data.result === 0) {
              this.norecode = true;
              this.datas.referral_code = "";
            }
          });
          

      } else {
        this.datas.referral_code = ""
              this.open2();

      }

    
      // }
    },
    open2() {
        this.datas.validateCode = this.data.code;
      var password = document.getElementById("password").value;
      // var passwordagain = document.getElementById("passwordagain").value;
      // if (password != passwordagain) {
      //   this.$toast(this.$t("m.Passwordsareinconsistent"));
      // } else {
      this.$store.commit("showLoading");
        this.$http
          .post(api.Registetest, this.datas, {
            headers: {
              "x-api-token": "TypwwEg8E21FlKYZ",
              "x-api-tenantid": "T002509",
              "Content-Type": "application/json",
              "cache-control": "no-cache"
            }
          })
          .then(({ data }) => {
            if (data.mcode === "m0000000") {
              this.$toast(this.$t("m.Registrationsuccess"));
              this.$router.push("/login");
            } else if (data.mcode === "PUB_AUTH_0000008") {
              this.$toast(this.$t("m.Mobilenumberhasbeenregistered"));
            } else if (data.mcode === "PUB_AUTH_0000101") {
              this.$toast(this.$t("m.Verificationcodeerror"));
            } else if (data.mcode === "PUB_AUTH_0000007") {
              this.$toast(this.$t("m.Ready"));
            } else if(data.mcode === "PUB_AUTH_0000051") {
              // this.$toast(this.$t("m.Passwordformaterror"))
              this.$toast(this.$t("m.Passwordformaterror"))
              
            } else if(data.mcode === "PUB_AUTH_0000106") {
              this.$toast(this.$t("m.Three"))
              //输入错误超过3次，请重新获取验证码
               
            }
          });

    },
     close2() {
      this.norecode = false;
    },
    next() {
      this.$router.push({ name: "registerpassword", params: this.data });
    },

  }
};
</script>
