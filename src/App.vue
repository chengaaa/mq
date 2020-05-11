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
  font-family:  HelveticaNeueLT-Pro-57-Cn;
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
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { baseURL1, baseURL2 } from "./utls";

export default {
  data() {
    return {
      ordersList: [],
      userid: "",
      all: [],
      
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
      console.log(deviceWidth);
    },
    getuserId() {
      this.userid = store.state.userId;
      console.log(this.userid, " this.userid");
    },
    load() {
      let token = store.state.Authorization;
      if (token) {
        // console.log(init)
        // this.onopen()
        this.initWebpack();
        this.getdata2();
        this.getdata3();
        this.getdata6();
      } else {
        return;
      }
    },
    sheet() {
      let arr = [
        { name: "Close" },
        { name: "Trade" },
        { name: "Price revision" }
      ];
      this.setActions(arr);
      let arrs = [{ name: "Delete" }, { name: "Modify" }, { name: "Trade" }];
      this.setActionss(arrs);
    },
    initWebpack() {
      this.ws = null;
      // console.log(store.state.Authorization,"store.state.Authorization")
      var token = store.state.Authorization.substring(7);
      // console.log(token, "apptoken");
      this.getuserId();
      this.ws = new WebSocket(
        // "ws://35.180.177.89:8001/v1/streaming?access_token=" + token
        // "ws://52.209.109.96:80/ws/v1/streaming?access_token=" + token
        "wss://www.blitzbook8.com/ws/v1/streaming?access_token=" + token
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
        that.lockReconnect = false;
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
      console.log(e, "app");
      // this.reconnect();
    },
    onerror(e) {
      console.log("出现错误");
      //重连
      // this.reconnect();
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