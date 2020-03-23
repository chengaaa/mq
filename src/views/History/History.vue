<template>
  <div id="app">
    <div class="page">
      <div class="h">
        <div class="history-header">
          <div class="left"></div>

          <div class="right-left">
            <span :class="{blue, white}" @click="Orders('Orders')">{{$t('m.Orders')}}</span>

            <span :class="{blue1, white1}" @click="Deals('Deals')">{{$t('m.Deals')}}</span>
          </div>
          <div class="right-right">
            <router-link class="iconfont" tag="div" :to="'/history-time/' + this.params">&#xe608;</router-link>
          </div>
        </div>
      </div>
      <div v-show="page1" class="con">
        <div v-for="(item, index) in arrList" :key="index">
          <div class="border">
            <div @click="open(index)">
              <div class="top">
                <div class="top1">
                  <h4>{{item.symbol}},</h4>
                  <span
                    :class="{'hong':item.orderDirection == -1,'lan': item.orderDirection == 1 }"
                  >{{item.orderDirection == -1? "sell":"buy"}}</span>
                </div>
                <h5>{{item.dateTime.split('-').join(".").replace("T"," ").replace("Z","")}}</h5>
              </div>
              <div class="bot">
                <p>{{item.volume.toFixed(2)}} / {{(item.volume - item.remainingVolume).toFixed(2)}} at {{item.orderPrice}}</p>

                <span v-if="item.orderStatus === 11">filled</span>
                <span v-else-if="item.orderStatus === 7">canceled</span>
                <span v-else-if="item.orderStatus === 17">expired</span>
                <span v-else>placed</span>
              </div>
            </div>
            <div class="history-deail" v-show="index === openIndex">
              <div class="deail-left">
                <div class="deail-left1">
                  <p>S/L:</p>
                  <span>{{item.stopLoss == 0? "-":item.stopLoss}}</span>
                </div>
                <div class="deail-left2">
                  <p>T/P:</p>
                  <span>{{item.takeProfit == 0? "-":item.takeProfit}}</span>
                </div>
              </div>
              <div class="deail-right">
                <h5>#{{item.orderID}}</h5>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div class="fixed">
          <div>
            <h2>{{$t('m.Filled')}}</h2>
            <h2>{{$t('m.Canceled')}}</h2>
            <h2>{{$t('m.Total')}}</h2>
          </div>
          <div>
            <p>{{flied?flied:"0"}}</p>
            <p>{{canceled? canceled:"0"}}</p>
            <p>{{sum?sum:"0"}}</p>
          </div>
        </div>
      </div>

      <div v-show="page2" class="con">
        <div v-for="(item, index) in dealList" :key="index">
          <div class="border">
            <div @click="open(index)">
              <div class="top">
                <div class="top1">
                  <h4>{{item.symbol?item.symbol:"买入"}},</h4>
                  <span
                    :class="{'hong':item.orderDirection == -1,'lan': item.orderDirection == 1 }"
                  >{{item.orderDirection == -1? "sell,out":"buy,in"}}</span>
                </div>
                <h5>{{item.dateTime.split('-').join(".").replace("T"," ").replace("Z","")}}</h5>
              </div>
              <div class="bot">
                <p>{{item.volume.toFixed(2)}} at {{item.price}}</p>
                <p
                  :class="{'hong': item.pnl < 0,'lan': item.pnl > 0}"
                >{{item.pnl == 0? '':item.pnl}}</p>
              </div>
            </div>
            <div class="history-deail" v-show="index === openIndex">
              <div class="deail-left">
                <div class="deail-left1">
                  <p>Deal:</p>
                  <span>{{item.executionId}}</span>
                </div>
                <div class="deail-left2">
                  <p>Order:</p>
                  <span>{{item.positionId}}</span>
                </div>
              </div>
              <div class="order-right">
                <div class="order-left1">
                  <p>Swap:</p>
                  <span>{{item.swap}}</span>
                </div>
                <div class="order-left2">
                  <p>Charges:</p>
                  <span>-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed2">
          <div>
            <h3>{{$t('m.Deposit')}}</h3>
            <h3>{{$t('m.Profit')}}</h3>
            <h3>{{$t('m.Swap')}}</h3>
            <h3>{{$t('m.Commission')}}</h3>
            <h3>{{$t('m.balance')}}</h3>
          </div>
          <div>
            <p>{{deposit?deposit:"0.00"}}</p>
            <p>{{pnlsum?pnlsum:"0.00"}}</p>
            <p>{{kucun?kucun:"0.00"}}</p>
            <p>0.00</p>
            <p>0.00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.con {
  padding-top: 1.2rem /* 90/75 */;
}
.hong {
  color: red;
}
.lan {
  color: blue;
}
.fixed {
  width: 100%;
  height: 1.466667rem;
  background: white;
  /* position: fixed; */
  /* bottom: 1.466667rem; */

  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 0.346667rem;
  padding-bottom: 1.5rem;
  padding-top: 0.35rem;
  // border-top: 1px solid #969799;
  h2 {
    padding-left: 0.133333rem /* 10/75 */;
    margin-bottom: 0.173333rem /* 13/75 */;
  }
  p {
    padding-right: 0.133333rem /* 10/75 */;
    margin-bottom: 0.173333rem /* 13/75 */;
  }
}
.fixed2 {
  width: 100%;
  height: 4rem;
  background: white;
  /* position: fixed; */
  /* bottom: 0; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.133333rem 0rem;
  h3,
  p {
    margin-bottom: 0.133333rem /* 10/75 */;
    font-size: 0.346667rem /* 26/75 */;
  }
  h3 {
    padding-left: 0.133333rem /* 10/75 */;
  }
  p {
    padding-right: 0.133333rem /* 10/75 */;
  }
}
.iconfont {
  font-size: 0.533333rem /* 40/75 */;
  color: blue;
}
.page {
  height: 100%;
  .h {
    position: fixed;
    width: 100%;
    background: white;
    .history-header {
      display: flex;
      justify-content: space-between;
      padding: 0.266667rem /* 20/75 */ 0.266667rem /* 20/75 */;
      .right-left {
        span {
          display: inline-block;
          width: 1.333333rem /* 100/75 */;
          height: 0.666667rem /* 50/75 */;
          line-height: 0.666667rem /* 50/75 */;
          font-size: 0.333333rem /* 25/75 */;
          text-align: center;
          border: 1px solid blue;
        }
      }
    }
  }

  .border {
    line-height: 0.4rem /* 30/75 */;
    padding: 0.133333rem /* 10/75 */ 0.133333rem /* 10/75 */;
    border: 0.013333rem /* 1/75 */ solid #eeeeee;

    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.133333rem /* 10/75 */;
      h5 {
        font-size: 0.293333rem /* 22/75 */;
        font-weight: 700;
      }
      .top1 {
        display: flex;
        h4 {
          font-size: 0.4rem /* 30/75 */;
          font-weight: 700;
        }
        span {
          font-size: 0.32rem /* 24/75 */;
          font-weight: 700;
        }
      }
    }
    .bot {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 0.346667rem /* 26/75 */;
      }
      span {
        font-size: 0.32rem /* 24/75 */;
      }
    }
  }
}

