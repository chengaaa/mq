<template>
  <keep-alive>
    <div class="quotation" style="overflow: auto; height: 100%">
      <div class="header">
        <div class="red-title">
          <h1 class="red-img">
            <img src="../../assets/images/logo1.png" alt />
          </h1>
        </div>
      </div>
      <div class="border"></div>
      <!-- 简单的 -->
      <div class="pickers">
        <van-action-sheet
          :cancel-text="$t('m.Cancel')"
          v-model="show"
          :actions="actions"
          @select="onSelect"
        />
      </div>
      <div>
        <div
          class="home-last2"
          v-for="(itemsss, indexxx) in QuotationArr"
          :key="indexxx"
          @click="selectType(itemsss.symbolName)"
        >
          <div class="home-one">
            <img :src="itemsss.img" alt="" />
            <div class="home-one1">
              <div class="display1">
                <h3>{{ itemsss.symbolName.slice(0, 3) }}</h3>
                <span style="color: #c9c9c9">/USDT</span>
              </div>
              <p>比特币</p>
            </div>
          </div>
          <div class="home-two">
            <div class="low">
              <p :id="itemsss.symbolName" :class="[itemsss.ask < itemsss.open ? 'open':'arr']">
                <!-- <span class="span1">{{itemsss.bid}}</span> -->

                <span class="span1">{{
                  itemsss.bid.substring(0, itemsss.bid.indexOf("."))
                }}</span>
                <span class="span2">{{
                  itemsss.bid.slice(itemsss.bid.indexOf("."), -1)
                }}</span>
                <span class="span3">{{ itemsss.bid.substr(-1, 1) }}</span>
              </p>
              <h5>Low:{{ itemsss.low }}</h5>
            </div>
          </div>
          <div class="home-two">
            <div class="low">
              <p :id="itemsss.path" :class="[itemsss.bid < itemsss.open ? 'open':'arr']">
                <span class="span1">{{
                  itemsss.ask.substring(0, itemsss.ask.indexOf("."))
                }}</span>
                <span class="span2">{{
                  itemsss.ask.slice(itemsss.ask.indexOf("."), -1)
                }}</span>
                <span class="span3">{{ itemsss.ask.substr(-1, 1) }}</span>
              </p>
              <h5>High:{{ itemsss.max }}</h5>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          class="home-last2"
          v-for="(item, index) in symbolArr"
          :key="index"
          @click="selectType(item.symbol)"
        >
          <div class="home-one">
            <img :src="item.imgs" alt="" />
            <div class="home-one1">
              <div class="display1">
                <h3>{{ item.symbol.slice(0, 3) }}</h3>
                <span style="color: #c9c9c9">/USDT</span>
              </div>
              <p>比特币</p>
            </div>
          </div>
          <div class="home-two">
            <div class="low">
              <p :id="item.symbol" :class="[item.bid < item.open ? 'open':'arr']">
                <span class="span1">{{
                  item.bid.substring(0, item.bid.indexOf("."))
                }}</span>
                <span class="span2">{{
                  item.bid.slice(item.bid.indexOf("."), -1)
                }}</span>
                <span class="span3">{{ item.bid.substr(-1, 1) }}</span>
              </p>
              <h5>Low:{{ item.low }}</h5>
            </div>
          </div>
          <div class="home-two">
            <div class="low">
              <p :id="item.symbol" :class="[item.ask < item.open ? 'open':'arr']">
                <span class="span1">{{
                  item.ask.substring(0, item.ask.indexOf("."))
                }}</span>
                <span class="span2">{{
                  item.ask.slice(item.ask.indexOf("."), -1)
                }}</span>
                <span class="span3">{{ item.ask.substr(-1, 1) }}</span>
              </p>
              <h5>High:{{ item.high }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<style lang="scss" scoped>
  
.blue {
  background: #127df6;
  color: white;
}
.white {
  background: white;
  color: #127df6;
}
.blue1 {
  background: #127df6;
  color: white;
}
.white1 {
  background: white;
  color: #127df6;
}
.home-last2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 30px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #565656;
  .home-one {
    display: flex;
    .display1 {
      display: flex;
    }
    img {
      width: 0.8rem /* 60/75 */;
      height: 0.8rem /* 60/75 */;
      margin-right: 0.266667rem /* 20/75 */;
      position: relative;
      top: -0.1rem /* 12/75 */;
    }
    .home-one1 {
      display: flex;
      flex-direction: column;

      h3 {
        font-size: 22px;
        // font-family:sourcehansanscn B;
        color: #ffffff;
      }
      span {
        font-size: 14px;
        line-height: 0.533333rem;
        // color: #a7a7a7;
      }
    }
    p {
      color: #ffffff;
      font-size: 14px;
      margin-top: 0.133333rem /* 10/75 */;
      // text-align: center;
      // margin-left:0.266667rem;
    }
  }
  .home-two {
    width: 1.933333rem /* 70/75 */;
    .span1 {
      font-size: 22px;
    }
    .span2 {
      font-size: 28px;
    }
    .span3 {
      position: relative;
      top: -14px;
      left: 6px;
      font-size: 16px;
    }
    h3 {
      font-size: 14px;
      color: white;
      // font-family: sourcehansanscn B;
    }
  
    .arr{
    color:#32a53b;
  } 
  .open {
  color:red;
  }
    p {
      color: #32a53b;
      font-size: 0.346667rem /* 26/75 */;
      // margin-top: 0.133333rem /* 10/75 */;
    }
    h5 {
      color: #ffffff;
      margin-top: 0.133333rem /* 10/75 */;
      font-size: 14px;
    }
    .low {
      text-align: center;
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
      font-weight: 700;
      // font-family: sourcehansanscn B ;
    }
  }
}
.quotation {
  padding-top: 1.366667rem /* 80/75 */;
  background: #262626;
  position: absolute;
  bottom: 0;
  top: 0;
  overflow: auto;
  width: 100%;
  // padding-left: 0.4rem /* 30/75 */;
  // padding-right: 0.4rem /* 30/75 */;
  .border {
    height: 40px;
    border-bottom: 1px solid #565656;
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    // background: #f5f5f5;
    position: fixed;
    top: 0.266667rem /* 20/75 */;
    width: 100%;
    height: 1.173333rem /* 88/75 */;
    z-index: 100;
    border-bottom: 1px solid #e5e5e5;
    .red-title {
      width: 100%;
      display: flex;
      position: relative;

      h1 {
        background: #262626;
        width: 100%;
        height: 1.173333rem /* 88/75 */;
        padding: 0.333333rem /* 25/75 */ 0rem /* 0/75 */ 0rem /* 0/75 */ 0rem
          /* 0/75 */;
        margin: auto;
        text-align: center;
        border-bottom: 1px solid #565656;

        img {
          width: 4rem /* 300/75 */;
          // height: .8rem /* 60/75 */;
          margin: 0 auto;
          position: relative;
          top: 50%;
          margin-top: -0.8rem;
        }
      }
    }
    #van-icon {
      font-size: 0.733333rem /* 55/75 */;
    }
    .edit-icon {
      flex: 1;
      div {
        height: 0.586667rem /* 44/75 */;
        width: 0.586667rem /* 44/75 */;
      }
    }
    .add-icon {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: flex-end;
      padding-right: 0.533333rem /* 40/75 */;
    }
    .switch-tab {
      flex: 1.6;
      display: flex;
      flex-direction: row;
      text-align: center;
      line-height: 0.8rem /* 60/75 */;
      div {
        flex: 1;
        border: 1px solid #3278fe;
        height: 0.8rem /* 60/75 */;
        font-family: "Tahoma", "sans-serif";
        &.left {
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          font-size: 0.32rem /* 24/75 */;
        }
        &.right {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          font-size: 0.32rem /* 24/75 */;
        }
      }
    }
    .add-icon {
      flex: 1;
    }
  }
  .active {
    color: #127df6;
  }
  .noactive {
    color: brown;
  }
  .hh {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #565656;
    padding-top: 0.133333rem /* 10/75 */;
    padding-bottom: 0.133333rem /* 10/75 */;
    height: 1.333333rem /* 100/75 */;

    .mafan {
      width: 0.8rem;
      height: 0.8rem;
    }

    .kk {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100px;
      h1,
      h6 {
        height: 0.4rem /* 30/75 */;
        line-height: 0.4rem /* 30/75 */;
        font-size: 22px;
        font-weight: 700;
        font-family: "sans serif HelveticaNeueLT-Pro-57-Cn";
        font-weight: 700;
        color: #ffffff;
      }
      span,
      p {
        color: #bcbcbc;
        font-size: 14px;
      }
      p {
        margin-top: 10px;
      }
      h6 {
        font-size: 0.32rem /* 24/75 */;
        margin-bottom: 0.066667rem /* 5/75 */;
        font-family: "Sans";
        color: #797979;
        font-weight: 500;
      }
    }
    .low {
      // width: 2rem /* 150/75 */;
      // padding-left: 30px;
      // padding-right: 30px;
      height: 1.466667rem /* 110/75 */;
      display: flex;
      justify-content: center;
      flex-direction: column;
      p,
      h5 {
        height: 0.506667rem /* 38/75 */;
        line-height: 0.4rem /* 30/75 */;
        text-align: center;
      }
      h5 {
        font-size: 0.32rem /* 24/75 */;
        font-family: "Sans";
        color: #ffffff;
      }
      p {
        margin-bottom: 0.066667rem /* 5/75 */;
        font-family: "HelveticaNeueLT-Pro-57-Cn";
        font-size: 20px;
      }
    }
    p {
      // font-size: .466667rem /* 35/75 */;
      color: #32a53b;
      span:nth-child(2) {
        font-size: 30px;
      }
      span:nth-child(3) {
        position: relative;
        top: -0.24rem;
        font-size: 18px;
      }
    }
  }
  .div {
    width: 100%;
    // height: .4rem /* 30/75 */;
    // line-height:.4rem /* 30/75 */;
    font-size: 0.373333rem /* 28/75 */;
    padding-top: 14px;
  }
}
</style>
<style lang="scss">
// .van-popup--safe-area-inset-bottom {
//   //  height: 6.666667rem!important;
//   .van-action-sheet__item {
//     // height: 1.333333rem /* 100/75 */;
//     font-size: 0.533333rem /* 40/75 */;
//   }
//   .van-action-sheet__cancel,
//   .van-action-sheet__item {
//     // height: 1.6rem /* 120/75 */;
//     line-height: 1.333333rem /* 100/75 */;
//     font-size: 0.533333rem /* 40/75 */;
//     background: #262626;

