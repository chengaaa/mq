<template>
  <div class="transactionplace">
    <!-- <loading v-show="LOADING"></loading> -->
    <div class="transactionplace-a">
      <van-icon id="van-icon" name="arrow-left" color="blue" @click="back" />
      <div class="tab">
        <h3 @click="all" v-show="headerName">{{headerName.slice(0,headerName.indexOf('.'))}}</h3>
        <i class="iconfont">&#xe60d;</i>
      </div>
    </div>
    <div class="transactionplace-list">
      <h4 @click="show">{{$t(unitName)}}</h4>
      <ul v-for="(item,index) in lists" :key="index">
        <li
          v-show="isShow"
          @click.stop="select(item, index)"
          :class="item.id === '4'? 'active': ''"
        >{{item.name}}</li>
      </ul>
    </div>
      <div class="transactionplace-name">
      <div class="transactionplace-name1"></div>
      <div class="transactionplace-name2">
        <!-- <input :value="num * contractSize"> -->
        <input type="num" @input="lb()" id="number2" :placeholder="num" />
        <h6>{{headerName.substring(0,3)}}</h6>
      </div>
    </div>
    <div class="transactionplace-c">
      <span @click="reduce">-0.1</span>
      <span @click="cut">-0.01</span>
      <!-- <p>{{this.num.toFixed(2)}}</p> -->
      <!-- <input type="num" :value="this.num.toFixed(2)" /> -->
      <input type="num" @input="la()" id="number1" :value="num" />
      <span @click="add">+0.01</span>
      <span @click="raise">+0.1</span>
    </div>
  
    <div class="transactionplace-d" v-show="prices">
      <h6>{{$t('m.Price')}}</h6>
      <div class="flex-1">
        <input type="text" v-model="num3" :placeholder="$t('m.Noset')" />
        <span @click="price" class="border">-</span>
        <span @click="priceadd">+</span>
      </div>
    </div>
    <div class="transactionplace-d">
      <h6>{{$t('m.StopLoss')}}</h6>
      <div class="flex-1">
        <input type="text" v-model="num1" :placeholder="$t('m.Noset')" />
        <span @click="numreduce" class="border">-</span>
        <span @click="numadd">+</span>
      </div>
    </div>
    <div class="transactionplace-d">
      <h6>{{$t('m.TakeProfit')}}</h6>
      <div class="flex-1">
        <input type="text" v-model="num2" :placeholder="$t('m.Noset')" />

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
      :label="$t('m.Expiration')"
      :value="$t(value)"
      @click="showPicker = true"
      v-show="term"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        :confirm-button-text="determine"
        :cancel-button-text="cancel"
      />
    </van-popup>
    <!-- <div class="transactionplace-e" v-for="(item,index) in newdata1" :key="index"> -->
    <div class="transactionplace-e">
      <div v-for="(items,indexs) in dataorder" :key="indexs" class="box">
        <div class="math" v-show="items.symbolName === headerName" :class="items.bid < bidnum?'colorred':'colorblue'">
          <h2>{{(items.bid).substring(0,(items.bid).indexOf("."))}}</h2>
              <span >{{(items.bid).slice((items.bid).indexOf("."),-1)}}</span>
              <h6>{{(items.bid).substr(-1,1)}}</h6>
        </div>
        <div class="math" v-show="items.symbolName === headerName" :class="items.ask < asknum?'colorred':'colorblue'">
         <h2>{{(items.ask).substring(0,(items.ask).indexOf("."))}}</h2>
              <span >{{(items.ask).slice((items.ask).indexOf("."),-1)}}</span>
              <h6>{{(items.ask).substr(-1,1)}}</h6>
        </div>
      </div>
    </div>
    <div class="transactionplace-f" v-show="button">
      <div style="background:red" @click="sell">Sell by Market</div>
      <p  style="background:blue" @click="buy">Buy by Market</p>
    </div>
    <div class="transactionplace-g" v-show="order">
      <p @click="placeorder">{{$t('m.Place')}}</p>
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
        :confirm-button-text="determine"
        :cancel-button-text="cancel"
      />
    </van-popup>
  </div>