.history-deail {
  padding-top: 0.533333rem /* 40/75 */;
  display: flex;
  justify-content: space-between;
  .deail-left {
    width: 30%;
    padding-top: 0.133333rem /* 10/75 */;
    p {
      font-size: 0.346667rem /* 26/75 */;
      color: #c6c5ca;
    }
    span {
      font-size: 0.346667rem /* 26/75 */;
    }
    .deail-left1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.133333rem /* 10/75 */;
    }
    .deail-left2 {
      display: flex;
      justify-content: space-between;
    }
  }
  .deail-right {
    padding-top: 0.666667rem /* 50/75 */;
    h5 {
      font-size: 0.346667rem /* 26/75 */;
    }
  }
}
.order-right {
  width: 35%;

  .order-left1,
  .order-left2 {
    display: flex;
    justify-content: space-between;
    p,
    span {
      font-size: 0.346667rem /* 26/75 */;
      color: #c6c5ca;
    }
  }
}

.blue {
  background: blue;
  color: white;
}
.white {
  background: white;
  color: blue;
}
.blue1 {
  background: blue;
  color: white;
}
.white1 {
  background: white;
  color: blue;
}
</style>
<script>
import { getNowFormatDate } from "../../tools/check.js";
import { baseURL1,baseURL2 } from "../../utls";
import { FormatDate } from "../../tools/check.js";