//   }
// }
.van-action-sheet {
  color: white;
}
.van-action-sheet__cancel,
.van-action-sheet__item {
  background: #262626;
}
.van-action-sheet__gap {
  background: #2d2e2a;
}
.van-hairline--top::after {
  // border-top-width: 1px solid #2d2e2a;
  border-top-width: 0px;
}

// .pickers >>> .van-action-sheet__cancel, .van-action-sheet__item
// {
//   background: #262626;

// }
// .pickers >>>.van-action-sheet__item .van-hairline--top >>> .van-action-sheet__name {
//   color: white !important;

// }
// .van-popup--safe-area-inset-bottom .van-action-sheet__cancel, .van-popup--safe-area-inset-bottom .van-action-sheet__item {
//   color: white !important;
//   border-bottom: 1px solid #565656 !important;
// }

// .pickers[data-v-45a5f4bc] >>> .van-action-sheet__gap {
//   background-color: #2d2e2a !important;

// }
// .picker >>> .van-popup {
//   background: #262626;
// }
</style>
<script>
// import Header from "../../components/Header";
import store from "../../store";
import router from "../../router";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      num0: "0",
      num1: "0",
      num3: "0",
      num4: "0",
      isActive: true,
      //   QuotationArr: [],
      //实时更新的数据
      newMydata: [],
      timeout: 28 * 1000, //30秒一次心跳
      show: false,
      itemw: "",
      page1: true,
      page2: false,
      blue: true,
      white: false,
      blue1: false,
      white1: true,
      actions: [
        { name: this.$t("m.Transaction") },
        { name: this.$t("m.Chart") },
        { name: this.$t("m.Detailed") },
        // { name: '选项', subname: '描述信息' }
      ],
      newMydata2: [],
    };
  },
  components: {
    // Header
  },
  created() {
    this.p();
    // this.get();
  console.log(store.state.symbolArr, "什么什么？");
      console.log(store.state.openArr, "哈哈哈？？？");
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementsByClassName("van-tabbar-item")[2].style.color =
        "#127df6";
    });
  },
  beforeDestroy() {
    document.getElementsByClassName("van-tabbar-item")[2].style.color = "white";
  },
  computed: {
    QuotationArr: function () {
      if (this.newMydata) {
        for (let i = 0; i < store.state.arr.length; i++) {
          for (let j = 0; j < this.newMydata.length; j++) {
            var data1 = store.state.arr[i];
            var data2 = this.newMydata[j];
            if (data1.symbolName == data2.symbol) {
              data1.ask = data2.ask;
              data1.bid = data2.bid;
              console.log(data2, "data2");
              data1.time = moment(Date.now(data2.time)).format("HH:mm:ss");
            }
          }
        }
      

        
        for(var i = 0;i < store.state.openArr.length;i++) {
          for(var j = 0; j< store.state.arr.length;j++) {
             var arr = store.state.arr[j] ;
            var openArr = store.state.openArr[i];
              var arrName = store.state.arr[j].symbolName ;
            var openArrname = store.state.openArr[i].symbol + ".";
            if(arrName === openArrname ) {
            arr.open =  openArr.open
            }
          }
        }
        // for (let i = 0; i < store.state.arr.length; i++) {
        //   for (let j = 0; j < this.newMydata.length; j++) {
        //     var sym1 = store.state.arr[i];
        //     var sym2 = this.newMydata[j];
        //     if (sym1.symbolName == sym2.symbol) {
        //       // console.log(this.QuotationArr[i]);
        //       var ask = store.state.arr[i].ask;
        //       // console.log(ask,"askaskaskaskask")
        //       if (this.num0 < ask) {
        //         document.getElementById(sym1.symbolName).style.color =
        //           "#a92121";
        //       } else if (this.num0 > ask) {
        //         document.getElementById(sym1.symbolName).style.color =
        //           "#32a53b";
        //       }
        //       this.num0 = ask;
        //     }
        //     //bid
        //     if (sym1.symbolName == sym2.symbol) {
        //       var bid = store.state.arr[i].bid;
        //       if (this.num1 < bid) {
        //         document.getElementById(sym1.path).style.color = "#a92121";
        //         document.getElementById(sym1.symbolName).style.color =
        //           "#a92121";
        //       } else if (this.num1 > bid) {
        //         document.getElementById(sym1.path).style.color = "#32a53b";
        //         document.getElementById(sym1.symbolName).style.color =
        //           "#32a53b";
        //       }
        //     }
        //     this.num1 = bid;
        //   }
        // }
        for (var i = 0; i < store.state.arr.length; i++) {
          if (store.state.arr[i].symbolName === "BTCUSD.") {
            if (store.state.exchangeBTCUSD) {
              store.state.arr[i].max = store.state.exchangeBTCUSD.high;
              if (store.state.arr[i].ask > store.state.exchangeBTCUSD.high) {
                store.state.exchangeBTCUSD.high = store.state.arr[i].ask;
                store.state.arr[i].max = store.state.exchangeBTCUSD.high;
              }
            } else {
              store.state.arr[i].max = "0.00";
            }
            if (store.state.exchangeBTCUSD) {
              store.state.arr[i].low = store.state.exchangeBTCUSD.low;
              if (store.state.arr[i].bid < store.state.exchangeBTCUSD.low) {
                store.state.exchangeBTCUSD.low = store.state.arr[i].bid;
                store.state.arr[i].low = store.state.exchangeBTCUSD.low;
              }
            } else {
              store.state.arr[i].low = "0.00";
            }
            console.log(store.state.arr, "store.state.arr");
          } else if (store.state.arr[i].symbolName === "ETHUSD.") {
            if (store.state.exchangeETHUSD) {
              store.state.arr[i].max = store.state.exchangeETHUSD.high;
              if (store.state.arr[i].ask > store.state.exchangeETHUSD.high) {
                store.state.exchangeETHUSD.high = store.state.arr[i].ask;
                store.state.arr[i].max = store.state.exchangeETHUSD.high;
              }
            } else {
              store.state.arr[i].max = "0.00";
            }
            if (store.state.exchangeETHUSD) {
              store.state.arr[i].low = store.state.exchangeETHUSD.low;
              if (store.state.arr[i].bid < store.state.exchangeETHUSD.low) {
                store.state.exchangeETHUSD.low = store.state.arr[i].bid;
                store.state.arr[i].low = store.state.exchangeETHUSD.low;
              }
            } else {
              store.state.arr[i].low = "0.00";
            }
          } else if (store.state.arr[i].symbolName === "BCHUSD.") {
            if (store.state.exchangeBCHUSD) {
              store.state.arr[i].max = store.state.exchangeBCHUSD.high;
              if (store.state.arr[i].ask > store.state.exchangeBCHUSD.high) {
                store.state.exchangeBCHUSD.high = store.state.arr[i].ask;
                store.state.arr[i].max = store.state.exchangeBCHUSD.high;
              }
            } else {
              store.state.arr[i].max = "0.00";
            }
            if (store.state.exchangeBCHUSD) {
              store.state.arr[i].low = store.state.exchangeBCHUSD.low;
              if (store.state.arr[i].bid < store.state.exchangeBCHUSD.low) {
                store.state.exchangeBCHUSD.low = store.state.arr[i].bid;
                store.state.arr[i].low = store.state.exchangeBCHUSD.low;
              }
            } else {
              store.state.arr[i].low = "0.00";
            }
          }
        }
      }
      // store.state.arr[0].imgs = require("../../assets/images/icon_btc.png")
      // store.state.arr[1].imgs = require("../../assets/images/icon_eth.png")
      // store.state.arr[2].imgs = require("../../assets/images/icon_bch.png")
      console.log(store.state.arr, "store.state.arr");
      return store.state.arr;
    },
    symbolArr: function () {
      
      if (this.newMydata2) {
        for (var i = 0; i < store.state.symbolArr.length; i++) {
          for (var j = 0; j < this.newMydata2.length; j++) {
            var name1 = store.state.symbolArr[i].symbol.slice(0, 3);
            var name2 = this.newMydata2[j].symbol.slice(0, 3);
            if (name1 == name2) {
              store.state.symbolArr[i].ask = this.newMydata2[j].ask;
              store.state.symbolArr[i].bid = this.newMydata2[j].bid;
              if (
                store.state.symbolArr[i].ask > store.state.symbolArr[i].high
              ) {
                store.state.symbolArr[i].high = store.state.symbolArr[i].ask;
              } else if (
                store.state.symbolArr[i].bid > store.state.symbolArr[i].low
              ) {
                store.state.symbolArr[i].low = store.state.symbolArr[i].bid;
              }
            }
          }
        }
      }
      // store.state.symbolArr[0].imgs = require("../../assets/images/icon_ltc.png")
      // store.state.symbolArr[1].imgs = require("../../assets/images/icon_etc.png")
      // store.state.symbolArr[2].imgs = require("../../assets/images/icon_xrp.png")
      // store.state.symbolArr[3].imgs = require("../../assets/images/icon_eos.png")
      // store.state.symbolArr[4].imgs = require("../../assets/images/icon_link.png")
      // store.state.symbolArr[5].imgs = require("../../assets/images/icon_trx.png")
      // store.state.symbolArr[6].imgs = require("../../assets/images/icon_bsv.png")
      console.log(store.state.symbolArr, "store.state.symbolArr");
      return store.state.symbolArr;
    },
  },
  methods: {
    ...mapMutations(["setdataArr"]),
    ...mapMutations(["setArr"]),

    Orders(O) {
      this.$router.push("/quotation-order");
      (this.blue = true), (this.white = false);
      this.white1 = true;
      (this.page2 = false), (this.page1 = true);
      this.params = O;
    },
    skipEditPage() {
      this.$router.push({ path: "/priceEdit" });
    },
    skipAddPage() {
      this.$router.push({ path: "/priceAdd" });
    },
    p() {
      console.log(store.state.arr);
    },

    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      console.log(item);
      if (item.name === this.$t("m.Transaction")) {
        this.$router.push("/transaction-place");
      } else if (item.name === this.$t("m.Detailed")) {
        this.$router.push({
          path: "/detail/" + this.itemw,
        });
      } else if (item.name === this.$t("m.Chart")) {
        this.$router.push({ name: "echarts", params: { id: this.itemw } });
      }
      //   Toast(item.name);
    },
    selectType(item) {
      console.log(item);
      window.localStorage.setItem("params", item);
      this.show = true;
      this.itemw = item;
    },

    getuserId() {
      this.userid = store.state.userId;
      console.log(this.userid, " this.userid");
    },
  },
  watch: {
    "$store.state.mydata": function (newer, old) {
      // console.log(newer, old, "nnnnnnnn");
      this.newMydata = newer;
    },
    "$store.state.mydata2": function (newer2, old2) {
      this.newMydata2 = newer2;
      console.log(this.newMydata2, "this.newMydata2");
    },
  },
};
</script>