<template>
  <div class="transactionplace">
    <div class="transactionplace-a">
      <van-icon id="van-icon" name="arrow-left" color="blue" @click="back" />
      <div class="tab">
        <h3 @click="all" v-show="headerName">{{headerName}}</h3>
        <!-- <h3 @click="all" v-else>ETHUSD</h3> -->
        <!-- <h3 @click="all" v-for="header in headerName" :key="header.symbol">{{header.symbol}}</h3> -->
        <i class="iconfont">&#xe60d;</i>
      </div>
    </div>
    <div class="transactionplace-list">
      <div v-for="item in datalists" :key="item.symbol" v-show="listmodify">
        <div v-show="item.symbol== headerName && item.orderID === orderID" class="modify" >
          <p>{{$t('m.Modify')}} #{{item.orderID}}</p>
          <span v-show="item.orderDirection === 1 && item.orderType === 7">Buy Limit {{item.volume}}</span>
          <span v-show="item.orderDirection === -1 && item.orderType === 7">Sell Limit {{item.volume}}</span>
          <span v-show="item.orderDirection === 1 && item.orderType === 9">Buy Stop {{item.volume}}</span>
          <span v-show="item.orderDirection === -1 && item.orderType === 9">Sell Stop {{item.volume}}</span>
          <!-- <h5>{{item.symbol}}</h5> -->
        </div>
      </div>

      <h4 @click="show" v-show="fanren">{{unitName}}</h4>
      <ul v-for="(item,index) in lists" :key="index">
        <li
          v-show="isShow"
          @click.stop="select(item, index)"
          :class="item.id === '4'? 'active': ''"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="transactionplace-c" v-show="modify">
      <span @click="reduce">-0.1</span>
      <span @click="cut">-0.01</span>
      <!-- <p>{{this.num.toFixed(2)}}</p> -->
      <!-- <input type="num" :value="this.num.toFixed(2)" /> -->
      <input type="num" @input="la()" id="number1" :value="num" />
      <span @click="add">+0.01</span>
      <span @click="raise">+0.1</span>
    </div>
    <!-- <div class="transactionplace-name"> -->
    <!-- <div class="transactionplace-name1"></div> -->
    <!-- <div class="transactionplace-name2"> -->
    <!-- <input :value="num * contractSize"> -->
    <!-- <input type="num" @input="lb()" id="number2" placeholder="请输入" /> -->
    <!-- <h6>{{headerName.substring(0,3)}}</h6> -->
    <!-- </div> -->

    <!-- </div> -->
    <div class="transactionplace-d">
       <h6>{{$t('m.Price')}}</h6>
      <div class="flex-1">
        <input type="text" v-model="num3" :placeholder="$t('m.Noset')" />
        <span @click="price" class="border">-</span>
        <span @click="priceadd">+</span>
      </div>
    </div>
    <div class="transactionplace-d">
      <h6>止损</h6>
      <div class="flex-1">
        <input type="text" v-model="num1" placeholder="没有设置" />
        <span @click="numreduce" class="border">-</span>
        <span @click="numadd">+</span>
      </div>
    </div>
    <div class="transactionplace-d">
      <h6>获利</h6>
      <div class="flex-1">
        <input type="text" v-model="num2" placeholder="没有设置" />

        <span @click="jianshao" class="border">-</span>
        <span @click="zengjia">+</span>
      </div>
    </div>
    <!-- <div class="transactionplace-cd" @click=" showPicker= true">
      <p>期限</p>
      <span>直到取消</span>

    </div>-->
    <van-field
      id="transactionplace-cd"
      readonly
      clickable
      label="期限"
      :value="value"
      @click="showPicker = true"
      v-show="term"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <!-- <div class="transactionplace-e" v-for="(item,index) in newdata1" :key="index"> -->
    <div class="transactionplace-e">
      <div v-for="(items,indexs) in newdata1" :key="indexs" class="box">
        <div class="math" v-show="items.symbolName === headerName">
          <h2>{{parseFloat(items.bid).toFixed(2).substring(0,parseFloat(items.bid).toFixed(2).indexOf(".")+1)}}</h2>
          <span>{{parseFloat(items.bid).toFixed(2).substring(parseFloat(items.bid).toFixed(2).indexOf(".")+1,parseFloat(items.bid).toFixed(2).indexOf(".")+2)}}</span>
          <h6>{{parseFloat(items.bid).toFixed(2).substring(parseFloat(items.bid).toFixed(2).indexOf(".")+2)}}</h6>
        </div>
        <div class="math" v-show="items.symbolName === headerName">
          <h2>{{parseFloat(items.ask).toFixed(2).substring(0,parseFloat(items.ask).toFixed(2).indexOf(".")+1)}}</h2>
          <span>{{parseFloat(items.ask).toFixed(2).substring(parseFloat(items.ask).toFixed(2).indexOf(".")+1,parseFloat(items.ask).toFixed(2).indexOf(".")+2)}}</span>
          <h6>{{parseFloat(items.ask).toFixed(2).substring(parseFloat(items.ask).toFixed(2).indexOf(".")+2)}}</h6>
        </div>
      </div>
    </div>
    <!-- <div class="transactionplace-f" v-show="button">
      <div @click="sell">Sell by Market</div>
      <p @click="buy">Buy by Market</p>
    </div>
    <div class="transactionplace-g" v-show="order">
      <p @click="placeorder">下单</p>
    </div> -->
    <div class="transactionplace-l">
      <p @click="modifies">{{$t('m.Modify')}}</p>
    </div>
    <!-- <van-datetime-picker
    position="bottom"
     :formatter="formatter"
      cancel-button-text="取消"
      confirm-button-text="确认"
      @cancel="datePicker = false"
      v-show="datePicker"
      v-model="currentDate"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onCon"
    />-->
    <van-popup v-model="datePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onCon"
        @cancel="datePicker = false"
      />
    </van-popup>
  </div>