</template>
<style lang="scss" scoped >
.colorred {
    color:red;
}
.colorblue {
    color:blue;

}
.blue {
  color: blue;
}
.red {
  color: red;
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
     font-family: 'Tahoma','Sans Serif';

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
        font-size: .426667rem /* 32/75 */;
             font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';
          font-weight: bold;
      }
      .iconfont {
        font-size: 0.4rem /* 30/75 */;
      }
    }
  }
  .transactionplace-list {
    width: 100%;
    text-align: center;
    font-size: .426667rem /* 32/75 */;
     font-family: 'Tahoma','Sans Serif';
    ul:nth-child(2) {
      li {
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
     font-family: 'Tahoma','Sans Serif';

    input {
      text-align: center;
      height: 0.666667rem /* 50/75 */;
      line-height: 0.666667rem /* 50/75 */;
      font-size: 0.4rem /* 30/75 */;
    }
    span {
      font-size: 0.426667rem /* 32/75 */;
      color: #397aff;
      font-weight: bolder;
    }
  }
  .transactionplace-d {
    display: flex;
    height: 1.333333rem /* 100/75 */;
    line-height: 1.333333rem /* 100/75 */;
    padding: 0rem /* 0/75 */ 0.466667rem /* 35/75 */;
    font-size:.426667rem /* 32/75 */;
    border-bottom: 1px solid #c9c9cb;
     font-family: 'Tahoma','Sans Serif';
    h6 {
      width: 4rem /* 300/75 */;
    }
    .flex-1 {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        width: 1.5rem /* 100/75 */;
        height: 0.666667rem /* 50/75 */;
        line-height: 0.666667rem /* 50/75 */;
        text-align: center;
    font-size:.373333rem /* 28/75 */;
      }
    }
    span {
      width: 1.466667rem /* 110/75 */;
      height: 0.866667rem /* 65/75 */;
      line-height: 0.733333rem /* 55/75 */;
      font-size: .8rem /* 60/75 */;
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
     font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';
      .math {
        display: flex;
        line-height: 1.066667rem /* 80/75 */;
        h2 {
          font-size:.6rem /* 45/75 */;
        }
        span {
          font-size: .773333rem /* 58/75 */;
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
     font-family: 'Tahoma','Sans Serif';

    div {
      width: 50%;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      text-align: center;
      font-size: 0.466667rem /* 35/75 */;
    }
    p {
      width: 50%;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      text-align: center;
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
<style scoped>
 .transactionplace >>> .van-field__control {
  text-align: end;
}
.transactionplace >>>.van-cell {
  font-size: 0.333333rem /* 25/75 */;
  padding: 0.466667rem /* 35/75 */ 0.533333rem /* 40/75 */;
  border-bottom: 1px solid #c9c9cb;
}
.transactionplace >>> .van-picker__confirm,
.transactionplace >>>.van-picker__cancel {
  font-size: 18px;
}

 .transactionplace >>> .van-picker__toolbar {
  height: 1.333333rem /* 100/75 */;
  font-size: 20px;
}
.transactionplace >>> .van-ellipsis {
  font-size: 20px;
}
.transactionplace >>> .van-popup {
  height: 6.666667rem /* 500/75 */;
}

</style>
<script>
import store from "../../store";
import { getNowFormatDate,getUTCtime,FormatDate,isDayLightSaving } from "../../tools/check.js";
const Loading = ()=> import("../../components/Loading");
import { mapState } from "vuex";
var api = require("../../api/api")
export default {
  data() {
    return {
      holder:null,
      value: "m.Untilcancelled",
      showPicker: false,
      datePicker: false,
      buynum: "",
      sellnum: "",
      
      determine:this.$t("m.Determineok"),
      cancel: this.$t("m.Cancellation"),
      // balances: localStorage.getItem("balance"),
      columns: [
        this.$t("m.Untilcancelled"),
        this.$t("m.Today"),
        this.$t("m.Appoint")
      ],
      lists: [
        {
          id: "1",
          name: "Buy Limit",
          icon: "\ue62a;",
          OrderType: 7,
          orderDirection: 1
        },
        {
          id: "2",
          name: "Sell Limit",
          icon: "\ue62a;",
          OrderType: 7,
          orderDirection: -1
        },
        {
          id: "3",
          name: "Buy Stop",
          icon: "\ue62a;",
          OrderType: 9,
          orderDirection: 1
        },
        {
          id: "4",
          name: "Sell Stop",
          icon: "\ue62a;",
          OrderType: 9,
          orderDirection: -1
        }
      ],
      asknum:0,
      bidnum:0,
      unitName: "m.Marketimplementation",
      isShow: false,
      term: false,
      is: false,
      num: 0.01,
      contractSize: null,
      OrderTypes: 3,
      num1: null,
      num2: null,
      num3: null,
      headerName: "BTCUSD.",
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
      // minDate:new Date(2020,0,1),
      // maxDate: new Date(9998, 10, 1),
      currentDate: new Date(),
      diftimer:""
      
    };
  },

  created() {
      this.headerName = window.localStorage.getItem("params");
    this.getarr();
  },
  components:{
Loading

  },
  mounted() {
    this.getcontractSize();
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
          this.contractSize = this.newdata1[i].contractSize;
        }
      }
    },
    all() {
      this.$router.push("/transaction-placeall");
    },
    back() {
      this.$router.push("/transaction")
        //   params: { symbol: this.headerName }
        // });
        // this.$router.go(-1)
    },
    show() {
      this.isShow = !this.isShow;
      this.unitName = "m.Marketimplementation";
      this.prices = false;
      this.button = true;
      this.order = false;
      this.term = false;
    },
    select(item, index) {
      this.unitModel = index;
      this.unitName = item.name;
      this.OrderType = item.OrderType;
      this.isShow = false;
      this.prices = true;
      this.button = false;
      this.order = true;
      this.term = true;
      this.orderDirection = item.orderDirection;
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
      this.num = (JSON.parse(this.num) + 0.01).toFixed(2);
      document.getElementById("number2").value = this.num * this.contractSize;
    },
    raise() {
      this.num = (JSON.parse(this.num) + 0.1).toFixed(2);
      document.getElementById("number2").value = this.num * this.contractSize;

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
        document.getElementById("number2").value = this.num * this.contractSize;
      }
    },
    numadd() {
      //   this.num1 += 0.1;
      this.num1 = (JSON.parse(this.num1) + 0.1).toFixed(2);
      document.getElementById("number2").value = this.num * this.contractSize;
    },
    jianshao() {
      if (this.num2 === 0) {
        return;
      } else {
        // this.num2 -= 0.1;
        this.num2 = (JSON.parse(this.num2) - 0.1).toFixed(2);

        if (this.num2 < 0.1) {
          this.num2 = 0.1;
        }
        document.getElementById("number2").value = this.num * this.contractSize;
      }
    },
    zengjia() {
      //   this.num2 += 0.1;
      this.num2 = (JSON.parse(this.num2) + 0.1).toFixed(2);
      document.getElementById("number2").value = this.num * this.contractSize;
    },
    price() {
      // this.num3 -= 0.1;
      this.num3 = (JSON.parse(this.num3) - 0.1).toFixed(2);
      document.getElementById("number2").value = this.num * this.contractSize;
    },
    priceadd() {
      
      // this.num3 += 0.1;
      this.num3 = (JSON.parse(this.num3) + 0.1).toFixed(2);
      document.getElementById("number2").value = this.num * this.contractSize;

    },
    getarr() {
      this.newdata1 = this.$store.state.arr;
      for(var i = 0; i < this.newdata1.length; i++) {
        if(this.headerName === this.newdata1[i].symbolName ){
          this.num3 = this.newdata1[i].ask
        }
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
      // if(Number(this.balances) < Number(this.sellnum)) {
      //   this.$toast("余额不足");
      //   return

      // }
      if (this.num1 < this.sellnum && this.num1 != null && this.num1 != "") {
       this.$toast(this.$t("m.Stoplosstoolow"));
        return;
      }
      if (this.num2 > this.sellnum) {
        this.$toast(this.$t("m.Takeprofittoohigh"));
        return;
      }
      this.$store.commit('showLoading')
      this.$http
        .post(api.Deleteorder, {
          symbol: this.headerName,
          volume: this.num,
          orderDirection: -1,
          orderType: this.OrderTypes,
          fillType: 1,
          stopLoss: this.num1,
          takeProfit: this.num2
        })
        .then(({ data }) => {
          if (data.code === 0) {
           this.$store.commit('hideLoading')
            this.$toast(this.$t("m.Orderplaced"));
            this.$router.push("/transaction");
          } else if(data.code === 10019) {
          this.$store.commit('hideLoading')
            this.$toast(this.$t('m.balancenot'));
          } else if (data.orderId == null) {
            this.$toast(this.$t('m.Placeorderfailed'))
          }
        });
    },
    buy() {
      // if(Number(this.balances) < Number(this.buynum) || this.balances=== 0) {
      //   this.$toast("余额不足");
      //   return

      // }
      if (this.num1 > this.buynum) {
        this.$toast(this.$t("m.Stoplosstoolow"));
        return;
      }
      if (this.num2 < this.buynum && this.num2 != null && this.num2 != "") {
        this.$toast(this.$t("m.Takeprofittoohigh"));
        return;
      }
      this.$store.commit('showLoading')

      this.$http
        .post(api.Deleteorder, {
          symbol: this.headerName,
          volume: this.num,
          orderDirection: 1,
          orderType: this.OrderTypes,
          fillType: 1,
          stopLoss: this.num1,
          takeProfit: this.num2
        })
        .then(({ data }) => {
          if (data.code === 0) {
      this.$store.commit('hideLoading')
            this.$toast(this.$t("m.Orderplaced"));
            this.$router.push("/transaction");
          } else if(data.code === 10019) {
            this.$toast(this.$t('m.balancenot'))
          this.$store.commit('hideLoading')

          } else if (data.orderId == null) {
          this.$toast(this.$t('m.Placeorderfailed'))

          }
        });
    },

    onConfirm(value) {
      this.showPicker = false;

      this.value = value;
      if (this.value === this.$t("m.Untilcancelled")) {
        this.OrderDuration = 0;
        this.expirationDate = "";
      } else if (this.value === this.$t("m.Today")) {
        this.OrderDuration = 2;
          if(isDayLightSaving(new Date())) {
               this.diftimer = 2
        } else {
               this.diftimer = 1
        }
        let  tod =new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000)
    this.expirationDate = getUTCtime(new Date(tod.getTime() + this.diftimer))     //  this.expirationDate = getNowFormatDate(new Date(tod.setHours( new Date().getHours()+2)))
       
      } else {
        this.datePicker = true;
        this.OrderDuration = 2;
      }
    },
    placeorder() {
      if (this.num3 === null || "") {
        this.$toast(this.$t("m.Pleaseenterprice"));
        return;
      }
      // if (this.num1 === null || "" || this.num2 === null || "") {
      //   this.$toast(this.$t("m.Placeorderfailed"));

      //   return;
      // }

      //sell limit
      if (
        this.OrderType === 7 &&
        this.orderDirection === -1 &&
        this.unitName === "Sell Limit" &&
        this.num3 < this.sellnum
      ) {
        this.$toast(this.$t("m.Pricetoolow"));
        return;
        if (this.num1 < this.num3) {
          this.$toast(this.$t("m.Stoplosstoolow"));
          return;
        }
        if (this.num2 > this.num3) {
          this.$toast(this.$t("m.Takeprofittoohigh"));
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
        this.$toast(this.$t("m.Pricetoohigh"));
        return;

        if (this.num1 > this.num3) {
          this.$toast(this.$t("m.Stoplosstoohigh"));

          return;
        }
        if (this.num2 < this.num3) {
          this.$toast(this.$t("m.Takeprofittoolow"));

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
        this.$toast(this.$t("m.Pricetoolow"));
        return;
        if (this.num1 > this.num3) {
          this.$toast(this.$t("m.Stoplosstoohigh"));

          return;
        }
        if (this.num2 < this.num3) {
          this.$toast(this.$t("m.Takeprofittoolow"));

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
        this.$toast(this.$t("m.Pricetoohigh"));

        return;

        if (this.num1 < this.num3) {
          this.$toast(this.$t("m.Stoplosstoolow"));

          return;
        }
        if (this.num2 > this.num3) {
          this.$toast(this.$t("m.Takeprofittoohigh"));

          return;
        }
      }
      this.$store.commit('showLoading')

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
      this.$store.commit('hideLoading')

            this.$toast(this.$t("m.Orderplaced"));

            this.$router.push("/transaction");
          } else {
            this.$toast(this.$t("m.Placeorderfailed"));

          }
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
    }
  },

  computed:{
...mapState([
                'LOADING'
            ]),
               dataorder: function() {
        for (let j = 0; j < this.newdata1.length; j++) {
            var data4 = this.newdata1[j];
            if (data4.symbolName == this.headerName) {
              this.asknum = data4.ask;
              this.bidnum = data4.bid;
              this.buynum = data4.ask;
              this.sellnum = data4.bid;
            }
          }
        if (this.newName) {
        for(let h = 0; h < this.newName.length; h++){
             for (let j = 0; j < this.newdata1.length; j++) {
                  var data3 = this.newName[h];
            var data4 = this.newdata1[j];
             if(data3.symbol == data4.symbolName) {
                data4.ask = data3.ask
              data4.bid = data3.bid
            }
             if (data4.symbolName === this.headerName) {
              this.buynum = data4.ask;
              this.sellnum = data4.bid;
            }
             }
        }
      }
      return this.newdata1;
    }
  },

  watch: {
    // $route() {
    //   this.headerName = this.$route.params.symbol;
    //   console.log(this.headerName);
    // },
    "$store.state.mydata": function(newer, old) {
      this.newName = newer;
   
    }
  }
};
</script>