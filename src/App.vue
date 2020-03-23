<template>
  <div id="app">
    <!-- <loading v-show="LOADING"></loading> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive "></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive  "></router-view>
    <!-- <router-view v-if="isRouterAlive"></router-view> -->

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
}
// .tab {
//  height: 1.493333rem /* 112/75 */;
//     font-size: 0.32rem /* 24/75 */;


// }
</style>
<script>
import Tabbar from "./components/Tabbar";
import Loading from "./components/Loading";
import store from "./store";
import { mapMutations } from "vuex";
import {mapState} from 'vuex';
import { baseURL1,baseURL2 } from "./utls";

export default {
  data() {
    return {
      ordersList: [],
      userid:"",
      all:[],
 
      
      
    };
  },
  
  components: {
    Tabbar,
    Loading
  },
 
  computed: {
    tabbarShow() {
      return this.$store.getters.getTabbarShow;
    },
     
  },
  created() {
    // this.initWebpack();
    this.getdata2()
    this.getdata3()
    this.getuserId()


  },
  mounted() {

  },
 
  
  

  methods: {
    ...mapMutations(["setdataArr"]),
    ...mapMutations(["setorder"]),
    ...mapMutations(["setcontractsList"]),
    ...mapMutations(["setArr"]),
    getuserId() {
      this.userid = store.state.userId
      console.log(this.userid," this.userid")
    },
 

    
    initWebpack() { 
      // console.log(store.state.Authorization,"store.state.Authorization")
      var token = store.state.Authorization.substring(7);
      // console.log(token, "apptoken");
   

    this.getuserId()
    

   
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
      console.log("重新咯按揭")
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
        var contractsLists = this.contractsList
        for (var f = 0; f < this.contractsList.length; f++) {
          // console.log(this.contractsList[f], "fffff");
          this.contractsList[f].bid = "0.00";
          this.contractsList[f].ask = "0.00";
        }
       this.setcontractsList(contractsLists)
      //  console.log(store.state.contractsLists,"存上了")
        // this.getnewArr();
      });
    },
    
   
    haha() {
      
    }

  },
  // watch: {
  //    $route (to, from) {

  //     console.log(to.path);
  //     if(val.path === "/transaction") {
  //       console.log("101")
  //       this.getdata2()
  //       this.getdata3()

  //     }else if (oldVal.path === "/login") {
  //          this.initWebpack();
  //          console.log(oldVal.path,"oldVal.path")
          
  //     }
  //   }
  // //   // 深度观察监听
  // //   deep: true
  
  // },


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
        to.path == "/apply"
         
        // to.path == "/transaction-place"
      ) {
        this.$store.commit("updateTabbarShow", true);
      } else {
        this.$store.commit("updateTabbarShow", false);
      }
    if(to.path === "/transaction") {
        this.getdata2()
         this.getdata3()
    } else if((from.path === "/loginphone" && to.path === "/home") || (from.path === "/loginemail" && to.path === "/home")) {
      console.log(from.path,"from.path")
      console.log(to.path,"to.path")
      //  window.history.go(0) 
       location.reload()
        this.initWebpack();

        
      
      window.localStorage.setItem("params", "BTCUSD.")
      


    } 
    }
}
};
</script>