export default {
  data() {
    return {
      blue: true,
      white: false,
      blue1: false,
      white1: true,
      page1: true,
      page2: false,
      date: new Date(),
      Monthdate: "",
      params: "Orders",
      arrList: [],
      dealList: [],
      flied: null,
      canceled: null,
      sum: null,
      openIndex: -1,
      pnlsum: null,
      kucun: null,
      deposit: null
    };
  },
  created() {
    this.getdate();
    this.getList();
    this.getdealsList();
  },
  methods: {
    Orders(O) {
      (this.blue = true), (this.white = false);
      this.white1 = true;
      (this.page2 = false), (this.page1 = true);
      this.params = O;
      this.getList();
    },
    Deals(D) {
      (this.blue1 = true), (this.white1 = false);
      this.white = true;
      (this.page2 = true), (this.page1 = false);
      this.params = D;
      this.getdealsList();
    },
    getdate() {
      var date1 = FormatDate(this.date);
      console.log(date1, "date1");

      this.date = date1.replace(" ", "T") + "Z";
      console.log(this.date, "date");
    },

    getMonthdate() {
      this.newdate = new Date(new Date().setMonth(new Date().getMonth() - 1));
      console.log(this.newdate, "上一个月");
      var date2 = getNowFormatDate(this.newdate);
      console.log(date2, "new Date");
      this.Monthdate =
        date2
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";

      console.log(this.Monthdate, "this.Monthdate");
    },

    getList() {
      (this.flied = null), (this.canceled = null), (this.sum = null);
      if (this.$route.params.begin) {
        this.Monthdate = this.$route.params.begin;
      } else {
        this.getMonthdate();
      }

      this.$http
        .get(baseURL1 + "/history/orders?from=" + this.Monthdate + "&to=" + this.date)
        .then(({ data }) => {
          if (data.code === 0) {
            this.arrList = data.data;
            this.splices2()
            this.list();
          }
        });
    },
    list() {
      this.arrList.forEach(item => {
        if (item.orderStatus === 11) {
          this.flied += 1;
        } else if (item.orderStatus === 7) {
          this.canceled += 1;
        }
        if (item.symbol) {
          this.sum += 1;
        }
      });
    },
    getdealsList() {
      this.pnlsum = null;
      this.kucun = null;
      this.deposit = null;
      if (this.$route.params.begin) {
        this.Monthdate = this.$route.params.begin;
      } else {
        this.getMonthdate();
      }
      this.$http
        .get(baseURL1 + "/history/executions?from=" + this.Monthdate + "&to=" + this.date)
        .then(({ data }) => {
          // console.log(data.data,"executions")
          if (data.code === 0) {
            this.dealList = data.data;
            this.splices();
            console.log(this.dealList, "this.dealList");
            this.executionsList();
          }
        })
        .catch(error => {
          if (error.status === 403) {
            this.$router.push("/apply");
            console.log("/");
          }
        });
    },
    executionsList() {
      this.dealList.forEach(item => {
        //  console.log(item,"shshshhshshshh")s
        this.pnlsum += JSON.parse(item.pnl);
        this.kucun += JSON.parse(item.swap);
        if (item.comment) {
          this.deposit += JSON.parse(item.pnl);

          //  console.log(this.deposit,"item")
        }
      });
    },
    //去除dealList symbol的点
    splices() {
      for (let i = 0; i < this.dealList.length; i++) {
        this.dealList[i].symbol = this.dealList[i].symbol.replace(/\./, "");
        this.dealList = this.dealList;
      }
    },
       //去除arrList symbol的点
    splices2() {
      for (let i = 0; i < this.arrList.length; i++) {
        this.arrList[i].symbol = this.arrList[i].symbol.replace(/\./, "");
        this.arrList = this.arrList;
      }
    },
    
    open(index) {
      if (this.openIndex === null) {
        this.openIndex = index;
      } else {
        this.openIndex = null;
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(oldVal);
        if (oldVal.path === "/history-time/Orders") {
          this.getList();
        } else if (oldVal.path === "/history-time/Deals") {
          this.getdealsList();
        }
      }
    }
  }
};
</script>