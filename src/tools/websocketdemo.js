import store from "../store";
function web() {
  // var path = basePath;
  // var jspCode = $("#userId").val();
  var websocket;
  var token = localStorage.getItem("token")
  createWebSocket();


  /**
   * websocket启动
   */
  function createWebSocket() {
    try {
      if ('WebSocket' in window) {
        token = localStorage.getItem("token")
        websocket = new WebSocket("wss://www.bbook8.com/ws/v1/streaming?access_token=" + token.substring(7));
      }
      // else if ('MozWebSocket' in window) {
      //     websocket = new MozWebSocket(("ws://" + path + "/wsCrm?jspCode=" + jspCode).replace("http", "ws").replace("https", "ws"));
      // } else {
      //     websocket = new SockJS(path + "/wsCrm/sockJs?jspCode=" + jspCode.replace("http", "ws"));
      // }
      init();
    } catch (e) {
      console.log('catch' + e);
      reconnect();
    }
  }
  function init() {
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
      var mydata = JSON.parse(event.data).data;
      console.log(mydata, "测试一下")
      if (mydata) {
        var mydatas
        mydatas = mydata
        store.dispatch("SAVE_MYDATA", mydatas);

      }
      heartCheck.reset().start();
    };

    //连接发生错误的回调方法
    websocket.onerror = function (event) {
      console.log("WebSocket:发生错误");
      reconnect();
    };

    //连接关闭的回调方法
    websocket.onclose = function (event) {
      console.log("WebSocket:已关闭");
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

    //关闭连接
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
      console.log('重连中...');
      lockReconnect = false;
      createWebSocket();
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
export default web