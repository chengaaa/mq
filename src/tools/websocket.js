import store from '../store'
export function
    initWebsocket() {
        var Websocket = null;
        //判断当前浏览器是否支持
        if (typeof (WebSocket) === "undefined") {
            alert("您的浏览器不支持socket")
        } else {
            var IP = '47.90.39.115:8001';
            console.log(store.state.Authorization)
            var token = (store.state.Authorization).substring(7);

            console.log(token);
            this.Websocket = new WebSocket("ws://" + IP + "/v1/streaming?access_token=" + token)
    
        }
        let that = this;
        this.interval = window.setInterval(function() {
          if (that.Websocket != null) {
            that.websocket.send("HeartBeat");
          }
        })
        this.websocket.onopen = function (ev) {
            console.log("WebSocket连接成功");
            // this.send("addsocket");
        }
    
    
    
    }


