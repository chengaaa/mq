import store from "../store";
function init() {
    var websocket;
    createWebSocket();

    /**
     * websocket启动
     */
    var token = localStorage.getItem("token")
    function createWebSocket() {
        try {
            if ('WebSocket' in window) {
                token = localStorage.getItem("token")
                websocket = new WebSocket("wss://www.bbook8.com/ws/v1/streaming?access_token=" + token.substring(7));
            }
            initing();
        } catch (e) {
            console.log('catch' + e);
            reconnect();
        }

    }

    function initing() {
        //连接成功建立的回调方法
        websocket.onopen = function (event) {
            console.log("WebSocket:已连接");
            //心跳检测重置
            heartCheck.reset().start();
        };

        //接收到消息的回调方法
        websocket.onmessage = function (event) {
            // showNotify(event.data);
            console.log("WebSocket:收到一条消息", event.data);
            heartCheck.reset().start();
            var mydata = JSON.parse(event.data).data;
            console.log(mydata, "测试一下")
            if (mydata) {
                var mydatas
                mydatas = mydata
                store.dispatch("SAVE_MYDATA", mydatas);

            }
            //   if(typeof(mydata) == undefined) {
            //       return
            //     }
            //   store.dispatch("REAET_MYDATA");
            console.log(store.state.mydata, "一二三")
        };

        //连接发生错误的回调方法
        websocket.onerror = function (event) {
            console.log("WebSocket:发生错误");
            reconnect();
        };
        //连接关闭的回调方法
        websocket.onclose = function (event) {
            console.log("WebSocket:已关闭", event);
              var token = localStorage.getItem("token")
            if (token) {
                heartCheck.reset();//心跳检测
                reconnect();

            } else {
                return
            }
        };

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            websocket.close();
        };
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
            // websocket.close();
                console.log("页面关闭")
            }
            else {
                console.log("页面呼出")
                websocket.onopen();
            }
        }),

            //关闭连接
            window.closeWebSocket = function (e) {
                console.log("退出关闭", e)
                websocket.close();
            }
        function closeWebSocket() {
            websocket.close();

        }
        //发送消息
        function send(message) {
            websocket.send(message);
        }
    }

    //避免重复连接
    var lockReconnect = false, tt;

    /**
     * websocket重连
     */
    function reconnect() {
        if (lockReconnect) {
            return;
        }
        lockReconnect = true;
        tt && clearTimeout(tt);
        tt = setTimeout(function () {
            console.log('重连中...',token);
            lockReconnect = false;
        }, 4000);
    }

    /**
     * websocket心跳检测
     */
    var heartCheck = {
        timeout: 5000,
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function () {
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function () {
            var self = this;
            this.timeoutObj && clearTimeout(this.timeoutObj);
            this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
            this.timeoutObj = setTimeout(function () {
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                this.userid = store.state.userId;
                var msg = JSON.stringify({
                    id: this.userid,
                    action: 1,
                    reqId: "BB8Ping1574840837127",
                    topic: 1
                });
                websocket.send(msg);
                var ms = JSON.stringify({
                    reqId: "BB8SubQuote1574841247958",
                    id: this.userid,
                    topic: 1,
                    action: 11
                });
                websocket.send(ms);
                console.log('ping');
                self.serverTimeoutObj = setTimeout(function () { // 如果超过一定时间还没重置，说明后端主动断开了
                    console.log('关闭服务');
                    websocket.close();//如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
                }, self.timeout)
            }, this.timeout)
        }
    };
};

















// function init () {
//   createWebSocket()
// let ws = null
// //  ws = new WebSocket( "ws://35.180.177.89:8001/v1/streaming?access_token=" + token)
// //  ws = new WebSocket("wss://www.blitzbook8.com/pubws/")
// function createWebSocket() {
//   try {
//     // var token = store.state.Authorization.substring(7);
//     ws = new WebSocket("wss://www.blitzbook8.com/ws/v1/streaming?access_token=" + store.state.Authorization.substring(7))
//     connection();
//   } catch(e) {
//     console.log('catch');
//     // token = store.state.Authorization.substring(7);
//     reconnect("wss://www.blitzbook8.com/ws/v1/streaming?access_token=" + store.state.Authorization.substring(7));
//   }
// }
// function connection() {

// ws.onopen = function() {
//     heartCheck.start()
//   // console.log(ws.readyState)

// }
//   ws.onmessage =function(e) {
//     heartCheck.start()
//     var mydata = JSON.parse(e.data).data;
//     console.log(mydata,"测试一下")
//     store.dispatch("REAET_MYDATA");
//     store.dispatch("SAVE_MYDATA", mydata);
//   }
//   ws.onclose = function(e) {
//       console.log('断开')
//       console.log(e,"home")
//       token = store.state.Authorization.substring(7);
//     reconnect("wss://www.blitzbook8.com/ws/v1/streaming?access_token=" + token);



//   ws.onerror = function() {
//       console.log('错误')
//       token = store.state.Authorization.substring(7);
//     reconnect("wss://www.blitzbook8.com/ws/v1/streaming?access_token=" + token);
//   }
// }

// }


// var heartCheck = {
//     timeout: 3000, //每隔三秒发送心跳
//     severTimeout: 5000,  //服务端超时时间
//     timeoutObj: null,
//     serverTimeoutObj: null,
//     start: function(){
//       var _this = this;
//       this.timeoutObj && clearTimeout(this.timeoutObj);
//       this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
//       this.timeoutObj = setTimeout(function(){
//             //这里发送一个心跳，后端收到后，返回一个心跳消息，
//             //onmessage拿到返回的心跳就说明连接正常
//             this.userid = store.state.userId;
//             var msg = JSON.stringify({
//                 id: this.userid,
//                 action: 1,
//                 reqId: "BB8Ping1574840837127",
//                 topic: 1
//               });
//               ws.send(msg);
//               var ms = JSON.stringify({
//                 reqId: "BB8SubQuote1574841247958",
//                 id: this.userid,
//                 topic: 1,
//                 action: 11
//               });
//               ws.send(ms);
//            // 心跳包
//             //计算答复的超时时间
//             _this.serverTimeoutObj = setTimeout(function() {
//                 ws.onclose();
//             }, _this.severTimeout);
//       }, this.timeout)
//     }
// }

// var lockReconnect = false;//避免重复连接
// function reconnect(url) {
//       if(lockReconnect) {
//         return;
//       };
//       lockReconnect = true;
//       var tt
//       //没连接上会一直重连，设置延迟避免请求过多
//       tt && clearTimeout(tt);
//       tt = setTimeout(function () {
//         createWebSocket(url);
//         lockReconnect = false;
//       }, 4000);
// }

// }
export default init
