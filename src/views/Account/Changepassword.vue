<template>

  <div class="change" style=" padding-left: .32rem;text-align:center;position:absolute;bottom:50%">
   <div class="join-title">
          <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home"/>
          <h2>{{$t('m.ChangePassword')}}</h2>
    </div>
    <input
      id="one"
      @input="check"
      :type="passwords1"
      :placeholder="$t('m.Origin')"
      v-model="data.origin"
    />
    <i style="position:relative;left:-.35rem;" v-show="passwords1 === 'password'" class="iconfont icon-xiaoyanjing-bi" @click="changetype1"></i>
    <i style="position:relative;left:-.35rem;" v-show="passwords1 === 'text'" class="iconfont icon-xiaoyanjing-zheng" @click="changetype1"></i>
    <input
      id="two"
      @input="check"
      :type="passwords2"
      :placeholder="$t('m.Newpassword')"
      v-model="data.newPwd"
    />
    <i  style="position:relative;left:-.35rem;" v-show="passwords2 === 'password'" class="iconfont icon-xiaoyanjing-bi" @click="changetype2"></i>
    <i  style="position:relative;left:-.35rem;" v-show="passwords2 === 'text'" class="iconfont icon-xiaoyanjing-zheng" @click="changetype2"></i>
    <input
      id="three"
      @input="check"
      :type="passwords3"
      :placeholder="$t('m.Verifypassword')"
      v-model="data.verifyPwd"
    />
    <i  style="position:relative;left:-.35rem;" v-show="passwords3 === 'password'" class="iconfont icon-xiaoyanjing-bi" @click="changetype3"></i>
    <i  style="position:relative;left:-.35rem;" v-show="passwords3 === 'text'" class="iconfont icon-xiaoyanjing-zheng" @click="changetype3"></i>
    <div class="p">
      <!-- <div @click="finish">完成</div> -->
      <input type="button" id="mr-button" :value="$t('m.Finish')" v-show="!but" />
      <input type="button" id="mt-button" :value="$t('m.Finish')" @click="finish" v-show="but" />
    </div>
  </div>
</template>
<style lang="scss">
.change {
    
    .join-title {
       display: flex;
       align-items: center;
       height: 1.173333rem /* 88/75 */;
       h2 {
           flex:1;
           text-align: center;
               font-size: .453333rem /* 34/75 */;
        color:#333333;
       }
        #van-icon {
        width:0.1rem;
        font-size:.56rem /* 42/75 */;
    }}
  div {
    font-size: 0.48rem /* 36/75 */;
  }
  input {
    width: 8.733333rem /* 655/75 */;
    height: 1.173333rem /* 88/75 */;
    border-bottom: 1px solid #b2b2b2;
    transform: rotateZ(360deg);
    border-radius: 0px;
    appearance: none;
    // outline:black;
    font-size: 16px;
  }

  .p {
    div {
      width: 1.333333rem /* 100/75 */;
      height: 0.666667rem /* 50/75 */;
      background: turquoise;
    }
  }
}
#mt-button,
#mr-button {
  margin-top: 1.146667rem /* 86/75 */;
  margin-bottom: 0.666667rem /* 50/75 */;
  width: 8.733333rem /* 655/75 */;
  height: 1.226667rem /* 92/75 */;
  background: #127df6;
  color: white;
  border-radius: 4px;
  font-size: 0.48rem /* 36/75 */;
  appearance: none;
  border-bottom: none;
}
#mr-button {
  background: #88befa;
}
</style>

<script>
var api = require("../../api/api");
export default {
  data() {
    return {
      data: {
        origin: "",
        newPwd: "",
        verifyPwd: "",
        userId: "",
      },
      but: false,
      passwords1: "password",
      passwords2: "password",
      passwords3: "password",
    };
  },
  methods: {
        home(){
            this.$router.go(-1)
        },
    finish() {
      this.data.userId = this.$store.state.user;
      this.$http
        .post(api.changepassword, this.data, {
          headers: {
            "x-api-token": "TypwwEg8E21FlKYZ",
            "x-api-tenantid": "T002509",
            "Content-Type": "application/json",
            "cache-control": "no-cache",
          },
        })
        .then(({ data }) => {
          console.log(data, "o");
          if (data.mcode === "m0000000") {
            this.$toast(this.$t("m.Modifiedsuccess"));
            this.$router.push("/account");
          } else if (data.mcode === "PUB_AUTH_0000062") {
            this.$toast(this.$t("m.Newpass"));
          } else if (data.mcode === "PUB_AUTH_0000054") {
            this.$toast(this.$t("m.Passworderror"));
          } else if (data.mcode === "PUB_AUTH_0000051") {
            this.$toast(this.$t("m.Passwordformaterror"));
          } else if (data.mcode === "PUB_AUTH_0000055") {
            this.$toast(this.$t("m.Passworddoes"));
          } else {
            this.$toast(this.$t("m.Changefailed"));
          }
        });
    },
    check() {
      var one = document.getElementById("one").value;
      var two = document.getElementById("two").value;
      var three = document.getElementById("three").value;
      if (one != "" && two != "" && three != "") {
        this.but = true;
      } else {
        this.but = false;
      }
    },
    changetype1() {
      this.passwords1 = this.passwords1 === "password" ? "text" : "password";
    },
    changetype2() {
      this.passwords2 = this.passwords2 === "password" ? "text" : "password";
    },
    changetype3() {
      this.passwords3 = this.passwords3 === "password" ? "text" : "password";
    },
  },
};
</script>