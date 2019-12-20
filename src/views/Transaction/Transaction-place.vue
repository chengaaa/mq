<template>
  <div class="transactionplace">
    <div class="transactionplace-a">
      <van-icon id="van-icon" name="arrow-left" color="blue" @click="back" />
      <div class="tab">
        <h3 @click="all" v-if="headerName">{{headerName}}</h3>
        <h3 @click="all" v-else>CADCHF</h3>
        <!-- <h3 @click="all" v-for="header in headerName" :key="header.symbol">{{header.symbol}}</h3> -->
        <i class="iconfont">&#xe60d;</i>
      </div>
    </div>
    <div class="transactionplace-list">
      <h4 @click="show">{{unitName}}</h4>
      <ul v-for="(item,index) in lists" :key="index">
        <li
          v-show="isShow"
          @click.stop="select(item, index)"
          :class="item.id === '4'? 'active': ''"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="transactionplace-c">
      <span @click="reduce">-0.1</span>
      <span @click="cut">-0.01</span>
      <!-- <p>{{this.num.toFixed(2)}}</p> -->
      <!-- <input type="num" :value="this.num.toFixed(2)" /> -->
      <input type="num" v-model="num" />
      <span @click="add">+0.01</span>
      <span @click="raise">+0.1</span>
    </div>
    <div class="transactionplace-d" v-show="prices">
      <h6>价格</h6>
      <div class="flex-1">
        <input type="text" v-model="num3" placeholder="没有设置" />
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
    <div class="transactionplace-e" v-for="(item,index) in newdata1" :key="index">
      <div v-for="(items,indexs) in item" :key="indexs" class="box">
        <h2 v-show="items.symbolName === headerName">{{parseFloat(items.bid).toFixed(3)}}</h2>
        <h2 v-if="items.symbolName === headerName">{{parseFloat(items.ask).toFixed(3)}}</h2>
      </div>
    </div>
    <div class="transactionplace-f" v-show="button">
      <div @click="sell">Sell by Market</div>
      <p @click="buy">Buy by Market</p>
    </div>
    <div class="transactionplace-g" v-show="order">
      <p @click="placeorder">下单</p>
    </div>
  </div>
