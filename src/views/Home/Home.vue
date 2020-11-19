<template>
  <div class="home" >
    
    <div class="home-title">
      <h1 class="home-img">
        <img src="../../assets/image/logo3.png" alt />
      </h1>
    </div>
    <div >
    <div class="home-banner" v-if="lang==='中文'">
      <img :src="schpng" alt />
    </div>
    <div class="home-banner" v-if="lang==='English'">
      <img :src="enpng" alt />
    </div>
    <div class="home-banner" v-if="lang==='繁體'">
      <img :src="tchpng" alt />
    </div>
    </div>
    <div class="home-news" >
      <div class="gonggao" style="line-height:1.1rem">
        <!-- <img src="../../assets/image/公告.png" alt /> -->
        <i class="iconfont icon-gonggao3"></i>
      </div>
      <div class="p">
        <p style="fontWeight:700">bbook8已解决信息延迟问题 并已升级页面 </p>
        <p style="fontWeight:700">更多问题请和客服反馈 感谢使用</p>
      </div>
    </div>
    <div class="login-button" v-if="!tokens">
      <div class="login-left">
        <p>{{$t('m.Hello')}}，</p>
        <span>{{$t('m.Welcometo')}} B BOOK 8</span>
      </div>
      <div class="login-right">
        <input type="button" :value="$t('m.Login')" @click="login" />
        <input type="button" :value="$t('m.Register')" @click="register" />
      </div>
    </div>
    <div class="border"></div>
    <div class="home-number">
      <div :class="'home-number1' + indexs" v-for="(items,indexs) in homeArr" :key="indexs">
        <div class="home-number2">
          <i class="iconfont">{{items.icontext}}</i>
          <h4>{{(items.designation).slice(0,3)}}</h4>
          <span>/USDT</span>
        </div>
        <h5 :class="(((((items.price + items.price2 ) / 2 ) - items.open) /items.open) * 100).toFixed(2) >=0?'green':'greenred'">{{((items.price + items.price2) / 2).toFixed(2)}}</h5>
       <P :class="(((((items.price + items.price2 ) / 2 ) - items.open) /items.open) * 100).toFixed(2) >=0?'green':'greenred'"> <span style="color:#1dd086"  v-if="(((((items.price + items.price2 ) / 2 ) - items.open) /items.open) * 100).toFixed(2) >=0">+</span>{{(((((items.price + items.price2 ) / 2 ) - items.open) /items.open) * 100).toFixed(2)}}%</P>
        <span v-show="CNY && USD">￥{{(((items.price + items.price2) / 2) * (CNY/USD)).toFixed(2)}}</span>
      </div>
      <!-- <div class="home-number1">
        <div class="home-number3">
          <i class="iconfont icon-eth"></i>
          <h4>ETH</h4>
          <span>/USDT</span>
        </div>
        <h5>6870.37</h5>
        <P>-3.89%</P>
        <span>￥59621.84</span>
      </div>
      <div class="home-number1">
        <div class="home-number4">
          <i class="iconfont icon-btc1"></i>
          <h4>BCH</h4>
          <span>/USDT</span>
        </div>
        <h5>6870.37</h5>
        <P>-3.89%</P>
        <span>￥59621.84</span>
      </div>-->
    </div>

    <div class="home-guide">
      <div class="left" @click="tradingguide">
        <img src="../../assets/image/组11@2x.png" alt />
        <h3>{{$t('m.NoviceTradingGuide')}}</h3>
        <span>{{$t('m.Introductionteaching')}}</span>
      </div>
      <div class="right" @click="join">
        <img src="../../assets/image/组1@2x.png" alt />
        <h3>{{$t('m.Jointheofficialgroup')}}</h3>
        <span>{{$t('m.Getnewredenvelopes')}}</span>
      </div>
    </div>
    <div class="home-last">
      <div class="home-last1">
        <h4>{{$t('m.Name')}}</h4>
        <h4>{{$t('m.Latestprice')}}</h4>
        <h4>{{$t('m.Upanddown')}}</h4>
      </div>
      <div class="home-last2" v-for="(item,index) in homeArr" :key="index">
        <div class="home-one">
          <div class="home-one1">
            <h3>{{(item.designation).slice(0,3)}}</h3>
            <span>/USDT</span>
          </div>
          <p>{{$t(item.designationchinese)}}</p>
        </div>
        <div class="home-two">
          <h3>{{((item.price + item.price2) / 2).toFixed(2)}}</h3>
          <p v-show="CNY && USD">￥{{(((item.price + item.price2) / 2) * (CNY/USD)).toFixed(2)}}</p>
        </div>
        <div class="home-three">
          <input type="button" :class="(((((item.price + item.price2 ) / 2 ) - item.open) /item.open) * 100).toFixed(2) >= 0?'backgreen':'backgreenred'" :value="(((((item.price + item.price2 ) / 2 ) - item.open) /item.open) * 100).toFixed(2) >= 0? '+' + (((((item.price + item.price2 ) / 2 ) - item.open) /item.open) * 100).toFixed(2) + '%':(((((item.price + item.price2 ) / 2 ) - item.open) /item.open) * 100).toFixed(2) + '%'" />
        </div>
      </div>
       <div class="app">
         <div>{{$t('m.Download')}}</div>
         <div>
       <button style="color:black" @click="Android" class="button3">
         <!-- <a :href="Android">Android</a> -->
         <!-- <a href="#">Android</a> -->
         Android
         </button>
       <button class="button3">
         <a :href="ios">IOS</a>
       </button>
       </div>
     </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../common/mixin/ff.scss";
