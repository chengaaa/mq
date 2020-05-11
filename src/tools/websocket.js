import store from "../store";
function init () {
let ws = null
var token = store.state.Authorization.substring(7);
console.log(token,"nengma")
//  ws = new WebSocket( "ws://35.180.177.89:8001/v1/streaming?access_token=" + token)
 ws = new WebSocket("wss://www.blitzbook8.com/ws/v1/streaming?access_token=" + token)
ws.onopen = function() {
  console.log(ws.readyState)
    this.userid = store.state.userId;
    var msg = JSON.stringify({
        id: this.userid,
        action: 1,
        reqId: "BB8Ping1574840837127",
        topic: 1
      });
      ws.send(msg);
      var ms = JSON.stringify({
        reqId: "BB8SubQuote1574841247958",
        id: this.userid,
        topic: 1,
        action: 11
      });
      ws.send(ms);
}
  ws.onmessage =function(e) {
    var mydata = JSON.parse(e.data).data;
    console.log(mydata)
    store.dispatch("REAET_MYDATA");
    store.dispatch("SAVE_MYDATA", mydata);
  }
  ws.onclose = function(e) {
      console.log('断开')
      console.log(e,"home")
  
  ws.onerror = function() {
      console.log('错误')
  }
}
}
  export default init