</template>
<style lang="scss" >
.blue {
  color: blue;
}
.red {
  color: red;
}
.modify {
  display: flex;
  justify-content: center;
  height: 1.066667rem /* 80/75 */;
  border-bottom: 1px solid #c9c9cb;
  border-top: 1px solid #c9c9cb;
  line-height: 1.066667rem /* 80/75 */;
}
.transactionplace {
  padding-top: 0.4rem /* 30/75 */;
  .transactionplace-name {
    display: flex;
    height: 1.333333rem /* 100/75 */;
    line-height: 1.333333rem /* 100/75 */;
    // padding: 0rem /* 0/75 */ 0.466667rem /* 35/75 */;
    font-size: 0.373333rem /* 28/75 */;
    border-bottom: 1px solid #c9c9cb;
    .transactionplace-name1 {
      flex: 1;
    }
    .transactionplace-name2 {
      display: flex;
      justify-content: space-around;
      align-items: center;
      //  width: 3.333333rem /* 250/75 */;
      width: 2.933333rem /* 220/75 */;
      input {
        width: 1.333333rem /* 100/75 */;
        height: 0.666667rem /* 50/75 */;
        line-height: 0.666667rem /* 50/75 */;
        text-align: center;
      }
    }
  }
  .transactionplace-a {
    display: flex;
    padding-left: 0.2rem /* 15/75 */;
    height: 1.066667rem /* 80/75 */;
    #van-icon {
      font-size: 0.733333rem /* 55/75 */;
      width: 40%;
    }
    .tab {
      flex: 1;
      display: flex;
      margin-bottom: 0.533333rem /* 40/75 */;

      h3 {
        font-size: 0.466667rem /* 35/75 */;
      }
      .iconfont {
        font-size: 0.4rem /* 30/75 */;
      }
    }
  }
  .transactionplace-list {
    width: 100%;
    text-align: center;
    font-size: 0.466667rem /* 35/75 */;
    ul:nth-child(2) {
      li {
        border-top: none;
        border-bottom: 1px solid #c5c5c5;
      }
    }
    ul:nth-child(6) {
      li {
        border-top: none;
        border-top: 1px solid #c5c5c5;
      }
    }
    ul:nth-child(9) {
      li {
        border-bottom: 1px solid #c5c5c5;
        border-top: none;
      }
    }

    h4 {
      border-top: 1px solid #b9b6b6;
      border-bottom: 1px solid #b9b6b6;

      padding-top: 0.333333rem /* 25/75 */;
      padding-bottom: 0.333333rem /* 25/75 */;
    }
    li {
      height: 1.333333rem /* 100/75 */;

      line-height: 1.333333rem /* 100/75 */;
      border-top: 1px solid #c5c5c5;
    }
    .active {
      border-bottom: 1px solid #c5c5c5;
      height: 1.333333rem /* 100/75 */;
      line-height: 1.333333rem /* 100/75 */;
      border-top: 1px solid #c5c5c5;
    }
  }
  .transactionplace-c {
    display: flex;
    justify-content: space-around;
    height: 1.333333rem /* 100/75 */;
    line-height: 1.333333rem /* 100/75 */;
    border-bottom: 1px solid #b9b6b6;
    align-items: center;
    input {
      text-align: center;
      height: 0.666667rem /* 50/75 */;
      line-height: 0.666667rem /* 50/75 */;
      font-size: 0.4rem /* 30/75 */;
    }
    span {
      font-size: 0.426667rem /* 32/75 */;
      color: #397aff;
    }
  }
  .transactionplace-d {
    display: flex;
    height: 1.333333rem /* 100/75 */;
    line-height: 1.333333rem /* 100/75 */;
    padding: 0rem /* 0/75 */ 0.466667rem /* 35/75 */;
    font-size: 0.373333rem /* 28/75 */;
    border-bottom: 1px solid #c9c9cb;
    h6 {
      width: 4rem /* 300/75 */;
    }
    .flex-1 {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        width: 1.6rem;
        height: 0.666667rem /* 50/75 */;
        line-height: 0.666667rem /* 50/75 */;
        text-align: center;
      }
    }
    span {
      width: 1.466667rem /* 110/75 */;
      height: 0.866667rem /* 65/75 */;
      line-height: 0.733333rem /* 55/75 */;
      // background: blue;
      font-size: 1rem /* 75/75 */;
      text-align: center;
      color: #397aff;
      border: 1.3px solid #397aff;
    }
    .border {
    }
  }

  .transactionplace-e {
    .box {
      display: flex;
      justify-content: space-around;
      font-size: 0.666667rem /* 50/75 */;
      color: blue;
      .math {
        display: flex;
        line-height: 1.066667rem /* 80/75 */;
        h2 {
          font-size: 0.533333rem /* 40/75 */;
        }
        h6 {
          font-size: 0.48rem /* 36/75 */;
          position: relative;
          top: -0.213333rem;
        }
      }
    }
  }
  .transactionplace-f {
    font-size: 0.533333rem /* 40/75 */;
    display: flex;
    justify-content: space-between;
    color: white;
    div {
      width: 50%;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      background: blue;
      text-align: center;
      font-size: 0.466667rem /* 35/75 */;
    }
    p {
      width: 50%;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      text-align: center;
      background: red;
      font-size: 0.466667rem /* 35/75 */;
    }
  }
    .transactionplace-l {
    font-size: 0.533333rem /* 40/75 */;
    display: flex;
    justify-content: space-between;
    color: white;
    p {
      width: 100%;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      text-align: center;
      background: red;
      font-size: 0.466667rem /* 35/75 */;
    }
  }
  .transactionplace-g {
    p {
      width: 100%;
      background: blue;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      color: white;
      text-align: center;
      font-size: 0.466667rem /* 35/75 */;
    }
  }
  .color {
    color: #cccbd0;
  }
}
</style>
<style lang="scss">
.van-field__control {
  text-align: end;
}
.van-cell {
  font-size: 0.333333rem /* 25/75 */;
  padding: 0.466667rem /* 35/75 */ 0.533333rem /* 40/75 */;
  border-bottom: 1px solid #c9c9cb;
}
.van-picker__confirm,
.van-picker__cancel {
  font-size: 0.346667rem /* 26/75 */;
}

