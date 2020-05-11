<template>
  <div id="app">
    <loading v-show="LOADING"></loading>
    <div class="page">
      <div class="h">
        <div class="history-header">
          <div class="left">
            <van-icon id="van-icon" name="arrow-left" color="blue" @click="back" />
          </div>
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
                <h5>{{item.dateTime.split('-').join(".").replace("T"," ").replace("Z","").substring(0,19)}}</h5>
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
                <div class="top1" v-show="item.symbol !='' ">
                  <h4>{{item.symbol?item.symbol:"买入"}},</h4>
                  <span
                    :class="{'hong':item.orderDirection == -1,'lan': item.orderDirection == 1 }"
                  >{{item.orderDirection == -1? "sell,out":"buy,in"}}</span>
                </div>
                <div class="top1" v-show="item.symbol ==='' ">
                  <h4>{{item.comment.indexOf("d-") === 0?"入金":""}}</h4>
                  <h4>{{item.comment.indexOf("w-") === 0?"出金":""}}</h4>
                  <h4>{{item.comment.indexOf("Credit out") === 0?"信用出金":""}}</h4>
                  <h4>{{item.comment.indexOf("Credit in") === 0?"信用入金":""}}</h4>
                </div>
                <h5>{{item.dateTime.split('-').join(".").replace("T"," ").replace("Z","").substring(0,19)}}</h5>
              </div>
              <div class="bot">
                <p v-show="item.symbol !=''">{{item.volume.toFixed(2)}} at {{item.price}}</p>
                <p v-show="item.symbol ===''"></p>
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
            <p>{{deposit?(deposit).toFixed(2):"0.00"}}</p>
            <p>{{pnlsum?(pnlsum).toFixed(2):"0.00"}}</p>
            <p>{{kucun?(kucun).toFixed(2):"0.00"}}</p>
            <p>0.00</p>
            <p v-show="balance">{{balance}}</p>
            <p v-show="balance === ''">0.00</p>
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
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  padding-top: 0.35rem;
 color:#666;
     font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';
  h2 {
    padding-left: 0.133333rem /* 10/75 */;
    margin-bottom: 0.173333rem /* 13/75 */;
      font-size:.4rem /* 30/75 */;
  }
  p {
    padding-right: 0.133333rem /* 10/75 */;
    margin-bottom: 0.173333rem /* 13/75 */;
    font-size:.4rem /* 30/75 */;
  }
}
.fixed2 {
  width: 100%;
  height: 4rem;
  background: white;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.133333rem 0rem;
  color:#666;
     font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';
  h3,
  p {
    margin-bottom: 0.133333rem /* 10/75 */;
    font-size: .4rem /* 30/75 */;
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
  .h {
    position: fixed;
    width: 100%;
    background: white;
    .history-header {
      display: flex;
      justify-content: space-between;
      padding: 0.266667rem /* 20/75 */ 0.266667rem /* 20/75 */ 0.266667rem
        /* 20/75 */ 0.01rem;
      .van-icon {
        font-size: 0.733333rem;
        width: 40%;
      }
      .right-left {
        span {
          display: inline-block;
          width: 1.333333rem /* 100/75 */;
          height: 0.666667rem /* 50/75 */;
          line-height: 0.666667rem /* 50/75 */;
          font-size: 0.333333rem /* 25/75 */;
          text-align: center;
          border: 1px solid blue;
     font-family: 'Tahoma','Sans Serif';

        }
      }
    }
  }
  .border {
    line-height: 0.43rem /* 30/75 */;
    padding: 0.133333rem /* 10/75 */ 0.133333rem /* 10/75 */;
    border: 0.013333rem /* 1/75 */ solid #eeeeee;
    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.133333rem /* 10/75 */;
     font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';
      h5 {
        font-size: .32rem /* 24/75 */;
        // font-weight: 700;
        color:#4c4c4c;
      }
      .top1 {
        display: flex;
        h4 {
          font-size: .426667rem /* 32/75 */;
          font-weight: 700;
        }
        span {
          font-size: .373333rem /* 28/75 */;
          font-weight: 700;
        }
      }
    }
    .bot {
      display: flex;
      justify-content: space-between;
     font-family: 'Tahoma','Sans Serif';
      p {
        font-size: .32rem /* 24/75 */;
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
     font-family: 'Tahoma','Sans Serif';
  .deail-left {
    width: 30%;
    padding-top: 0.133333rem /* 10/75 */;
    p {
      color: #c6c5ca;
      font-size:.32rem /* 24/75 */;
    }
    span {
      font-size:.32rem /* 24/75 */;
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
import { getNowFormatDate, getUTCtime, getCNAtime } from "../../tools/check.js";
import { baseURL1, baseURL2 } from "../../utls";
import { FormatDate } from "../../tools/check.js";
const Loading = ()=> import("../../components/Loading");
import {mapState} from 'vuex'
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
      arrLists: [],
      dealList: [],
      flied: null,
      canceled: null,
      sum: null,
      openIndex: -1,
      pnlsum: null,
      kucun: null,
      deposit: null,
      balance: ""
    };
  },
   components: {
Loading
  },
   computed:{
  ...mapState([
                'LOADING'
            ])
  },
  created() {
    this.getdate();
    this.getList();
    this.getdealsList();
    this.getAccount();
  },
  methods: {
    back() {
      this.$router.push("/account");
    },
    Orders(O) {
      (this.blue = true), (this.white = false);
      this.white1 = true;
      (this.page2 = false), (this.page1 = true);
      this.params = O;
    },
    Deals(D) {
      (this.blue1 = true), (this.white1 = false);
      this.white = true;
      (this.page2 = true), (this.page1 = false);
      this.params = D;
    },
    getdate() {
      //结束时间
      var date1 = new Date(new Date().setHours(new Date().getHours() + 2));
      this.date = getUTCtime(date1);
    },
 getWeekdate() {
      this.newdate = new Date(new Date().setDate(new Date().getDate() - 7));
      this.newdate =  new Date(this.newdate.setHours(new Date().getHours() + 2))
       this.Monthdate = getUTCtime(this.newdate)
    },
    getList() {
      (this.flied = null), (this.canceled = null), (this.sum = null);
      if (this.$route.params.begin) {
        this.Monthdate = this.$route.params.begin;
      } else {
        this.getWeekdate();
      }
      this.$store.commit('showLoading')
      this.$http
        .get(
          baseURL1 +
            "/history/orders?from=" +
            this.Monthdate +
            "&to=" +
            this.date
        )
        .then(({ data }) => {
          if (data.code === 0) {
      this.$store.commit('hideLoading')
            this.arrLists = data.data;
            this.arrListreg();
            this.splices2();
            this.list();
          }
        });
    },
    arrListreg() {
      this.arrList = this.arrLists.reverse();
      for (var i in this.arrList) {
        this.arrList[i].dateTime = new Date(
          new Date(this.arrList[i].dateTime).getTime()
        );
        this.arrList[i].dateTime = moment(this.arrList[i].dateTime)
          .subtract(2, 'h')
          .format();
      }
    },
    getAccount() {
      this.$http.get(baseURL1 + "/account").then(({ data }) => {
        this.balance = data.data.balance;
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
        this.getWeekdate();
      }
      this.$http
        .get(
          baseURL1 +
            "/history/executions?from=" +
            this.Monthdate +
            "&to=" +
            this.date
        )
        .then(({ data }) => {
          if (data.code === 0) {
            this.dealList = data.data;
            this.dealListreg();
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
        if (item.symbol === "") {
          if (item.comment) {
            this.deposit += JSON.parse(item.pnl);
          }
        } else {
          this.kucun += JSON.parse(item.swap);
          this.pnlsum += JSON.parse(item.pnl);
        }
      });
    },
    dealListreg() {
      this.dealList = this.dealList.reverse();
      for (var i in this.dealList) {
        this.dealList[i].dateTime = new Date(
          new Date(this.dealList[i].dateTime).getTime()
        );
        this.dealList[i].dateTime = moment(this.dealList[i].dateTime)
          .subtract(2,"h")
          .format();
      }
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
  }
};
</script>