</template>
<style lang="scss" scoped >
.transactionplace {
  padding-top: 0.4rem /* 30/75 */;
  .transactionplace-a {
    display: flex;
    padding-left: 0.2rem /* 15/75 */;
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
    h4 {
      margin-bottom: 0.533333rem /* 40/75 */;
    }
    li {
      height: 1.333333rem /* 100/75 */;

      line-height: 1.333333rem /* 100/75 */;
      // background: red;
      // margin-bottom: .266667rem /* 20/75 */;
      border-top: 1px solid #c5c5c5;
    }
    .active {
      border-bottom: 1px solid #c5c5c5;
      height: 1.333333rem /* 100/75 */;
      line-height: 1.333333rem /* 100/75 */;
      // background: red;
      // margin-bottom: .266667rem /* 20/75 */;
      border-top: 1px solid #c5c5c5;
    }
  }
  .transactionplace-c {
    display: flex;
    justify-content: space-around;
    height: 1.333333rem /* 100/75 */;
    line-height: 1.333333rem /* 100/75 */;
    input {
      text-align: center;
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
    border-bottom: 1px solid black;
    h6 {
      width: 4rem /* 300/75 */;
    }
    .flex-1 {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
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
      border: 2px solid #397aff;
    }
    .border {
      border-right: none;
    }
  }
  .transactionplace-e {
    .box {
      display: flex;
      justify-content: space-around;
      font-size: 0.666667rem /* 50/75 */;
      color: blue;
      h2 {
        line-height: 1.066667rem /* 80/75 */;
      }
    }
  }
  .transactionplace-f {
    display: flex;
    justify-content: space-between;
    color: white;
    div {
      width: 50%;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      background: blue;
      text-align: center;
    }
    p {
      width: 50%;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      text-align: center;
      background: red;
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
<script>
import store from "../../store";
export default {
  data() {
    return {
      lists: [
        { id: "1", name: "Buy Limit", icon: "\ue62a;", OrderType: 7 ,orderDirection: 1},
        { id: "2", name: "Sell Limit", icon: "\ue62a;", OrderType: 7,orderDirection: -1},
        { id: "3", name: "Buy Stop", icon: "\ue62a;", OrderType: 9, orderDirection: 1},
        { id: "4", name: "Sell Stop", icon: "\ue62a;", OrderType: 9, orderDirection: -1 }
      ],
      unitName: "市场执行",
      isShow: false,
      is: false,
      num: 0.01,
      OrderType: 3,
      num1: null,
      num2: null,
      num3: 0,
      headerName: "",
      newName: [],
      newdata1: [],
      arrdata: [],
      prices: false,
      button: true, 
      order: false,
      orderDirection:null
    };
  },
  created() {
    this.getarr();
  },
  mounted() {
    this.headerName = window.localStorage.getItem("params");
  },

  methods: {
    all() {
      this.$router.push("/transaction-placeall");
    },
    back() {
      this.$router.push("/transaction", {
        params: { symbol: this.headerName }
      });
      console.log("go");
    },
    show() {
      this.isShow = !this.isShow;
      this.unitName = "市场执行";
      this.prices = false;
      this.button = true;
      this.order = false;
    },
    select(item, index) {
      console.log(item);
      console.log(index);
      this.unitModel = index;
      this.unitName = item.name;
      this.OrderType = item.OrderType;
      this.isShow = false;
      this.prices = true;
      this.button = false;
      this.order = true;
      this.orderDirection = item.orderDirection;
    },
    reduce() {
      this.num = (JSON.parse(this.num) - 0.1).toFixed(2);

      if (this.num < 0.01) {
        this.num = 0.01;
      }
    },
    cut() {
      this.num = (JSON.parse(this.num) - 0.01).toFixed(2);

      if (this.num < 0.01) {
        this.num = 0.01;
      }
    },
    add() {
      console.log(this.num);
      this.num = (JSON.parse(this.num) + 0.01).toFixed(2);
    },
    raise() {
      this.num = (JSON.parse(this.num) + 0.1).toFixed(2);

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
      }
    },
    numadd() {
    //   this.num1 += 0.1;
      this.num1 = (JSON.parse(this.num1) + 0.1).toFixed(2);
      console.log(this.num1,"shzi")

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
      }
    },
    zengjia() {
    //   this.num2 += 0.1;
      this.num2 = (JSON.parse(this.num2) + 0.1).toFixed(2);

      console.log(this.$route.params, "采纳数");
      console.log(this.num);
      //   console.log(headerName(), "采纳数");
    },
    price() {
      // this.num3 -= 0.1;
      this.num3 = (JSON.parse(this.num3) - 0.1).toFixed(2);

    },
    priceadd() {
      this.num3 += 0.1;
      this.num3 = (JSON.parse(this.num3) + 0.1).toFixed(2);
      console.log(this.num3);
    },
    getarr() {
      this.newdata1 = this.$store.state.arr;
      console.log(this.newdata1, "0000000000000");
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
      this.$http.post("/trade/order", {
        symbol: this.headerName,
        volume: this.num,
        orderDirection: -1,
        orderType: this.OrderType,
        fillType: 1,
        // stopLoss: this.num1,
        // takeProfit: this.num2,
      });
    },
    buy() {
      console.log("buy");
      this.$http.post("/trade/order", {
        symbol: this.headerName,
        volume: this.num,
        orderDirection: 1,
        orderType: this.OrderType,
        fillType: 1,
        // stopLoss: this.num1,
        // takeProfit: this.num2,
      });
    },
    placeorder() {
      console.log("placeorder");
        this.$http.post("/trade/order", {
        symbol: this.headerName,
        volume: this.num,
        orderDirection: this.orderDirection,
        orderType: this.OrderType,
        fillType: 1,
        orderPrice: this.num3
        // stopLoss: this.num1,
        // takeProfit: this.num2,
      });
    }
  },
  watch: {
    // $route() {
    //   this.headerName = this.$route.params.symbol;
    //   console.log(this.headerName);
    // },
    "$store.state.mydata": function(newer, old) {
      this.newName = newer;
      //    console.log(this.newName)
      //    this.getnewName()
    }
  }
};
</script>