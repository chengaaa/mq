<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <tabbar v-if="tabbarShow"></tabbar>
  </div>
</template>
<style lang="scss">
@import "./common/resect.scss";
* {
  margin: 0;
  padding: 0;
}
</style>
<script>
import Tabbar from "./components/Tabbar";
import store from "./store";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      ordersList: []
    };
  },
  components: {
    Tabbar
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
        to.path == "/quotation" ||
        to.path == "/history" ||
        to.path == "/account" ||
        to.path == "/language" ||
        to.path == "/transaction-place"
      ) {
        this.$store.commit("updateTabbarShow", true);
      } else {
        this.$store.commit("updateTabbarShow", false);
      }
    }
  },
  computed: {
    tabbarShow() {
      return this.$store.getters.getTabbarShow;
    }
  },
  created() {
    this.initWebpack();
    this.getdata3();
  },
  methods: {
    ...mapMutations(["setdataArr"]),
    ...mapMutations(["setorder"]),
    initWebpack() {
      var token = store.state.Authorization.substring(7);
      console.log(token, "apptoken");
      this.ws = new WebSocket(
        "ws://47.90.39.115:8001/v1/streaming?access_token=" + token
      );
      this.ws.onopen = this.onopen;
      this.ws.onmessage = this.onmessage;
      this.ws.onclose = this.onclose;
      this.ws.onerror = this.onerror;
    },
    reconnect() {
      //重新连接
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
      }, 10000);
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
    //   start(){//开启心跳
    //     var self = this;
    //     self.timeoutObj && clearTimeout(self.timeoutObj);
    //     self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
    //     self.timeoutObj = setTimeout(function(){
    //       //这里发送一个心跳，后端收到后，返回一个心跳消息，
    //     //   if (self.ws.readyState == 1) {//如果连接正常
    //       var msg = JSON.stringify({"reqId":"BB8SubQuote1574841247958","id":"100111","topic":1,"action":11})
    //         this.ws.send(msg);
    //     //   }else{//否则重连
    //         // self.reconnect(msg);
    //     //   }
    //       self.serverTimeoutObj = setTimeout(function() {
    //         //超时关闭
    //         self.ws.close();
    //       }, self.timeout);

    //     }, self.timeout)
    //   },
    onopen() {
      var msg = JSON.stringify({
        id: "100111",
        action: 1,
        reqId: "BB8Ping1574840837127",
        topic: 1
      });
      this.ws.send(msg);
      var ms = JSON.stringify({
        reqId: "BB8SubQuote1574841247958",
        id: "100111",
        topic: 1,
        action: 11
      });
      this.ws.send(ms);

      console.log("open");
      // this.getNoReadRecords();
      //开启心跳
      // this.start();
    },
    onmessage(e) {
      var mydata = JSON.parse(e.data).data;
      store.dispatch("REAET_MYDATA");
      store.dispatch("SAVE_MYDATA", mydata);
      // console.log(mydata,"aaaaaaaaaaaaaa")

      // if (this.mydata) {
      //   console.log(mydata);
      //   this.setdataArr(mydata);
      //   this.dataArr = store.state.dataArr;
      // console.log(this.dataArr,"shishihsishishih")
      // console.log(this.mydata, "实时");
      // console.log(this.dataArr, "第二个数组");
      // console.log(this.QuotationArr, "第三个");
      //  debugger
      //   for (let i = 0; i < this.QuotationArr.length; i++) {
      //     for (let j = 0; j < this.dataArr.length; j++) {
      //       var data1 = this.QuotationArr[i][0];
      //       var data2 = this.dataArr[j];
      //       if (data1.symbolName == data2.symbol) {
      //         data1.ask = data2.ask;
      //         data1.bid = data2.bid;
      //       }
      //     }
      //   }
      // }
      // this.QuotationArr = JSON.parse(this.QuotationArr);

      // this.setdataArr(this.QuotationArr);

      // for (let i = 0; i < this.QuotationArr.length; i++) {
      //   for (let j = 0; j < this.dataArr.length; j++) {
      //     var sym1 = this.QuotationArr[i][0];
      //     var sym2 = this.dataArr[j];

      //     if (sym1.symbolName == sym2.symbol) {
      //       console.log(this.QuotationArr[i]);
      //       var ask = this.QuotationArr[i][0].ask;
      //       // console.log(ask,"askaskaskaskask")
      //       if (this.num0 < ask) {
      //         document.getElementById(sym1.symbolName).style.color = "blue";
      //       } else if (this.num0 > ask) {
      //         document.getElementById(sym1.symbolName).style.color = "red";
      //       }
      //else{
      //     document.getElementById(sym1.symbolName).style.color="red";
      // }
      //       this.num0 = ask;
      //     }
      //     //bid
      //     if (sym1.symbolName == sym2.symbol) {
      //       var bid = this.QuotationArr[i][0].bid;
      //       if (this.num1 < bid) {
      //         document.getElementById(sym1.path).style.color = "blue";
      //       } else if (this.num1 > bid) {
      //         document.getElementById(sym1.path).style.color = "red";
      //       }
      //       //else{
      //       //     document.getElementById(sym1.symbolName).style.color="red";
      //       // }
      //       this.num1 = bid;
      //     }
      //   }
      // }

      // if(this.mydata.fromID == this.states.customerId){
      //   this.mydata.chatType = 2;
      // }else{
      //   this.mydata.chatType = 1;
      //  }
      // var content =this.getContentTypes(this.mydata.content,this.mydata.chatType);
      // this.records.push(this.mydata);
      //收到服务器信息，心跳重置
      this.reset();
    },
    onclose(e) {
      console.log("连接关闭");
      console.log(
        "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
      );
      // var msg = JSON.stringify({cmd: 'out_chatting', token:this.COOKIE.getCookie("token")});
      // this.ws.send(msg);
      //重连
      this.reconnect();
    },
    onerror(e) {
      console.log("出现错误");
      //重连
      this.reconnect();
    },
    over() {
      this.ws.close();
    },
    getdata3() {
      this.$http.get("/position/orders").then(({ data }) => {
        this.ordersList = data.data;
        var order = this.ordersList;
        console.log( this.ordersList,"111111111")
        for (var i = 0; i < order.length; i++) {
          console.log(order[i], "iiiii");
          order[i].bid = "0.00";
          order[i].ask = "0.00";
        }

        this.setorder(order);
      });
    }
  }
};
</script>