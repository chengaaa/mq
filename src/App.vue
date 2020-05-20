<template>
  <div id="app">
    <!-- <loading v-show="LOADING"></loading> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive "></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive  "></router-view>
    <tabbar class="tab" v-if="tabbarShow"></tabbar>
  </div>
</template>
<style lang="scss">
@import "./common/resect.scss";
@font-face {
  font-family: HelveticaNeueLT-Pro-57-Cn;
  src: url("./assets/font/Helvetica\ Neue\ Condensed\ Bold.ttf");
}
@font-face {
  font-family: Tahoma;
  src: url("./assets/font/tahoma.ttf");
}
@font-face {
  font-family: Sans Serif;
  src: url("./assets/font/Microsoft\ Sans\ Serif.ttf");
}

body {
  font-size: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Tahoma, Sans Serif, HelveticaNeueLT-Pro-57-Cn;
}
</style>
<script>
const Tabbar = () => import("./components/Tabbar");
const Loading = () => import("./components/Loading");
import store from "./store";
import { mapMutations, mapState } from "vuex";
import init from "./tools/websocket";
var api = require("./api/api");

export default {
  data() {
    return {
      ordersList: [],
      userid: "",
      all: []
    };
  },

  components: {
    Tabbar,
    Loading
  },

  computed: {
    tabbarShow() {
      return this.$store.getters.getTabbarShow;
    }
  },
  created() {
    this.sheet();
    this.getuserId();
    this.homewebsocket();
    this.load();
    this.fnResize();
    localStorage.getItem("engs")
      ? localStorage.setItem("engs", localStorage.getItem("engs"))
      : localStorage.setItem("engs", "中文");
  },
  methods: {
    ...mapMutations(["setdataArr"]),
    ...mapMutations(["setorder"]),
    ...mapMutations(["setcontractsList"]),
    ...mapMutations(["setArr"]),
    ...mapMutations(["setActions"]),
    ...mapMutations(["setActionss"]),
    fnResize() {
      var deviceWidth =
        document.documentElement.clientWidth || window.innerWidth;
      if (deviceWidth >= 750) {
        deviceWidth = 750;
      }
      if (deviceWidth <= 320) {
        deviceWidth = 320;
      }
      document.documentElement.style.fontSize = deviceWidth / 10 + "px";
      console.log("nij");
      console.log(deviceWidth, "99999");
    },
    getuserId() {
      this.userid = store.state.userId;
      console.log(this.userid, " this.userid");
    },
    load() {
      let token = store.state.Authorization;
      if (token) {
        init();
        this.getdata2();
        this.getdata3();
        this.getdata6();
      } else {
        return;
      }
    },
    //首页的websocket
    homewebsocket() {
      this.$http
        .post(api.Loginmt5, {
          account: "10000",
          password: "BLITZbook9"
        })
        .then(({ data }) => {
          if (data.code === 0) {
            var token2 = "";
            token2 = data.access_token;
            let ws2 = null;
            ws2 = new WebSocket(
              "wss://www.blitzbook8.com/ws/v1/streaming?access_token=" + token2
            );
            ws2.onopen = function() {
              console.log(ws2.readyState);
              this.userid = store.state.userId;
              var msg = JSON.stringify({
                id: 10000,
                action: 1,
                reqId: "BB8Ping1574840837127",
                topic: 1
              });
              ws2.send(msg);
              var ms = JSON.stringify({
                reqId: "BB8SubQuote1574841247958",
                id: 10000,
                topic: 1,
                action: 11
              });
              ws2.send(ms);
            };
            ws2.onmessage = function(e) {
              var mydata2 = JSON.parse(e.data).data;
              console.log(mydata2);
              store.dispatch("REAET_MYDATA2");
              store.dispatch("SAVE_MYDATA2", mydata2);
            };
            ws2.onclose = function(e) {
              console.log("断开");
              console.log(e, "home");

              ws2.onerror = function() {
                console.log("错误");
              };
            };
          }
          //  console.log(data)
        });
        

    },
    sheet() {
      let arr1 = [
        { name: "Close" },
        { name: "Trade" },
        { name: "Price revision" }
      ];
      let arr2 = [{ name: "平倉" }, { name: "交易" }, { name: "修改價位" }];
      let arr3 = [{ name: "平仓" }, { name: "交易" }, { name: "修改价位" }];
      if (localStorage.getItem("lang") === "zh-CN") {
        this.setActions(arr3);
      } else if (localStorage.getItem("lang") === "en-US") {
        this.setActions(arr1);
      } else if (localStorage.getItem("lang") === "tc-US") {
        this.setActions(arr2);
      }
      let arrs1 = [{ name: "Delete" }, { name: "Modify" }, { name: "Trade" }];
      let arrs2 = [{ name: "删除" }, { name: "修改" }, { name: "交易" }];
      let arrs3 = [{ name: "刪除" }, { name: "修改" }, { name: "交易" }];

      if (localStorage.getItem("lang") === "zh-CN") {
        this.setActionss(arrs3);
      } else if (localStorage.getItem("lang") === "en-US") {
        this.setActionss(arrs1);
      } else if (localStorage.getItem("lang") === "tc-US") {
        this.setActionss(arrs2);
      }
    },

    getdata3() {
      this.$http.get(api.Positionorders).then(({ data }) => {
        this.ordersList = data.data;
        var order = this.ordersList;
        console.log( this.ordersList,"333")
        for (var i = 0; i < order.length; i++) {
          // console.log(order[i], "iiiii");
          order[i].bid = "0.00";
          order[i].ask = "0.00";
        }
        this.setorder(order);
      });
    },
    getdata2() {
      this.$http.get(api.Positioncontracts).then(({ data }) => {
        this.contractsList = data.data;
        var contractsLists = this.contractsList;
        for (var f = 0; f < this.contractsList.length; f++) {
          console.log(this.contractsList, "222");
          this.contractsList[f].bid = "0.00";
          this.contractsList[f].ask = "0.00";
        }
        this.setcontractsList(contractsLists);
        //  console.log(store.state.contractsLists,"存上了")
        // this.getnewArr();
      });
    },
    getdata6() {
      this.$http.get(api.MarketURL).then(({ data }) => {
        this.all = data.data;
         console.log(this.all,"6666 ")
        for (var i = 0; i < this.all.length; i++) {
          //  console.log(this.all[i],"zuil")
          this.all[i].bid = "0.00";
          this.all[i].ask = "0.00";
        }

        this.setArr(this.all);
      });
    }
  },

  watch: {
    $route(to, from) {
      //判断是否显示tabbar
      // if(to.path == '/login' || to.path == '/register'){
      //   this.$store.commit('updateTabbarShow',false);
      // }else{
      //   this.$store.commit('updateTabbarShow',true);
      // }

      if (
        to.path == "/home" ||
        to.path == "/transaction" ||
        to.path == "/quotation-order" ||
        to.path == "/quotation-deail" ||
        to.path == "/account" ||
        to.path == "/language" ||
        to.path == "/apply" ||
        to.path == "/echarts"
      ) {
        this.$store.commit("updateTabbarShow", true);
      } else {
        this.$store.commit("updateTabbarShow", false);
      }
      if (to.path === "/transaction") {
        this.getdata2();
        this.getdata3();
      } else if (
        (from.path === "/login" && to.path === "/home") ||
        (from.path === "/login" && to.path === "/home")
      ) {
        window.localStorage.setItem("params", "BTCUSD.");
      }
    }
  }
};
</script>