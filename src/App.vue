<template>
  <div id="app">
    <!-- <loading v-show="LOADING"></loading> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tabbar class="tab" v-if="tabbarShow"></tabbar>
  </div>
</template>
<style lang="scss">
@import "./common/resect.scss";

body {
  font-size: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Sans Serif HelveticaNeueLT-Pro-57-Cn;
}
</style>
<script>
const Tabbar = () => import("./components/Tabbar");
const Loading = () => import("./components/Loading");
import store from "./store";
import { mapMutations, mapState } from "vuex";
import init from "./tools/websocketdemo";
var api = require("./api/api");

export default {
  data() {
    return {
      ordersList: [],
      userid: "",
      all: [],
      engs: "",
      language: "",
      CNY: null,
      USD: null,
    };
  },
  components: {
    Tabbar,
    Loading,
  },
  computed: {
    tabbarShow() {
      return this.$store.getters.getTabbarShow;
    },
  },
  created() {
    this.getuserId();
    this.homewebsocket();
    this.load();
    this.fnResize();
    this.language = navigator.language;
    console.log(this.language, "this.language");
    this.sheet();
    this.get();

    if (this.language === "zh-CN") {
      this.engs = "简体中文";
    } else if (this.language === "en-US") {
      this.engs = "ENGLISH";
    } else if (this.language === "zh-TW" || this.language === "zh-HK") {
      this.engs = "繁體中文";
    } else {
      this.engs = "简体中文";
    }
    localStorage.getItem("engs")
      ? localStorage.setItem("engs", localStorage.getItem("engs"))
      : localStorage.setItem("engs", this.engs);
    localStorage.getItem("quan")
      ? localStorage.setItem("quan", localStorage.getItem("quan"))
      : localStorage.setItem("quan", "xin");
    localStorage.getItem("transaction")
      ? localStorage.setItem("transaction", localStorage.getItem("transaction"))
      : localStorage.setItem("transaction", "new");
  },
  mounted() {
    window["Appdata"] = (res) => {
      this.Appdata(res);
    };
  },
  methods: {
    ...mapMutations(["setdataArr"]),
    ...mapMutations(["setorder"]),
    ...mapMutations(["setcontractsList"]),
    ...mapMutations(["setArr"]),
    ...mapMutations(["setActions"]),
    ...mapMutations(["setActionss"]),
    ...mapMutations(["setexchangeBTCUSD"]),
    ...mapMutations(["setexchangeETHUSD"]),
    ...mapMutations(["setexchangeBCHUSD"]),
    ...mapMutations(["setexchangeXRPUSD"]),
    ...mapMutations(["setexchangeLTCUSD"]),
    ...mapMutations(["setexchangeBSVUSD"]),
    ...mapMutations(["setexchangeEOSUSD"]),
    ...mapMutations(["setexchangeETCUSD"]),
    ...mapMutations(["setexchangeLINKUSD"]),
    ...mapMutations(["setexchangeTRXUSD"]),
    ...mapMutations(["setsymbolArr"]),
    ...mapMutations(["setOpen"]),
    Appdata(res) {
      var appdata = res;
      store.dispatch("SAVE_APPDATA", appdata);
    },
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
      let token = localStorage.getItem("token");
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
      this.$http;
      let ws2 = null;
      ws2 = new WebSocket("wss://www.bbook8.com/pubws/");
      ws2.onopen = function () {};
      ws2.onmessage = function (e) {
        var mydata2 = JSON.parse(e.data).data;
        console.log(mydata2, "是什么");
        store.dispatch("SAVE_MYDATA2", mydata2);
      };
      ws2.onclose = function (e) {
        console.log("断开");
        ws2.onerror = function () {
          console.log("错误");
        };
      };
    },
    sheet() {
      let arr1 = [{ name: "Close" }, { name: "Trade" }];
      let arr2 = [{ name: "平倉" }, { name: "交易" }];
      let arr3 = [{ name: "平仓" }, { name: "交易" }];
      console.log(this.language, "做完了");
      if (this.language === "zh-CN") {
        this.setActions(arr3);
      } else if (this.language === "en-US") {
        this.setActions(arr1);
      } else if (this.language === "zh-TW" || this.language === "zh-HK") {
        this.setActions(arr2);
      } else {
        this.setActions(arr3);
      }
      let arrs1 = [
        { name: "Delete" },
        { name: "Trade" },
        { name: "Price revision" },
      ];
      let arrs2 = [{ name: "删除" }, { name: "交易" }, , { name: "修改价位" }];
      let arrs3 = [{ name: "刪除" }, { name: "交易" }, , { name: "修改價位" }];
      if (this.language === "zh-CN") {
        this.setActionss(arrs3);
      } else if (this.language === "en-US") {
        this.setActionss(arrs1);
      } else if (this.language === "zh-TW" || this.language === "zh-HK") {
        this.setActionss(arrs2);
      } else {
        this.setActionss(arrs3);
      }
    },
    getdata3() {
      this.$http.get(api.Positionorders).then(({ data }) => {
        this.ordersList = data.data;
        var order = this.ordersList;
        console.log(this.ordersList, "333");
        for (var i = 0; i < order.length; i++) {
          if (store.state.mydata.length != 0) {
            for (var j = 0; j < store.state.mydata.length; j++) {
              var data0 = order[i];
              var data1 = store.state.mydata[j];
              if (data0.symbolName === data1.symbol) {
                order[i].ask = data1.ask;
                order[i].bid = data1.bid;
              }
            }
          } else {
            order[i].bid = "0.00";
            order[i].ask = "0.00";
          }
        }
        console.log(store.state.mydata, "store.state.mydata");
        this.setorder(order);
      });
    },
    getdata2() {
      this.$http.get(api.Positioncontracts).then(({ data }) => {
        this.contractsList = data.data;
        var contractsLists = this.contractsList;
        for (var f = 0; f < this.contractsList.length; f++) {
          if (store.state.mydata.length != 0) {
            for (var j = 0; j < store.state.mydata.length; j++) {
              var data0 = this.contractsList[f];
              var data1 = store.state.mydata[j];
              if (data0.symbolName === data1.symbol) {
                this.contractsList[f].ask = data1.ask;
                this.contractsList[f].bid = data1.bid;
              }
            }
          } else {
            this.contractsList[f].bid = "0.00";
            this.contractsList[f].ask = "0.00";
          }
        }
        this.setcontractsList(contractsLists);
      });
    },
    getdata6() {
      this.$http.get(api.MarketURL).then(({ data }) => {
        this.all = data.data;
        for (var i = 0; i < this.all.length; i++) {
          if (this.all[i].symbolName === "ETHUSD.") {
            this.all[i].img = require("./assets/images/icon_eth.png");
          }
          if (this.all[i].symbolName === "BTCUSD.") {
            this.all[i].img = require("./assets/images/icon_btc.png");
          }
          if (this.all[i].symbolName === "BCHUSD.") {
            this.all[i].img = require("./assets/images/icon_bch.png");
          }
        }
        console.log(this.all, "all");
        for (var i = 0; i < this.all.length; i++) {
          if (store.state.mydata.length != 0) {
            for (var j = 0; j < store.state.mydata.length; j++) {
              var data0 = this.all[i];
              var data1 = store.state.mydata[j];
              if (data0.symbolName === data1.symbol) {
                this.all[i].ask = data1.ask;
                this.all[i].bid = data1.bid;
              } else {
                return;
              }
            }
          } else {
            this.all[i].bid = "0.00";
            this.all[i].ask = "0.00";
          }
          this.setArr(this.all);
        }
      });
    },
    get() {
      this.$http.get(api.chart).then((data) => {
        let symbolArr = [];
        let obj = {};
        var arr = data.data;
        for (let key in arr) {
          arr[key].symbol = key;
        }
        for (let i in arr) {
          symbolArr.push(arr[i]);
        }
        symbolArr[3].imgs = require("./assets/images/icon_ltc.png");
        symbolArr[4].imgs = require("./assets/images/icon_etc.png");
        symbolArr[5].imgs = require("./assets/images/icon_xrp.png");
        symbolArr[6].imgs = require("./assets/images/icon_eos.png");
        symbolArr[7].imgs = require("./assets/images/icon_link.png");
        symbolArr[8].imgs = require("./assets/images/icon_trx.png");
        symbolArr[9].imgs = require("./assets/images/icon_bsv.png");
        for (var k = 0; k < symbolArr.length; k++) {
          if (store.state.mydata2.length != 0) {
            for (var j = 0; j < store.state.mydata2.length; j++) {
              var symData = symbolArr[k];
              var data1 = store.state.mydata2[j];
              if (symData.ask != undefined) {
                if (symData.symbol + "." === data1.symbol) {
                  symData.ask = data1.ask;
                  symData.bid = data1.bid;
                }
              } else {
                symData.ask = "0.00";
                symData.bid = "0.00";
              }
            }
          } else {
            symbolArr[k].bid = "0.00";
            symbolArr[k].ask = "0.00";
          }
        }
        var backups = symbolArr.slice(3);
        var three = symbolArr.slice(0, 3);
        this.setsymbolArr(backups);
        this.setOpen(three);
        var dataarrBCHUSD = data.data.BCHUSD;
        var dataarrBTCUSD = data.data.BTCUSD;
        var dataarrETHUSD = data.data.ETHUSD;
        var dataarrXRPUSD = data.data.XRPUSDT;
        var dataarrLTCUSD = data.data.LTCUSDT;
        var dataarrBSVUSD = data.data.BSVUSDT;
        var dataarrEOSUSD = data.data.EOSUSDT;
        var dataarrETCUSD = data.data.ETCUSDT;
        var dataarrLINKUSD = data.data.LINKUSDT;
        var dataarrTRXUSD = data.data.TRXUSDT;
        this.setexchangeBCHUSD(dataarrBCHUSD);
        this.setexchangeBTCUSD(dataarrBTCUSD);
        this.setexchangeETHUSD(dataarrETHUSD);
        this.setexchangeXRPUSD(dataarrXRPUSD);
        this.setexchangeLTCUSD(dataarrLTCUSD);
        this.setexchangeBSVUSD(dataarrBSVUSD);
        this.setexchangeEOSUSD(dataarrEOSUSD);
        this.setexchangeETCUSD(dataarrETCUSD);
        this.setexchangeLINKUSD(dataarrLINKUSD);
        this.setexchangeTRXUSD(dataarrTRXUSD);
      });
    },
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
        to.path == "/apply" ||
        to.path == "/echarts" ||
        to.path == "/envelopes" ||
        to.path == "/partnership"
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
        window.localStorage.getItem("engs")
          ? window.localStorage.setItem(
              "engs",
              window.localStorage.getItem("engs")
            )
          : window.localStorage.setItem("engs", this.engs);
      }
    },
  },
};
</script>