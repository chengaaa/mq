<template>
  <div class="quotation">
    <div>
      <Header class="quotation-header"></Header>
    </div>
    <div v-for="(itema, indexs) in QuotationArr" :key="indexs" scope="scope">
      <!-- <div v-for="(items, ind) in item" :key="ind"> -->

      <div class="div" v-for="(itemss, indexx) in itema" :key="indexx">
        <div class="hh" v-for="(itemsss, indexxx) in itema" :key="indexxx">
          <h1>{{itemsss.symbolName}}</h1>
          <p :class="itemsss.active ?  'active':'noactive'" >{{itemsss.ask}}</p>
          <span id="span">{{itemsss.bid}}</span>
        </div>
      </div>
      <!-- </div> -->
    </div>

    <!-- <div v-for="(item,index) in dataArr" :key="index"> -->
    <!-- <div> -->
    <!-- <div v-for="(itemb, indexa) in QuotationArr" :key="indexa"> -->

    <!-- </div> -->
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>
<style lang="scss" scoped>
.quotation {
  padding-top: 1.6rem /* 120/75 */;
  padding-left: 0.666667rem /* 50/75 */;
  .active {
    color: blue;
  }
  .noactive {
    color: brown;
  }
  .hh {
    display: flex;
    justify-content: space-around;
  }
  // p {
  //   color: red;
  // }
  .quotation-header {
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // bottom: 0;
  }
  .div {
    width: 100%;
    height: 1.066667rem /* 80/75 */;
    line-height: 1.066667rem /* 80/75 */;
    border-bottom: 1px solid black;
    font-size: 0.373333rem /* 28/75 */;
    // width: 100px;
    // height: 100px;
    // background: red;
  }
}
</style>
<script>
import Header from "../../components/Header";
import store from "../../store";
import { mapMutations } from "vuex";

// import {initWebsocket} from "../../tools/websocket.js";

export default {
  data() {
    return {
       num0 : "0",
      isActive: true,
      QuotationArr: [],
      dataArr: [],
      ws: null, //建立的连接
      lockReconnect: false, //是否真正建立连接
      timeout: 28 * 1000, //30秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null //断开 重连倒计时
    };
  },
  components: {
    Header
  },

  created() {
    this.get();
    this.initWebpack();
  },
  mounted() {},
  methods: {
    ...mapMutations(["setdataArr"]),
    ...mapMutations(["setArr"]),

    get() {
      console.log(store.state.arr);
      this.QuotationArr = JSON.parse(JSON.stringify(store.state.arr));
      //
      console.log(this.QuotationArr, "第一个数组");
    },

    initWebpack() {
      var token = store.state.Authorization.substring(7);
      console.log(token);
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
        //新连接
        that.initWebpack();
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
      this.mydata = JSON.parse(e.data).data;
      if (this.mydata) {
        var mydata = this.mydata;
        this.setdataArr(mydata);
        this.dataArr = store.state.dataArr;
        console.log(this.mydata, "实时");
        console.log(this.dataArr, "第二个数组");
        console.log(this.QuotationArr, "第三个");
        //  debugger
        for (let i = 0; i < this.QuotationArr.length; i++) {
          for (let j = 0; j < this.dataArr.length; j++) {
            var data1 = this.QuotationArr[i][0];
            var data2 = this.dataArr[j];
            if (data1.symbolName == data2.symbol) {
              data1.ask = data2.ask;
              data1.bid = data2.bid;
            }
          }
        }
      }
        // this.QuotationArr = JSON.parse(this.QuotationArr);
          console.log(this.QuotationArr,"datatat")
        // this.setdataArr(this.QuotationArr);
        console.log(store.state.arr, "lastlast")

         for (let i = 0; i < this.QuotationArr.length; i++) {
          for (let j = 0; j < this.dataArr.length; j++) {
            var sym1 = this.QuotationArr[i][0];
            console.log(sym1,"fffffffffff")
            var sym2 = this.dataArr[j];
            console.log(sym2,"eeeeeeeeeeeeeee")

            if (sym1.symbolName == sym2.symbol) {
              console.log(this.QuotationArr[i]
) 
              var ask = this.QuotationArr[i][0].ask;
              console.log(ask,"askaskaskaskask")
              if(this.num0 < ask) {
                 sym1.isActive = true;
                 console.log("nijijijiji")
              } else {
                 sym1.isActive = false;

              }
            }
              this.num0 = ask;
          }
        }
      
        
        // for (let k = 0; k < this.QuotationArr.length; k++) {
        //    for (let l =0; l < this.QuotationArr[k].length; l++) {
        //   //  console.log(this.QuotationArr[k][l],"55555555555555")

        //   console.log(this.QuotationArr[k], "2222222222222");
        //   console.log(this.QuotationArr[k][l], "111111111111");

        //   //  $(#num[k].index)
        //   // console.log(parseInt(num[k][l].ask),"88888888888888")
        //   var ask = this.QuotationArr[k][l].ask;
        //   // console.log(ask,"pppp")
        //   // console.log(this.num0,"77777777777777")
        //   if (this.num0 < ask) {
        //     // console.log(this.num0, "00000000000");
        //     // console.log(ask, "9999999999999999");
            
        //     this.isActive = '';
        //     // this.num0 = ask
        //   } else {
        //     // console.log(this.num0, "33333333");
        //     // console.log(ask, "44444444444444444");
        //     // this.isActive = true;
        //     // // this.num0 = ask;
          // }
        
          //  }
        // }
        //    this.num0 = ask;
      
         

      // console.log(this.QuotationArr, "新的数据");

      // if(this.mydata.fromID == this.states.customerId){
      //   this.mydata.chatType = 2;
      // }else{
      //   this.mydata.chatType = 1;
      // }
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
    }
  }
};
</script>