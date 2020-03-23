<template>
  <div class="home">
    <fixed class="position"></fixed>

    <van-swipe id="swiper" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img v-lazy="item" />
      </van-swipe-item>
    </van-swipe>

    <div class="home-btn">
      <router-link to="/loginphone">
        <div class="btn" id="login-btn">
          <a>{{$t('m.Login')}}</a>
        </div>
      </router-link>
      <router-link to="/registerphone">
        <div class="btn" id="regist-btn">
          <a href>{{$t('m.Registernow')}}</a>
        </div>
      </router-link>
    </div>
    <btch class="margin"></btch>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-top: 2rem /* 150/75 */;
  .margin {
    padding: 0.533333rem /* 40/75 */ 0rem /* 0/75 */ 1.066667rem /* 80/75 */
      0rem /* 0/75 */;
    background: white;
    height: 4rem /* 300/75 */;
    box-sizing: border-box;
  }

  img {
    width: 100%;
    display: block;
  }
  .position {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .home-btn {
    width: 100%;
    padding: 1.066667rem /* 80/75 */ 0rem /* 0/75 */;
    height: 5.333333rem /* 400/75 */;
    box-sizing: border-box;
    background: #2e2e2f;

    .btn {
      width: 6.5rem /* 575/75 */;
      height: 1.066667rem /* 80/75 */;
      background: #ff6537;
      text-align: center;
      line-height: 1.066667rem /* 80/75 */;
      margin: 0.4rem /* 30/75 */ auto;
      border-radius: 0.533333rem /* 40/75 */;
      font-size: 0.533333rem /* 40/75 */;
      border: 0.013333rem /* 1/75 */ solid white;
      a {
        color: white;
      }
    }
  }
}
</style>
<style lang="scss">
#swiper {
  .van-swipe__indicator {
    width: 0.24rem /* 18/75 */;
    height: 0.24rem /* 18/75 */;
  }
}
</style>
<script>
import Fixed from "../../components/Fixed";
import Btch from "../../components/Btch";
import Enlig from "../../components/Enlig";
import store from "../../store";
import { mapMutations } from "vuex";
import { baseURL1, baseURL2 } from "../../utls";

