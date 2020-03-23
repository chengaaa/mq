<template>
  <div class="login">
    <div class="login-A">
      <div class="login-AA">
        <div class="login-logo">
          <h1>BLITZ BOOK</h1>
          <!-- <router-link to="/register"> -->
          <h5 @click="register">{{$t('m.Register')}}</h5>
          <!-- </router-link> -->
        </div>
        <div class="login-A1">
          <!-- <h4>{{$t('m.PhoneLogin')}}</h4> -->
        </div>
        <div class="login-A2">
          <div>
            <input
              type="text"
              placeholder="手机号"
              autofocus="autofocus"
              autocomplete="off"
              id="username"
              v-model="data.loginName"
          
            />
            <div id="message" class="message none"></div>
          </div>
          <div>
            <input  type="password" placeholder="密码" id="password" v-model="data.password" />
            <div id="message4" class="message none"></div>
         
          </div>
         
          <!-- <div class="button1">
            <input type="button" value="登录" />
          </div>-->

          <Button
            class="mt-button"
            @click.native="login"
            id="button"
            :disabled="btnState==false"
            :class="{btnBg:btnState}"
          >
            <!-- <div slot="login">登录</div> -->
            <div slot="login">{{$t('m.Login')}}</div>
          </Button>
        </div>
        <div class="forget">
          <a href="">{{$t('m.Forgetthepassword')}}</a>
        </div>
         <div class="qie" @click="qie">切换邮箱登录</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  display: flex;

  justify-content: center;

  align-items: center;
  .login-A {
    background: white;
    width: 8.533333rem /* 640/75 */;
    height: 10.293333rem /* 772/75 */;
    margin-top: 2rem /* 150/75 */;

    border-radius: 1%;
    .login-AA {
      width: 7.626667rem /* 572/75 */;
      height: 8.586667rem /* 644/75 */;
      // border: 1px solid black;
      margin: auto;
      // margin-top: 60px;
      .mt-button {
  height: 1.333333rem /* 100/75 */;
  font-size: 0.4rem /* 30/75 */;
  margin-bottom: 0.333333rem /* 25/75 */;
  // background: #ff6537;
  // background: rgba($color: #ff6537, $alpha: 0.4);

  margin-bottom: 0.533333rem /* 40/75 */;
  // cursor: not-allowed;
  cursor: not-allowed;
  // border-radius: 55px;
}
      
      .login-logo {
        display: flex;
        justify-content: space-between;

        h1 {
          font-size: 0.8rem /* 60/75 */;
          font-weight: 700;
          color: #ff6537;
        }
        h5 {
          font-size: 0.426667rem /* 32/75 */;
          color: #6095f2;
          position: absolute;
          top: 1.066667rem /* 80/75 */;
          right: 0.506667rem /* 38/75 */;
        }
      }

      .login-A1 {
        display: flex;
        justify-content: space-between;
        // line-height: 184px;
        line-height: 0.8rem /* 60/75 */;
        h4 {
          font-size: .4rem /* 30/75 */;
          color: #271313;
          padding-left: 0.173333rem /* 13/75 */;
        }
      }
      .login-A2 {
        margin-top: 0.933333rem /* 70/75 */;
        .button1 input {
          font-size: 0.533333rem /* 40/75 */;
          text-align: center;
        }
        input {
          border: none;
          outline: none;
          -webkit-appearance: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        input {
          width: 7.626667rem /* 572/75 */;
          height: 1.466667rem /* 110/75 */;
          // border-top: none;

          border: 0.018667rem /* 1.4/75 */ solid #cccccc;
          margin-bottom: 0.8rem /* 60/75 */;
          box-sizing: border-box;
          border-radius: 0.733333rem /* 55/75 */;
          padding-left: 0.373333rem /* 28/75 */;
          font-size: 0.373333rem /* 28/75 */;
          &:focus {
            border: 0.018667rem /* 1.4/75 */ solid #ff6537;
            outline: none;
            border-radius: 0.733333rem /* 55/75 */;
          }
        }
      }
      .forget {
        padding-left: 6rem /* 450/75 */;
        a {
          color: #6095f2;
          text-align: center;
          font-size:.32rem /* 24/75 */;
        }
      }
    }
  }
  //   .button{
  // background:#9ECB9A;
  // }
  /*button可用时的背景颜色*/
  .btnBg {
    background: #ff6537;
  }
  .qie {
    font-size: 14px;
    color:blue;
  }
}
</style>
<style lang="scss">
#message {
  color: red;
  font-size: .32rem /* 24/75 */;
  position: relative;
  top: -0.666667rem;
  left: 0.266667rem /* 20/75 */;
}
#message4 {
   color: red;
  font-size: .32rem /* 24/75 */;
  position: relative;
  top: -0.666667rem;
  left: 0.266667rem /* 20/75 */;
}
.mt-button {
  height: 1.333333rem /* 100/75 */;
  font-size: 0.4rem /* 30/75 */;
  margin-bottom: 0.333333rem /* 25/75 */;
  // background: #ff6537;
  // background: rgba($color: #ff6537, $alpha: 0.4);

  margin-bottom: 0.533333rem /* 40/75 */;
  // cursor: not-allowed;
  // cursor: not-allowed;
  // border-radius: 55px;
}
.mint-toast-text{
    font-size: 16px;
}
</style>
<script>
import Button from "../../components/Button";
import { checklogin } from "../../tools/check.js";
import { mapMutations } from "vuex";
import { baseURL1,baseURL2 } from "../../utls";
import { Toast } from "mint-ui";