.van-picker__toolbar {
  height: 1.333333rem /* 100/75 */;
  font-size: 0.466667rem /* 35/75 */;
}
.van-ellipsis {
  font-size: 0.346667rem /* 26/75 */;
}
.van-popup {
  height: 6.666667rem /* 500/75 */;
}
</style>
<script>
import store from "../../store";
var api = require("../../api/api");
import { getNowFormatDate,getUTCtime,FormatDate } from "../../tools/check.js";
export default {
  data() {
    return {
      value: "直到取消",
      showPicker: false,
      datePicker: false,
      modify: false,
      buynum: "",
      sellnum: "",
      positionId:"",
      columns: ["直到取消", "今天", "指定"],
      lists: [
        // {
        //   id: "1",
        //   name: "Buy Limit",
        //   icon: "\ue62a;",
        //   OrderType: 7,
        //   orderDirection: 1
        // },
        // {
        //   id: "2",
        //   name: "Sell Limit",
        //   icon: "\ue62a;",
        //   OrderType: 7,
        //   orderDirection: -1
        // },
        // {
        //   id: "3",
        //   name: "Buy Stop",
        //   icon: "\ue62a;",
        //   OrderType: 9,
        //   orderDirection: 1
        // },
        // {
        //   id: "4",
        //   name: "Sell Stop",
        //   icon: "\ue62a;",
        //   OrderType: 9,
        //   orderDirection: -1
        // },
        {
          id: "5",
          name: "修改价位",
          icon: "\ue62a;"
        }
      ],
      unitName: "市场执行",
      isShow: false,
      term: true,
      is: false,
      num: 0.01,
      contractSize: null,
      OrderType: 3,
      num1: null,
      num2: null,
      num3: null,
      headerName: "",
      newName: [],
      newdata1: [],
      arrdata: [],
      prices: false,
      button: true,
      order: false,
      orderDirection: null,
      OrderDuration: 0,
      expirationDate: "",
      minHour: 10,
      maxHour: 20,
      minDate: new Date(new Date().getFullYear(), 0, 1),
      maxDate: new Date(new Date().getFullYear(), 11, 31),
      a1: "0",
      a2: "0",
      datalists: [],
      listmodify: true,
      fanren: false,
      orderID:"",
      // minDate:new Date(2020,0,1),
      // maxDate: new Date(9998, 10, 1),
      currentDate: new Date()
    };
  },

  created() {
    this.datalists = store.state.order;
    this.getId()
    this.orderID = localStorage.getItem("orderid")
    console.log(this.datalists,"aaaaaaa")

  },
  mounted() {
    this.headerName = window.localStorage.getItem("params");
    this.getarr();
    this.getcontractSize();

    console.log(this.headerName, "000000111");
  },

  methods: {
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    getId() {
      for(var i = 0;i < this.datalists.length; i++) {
        if(this.datalists[i].symbol== this.headerName) {
         this.positionId = this.datalists[i].orderID
        console.log(this.positionId,"i")

        }
      }

    },
    la() {
      document.getElementById("number2").value =
        document.getElementById("number1").value * this.contractSize;
      this.num = document.getElementById("number1").value;
    },
    lb() {
      document.getElementById("number1").value =
        document.getElementById("number2").value / this.contractSize;
      this.num = document.getElementById("number1").value;
    },
    getcontractSize() {
      for (let i = 0; i < this.newdata1.length; i++) {
        if (this.headerName === this.newdata1[i].symbolName) {
          console.log(this.headerName, this.newdata1[i].symbolName);
          console.log(this.newdata1[i], "this.newdata1[]i");
          this.contractSize = this.newdata1[i].contractSize;
          console.log(this.contractSize, "this.contractSize ");
        }
      }
    },
    all() {
      this.$router.push("/transaction-placeall");
    },
    back() {
      this.$router.push("/transaction"),
        //   params: { symbol: this.headerName }
        // });
        // this.$router.go(-1)
        console.log("go");
    },
    show() {
      this.isShow = !this.isShow;
      this.unitName = "市场执行";
      this.prices = false;
      this.button = true;
      this.order = false;
      this.term = false;
      this.listmodify = false;
      this.fanren = true;
    },
    select(item, index) {
      console.log(item.name, "modifymodify");
      console.log(item.name == "修改价位");

      if (item.name === "修改价位") {
        console.log("修改");
        this.modify = false;
        this.prices = false;
        this.unitName = item.name;
        this.isShow = false;
        this.listmodify = true;
        this.fanren = false;
      } else {
        console.log(index);
        this.unitModel = index;
        this.unitName = item.name;
        this.OrderType = item.OrderType;
        console.log(this.OrderType, "ppppppppppp");
        this.isShow = false;
        this.prices = true;
        this.button = false;
        this.order = true;
        this.term = true;
        this.orderDirection = item.orderDirection;
        console.log(this.unitName);
      }
    },
    reduce() {
      this.num = (JSON.parse(this.num) - 0.1).toFixed(2);
      if (this.num < 0.01) {
        this.num = 0.01;
      }
      document.getElementById("number2").value = this.num * this.contractSize;
    },
    cut() {
      this.num = (JSON.parse(this.num) - 0.01).toFixed(2);

      if (this.num < 0.01) {
        this.num = 0.01;
      }
      document.getElementById("number2").value = this.num * this.contractSize;
    },
    add() {
      console.log(this.num);
      this.num = (JSON.parse(this.num) + 0.01).toFixed(2);
      document.getElementById("number2").value = this.num * this.contractSize;
    },
    raise() {
      this.num = (JSON.parse(this.num) + 0.1).toFixed(2);
      document.getElementById("number2").value = this.num * this.contractSize;

      console.log(this.num);
    },
    numreduce() {
      if (this.num1 === 0) {
        return;
      } else {
        // this.num1 -= 0.1;
        this.num1 = (JSON.parse(this.num1) - 0.1).toFixed(2);

        if (this.num1 < 0.1) {
          this.num1 = 0.1;
        }
        // document.getElementById("number2").value = this.num * this.contractSize;
      }
    },
    numadd() {
      //   this.num1 += 0.1;
      this.num1 = (JSON.parse(this.num1) + 0.1).toFixed(2);
      console.log(this.num1, "shzi");
      // document.getElementById("number2").value = this.num * this.contractSize;
    },
    jianshao() {
      console.log(this.num2);
      if (this.num2 === 0) {
        return;
      } else {
        // this.num2 -= 0.1;
        this.num2 = (JSON.parse(this.num2) - 0.1).toFixed(2);

        if (this.num2 < 0.1) {
          this.num2 = 0.1;
        }
        // document.getElementById("number2").value = this.num * this.contractSize;
      }
    },
    zengjia() {
      //   this.num2 += 0.1;
      this.num2 = (JSON.parse(this.num2) + 0.1).toFixed(2);
      // document.getElementById("number2").value = this.num * this.contractSize;

      console.log(this.$route.params, "采纳数");
      console.log(this.num);
      //   console.log(headerName(), "采纳数");
    },
    price() {
      // this.num3 -= 0.1;
      this.num3 = (JSON.parse(this.num3) - 0.1).toFixed(2);
      // document.getElementById("number2").value = this.num * this.contractSize;
    },
    priceadd() {
      
      // this.num3 += 0.1;
      this.num3 = (JSON.parse(this.num3) + 0.1).toFixed(2);
      // document.getElementById("number2").value = this.num * this.contractSize;

    },
    getarr() {
      this.newdata1 = this.$store.state.arr;
      for(var i = 0; i < this.newdata1.length; i++) {
        console.log(this.newdata1[i], "0000000000000");
        console.log(this.headerName,"哈哈哈哈哈哈哈")
        if(this.headerName === this.newdata1[i].symbolName ){
          this.num3 = this.newdata1[i].ask

        }

        console.log( this.holder)
      }
    },
    getnewName() {
      //   if (this.newName) {
      //     for (let a = 0; a < this.newName.length; a++) {
      //         for( let b = 0; b < this.newdata1.length; b++) {
      //             // console.log(this.newdata1[b][0],"nnnnnnnnn")
      //             // console.log(this.newName[a],"mmmmmmmm")
      //             var datan = this.newdata1[b][0];
      //             var datam = this.newName[a]
      //             if(datan.symbolName === this.headerName) {
      //                 console.log(datam,"datam")
      //                 console.log(this.headerName)
      //                 this.ask = datam.ask
      //                 this.bid = datam.bid
      //                 console.log(this.arrdata,"sssssss")
      //                 // this.arrdata= [datam.bid]
      //             }
      //             this.arrdata = this.arrdata
      //         }
      // var newdata1 = this.newName[a]
      // if(newdata1.symbol === this.headerName) {
      //   this.newdata1 = this.newName[a]
      //   console.log(this.newdata1,"newdata1")
      // }
      // console.log(newdata1)
      // }
      //   }
    },
    sell() {
      console.log("sell");
      console.log(this.sellnum, this.buynum);
      if (this.num1 < this.sellnum && this.num1 != null && this.num1 != "") {
        Toast({
          message: "止损过低",
          duration: 1000
        });
        return;
      }
      if (this.num2 > this.sellnum) {
        Toast({
          message: "止盈过高",
          duration: 1000
        });
        return;
      }

      this.$http
        .post(api.Deleteorder, {
          symbol: this.headerName,
          volume: this.num,
          orderDirection: -1,
          orderType: this.OrderType,
          fillType: 1,
          stopLoss: this.num1,
          takeProfit: this.num2
        })
        .then(({ data }) => {
          if (data.code === 0) {
            Toast({
              message: "下单成功"
            });

            this.$router.push("/transaction");
          }
        });
    },
    buy() {
      console.log("buy");
      if (this.num1 > this.sellnum) {
        Toast({
          message: "止损过低",
          duration: 1000
        });
        return;
      }
      if (this.num2 < this.sellnum && this.num2 != null && this.num2 != "") {
        Toast({
          message: "止盈过高",
          duration: 1000
        });
        return;
      }

      this.$http
        .post(api.Deleteorder, {
          symbol: this.headerName,
          volume: this.num,
          orderDirection: 1,
          orderType: this.OrderType,
          fillType: 1,
          stopLoss: this.num1,
          takeProfit: this.num2
        })
        .then(({ data }) => {
          if (data.code === 0) {
            Toast({
              message: "下单成功"
            });

            this.$router.push("/transaction");
          }
        });
    },

    onConfirm(value) {
      this.showPicker = false;

      this.value = value;
      console.log(this.value);
      if (this.value === "直到取消") {
        this.OrderDuration = 0;
        this.expirationDate = "";
        console.log(this.OrderDuration, "88888");
      } else if (this.value === "今天") {
        this.OrderDuration = 1;
         let  tod =new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000)
    this.expirationDate = getUTCtime(new Date(tod.getTime() + 7200000))  
        console.log(this.expirationDate, "88888");
      } else {
        this.datePicker = true;
        this.OrderDuration = 2;
        console.log(this.OrderDuration, "88888");
      }
    },
    placeorder() {
      console.log("placeorder");
      if (this.num3 === null || "") {
        Toast({
          message: "请输入价格",
          duration: 1000
        });
        return;
      }
      if (this.num1 === null || "" || this.num2 === null || "") {
        Toast({
          message: "下单失败",
          duration: 1000
        });
        return;
      }

      //sell limit
      if (
        this.OrderType === 7 &&
        this.orderDirection === -1 &&
        this.unitName === "Sell Limit" &&
        this.num3 < this.sellnum
      ) {
        console.log("hhhhhh");
        Toast({
          message: "价格过低",
          duration: 1000
        });
        return;

        if (this.num1 < this.num3) {
          Toast({
            message: "止损过低",
            duration: 1000
          });
          return;
        }
        if (this.num2 > this.num3) {
          Toast({
            message: "止盈过高",
            duration: 1000
          });
          return;
        }
      }
      //buy limit
      if (
        this.OrderType === 7 &&
        this.orderDirection === 1 &&
        this.unitName === "Buy Limit" &&
        this.num3 > this.buynum
      ) {
        console.log("hhhhhh");
        Toast({
          message: "价格过高",
          duration: 1000
        });
        return;

        if (this.num1 > this.num3) {
          Toast({
            message: "止损过高",
            duration: 1000
          });
          return;
        }
        if (this.num2 < this.num3) {
          Toast({
            message: "止盈过低",
            duration: 1000
          });
          return;
        }
      }
      //buy stop
      if (
        this.OrderType === 9 &&
        this.orderDirection === 1 &&
        this.unitName === "Buy Stop" &&
        this.num3 < this.buynum
      ) {
        Toast({
          message: "价格过低",
          duration: 1000
        });
        return;

        if (this.num1 > this.num3) {
          Toast({
            message: "止损过高",
            duration: 1000
          });
          return;
        }
        if (this.num2 < this.num3) {
          Toast({
            message: "止盈过低",
            duration: 1000
          });
          return;
        }
      }
      //sell stop
      if (
        this.OrderType === 9 &&
        this.orderDirection === -1 &&
        this.unitName === "Sell Stop" &&
        this.num3 > this.sellnum
      ) {
        console.log("1111");
        Toast({
          message: "价格过高",
          duration: 1000
        });
        return;

        if (this.num1 < this.num3) {
          Toast({
            message: "止损过低",
            duration: 1000
          });
          return;
        }
        if (this.num2 > this.num3) {
          Toast({
            message: "止盈过高",
            duration: 1000
          });
          return;
        }
      }

      this.$http
        .post(api.Deleteorder, {
          symbol: this.headerName,
          orderDuration: this.OrderDuration,
          volume: this.num,
          orderType: this.OrderType,
          orderDirection: this.orderDirection,
          fillType: 3,
          orderPrice: this.num3,
          stopLoss: this.num1,
          takeProfit: this.num2,
          comment: "",
          expirationDate: this.expirationDate
        })
        .then(({ data }) => {
          if (data.code === 0) {
            Toast({
              message: "下单成功"
            });
            this.$router.push("/transaction");
          }
          console.log(data);
        });
    },
   onCon(value) {
      
      this.datePicker = false;
      // this.expirationDate = value;
      this.value = value.toLocaleDateString();
      var value1 = value.toTimeString().substring(0, 5);
      var date9 = new Date(value.setHours(new Date().getHours() + 2));
      //六个小时
      this.expirationDate = getUTCtime(date9);
      this.value = this.value + " " + value1;
    },
 
     modifies() {
     this.$http.put(api.modify + "/" + this.orderID,{
       orderDuration: "",
       expirationDate: this.expirationDate,
       orderPrice: this.num3,
       stopLoss: this.num1,
       takeProfit: this.num2
     }).then(({data})=>{
       if(data.code === 0) {
       this.$toast("修改成功")
       this.$router.push("/transaction")
       }
     })
     },
      },

  watch: {
    "$store.state.mydata": function(newer, old) {
      this.newName = newer;
      if (this.newName) {
        //    this.getnewName()
        for (let i = 0; i < this.newdata1.length; i++) {
          for (let j = 0; j < this.newName.length; j++) {
            // console.log(this.newdata1[i][0], "zhangzhang");
            // console.log(this.newName[j], "lili");
            var middle = this.newdata1[i];
            var dabble = this.newName[j];
            console.log(middle, "dabble");
            console.log(dabble, "dabble");

            if (middle.symbolName == dabble.symbol) {
              middle.ask = dabble.ask;
              middle.bid = dabble.bid;
            }
            this.a1 = middle.ask;
            this.a2 = middle.bid;

            if (middle.symbolName === this.headerName) {
              console.log(this.headerName, "");
              this.buynum = middle.ask;
              this.sellnum = middle.bid;
            }

            // if(dabble.symbol === this.headerName) {
            //   console.log(dabble.symbol === this.headerName,"bbbbb")

            //    if (this.a1 <  dabble.ask) {
            //    console.log(document.getElementById("items.symbolName"))
            //    document.getElementById("items.symbolName").style.color = "blue";
            //   } else if (this.a1 >  dabble.ask) {
            //     document.getElementById("items.symbolName").style.color = "red";
            //   }
            //   this.a1 =  dabble.ask;
            //   console.log(this.a1,"middle")
            //    if (this.a2 <  dabble.bid) {
            //     document.getElementById("items").style.color = "blue";
            //   } else if (this.a2 >  dabble.bid) {
            //     document.getElementById("items").style.color = "red";
            //   }
            //   this.a2 =  dabble.bid;
            //   console.log(this.a2,"middle")
            //   // console.log(this.buynum, "qiqiqiqiqi");
            // }
            // this.sellnum = this.newdata1[0][0].bid
            // console.log(this.buynum,"22222")
            // console.log(this.sellnum,"333333333")
          }

          //  }
        }
      }
    }
  }
};
</script>