html,
body {
 
}
 .green{
    color: #1dd086;
  }
  .greenred {
    color: red;
  }
  .backgreen {
    background: #1dd086
  }
  .backgreenred {
    background: red;
  }
.app {
  background: rgba($color: #000000, $alpha:0.5);
  height:1.6rem /* 120/75 */;
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  margin-top: 10px;
  color: #eff0f2;
  font-size: 22px;
  .button3 {
    appearance: none;
    width: 2.4rem /* 180/75 */;
    height:.933333rem /* 70/75 */;
    border: 1px solid black;
    border-radius: 8px;
    font-size: 18px;
    margin-right: .066667rem /* 5/75 */;
    background: white;
    a {
    color: black;

    }
  }
}
.home {
 
  .home-title {
    width: 100%;
    // position: fixed;
    h1 {
      background: #ffffff;
      width: 100%;
      height: 1.173333rem /* 88/75 */;
      padding: 0.333333rem /* 25/75 */ 0rem /* 0/75 */ 0rem /* 0/75 */ 0rem
        /* 0/75 */;
      margin: auto;
      text-align: center;
      img {
        width: 5.5rem /* 460/75 */;
        // height: .8rem /* 60/75 */;
        margin: 0 auto;
        position: relative;
        top: 50%;
        margin-top: -0.8rem;
      }
    }
  }
  .home-banner {
    height: 6.666667rem /* 500/75 */;
    margin-bottom: 0.32rem /* 24/75 */;
      // padding-top: 1.173333rem;
    img {
      width: 100%;
      height: 6.666667rem /* 500/75 */;
    }
  }
  .home-news {
    display: flex;
    height: 1.293333rem /* 97/75 */;
    border-bottom: 1px solid #eeeeee;
    padding-left: 0.32rem /* 24/75 */;
     .icon-gonggao3{
    font-size:.533333rem /* 40/75 */;
    color: red;
  }
   
    img {
      width: 1.066667rem /* 80/75 */;
      height: 1.066667rem /* 80/75 */;
    }
    .p {
      height: 1.066667rem /* 80/75 */;
      line-height: 0.533333rem /* 40/75 */;
      font-size: 0.4rem /* 30/75 */;
      color: #000000;
      padding-left:.24rem /* 18/75 */;
    }
  }

  .home-number {
    display: flex;
    justify-content: space-between;
    padding-left: 0.693333rem /* 52/75 */;
    margin-right: 0.693333rem /* 52/75 */;
    width: 88.5%;
    .home-number11,
    .home-number12,
    .home-number10 {
      height: 2.533333rem /* 190/75 */;
      text-align: center;
      padding-top: 0.426667rem /* 32/75 */;

      h5 {
        font-size: 0.533333rem /* 40/75 */;
        margin-bottom: 0.12rem /* 9/75 */;
        // color: red;
      }
      p {
        font-size: 0.346667rem /* 26/75 */;
        text-align: center;
        margin-bottom: 0.133333rem /* 10/75 */;
        // color: red;
      }
      span {
        font-size: 0.373333rem /* 28/75 */;
        text-align: center;
        color: #a7a7a7;
      }
      .iconfont {
        color: #127df6;
        font-size: 0.386667rem /* 29/75 */;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
    .home-number10 {
      .iconfont {
        color: #f9a135;
        font-size: 0.386667rem /* 29/75 */;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
    .home-number12 {
      .iconfont {
        color: #4fce59;
        font-size: 0.386667rem /* 29/75 */;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
    .home-number2,
    .home-number3,
    .home-number4 {
      h4 {
        font-size: 0.453333rem /* 34/75 */;
      }
      span {
        font-size: 0.266667rem /* 20/75 */;
        line-height: 0.533333rem /* 40/75 */;
        color: #a7a7a7;
      }
    }
    .home-number2 {
      display: flex;
      margin-bottom: 0.146667rem /* 11/75 */;
      text-align: center;

      .iconfont {
        font-size: 0.386667rem /* 29/75 */;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }

    .home-number3 {
      display: flex;
      margin-bottom: 0.146667rem /* 11/75 */;
      .iconfont {
        font-size: 0.386667rem /* 29/75 */;
        color: #127df6;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
    .home-number4 {
      margin-bottom: 0.146667rem /* 11/75 */;

      display: flex;
      .iconfont {
        font-size: 0.386667rem /* 29/75 */;
        color: #4fce59;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
  }
  .border {
    border: 1px solid #fafcff;
  }

  .login-button {
    display: flex;
    justify-content: space-between;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    height: 2.586667rem /* 194/75 */;
    padding-top: 0.8rem /* 60/75 */;
    box-sizing: border-box;
    .login-left,
    .login-right {
      width: 4.453333rem /* 334/75 */;
      font-size: 0.346667rem /* 26/75 */;
    }
    .login-left {
      p {
        margin-bottom: 0.32rem /* 24/75 */;
      }
    }
    .login-right {
      display: flex;
      padding-top: 0.266667rem /* 20/75 */;

      input {
        width: 2.066667rem /* 155/75 */;
        height: 0.8rem /* 60/75 */;
        text-align: center;
        border-radius: 4px;
        appearance: none;
      }
      :nth-child(1) {
        margin-right: 0.346667rem /* 26/75 */;
        background: #127df6;
        color: white;
      }
      :nth-child(2) {
        background: white;
        color: #707070;
        border: 1px solid #666666;
      }
    }
  }

  .home-guide {
    height: 4.173333rem /* 313/75 */;
    display: flex;
    justify-content: space-between;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    margin-top: 0.066667rem /* 5/75 */;
    margin-bottom: 0.533333rem /* 40/75 */;
    .left,
    .right {
      width: 4.453333rem /* 334/75 */;
      height: 2.72rem /* 204/75 */;

      text-align: center;
      padding-top: 0.8rem /* 60/75 */;
      padding-bottom: 0.64rem /* 48/75 */;

      h3 {
        font-size: 0.346667rem /* 26/75 */;
        font-weight: 700;
        margin-bottom: 0.16rem /* 12/75 */;
      }
      span {
        font-size: 0.32rem /* 24/75 */;
        color: #a7a7a7;
      }
      //
    }
    .left {
      box-shadow: 0px 1px 4px #eff0f2;

      img {
        width: 1.613333rem /* 121/75 */;
        height: 1.533333rem /* 115/75 */;
        margin-bottom: 0.16rem /* 12/75 */;
      }
    }
    .right {
      box-shadow: 0px 1px 4px #eff0f2;

      img {
        width: 1.213333rem /* 91/75 */;
        height: 1.48rem /* 111/75 */;
        margin-bottom: 0.16rem /* 12/75 */;
      }
    }
  }

  .home-last {
    height: 7.44rem /* 558/75 */;
    margin-bottom: 1.4rem;
    .home-last1 {
      display: flex;
      justify-content: space-between;
      font-size: 0.346667rem /* 26/75 */;
      color: #333333;
      height: 1.186667rem /* 89/75 */;
      line-height: 1.186667rem /* 89/75 */;
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      margin-left: 0.32rem /* 24/75 */;
      margin-right: 0.32rem /* 24/75 */;
    }
    .home-last2 {
      display: flex;
      justify-content: space-between;
      padding-left: 0.32rem /* 24/75 */;
      padding-right: 0.32rem /* 24/75 */;
      padding-top: 0.426667rem /* 32/75 */;

      .home-one {
        .home-one1 {
          display: flex;
          h3 {
            font-size: 0.453333rem;
          }
          span {
            font-size: 0.266667rem;
            line-height: 0.533333rem;
            color: #a7a7a7;
          }
        }
        p {
          color: #a7a7a7;
          font-size: 0.346667rem /* 26/75 */;
          margin-top: 0.133333rem /* 10/75 */;
        }
      }
      .home-two {
        width: 1.933333rem /* 70/75 */;
        h3 {
          font-size: 0.453333rem;
        }
        p {
          color: #a7a7a7;
          font-size: 0.346667rem /* 26/75 */;
          margin-top: 0.133333rem /* 10/75 */;
        }
      }
      .home-three {
        input {
          width: 2.133333rem /* 160/75 */;
          height: 0.866667rem /* 65/75 */;
          // background: #1dd086;
          appearance: none;
          border-radius: 4px;
          color: white;
          font-size: 0.4rem /* 30/75 */;
        }
      }
    }
  }
}
</style>
<style lang="scss">
</style>
<script>
import { mapMutations } from "vuex";
import store from "../../store";
import { getUTCtime } from "../../tools/check.js";
var api = require("../../api/api");

export default {
  data() {
    return {
      tokens: "",
      lang: localStorage.getItem("engs"),
      Androids:"",
      ios:"",
      homeList: [],
      CNY: null,
      USD: null,
      enpng:"",
      schpng:"",
      tchpng:"",
      List: [
        {
          designation: "BTCUSD.",
          price: 9782.36,
          price2: 9782.36,
          tariff: "￥0.00",
          designationchinese: "m.BTC",
          percentage: "+0.52%",
          icontext: "\ue62d"
        },
        {
          designation: "ETHUSD.",
          price: 214.73,
          price2: 214.73,
          tariff: "￥0.00",
          designationchinese: "m.ETH",
          percentage: "-1.25%",
          icontext: "\ue63a"
        },
        {
          designation: "BCHUSD.",
          price: 256.23,
          price2: 256.23,
          tariff: "￥798.23",
          designationchinese: "m.BCH",
          percentage: "-2.56%",
          icontext: "\ue62d"
        }
      ]
    };
  },

  created() {
    this.tokens = localStorage.getItem("token");
    // this.rate();
    console.log(this.lang, "lang");
    console.log(window.location, "search");
    this.rate()
    // this.CNY = localStorage.getItem("CNY")
    // this.USD = localStorage.getItem("USD")
    this.getbanner()
    this.getappinfo()
    // this.getaccount()
    // this.homewebsocket()
  },

  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(from);
    if (from.path === "/login") {
      next(vm => {
        vm.tokens = localStorage.getItem("token");
        console.log(vm.tokens, " this.token ");
        if (vm.tokens) {
          // vm.get();
          vm.getdata3();
          vm.getdata2();
          vm.getdata6();
        }
      });
    }
    next();
  },

  mounted() {
  },
  computed: {
    homeArr: function() {
      if (this.homeList) {
        for (let i = 0; i < this.List.length; i++) {
          for (let j = 0; j < this.homeList.length; j++) {
            var data1 = this.List[i];
            var data2 = this.homeList[j];
            if (data1.designation == data2.symbol) {
              data1.price = Number(data2.ask);
              data1.price2 = Number(data2.bid);
            }
          }
        }
      }
        for(var i = 0;i <this.List.length; i++) {
        var designations = this.List[i]
        console.log(store.state.exchangeBTCUSD,"啊啊啊啊啊啊啊啊啊啊啊啊啊啊")
        if(designations.designation === "BTCUSD.") {
         designations.open = store.state.exchangeBTCUSD.open
        } else if(designations.designation === "BCHUSD.") {
         designations.open = store.state.exchangeBCHUSD.open
        } else if (designations.designation === "ETHUSD.") {
        designations.open = store.state.exchangeETHUSD.open
        }
        else if (designations.designation === "XRPUSD.") {
        designations.open = store.state.exchangeXRPUSD.open
        }
        else if (designations.designation === "LTCUSD.") {
        designations.open = store.state.exchangeLTCUSD.open
        }
        else if (designations.designation === "BSVUSD.") {
        designations.open = store.state.exchangeBSVUSD.open
        }
        else if (designations.designation === "EOSUSD.") {
        designations.open = store.state.exchangeEOSUSD.open
        }
        else if (designations.designation === "ETCUSD.") {
        designations.open = store.state.exchangeETCUSD.open
        }
        else if (designations.designation === "LINKUSD.") {
        designations.open = store.state.exchangeLINKUSD.open
        }
        else if (designations.designation === "TRXUSD.") {
        designations.open = store.state.exchangeTRXUSD.open
        }
      }
      console.log(this.List,"this.List")
      return this.List;
    }
  },
  components: {},
  activated() {
     this.lang = localStorage.getItem("engs")
      this.CNY = localStorage.getItem("CNY")
    this.USD = localStorage.getItem("USD")
  },
  methods: {
    ...mapMutations(["setorder"]),
    ...mapMutations(["setcontractsList"]),
    ...mapMutations(["setArr"]),
    // ...mapMutations(["setMax"]),
    // ...mapMutations(["setMax1"]),
    // ...mapMutations(["setMax2"]),
    // ...mapMutations(["setLow"]),
    // ...mapMutations(["setLow1"]),
    // ...mapMutations(["setLow2"]),
    ...mapMutations(["setexchangeArr"]),
    tradingguide() {
      this.$router.push("/tradingguide");
    },
     //首页的汇率
     rate() {
      this.$http.get(api.getnumber).then(data => {
        this.CNY = data.data.rates.CNY;
        this.USD = data.data.rates.USD;
        localStorage.setItem("CNY",this.CNY)
        localStorage.setItem("USD",this.USD)
      });
    },
    join() {
      this.$router.push("/join");
    },
    news() {
      this.$router.push("/information");
    },
    getbanner() {
      this.$http.get(api.banner).then(({data})=>{
        this.enpng = data.en
        this.schpng = data.sch
        this.tchpng = data.tch
        console.log(data,"1")
        console.log(this.schpng,"2")
        console.log(this.tchpng,"3")
         
      })

    },
    // rate() {
    //   this.$http.get(api.getnumber).then(data => {
    //     this.CNY = data.data.rates.CNY;
    //     this.USD = data.data.rates.USD;
    //     localStorage.setItem("CNY",this.CNY)
    //     localStorage.setItem("USD",this.USD)
    //   });
    // },
   
    //     getaccount() {
    //  this.$http
    //         .get(api.AccountURL)
    //         .then(({ data }) => {
    //           console.log(data);
    //           if (data.code === 0) {
    //             // this.$store.commit("hideLoading");
    //             // this.accountList.push(data.data);
    //             localStorage.setItem("balance", data.data.balance);
    //             // console.log(this.accountList, " this.accountList");
    //           } else {
    //           }
    //         })
    //     },

    getdata3() {
      this.$http.get(api.Positionorders).then(({ data }) => {
        this.ordersList = data.data;
        var order = this.ordersList;
        for (var i = 0; i < order.length; i++) {
          if (store.state.mydata.length !=0) {
            for (var j = 0; j < store.state.mydata.length; j++) {
              var data0 = order[i];
              var data1 = store.state.mydata[j];
              if (data0.symbolName === data1.symbol) {
                order[i].ask = data1.ask;
                order[i].bid = data1.bid;
              } else {
                return;
              }
            }
          } else {
            order[i].ask = "0.00";
            order[i].bid = "0.00";
          }
        }

        this.setorder(order);
      });
    },
    getdata2() {
      this.$http.get(api.Positioncontracts).then(({ data }) => {
        this.contractsList = data.data;
        var contractsLists = this.contractsList;
        for (var f = 0; f < this.contractsList.length; f++) {
          if (store.state.mydata.length != 0) {
            for (var j = 0; j < store.state.mydata.length; j++) {
              var data0 = this.contractsList[f];
              var data1 = store.state.mydata[j];
              if (data0.symbolName === data1.symbol) {
                this.contractsList[f].ask = data1.ask;
                this.contractsList[f].bid = data1.bid;
              } else {
                return;
              }
            }
          } else {
            this.contractsList[f].bid = "0.00";
            this.contractsList[f].ask = "0.00";
          }
        }
        this.setcontractsList(contractsLists);
      });
    },
    getdata6() {
      this.$http.get(api.MarketURL).then(({ data }) => {
        this.all = data.data;
        for (var i = 0; i < this.all.length; i++) {
          if (store.state.mydata.length !=0) {
            for (var j = 0; j < store.state.mydata.length; j++) {
              var data0 = this.all[i];
              var data1 = store.state.mydata[j];
              if (data0.symbolName === data1.symbol) {
                this.all[i].ask = data1.ask;
                this.all[i].bid = data1.bid;
              } else {
                return;
              }
            }
          } else {
            this.all[i].ask = "0.00";
            this.all[i].bid = "0.00";
          }
        }

        this.setArr(this.all);
      });
    },
    // getuserId() {

    // get() {
    //   this.$http.get(api.chart).then((data)=>{
    //   var dataarrBCHUSD = data.data.BCHUSD
    //   var dataarrBTCUSD = data.data.BTCUSD
    //   var dataarrETHUSD = data.data.ETHUSD
    //   this.setexchangeBCHUSD(dataarrBCHUSD)
    //   this.setexchangeBTCUSD(dataarrBTCUSD)
    //   this.setexchangeETHUSD(dataarrETHUSD)
    
    //   })
      // this.starttime = new Date(new Date().setDate(new Date().getDate() - 1));
      // this.starttime = new Date(
      //   this.starttime.setHours(new Date().getHours() + 2)
      // );
      // this.starttime = getUTCtime(this.starttime);
      // console.log(this.starttime, "this.starttime");
      // this.endtime = new Date(new Date().setHours(new Date().getHours() + 2));
      // this.endtime = getUTCtime(this.endtime);
      // console.log(this.endtime, "this.endtime");
      // this.$http
      //   .get(api.chartBTCUSD + this.starttime + "&to=" + this.endtime)
      //   .then(({ data }) => {
      //     this.list = data.data;
      //     console.log(this.list, "图标1");
      //     this.high();
      //   });
      // this.$http
      //   .get(api.chartETHUSD + this.starttime + "&to=" + this.endtime)
      //   .then(({ data }) => {
      //     this.list1 = data.data;
      //     console.log(this.list, "图标2");
      //     this.high1();
      //   });
      // this.$http
      //   .get(api.chartBCHUSD + this.starttime + "&to=" + this.endtime)
      //   .then(({ data }) => {
      //     this.list2 = data.data;
      //     console.log(this.list, "图标3");
      //     this.high2();
      //   });
    // },
    // high() {
    //   for (let i = 0; i < this.list.length - 1; i++) {
    //     this.max = this.list[0].high;
    //     this.max =
    //       this.max < this.list[i + 1].high ? this.list[i + 1].high : this.max;
    //     this.low = this.list[0].low;
    //     this.low =
    //       this.low < this.list[i + 1].low ? this.list[i + 1].low : this.low;
    //   }
    //   this.setMax(this.max);
    //   this.setLow(this.low);
    //   console.log(this.max, "max");
    // },
    // high1() {
    //   for (let i = 0; i < this.list1.length - 1; i++) {
    //     this.max1 = this.list1[0].high;
    //     this.max1 =
    //       this.max1 < this.list1[i + 1].high
    //         ? this.list1[i + 1].high
    //         : this.max1;
    //     this.low1 = this.list1[0].low;
    //     this.low1 =
    //       this.low1 < this.list1[i + 1].low1 ? this.list[i + 1].low : this.low1;
    //   }
    //   this.setMax1(this.max1);
    //   this.setLow1(this.low1);
    //   console.log(this.max1, "max");
    // },
    // high2() {
    //   for (let i = 0; i < this.list2.length - 1; i++) {
    //     this.max2 = this.list2[0].high;
    //     this.max2 =
    //       this.max2 < this.list2[i + 1].high
    //         ? this.list2[i + 1].high
    //         : this.max2;
    //     this.low2 = this.list2[0].low;
    //     this.low2 =
    //       this.low2 < this.list2[i + 1].low ? this.list2[i + 1].low : this.low2;
    //   }
    //   this.setMax2(this.max2);
    //   this.setLow2(this.low2);
    // },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    Android() {
      var u = navigator.userAgent;
     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
     var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
     if(isAndroid) {
       
       window.location.href = this.Androids

     }else {
       this.$toast("请下载ios版本")
     }

    },
    getappinfo() {
      this.$http.get(api.appinfo).then(({data})=>{
         console.log(data,"你好哈")
         this.ios = data.ios.address
         this.Androids = data.android.address

             })
    }
  },
  watch: {
    "$store.state.mydata2": function(newer2, old2) {
      this.homeList = newer2;
    }
  }
};
</script>

    