// import Qs from "qs";

export default {
  data() {
    return {
      data: {
        loginName:"",
        password: ""
      },
      userId:""
    };
  },
  components: {
    Button
  },
  methods: {
    ...mapMutations(['setToken']),
    ...mapMutations(['setUserId']),
    //url2
    ...mapMutations(['setUser']),
    ...mapMutations(['delUser']),
    ...mapMutations(['setPassword']),
    register() {
   this.$router.push("/registerphone")
    },
    qie() {
   this.$router.push("/loginemail")
    },
    // ...mapMutations(["changeLogin"]),
    login() {
      // this.data = JSON.stringify(this.data);
      //  var data = Qs.stringify(this.data);
     checklogin();
      let username = document.getElementById("username")
      let password = document.getElementById("password")
      // let phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
    var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/




      if (username.value == "" || password.value == "") {
        // alert("用户名密码不能为空");
        // this.$toast({
        //   message:"用户名或密码不能为空"
        // })
        return;
      } else if (phoneNumberReg.test(username.value) === false){
             this.$toast({
          message:"请输入正确手机号"
        })
         return;
      }
      else {
       
        console.log(this.data,"55555555555")
        this.$http
          // post请求
          .post(baseURL2 + "/user/login", this.data,
           {headers: {
              "x-api-token": "TypwwEg8E21FlKYZ",
              "x-api-tenantid": "T002509",
              "Content-Type": "application/json",
              "cache-control": "no-cache"
            }}
          )
          // 监听数据返回
          .then(({ data }) => {
            console.log(data)
            // 如果登录成功
              console.log(this.data.password,"this.data.password")
            if (data.mcode === "m0000000") {
              this.delUser()
              this.userId = data.data.userId
              this.setUser(this.userId)
              this.setPassword(this.data.password)
              // console.log(data.userId,"data.userId")
              console.log("chengg")
              Toast({
                message: "登录成功",
                duration: 1500
              });

              this.$router.push('/');

            } else if(data.mcode === "PUB_AUTH_0000052"){
              console.log("meifanying")
               Toast({
                message: "用户名或密码错误",
                duration: 1500
              });
            } else if (data.mcode === "PUB_AUTH_0000017") {
               Toast({
                message: "用户名或密码错误",
                duration: 1500
              });
            }
          });
      }
      

    }
  },
  computed: {
    btnState() {
      //当用户名和密码框都不为空时btnState==true,利用这个计算属性来动态控制按钮的禁用和颜色
      return this.username !== "" && this.password !== "";
    }
  }
};
</script>
