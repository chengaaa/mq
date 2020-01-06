// import store from '../store'
var ws = null;
export default {


  initWebpack() {
        var token = store.state.Authorization.substring(7);
        console.log(token, "apptoken");
         ws = new WebSocket(
            "ws://47.90.39.115:8001/v1/streaming?access_token=" + token
        );
    },
        
    
//    reconnect() {
//         //重新连接
//         var that = this;
//         if (that.lockReconnect) {
//             return;
//         }
//         that.lockReconnect = true;
//         //没连接上会一直重连，设置延迟避免请求过多
//         that.timeoutnum && clearTimeout(that.timeoutnum);
//         that.timeoutnum = setTimeout(function () {
//             that.initWebpack();
//             //新连接
//             // that.lockReconnect = false;
//         }, 10000);
//     },
//  reset() {
//         //重置心跳
//         var that = this;
//         //清除时间
//         clearTimeout(that.timeoutObj);
//         clearTimeout(that.serverTimeoutObj);
//         //重启心跳
//         // that.start();
//     },
 onopen() {
        var msg = JSON.stringify({
            id: "100111",
            action: 1,
            reqId: "BB8Ping1574840837127",
            topic: 1
        });
        var ms = JSON.stringify({
            reqId: "BB8SubQuote1574841247958",
            id: "100111",
            topic: 1,
            action: 11
        });
        ws.send(msg);
        ws.send(ms);

        console.log("open");
        // this.getNoReadRecords();
        //开启心跳
        // this.start();
    },
 onmessage(e) {
        var mydata = JSON.parse(e.data).data;
        store.dispatch("REAET_MYDATA");
        store.dispatch("SAVE_MYDATA", mydata);
        console.log(mydata, "aaaaaaaaaaaaaa")
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
        this.reconnect();},
  onerror(e) {
        console.log("出现错误");
        //重连
        this.reconnect();
    }
    // over() {
    //   this.ws.close();
    // },

}


