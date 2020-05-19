<template>
  <div class="home">
    <div class="home-title">
      <h1 class="home-img">
        <img src="../../assets/image/logo3.png" alt />
      </h1>
    </div>
    <div class="home-banner" v-if="lang==='zh-CN'">
      <img src="../../assets/image/banner.jpg" alt />
    </div>
     <div class="home-banner" v-if="lang==='en-US'">
      <img src="../../assets/image/banner1.jpg" alt />
    </div>
     <div class="home-banner" v-if="lang==='tc-US'">
      <img src="../../assets/image/banner2.jpg" alt />
    </div>
    <div class="home-news" @click="news">
      <div>
        <img src="../../assets/image/热点新闻@2x.png" alt />
      </div>
      <div class="p">
        <p>比特币和黄金阅读及年度相关性问题</p>
        <p>比特币交易平台</p>
      </div>
    </div>
    <div class="login-button" v-if="!tokens">
      <div class="login-left">
        <p>{{$t('m.Hello')}}，</p>
        <span>{{$t('m.Welcometo')}} BLITZ BOOK 8</span>
      </div>
      <div class="login-right">
        <input type="button" :value="$t('m.Login')" @click="login" />
        <input type="button" :value="$t('m.Register')" @click="register" />
      </div>
    </div>
    <div class="border"></div>
    <div class="home-number">
      <div class="home-number1">
        <div class="home-number2">
          <i class="iconfont icon-btc1"></i>
          <h4>BTC</h4>
          <span>/USDT</span>
        </div>
        <h5>6870.37</h5>
        <P>-3.89%</P>
        <span>￥59621.84</span>
      </div>
      <div class="home-number1">
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
      </div>
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
      <div class="home-last2" v-for="(item,index) in List" :key="index">
        <div class="home-one">
          <div class="home-one1">
            <h3>{{item.designation}}</h3>
            <span>/USDT</span>
          </div>
          <p>{{item.designationchinese}}</p>
        </div>
        <div class="home-two">
          <h3>{{item.price}}</h3>
          <p>{{item.tariff}}</p>
        </div>
        <div class="home-three">
          <input type="button" :value="item.percentage" />
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
.home {
  .home-title {
    width: 100%;
    h1 {
      width: 100%;
      height: 1.173333rem /* 88/75 */;
      padding: 0.333333rem /* 25/75 */ 0rem /* 0/75 */ 0rem /* 0/75 */ 0rem
        /* 0/75 */;
      margin: auto;
      text-align: center;
      img {
        width: 6.12rem /* 459/75 */;
        height: 0.66rem /* 67/75 */;
        margin: 0 auto;
        position: relative;
        top: 50%;
        margin-top: -3.06rem;
      }
    }
  }
  .home-banner {
    height: 6.666667rem /* 500/75 */;
    margin-bottom: 0.32rem /* 24/75 */;
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
    img {
      width: 1.066667rem /* 80/75 */;
      height: 1.066667rem /* 80/75 */;
    }
    .p {
      height: 1.066667rem /* 80/75 */;
      line-height: 0.533333rem /* 40/75 */;
      font-size: 0.4rem /* 30/75 */;
      color: #535353;
      padding-left: 0.213333rem /* 16/75 */;
    }
  }

  .home-number {
    display: flex;
    justify-content: space-between;
    padding-left: 0.693333rem /* 52/75 */;
    margin-right: 0.693333rem /* 52/75 */;
    width: 88.5%;
    .home-number1 {
      height: 2.533333rem /* 190/75 */;
      text-align: center;
      padding-top: 0.426667rem /* 32/75 */;
      h5 {
        font-size: 0.533333rem /* 40/75 */;
        margin-bottom: 0.12rem /* 9/75 */;
        color: red;
      }
      p {
        font-size: 0.346667rem /* 26/75 */;
        text-align: center;
        margin-bottom: 0.133333rem /* 10/75 */;
        color: red;
      }
      span {
        font-size: 0.373333rem /* 28/75 */;
        text-align: center;
        color: #a7a7a7;
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
        color: #f9a135;
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
    margin-bottom: 0.8rem /* 60/75 */;
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
        // padding-left: 2.4rem /* 180/75 */;
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
        // padding-left: 2.4rem /* 180/75 */;
        input {
          width: 2.133333rem /* 160/75 */;
          height: 0.866667rem /* 65/75 */;
          background: #1dd086;
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
var api = require("../../api/api")

export default {
  data() {
    return {
      tokens: "",
      lang:localStorage.getItem("lang"),
      List: [
        {
          designation: "BTC",
          price: "6253.25",
          tariff: "￥59621.84",
          designationchinese: "比特币",
          percentage: "+0.52%"
        },
        {
          designation: "ETH",
          price: "128.36",
          tariff: "￥1254.32",
          designationchinese: "以太坊",
          percentage: "-1.25%"
        },
        {
          designation: "BCH",
          price: "256.23",
          tariff: "￥798.23",
          designationchinese: "比特币现金",
          percentage: "-2.56%"
        }
      ]
    };
  },

  created() {
    this.tokens = store.state.Authorization;
  },

  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(from);
    if (from.path === "/login" || from.path === "/login") {
      next(vm => {
        vm.tokens = store.state.Authorization;
        console.log(vm.tokens, " this.token ");
        vm.get();
        vm.getdata3();
        vm.getdata2();
        vm.getdata6();
      });
    }
    next();
  },

  mounted() {},
  components: {},
  methods: {
    ...mapMutations(["setorder"]),
    ...mapMutations(["setcontractsList"]),
    ...mapMutations(["setArr"]),
    ...mapMutations(["setMax"]),
    ...mapMutations(["setMax1"]),
    ...mapMutations(["setMax2"]),
    ...mapMutations(["setLow"]),
    ...mapMutations(["setLow1"]),
    ...mapMutations(["setLow2"]),
    tradingguide() {
      this.$router.push("/tradingguide");
    },
    join() {
      this.$router.push("/join");
    },
    news() {
      this.$router.push("/information");
    },

    getdata3() {
      this.$http.get(api.Positionorders).then(({ data }) => {
        this.ordersList = data.data;
        var order = this.ordersList;
        // console.log( this.ordersList,"111111111")
        for (var i = 0; i < order.length; i++) {
          // console.log(order[i], "iiiii");
          order[i].bid = "0.00";
          order[i].ask = "0.00";
        }

        this.setorder(order);
      });
    },
    getdata2() {
      this.$http.get(api.Positioncontracts).then(({ data }) => {
        this.contractsList = data.data;
        var contractsLists = this.contractsList;
        for (var f = 0; f < this.contractsList.length; f++) {
          // console.log(this.contractsList[f], "fffff");
          this.contractsList[f].bid = "0.00";
          this.contractsList[f].ask = "0.00";
        }
        this.setcontractsList(contractsLists);
        //  console.log(store.state.contractsLists,"存上了")
        // this.getnewArr();
      });
    },
    getdata6() {
      this.$http.get(api.MarketURL).then(({ data }) => {
        this.all = data.data;
        //  console.log(this.all,"shazi ")
        for (var i = 0; i < this.all.length; i++) {
          //  console.log(this.all[i],"zuil")
          this.all[i].bid = "0.00";
          this.all[i].ask = "0.00";
        }

        this.setArr(this.all);
      });
    },
    // getuserId() {

    get() {
      this.starttime = new Date(new Date().setDate(new Date().getDate() - 1));
      this.starttime = new Date(
        this.starttime.setHours(new Date().getHours() + 2)
      );
      this.starttime = getUTCtime(this.starttime);
      console.log(this.starttime, "this.starttime");
      this.endtime = new Date(new Date().setHours(new Date().getHours() + 2));
      this.endtime = getUTCtime(this.endtime);
      console.log(this.endtime, "this.endtime");
      this.$http
        .get(
          api.chartBTCUSD +
            this.starttime +
            "&to=" +
            this.endtime
        )
        .then(({ data }) => {
          this.list = data.data;
          console.log(this.list, "图标1");
          this.high();
        });
      this.$http
        .get(
          api.chartETHUSD +
            this.starttime +
            "&to=" +
            this.endtime
        )
        .then(({ data }) => {
          this.list1 = data.data;
          console.log(this.list, "图标2");
          this.high1();
        });
      this.$http
        .get(
          api.chartBCHUSD +
            this.starttime +
            "&to=" +
            this.endtime
        )
        .then(({ data }) => {
          this.list2 = data.data;
          console.log(this.list, "图标3");
          this.high2();
        });
    },
    high() {
      for (let i = 0; i < this.list.length - 1; i++) {
        this.max = this.list[0].high;
        // console.log(this.list[i+1])
        this.max =
          this.max < this.list[i + 1].high ? this.list[i + 1].high : this.max;
        this.low = this.list[0].low;
        // console.log(this.list[i+1])
        this.low =
          this.low < this.list[i + 1].low ? this.list[i + 1].low : this.low;
      }
      this.setMax(this.max);
      this.setLow(this.low);
      console.log(this.max, "max");
    },
    high1() {
      for (let i = 0; i < this.list1.length - 1; i++) {
        this.max1 = this.list1[0].high;
        // console.log(this.list[i+1])
        this.max1 =
          this.max1 < this.list1[i + 1].high
            ? this.list1[i + 1].high
            : this.max1;
        this.low1 = this.list1[0].low;
        // console.log(this.list[i+1])
        this.low1 =
          this.low1 < this.list1[i + 1].low1 ? this.list[i + 1].low : this.low1;
      }
      this.setMax1(this.max1);
      this.setLow1(this.low1);
      console.log(this.max1, "max");
    },
    high2() {
      for (let i = 0; i < this.list2.length - 1; i++) {
        this.max2 = this.list2[0].high;
        // console.log(this.list[i+1])
        this.max2 =
          this.max2 < this.list2[i + 1].high
            ? this.list2[i + 1].high
            : this.max2;
        this.low2 = this.list2[0].low;
        // console.log(this.list[i+1])
        this.low2 =
          this.low2 < this.list2[i + 1].low ? this.list2[i + 1].low : this.low2;
      }
      this.setMax2(this.max2);
      this.setLow2(this.low2);
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>
    
