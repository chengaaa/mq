<template>
  <keep-alive>
    <div class="quotation">
      <div class="header">
        <div class="edit-icon" @click="skipEditPage">
          <!-- <van-icon name="edit" color="#127df6" id="van-icon" /> -->
        </div>
        <div class="switch-tab">
          <div class="left" :class="{blue1, white1}" @click="Orders('Orders')">{{$t('m.Simple')}}</div>
          <div class="right" :class="{blue, white}">{{$t('m.Advanced')}}</div>
        </div>
        <div class="add-icon" @click="skipAddPage">
          <!-- <van-icon name="plus" color="#127df6" id="van-icon" /> -->
        </div>
      </div>
      <!-- 简单的 -->
      <div>
        <van-action-sheet
          :cancel-text="$t('m.Cancel')"
          v-model="show"
          :actions="actions"
          @select="onSelect"
        />
      </div>
      <div v-show="page1">
        <div class="div">
          <div
            class="hh"
            v-for="(itemsss, indexxx) in QuotationArr"
            :key="indexxx"
            tag="div"
            @click="selectType(itemsss.symbolName)"
          >
            <div class="kk">
              <h6 v-show="itemsss.time">{{itemsss.time}}</h6>
              <h6 v-show="!itemsss.time">00:00:00</h6>
              <h1>{{(itemsss.symbolName).slice(0,3)}}/USDT</h1>
            </div>
            <div class="low">
              <p :id="itemsss.symbolName">
                <span>{{(itemsss.bid).substring(0,(itemsss.bid).indexOf("."))}}</span>
                <span>{{(itemsss.bid).slice((itemsss.bid).indexOf("."),-1)}}</span>
                <span>{{(itemsss.bid).substr(-1,1)}}</span>
              </p>
              <h5>Low:{{itemsss.low}}</h5>
            </div>
            <div class="low">
              <p :id="itemsss.path">
                <span>{{(itemsss.ask).substring(0,(itemsss.ask).indexOf("."))}}</span>
                <span>{{(itemsss.ask).slice((itemsss.ask).indexOf("."),-1)}}</span>
                <span>{{(itemsss.ask).substr(-1,1)}}</span>
              </p>
              <h5>High:{{itemsss.max}}</h5>
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
.quotation {
  padding-top: 1.366667rem /* 80/75 */;
  padding-left: 0.4rem /* 30/75 */;
  padding-right: 0.4rem /* 30/75 */;
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
    justify-content: space-between;
    border-bottom: 1px solid #b9b6b6;
    padding-top: 0.133333rem /* 10/75 */;
    padding-bottom: 0.133333rem /* 10/75 */;
    height: 1.333333rem /* 100/75 */;
    .kk {
      display: flex;
      justify-content: center;
      flex-direction: column;
      h1,
      h6 {
        height: 0.4rem /* 30/75 */;
        line-height: 0.4rem /* 30/75 */;
        font-size: 20px;
        font-family: "sans serif HelveticaNeueLT-Pro-57-Cn";
        font-weight: 700;
        color: #000000;
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
      width: 2rem /* 150/75 */;
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
        color: #797979;
      }
      p {
        margin-bottom: 0.066667rem /* 5/75 */;
        font-family: "HelveticaNeueLT-Pro-57-Cn";
        font-size: 20px;
      }
    }
    p {
      // font-size: .466667rem /* 35/75 */;
      color: #127df6;
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
    height: 1.066667rem /* 80/75 */;
    line-height: 1.066667rem /* 80/75 */;
    font-size: 0.373333rem /* 28/75 */;
  }
}
</style>
<style lang="scss">
.van-popup--safe-area-inset-bottom {
  //  height: 6.666667rem!important;
  .van-action-sheet__item {
    // height: 1.333333rem /* 100/75 */;
    font-size: 0.533333rem /* 40/75 */;
  }
  .van-action-sheet__cancel,
  .van-action-sheet__item {
    // height: 1.6rem /* 120/75 */;
    line-height: 1.333333rem /* 100/75 */;
    font-size: 0.533333rem /* 40/75 */;
  }
}
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
        { name: this.$t("m.Detailed") }
        // { name: '选项', subname: '描述信息' }
      ]
    };
  },
  components: {
    // Header
  },
  created() {
    this.p();
    // this.get();
    console.log(this.newMydata, "my");
    console.log(store.state.arr, "myaaaaa");
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
    QuotationArr: function() {
      if (this.newMydata) {
          console.log(store.state.arr,"[][][][]")
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
        for (let i = 0; i < store.state.arr.length; i++) {
          for (let j = 0; j < this.newMydata.length; j++) {
            var sym1 = store.state.arr[i];
            var sym2 = this.newMydata[j];
            if (sym1.symbolName == sym2.symbol) {
              // console.log(this.QuotationArr[i]);
              var ask = store.state.arr[i].ask;
              // console.log(ask,"askaskaskaskask")
              if (this.num0 < ask) {
                document.getElementById(sym1.symbolName).style.color =
                  "#127df6";
              } else if (this.num0 > ask) {
                document.getElementById(sym1.symbolName).style.color =
                  "#e54440";
              }
              this.num0 = ask;
            }
            //bid
            if (sym1.symbolName == sym2.symbol) {
              var bid = store.state.arr[i].bid;
              if (this.num1 < bid) {
                document.getElementById(sym1.path).style.color = "#127df6";
                document.getElementById(sym1.symbolName).style.color =
                  "#127df6";
              } else if (this.num1 > bid) {
                document.getElementById(sym1.path).style.color = "#e54440";
                document.getElementById(sym1.symbolName).style.color =
                  "#e54440";
              }
            }
            this.num1 = bid;
          }
        }
        for (var i = 0; i < store.state.arr.length; i++) {
          if (store.state.arr[i].symbolName === "BTCUSD.") {
            if (store.state.exchangeBTCUSD) {
              store.state.arr[i].max = store.state.exchangeBTCUSD.high;
              if(store.state.arr[i].ask > store.state.exchangeBTCUSD.high ) {
                store.state.exchangeBTCUSD.high = store.state.arr[i].ask
                
              }
            } else {
              store.state.arr[i].max = "0.00";
            }
            if (store.state.exchangeBTCUSD) {
              store.state.arr[i].low = store.state.exchangeBTCUSD.low;
              if(store.state.arr[i].bid < store.state.exchangeBTCUSD.low ) {
                store.state.exchangeBTCUSD.low = store.state.arr[i].bid
              }
            } else {
              store.state.arr[i].low = "0.00";
            }
            console.log(store.state.arr, "store.state.arr");
          } else if (store.state.arr[i].symbolName === "ETHUSD.") {
            if (store.state.exchangeETHUSD) {
              store.state.arr[i].max = store.state.exchangeETHUSD.high;
              if(store.state.arr[i].ask > store.state.exchangeETHUSD.high ) {
                store.state.exchangeETHUSD.high = store.state.arr[i].ask
              }
            } else {
              store.state.arr[i].max = "0.00";
            }
            if (store.state.exchangeETHUSD) {
              store.state.arr[i].low = store.state.exchangeETHUSD.low;
               if(store.state.arr[i].bid < store.state.exchangeETHUSD.low ) {
                store.state.exchangeETHUSD.low = store.state.arr[i].bid
              }
            } else {
              store.state.arr[i].low = "0.00";
            }
          } else if (store.state.arr[i].symbolName === "BCHUSD.") {
            if (store.state.exchangeBCHUSD) {
              store.state.arr[i].max = store.state.exchangeBCHUSD.high;
               if(store.state.arr[i].ask > store.state.exchangeBCHUSD.high ) {
                store.state.exchangeBCHUSD.high = store.state.arr[i].ask
              }
            } else {
              store.state.arr[i].max = "0.00";
            }
            if (store.state.exchangeBCHUSD) {
              store.state.arr[i].low = store.state.exchangeBCHUSD.low;
               if(store.state.arr[i].bid < store.state.exchangeBCHUSD.low ) {
                store.state.exchangeBCHUSD.low = store.state.arr[i].bid
              }
            } else {
              store.state.arr[i].low = "0.00";
            }
          }
        }
      }
      return store.state.arr;
    }
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
          path: "/detail/" + this.itemw
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
    }
  },
  watch: {
    "$store.state.mydata": function(newer, old) {
      // console.log(newer, old, "nnnnnnnn");
      this.newMydata = newer;
    }
  }
};
</script>