export default {
  data() {
    return {
      images: [
        require("../../assets/lunbo1.jpg"),
        require("../../assets/lunbo2.jpg")
      ],
      userId: "",
      data: {
        account: "",
        password: ""
      },
      accountName: "",
      word: ""
    };
  },

  created() {
    this.getaccount();
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(from);
    if (from.path === "/loginphone" || from.path === "/loginemail") {
      next(vm => {
        vm.getaccount();
      });
    }
    next();
  },

  mounted() {
    console.log(store.state.user);
  },
  components: {
    Fixed,
    Btch,
    Enlig
  },
  methods: {
    ...mapMutations(["setToken"]),
    ...mapMutations(["setUserId"]),
    ...mapMutations(["setArr"]),
    ...mapMutations(["setcontractsList"]),
    ...mapMutations(["setorder"]),


    getaccount() {
      this.userId = this.$store.state.user;
   

    
      this.$http
        .get(baseURL2 + "/user/" + this.userId + "/detail", {
          headers: {
            "x-api-token": "TypwwEg8E21FlKYZ",
            "x-api-tenantid": "T002509",
            "Content-Type": "application/json",
            "cache-control": "no-cache"
          }
        })
        .then(({ data }) => {
          console.log(data.data, "aaaaaaaaaaa");
          this.accountName = data.data.nickname;
          this.accounts = data.data.accounts[0];
          console.log(this.accounts, " this.accounts");
          if (this.accounts) {
            this.data.account = this.accounts.accountId;
            this.data.password =   this.$store.state.word
            console.log(this.data.account, this.data.password);

            this.setUserId(this.data.account);
            // this.$router.go(0)

            // this.data.password = this.$store.state.word
            this.$http
              // post请求
              .post(baseURL1 + "/login", this.$qs.stringify(this.data))
              .then(({ data }) => {
                // 如果登录成功
                if (data.code === 0) {
                  console.log(data.access_token);
                  this.setToken("Bearer" + " " + data.access_token);
                  this.getdata2();
                  this.getdata3();
                  this.getdata6();
                  this.initWebpack();

                  // } else {

                  // let hostName = this.$route.query.redirect;//获取域名
                  // // console.log(hostName)
                  // if (hostName) {
                  //      this.$router.push(hostName);

                  // this.$router.push('/');
                  // }

                  //          this.$router.replace({
                  //     path: '/transaction',
                  //     query: {
                  //         redirect: this.$router.currentRoute.fullPath
                  //     }
                  // });

                  // console.log(_this.userToken);
                }
              });
          } else {
            console.log(this.userId, "7777");
            this.word = this.$store.state.word;
            console.log(this.data.password, "ii");
            this.$http
              .post(
                baseURL2 + "/account/" + this.userId + "/open",

                {
                  vendor: "MT5",
                  serverId: "3616",
                  group: "real\\usdPME-B1",
                  leverage: 20,
                  accountName: this.accountName,
                  email: "17600765487@163.com",
                  phone: {
                    countryCode: "+86",
                    phone: "17600765487"
                  },
                  password: this.word
                },
                {
                  headers: {
                    "x-api-token": "TypwwEg8E21FlKYZ",
                    "x-api-tenantid": "T002509",
                    "Content-Type": "application/json",
                    "cache-control": "no-cache"
                  }
                }
              )
              .then(({ data }) => {
                console.log(data, "shazi");
                if (data.mcode === "m0000000") {
                  this.data.account = data.data.login;
                  this.data.password = this.word;
                   this.setUserId(this.data.account);
                  console.log(this.data.account, this.data.password);
                  this.$http
                    // post请求
                    .post(baseURL1 + "/login", this.$qs.stringify(this.data))
                    .then(({ data }) => {
                      // 如果登录成功
                      if (data.code === 0) {
                        console.log(data.access_token);
                        this.setToken("Bearer" + " " + data.access_token);
                        this.getdata2();
                        this.getdata3();
                        this.getdata6();
                        this.initWebpack();
                      }
                    });
                }
              });
          }
        });
    },
    getdata3() {
      this.$http.get(baseURL1 + "/position/orders").then(({ data }) => {
        this.ordersList = data.data;
        var order = this.ordersList;
        // console.log( this.ordersList,"111111111")
        for (var i = 0; i < order.length; i++) {
          // console.log(order[i], "iiiii");
          order[i].bid = "0.00";
          order[i].ask = "0.00";
        }

        this.setorder(order);
      });
    },
    getdata2() {
      this.$http.get(baseURL1 + "/position/contracts").then(({ data }) => {
        this.contractsList = data.data;
        var contractsLists = this.contractsList;
        for (var f = 0; f < this.contractsList.length; f++) {
          // console.log(this.contractsList[f], "fffff");
          this.contractsList[f].bid = "0.00";
          this.contractsList[f].ask = "0.00";
        }
        this.setcontractsList(contractsLists);
        //  console.log(store.state.contractsLists,"存上了")
        // this.getnewArr();
      });
    },
    getdata6() {
      this.$http.get(baseURL1 + "/market/symbols").then(({ data }) => {
        this.all = data.data;
        //  console.log(this.all,"shazi ")
        for (var i = 0; i < this.all.length; i++) {
          //  console.log(this.all[i],"zuil")
          this.all[i].bid = "0.00";
          this.all[i].ask = "0.00";
        }
        // console.log(this.all,"dahsabi")
        this.setArr(this.all);
      });
    },

    initWebpack() {
      // console.log(store.state.Authorization,"store.state.Authorization")
      var token = store.state.Authorization.substring(7);
      // console.log(token, "apptoken");
      console.log("gou");

      this.getuserId();

      this.ws = new WebSocket(
        "ws://35.180.177.89:8001/v1/streaming?access_token=" + token
        // "ws://35.180.177.89:8001/v1/streaming?access_token=" + token
        // "ws://52.209.109.96:80/ws/v1/streaming?access_token=" + token
        // "ws://www.blitzbook8.com/ws/v1/streaming?access_token=" + token
      );
      this.ws.onopen = this.onopen;
      this.ws.onmessage = this.onmessage;
      this.ws.onclose = this.onclose;
      this.ws.onerror = this.onerror;
    },
    reconnect() {
      //重新连接
      console.log("重新咯按揭");
      var that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function() {
        that.initWebpack();
        //新连接
        // that.lockReconnect = false;
      }, 5000);
    },
    reset() {
      //重置心跳
      var that = this;
      //清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      // that.start();
    },
    onopen() {
      var msg = JSON.stringify({
        id: this.userid,
        action: 1,
        reqId: "BB8Ping1574840837127",
        topic: 1
      });
      this.ws.send(msg);
      var ms = JSON.stringify({
        reqId: "BB8SubQuote1574841247958",
        id: this.userid,
        topic: 1,
        action: 11
      });
      this.ws.send(ms);

      // console.log("open");
    },
    onmessage(e) {
      // console.log("message")
      var mydata = JSON.parse(e.data).data;
      // console.log(mydata)
      store.dispatch("REAET_MYDATA");
      store.dispatch("SAVE_MYDATA", mydata);

      // this.reset();
    },
    onclose(e) {
      console.log("连接关闭");
      console.log(
        "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
      );
      this.reconnect();
    },
    onerror(e) {
      console.log("出现错误");
      //重连
      this.reconnect();
    },
    getuserId() {
      this.userid = store.state.userId;
      console.log(this.userid, " this.userid");
    }
  }
};
</script>