<template>
  <div class="transaction">
    <div class="transaction-A" :class="tit< 0? red:blue">
      <!-- <h3 v-for="(items,index) in gettitle">{{items}}</h3> -->
      <!-- <h3>{{tit?tit.toFixed(2):}} USD</h3> -->
      <!-- <h3 v-else>0.00 USD</h3> -->
      <h3 v-if="this.tit">{{tit.toFixed(2)}}</h3>
      <h3 v-else>00.00</h3>
      <span>
        <img src="../../assets/add.jpg" alt @click="transaction" />
        <!-- <i class="iconfont" @click="transaction">&#xe644;</i> -->
      </span>
    </div>
    <div v-show="hal">
      <div class="transaction-B">
        <div class="transaction-B1">
          <p>{{$t('m.Balance')}}</p>
          <span>0.00</span>
        </div>
        <div class="transaction-B1">
          <p>{{$t('m.Equity')}}</p>
          <span>0.00</span>
        </div>
        <div class="transaction-B1">
          <p>{{$t('m.Margin')}}</p>
          <span>0.00</span>
        </div>
        <div class="transaction-B1">
          <p>{{$t('m.Freemargin')}}</p>

          <span>0.00</span>
        </div>
        <div class="transaction-B1">
          <p>{{$t('m.Marginlevel')}}</p>
          <span>0.00</span>
        </div>
      </div>
    </div>
    <div v-show="accountList">
      <div v-for="(item,index) in accountList" :key="index" class="transaction-B">
        <div class="transaction-B1">
          <p>{{$t('m.Balance')}}</p>
          <span>{{item.balance}}</span>
        </div>
        <div class="transaction-B1">
          <p>{{$t('m.Equity')}}</p>
          <span v-if="item.data3">{{Number(item.data3).toFixed(2)}}</span>
          <span v-else>{{Number(item.equity).toFixed(2)}}</span>
        </div>
        <div class="transaction-B1">
          <p>{{$t('m.Margin')}}</p>
          <span>{{item.margin}}</span>
        </div>
        <div class="transaction-B1">
          <p>{{$t('m.Freemargin')}}</p>
          <span v-if="item.data3">{{(item.data3 - item.margin).toFixed(2)}}</span>
          <span v-else>{{Number(item.marginFree).toFixed(2)}}</span>
        </div>
        <div class="transaction-B1">
          <p>{{$t('m.Marginlevel')}}</p>
          <span
            v-if="item.margin != 0 && item.data3"
          >{{((item.data3 / item.margin) * 100).toFixed(2)}}</span>
          <span v-else>{{item.marginLevel}}</span>
        </div>
      </div>
    </div>
    <div v-show="ino" class="transaction-C">
      <h4>{{$t('m.Position')}}</h4>
    </div>
    <div class="transaction-D">
      <div
        v-for="(items,indexs) in datalist"
        :key="indexs"
        class="transaction-D1"
        @touchstart="showDeleteButton(items.positionId,items.volume,indexs,items.symbol,$event)"
        @touchmove="gotouchmove"
        @touchend="emptyTime(indexs,$event)"
      >
        <div class="top">
          <div class="left">
            <div class="flex">
              <h5>{{(items.symbol).slice(0,3)}}/USDT,</h5>
              <span
                :class="{'red':items.orderDirection == -1,
              'blue':items.orderDirection == 1}"
              >{{items.orderDirection === 1? "buy" : "sell"}} {{items.volume}}</span>
            </div>
            <div class="openPrice">
              <p>{{items.openPrice}}</p>
              <span>-&gt;</span>
              <p v-show="items.orderDirection === -1">{{items.ask}}</p>
              <p v-show="items.orderDirection === 1">{{items.bid}}</p>
            </div>
          </div>
          <div class="right">
            <span
              :class="items.data1 < 0?'colorred':'colorblue'"
              v-if="items.contractSize && items.orderDirection === -1"
            >{{items.data1}}</span>
            <span
              :class="items.data2 < 0?'colorred':'colorblue'"
              v-else-if="items.contractSize && items.orderDirection === 1"
            >{{items.data2}}</span>
            <span :class="items.pnl < 0?'colorred':'colorblue'" v-else>{{(items.pnl)}}</span>
          </div>
        </div>
        <div class="bottom" v-show="indexs === thisIndex">
          <h5>{{items.openTime1}}</h5>
          <div class="left1-right1">
            <div class="left1">
              <div class="a">
                <p>{{$t('m.StopLoss')}}</p>
                <span>{{items.stopLoss? items.stopLoss:"-"}}</span>
              </div>
              <div class="a">
                <p>{{$t('m.TakeProfit')}}</p>
                <span>{{items.takeProfit? items.takeProfit:"-"}}</span>
              </div>
              <div class="a">
                <p>{{$t('m.orderID')}}</p>
                <span>{{items.positionId}}</span>
              </div>
            </div>
            <div class="right1">
              <div class="a">
                <p>{{$t('m.Swap')}}</p>
                <span>{{items.swap}}</span>
              </div>
              <div class="a">
                <p>{{$t('m.Taxes')}}</p>
                <span>-</span>
              </div>
              <div class="a">
                <p>{{$t('m.Charges')}}</p>
                <span>-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="out" class="transaction-C3">
      <h4>{{$t('m.Orderss')}}</h4>
    </div>
    <div v-show="out" class="transaction-E">
      <!-- <van-action-sheet
          cancel-text="取消"
          v-model="show"
          :actions="actionss"
          @select="onSelect"
      />-->
      <!-- <div v-for="(items,indexs) in ordersList" :key="indexs"> -->
      <div
        v-for="(item, index) in dataorder"
        :key="index"
        @touchstart="showDeleteButton2(item.symbol,item.orderID,index)"
        @touchmove="gotouchmove2"
        @touchend="emptyTime2(index)"
      >
        <div class="top">
          <div class="left">
            <div class="flex">
              <h5>{{(item.symbol).slice(0,3)}}/USDT,</h5>
              <!-- <span :class="{'red':item.orderDirection == -1,
              'blue':item.orderDirection == 1}">{{if(item.orderType === 7) {"buy limit"}}}</span>-->
              <span
                :class="{'blue' :item.orderType === 7 && item.orderDirection === 1}"
                v-show="item.orderType === 7 && item.orderDirection === 1"
              >buy limit</span>
              <span
                :class="{'red' :item.orderType === 7 && item.orderDirection === -1}"
                v-show="item.orderType === 7 && item.orderDirection === -1"
              >sell limit</span>

              <span
                :class="{'blue' :item.orderType === 9 && item.orderDirection === 1}"
                v-show="item.orderType === 9  && item.orderDirection === 1"
              >buy stop</span>
              <span
                :class="{'red' :item.orderType === 9 && item.orderDirection === -1}"
                v-show="item.orderType === 9 && item.orderDirection === -1"
              >sell stop</span>

              <!-- <span :class="{'blue' :item.orderType === 3}" v-else>buy market</span> -->
            </div>
            <p>{{item.volume}} at {{item.orderPrice}}</p>
          </div>
          <div class="right">
            <span
              v-if="item.orderDirection === 1"
            >{{item.ask}}</span>
            <span
              v-else-if="item.orderDirection === -1"
            >{{item.bid}}</span>
          </div>
        </div>
        <div class="bottom" v-show="index === nullIndex">
          <h5>{{(item.dateTime1)}}</h5>
          <div class="left1-right1">
            <div class="left1">
              <div class="a">
                <p>{{$t('m.StopLoss')}}</p>
                <span>{{item.stopLoss? item.stopLoss:"-"}}</span>
              </div>
              <div class="a">
                <p>{{$t('m.TakeProfit')}}</p>
                <span>{{item.takeProfit? item.takeProfit:"-"}}</span>
              </div>
              <div class="a">
                <p>{{$t('m.orderID')}}</p>
                <span>{{item.orderID}}</span>
              </div>
            </div>
            <div class="right1">
              <!-- <div class="a">
                <p>{{$t('m.Price')}}</p>
                <span>-</span>
              </div>-->
              <div class="a">
                <p>{{$t('m.Date')}}</p>
                <span v-show="item.orderDuration === 0">-</span>
                <span
                  v-show="item.orderDuration === 2"
                >{{item.expirationDate1.slice(0,item.expirationDate1.indexOf(" "))}}</span>
              </div>
              <div class="a">
                <p>{{$t('m.Time')}}</p>
                <span v-show="item.orderDuration === 0">-</span>

                <span
                  v-show="item.orderDuration === 2"
                >{{item.expirationDate1.slice(item.expirationDate1.indexOf(" "))}}</span>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div class="box"></div>
    <keep-alive>
      <van-action-sheet
        :cancel-text="$t('m.Cancel')"
        v-model="show"
        :actions="actions"
        @select="onSelect"
        :close-on-click-overlay="true"
        v-if="active"
        id="modal"
      />
      <van-action-sheet
        :cancel-text="$t('m.Cancel')"
        v-model="show"
        :actions="actionss"
        @select="onSelect"
        :close-on-click-overlay="true"
        v-else
      />
    </keep-alive>
  </div>
</template>

<style scoped>
.transaction >>> .van-popup--bottom.van-popup--round {
  padding-bottom: 0.266667rem /* 20/75 */;
}
.transaction >>> .van-action-sheet__cancel,
.van-action-sheet__item {
  font-size: 22px;
}
</style>
<style lang="scss" scoped>
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .transaction {
    min-height: 17.333333rem /* 1300/75 */;
    background: #eee;
    .iconfont {
      font-size: 0.666667rem /* 50/75 */;
    }
    .transaction-A {
      width: 100%;
      //    height:1.333333rem /* 100/75 */;
      // background: #127df6;
      display: flex;
      color: #fff;
     position: fixed;
      font-size: 0.533333rem /* 40/75 */;
      line-height: 1.333333rem /* 100/75 */;
      h3 {
        flex: 1;
        text-align: center;
        font-family: " Sans Serif";
        font-size: 30px;
        // font-weight: 700;
      }
      span {
        width: 0.933333rem /* 70/75 */;
        height: 0.666667rem /* 50/75 */;
        line-height: 1.4666667rem /* 50/75 */;
      }
    }
    .transaction-B {
      // height: 3.733333rem /* 280/75 */;
      background: white;
      font-size: 0.426667rem /* 32/75 */;
      line-height: 0.6rem /* 45/75 */;
      padding: 0.133333rem /* 10/75 */ 0.293333rem /* 22/75 */;
      color: #545454;
      padding-top: 1.333333rem;
      .transaction-B1:last-child {
        border-bottom: none;
      }
      .transaction-B1 {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        height: 1.066667rem /* 80/75 */;
        line-height: 1.066667rem /* 80/75 */;
        p,
        span {
          // font-family: 'HelveticaNeueLT-Pro-57-Cn Sans Serif';
          color: #666;
          font-weight: 700;
          font-size: 17px;
        }
        span {
          font-size: 19px;
          color: #000000;
          font-weight: 700;
          // font-family: 'HelveticaNeueLT-Pro-57-Cn';
        }
      }
    }
    .transaction-C {
      padding: 0.106667rem /* 8/75 */ 0.293333rem /* 22/75 */;

      h4 {
        font-weight: 700;
        font-size: 17px;
        background: #eee;
        padding: 0.2rem /* 15/75 */ 0rem /* 0/75 */;
        font-family: " Sans Serif";
        color: #333333;
      }
    }
    .transaction-C3 {
      padding: 0.106667rem /* 8/75 */ 0.293333rem /* 22/75 */;
      h4 {
        font-weight: 700;
        background: #eee;
        padding: 0.2rem /* 15/75 */ 0rem /* 0/75 */;
        font-size: 17px;
        padding: 0.2rem /* 15/75 */ 0rem /* 0/75 */;
        font-family: " Sans Serif";
        color: #333333;
      }
    }
    .transaction-D {
      border-bottom: 0.013333rem /* 1/75 */ solid #b9b6b6;
      border-top: 0.013333rem /* 1/75 */ solid #b9b6b6;
      .blue {
        color: #127df6;
      }
      .red {
        color: #e54440;
      }
      // height: 400px;
      background: white;
      .transaction-D1 {
        padding: 0.106667rem /* 8/75 */ 0.293333rem /* 22/75 */;
        &:last-child {
          .top {
            border-bottom: none;
          }
        }

        .top {
          display: flex;
          font-size: 0.4rem /* 30/75 */;
          justify-content: space-between;
          padding-bottom: 0.266667rem /* 20/75 */;
          padding-top: 0.266667rem /* 20/75 */;
          font-family: " Sans Serif";
          border-bottom: 0.013333rem /* 1/75 */ solid #b9b6b6;
          .left {
            .flex {
              display: flex;
              margin-bottom: 0.2rem /* 15/75 */;
              h5 {
                font-size: 19px;
                font-weight: 700;
                font-family: "Sans Serif";
                color: #333333;
              }
              span {
                font-size: 20px;
                font-weight: 700;
                // color:blue;
              }
            }
            p {
              // font-size: 0.4rem /* 30/75 */;
              font-weight: 500;
            }
            .openPrice {
              display: flex;
              font-family: " Tahoma", "Sans Serif";
              font-size: 0.32rem /* 24/75 */;
              color: #4c4c4c;
            }
          }
          .right {
            height: 0.933333rem /* 70/75 */;
            line-height: 0.933333rem /* 70/75 */;
            span {
              font-size: 20px;
              font-weight: 600;
              // color: #e54440;
            }
          }
        }
        .bottom {
          color: #acacac;
          font-size: 0.32rem /* 24/75 */;
          font-family: " Tahoma";
          h5 {
            margin-top: 0.266667rem;
            margin-bottom: 0.266667rem;
          }
          .left1-right1 {
            display: flex;

            .left1 {
              margin-right: 0.266667rem /* 20/75 */;
              width: 50%;
            }
            .right1 {
              width: 50%;
            }
            .a {
              display: flex;
              justify-content: space-between;
              margin-bottom: 0.186667rem /* 14/75 */;
              span {
                color: black;
              }
            }
          }
        }
      }
    }
    .transaction-E {
      margin-bottom: 1.333333rem /* 100/75 */;
      padding: 0.106667rem /* 8/75 */ 0.293333rem /* 22/75 */;
      border-top: 0.013333rem /* 1/75 */ solid #b9b6b6;
      border-bottom: 0.013333rem /* 1/75 */ solid #b9b6b6;
      .blue {
        color: #127df6;
      }
      .red {
        color: #e54440;
      }
      // height: 400px;
      background: white;
      div:last-child {
        .top {
          border-bottom: none;
          // background: red;
        }
      }
      .top {
        display: flex;
        font-size: 0.4rem /* 30/75 */;
        justify-content: space-between;
        padding-top: 0.266667rem /* 20/75 */;
        padding-bottom: 0.266667rem /* 20/75 */;
        border-bottom: 0.013333rem /* 1/75 */ solid #b9b6b6;
        font-family: " Sans Serif";
        .left {
          .flex {
            display: flex;
            margin-bottom: 0.2rem /* 15/75 */;
            h5 {
              font-size: 19px;
              font-weight: 700;
              font-family: " Sans Serif";
            }
            span {
              font-size: 20px;
              font-weight: 700;
              // color:blue;
            }
          }
          p {
            font-weight: 500;
            font-family: " Tahoma", "Sans Serif";
            font-size: 0.32rem /* 24/75 */;
            color: #4c4c4c;
          }
        }
        .right {
          height: 0.933333rem /* 70/75 */;
          line-height: 0.933333rem /* 70/75 */;
          span {
            font-size: 20px;
            font-weight: 600;
            // color: #127df6;
          }
        }
      }
      .bottom {
        color: #acacac;
        font-size: 0.32rem /* 24/75 */;
        font-family: " Tahoma";
        h5 {
          margin-top: 0.266667rem /* 20/75 */;
          margin-bottom: 0.266667rem /* 20/75 */;
        }
        span {
          color: black;
        }
        .left1-right1 {
          display: flex;

          .left1 {
            margin-right: 0.266667rem /* 20/75 */;
            width: 50%;
          }
          .right1 {
            width: 50%;
          }
          .a {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.186667rem /* 14/75 */;
          }
        }
      }
    }
  }
  .hongse {
    background: #e54440;
  }
  .lanse {
    background: #127df6;
  }
  .colorred {
    //  :class="item.ask < num1? 'colorred':'colorblue'"
              // :class="item.bid < num2? 'colorred':'colorblue'"
    color: #e54440;
  }
  .colorblue {
    color: #127df6;
  }
}
</style>
<script>
import store from "../../store";
import { getNowFormatDate } from "../../tools/check.js";
import { mapMutations } from "vuex";
import mixin from "../../common/mixin/mixin";
var api = require("../../api/api");
export default {
  mixins: [mixin],
  data() {
    return {
      startpageY: "",
      endpageY: "",
      scroll: "",
      num1: 0,
      num2: 0,
      tit: 0,
      hal: true,
      ino: "",
      out: "",
      titles: "",
      titlenum: "",
      accountList: [],
      ordersList: [],
      orderArr: [],
      contractsList: [],
      //60条数据
      addallList: [],
      //动态数据
      positionList: [],
      newArr: [],
      thisIndex: -1,
      nullIndex: -1,
      result: [],
      Loop: 0,
      show: false,
      active: false,
      positionId: "",
      volume: "",
      comment: "",
      orderID: "",
      blue: "lanse",
      red: "hongse",
      index: 0,
      indexs: 0,
      //删除项数组
      actions: [
        { name: "m.Close" },
        { name: "m.Transaction" },
        { name: 'm.Pricerevision' }
        // { name: '选项', subname: '描述信息' }
      ],
      actionss: [
        { name: "m.Delete" },
        // { name:'Modify' },
        { name: "m.Transaction" }
        // { name: '选项', subname: '描述信息' }
      ]
    };
  },
  created() {
    this.get();
    this.getdata1();
    this.actions = this.$store.state.actions;
    this.actionss = this.$store.state.actionss;
  },
  mounted() {},
  brforeUpdate() {},
  activated() {
    console.log("激活了");
    this.$nextTick(() => {
      this.getaccount();
      this.actions = this.$store.state.actions;
      this.actionss = this.$store.state.actionss;
      this.getdata1();
      this.show = false
    });
  },
  deactivated() {},
  computed: {
    datalist: function() {
      console.log(store.state.arr, "store.state.arr");
      if (this.positionList) {
        // this.ino = true;
        for (let b = 0; b < store.state.contractsLists.length; b++) {
          for (let i = 0; i < store.state.arr.length; i++) {
            var data4 = store.state.arr[i];
            var data6 = store.state.contractsLists[b];
            if (data6.symbol == data4.symbolName) {
              data6.ask = data4.ask;
              data6.bid = data4.bid;
            }
            for (let a = 0; a < this.positionList.length; a++) {
              var data5 = this.positionList[a];
              console.log(data5, "data5");
              console.log(data6, "data6");
              if (data5.symbol == data4.symbolName) {
                data4.ask = data5.ask;
                data4.bid = data5.bid;
              }
            }
          }
        }
      }
      if (this.newArr) {
        this.tit = 0;
        for (let i = 0; i < store.state.contractsLists.length; i++) {
          for (let j = 0; j < this.newArr.length; j++) {
            var arr1 = this.newArr[j];
            var arr2 = store.state.contractsLists[i];
            // console.log(arr2, "手机");
            if (
              arr1.symbolName === arr2.symbol &&
              arr2.ask != 0 &&
              arr2.bid != 0
            ) {
              arr2.contractSize = arr1.contractSize;
              arr2.data1 = (
                arr2.contractSize *
                arr2.volume *
                (arr2.openPrice - arr2.ask)
              ).toFixed(2);
              arr2.data2 = (
                arr2.contractSize *
                arr2.volume *
                (arr2.bid - arr2.openPrice)
              ).toFixed(2);
            }
            this.getaccount();
            if (arr1.symbolName === arr2.symbol) {
              if (arr2.orderDirection === -1) {
                if (arr2.data1) {
                  this.tit = this.tit + arr2.data1 * 1;
                  this.tit = this.tit;
                } else {
                  this.tit = this.tit + arr2.pnl * 1;
                  this.tit = this.tit;
                }
              }
            }
            if (arr1.symbolName === arr2.symbol) {
              if (arr2.orderDirection === 1) {
                if (arr2.data2) {
                  this.tit = this.tit + arr2.data2 * 1;
                  this.tit = this.tit;
                } else {
                  this.tit = this.tit + arr2.pnl * 1;
                  this.tit = this.tit;
                }
              }
            }
          }
        }
      }
      for (let j = 0; j < store.state.contractsLists.length; j++) {
        var arr2 = store.state.contractsLists[j];
        arr2.openTime1 = getNowFormatDate(
          new Date(new Date(arr2.openTime).getTime() - 7200000)
        );
        arr2.openTime1 = arr2.openTime1.split("-").join(".");
      }
      return store.state.contractsLists;
    },
    dataorder: function() {
      if (this.positionList) {
        for (let j = 0; j < store.state.order.length; j++) {
          for (let h = 0; h < this.positionList.length; h++) {
            var data3 = this.positionList[h];
            var data4 = store.state.order[j];
            if (data3.symbol == data4.symbol) {
              this.num1 = data4.ask;
              this.num2 = data4.bid;
            }
          }
        }
        for (let j = 0; j < store.state.order.length; j++) {
          for (let i = 0; i < store.state.arr.length; i++) {
            var data9 = store.state.arr[i];
            var data4 = store.state.order[j];
            if (data4.symbol == data9.symbolName) {
              data4.ask = data9.ask;
              data4.bid = data9.bid;
            }
            for (let h = 0; h < this.positionList.length; h++) {
              var data3 = this.positionList[h];
              if (data9.symbolName == data3.symbol) {
                data9.ask = data3.ask;
                data9.bid = data3.bid;
              }
            }
          }
        }
      }
      for (let j = 0; j < store.state.order.length; j++) {
        var data4 = store.state.order[j];
        data4.dateTime1 = getNowFormatDate(
          new Date(new Date(data4.dateTime).getTime() - 7200000)
        );
        data4.dateTime1 = data4.dateTime1.split("-").join(".");
        data4.expirationDate1 = getNowFormatDate(
          new Date(new Date(data4.expirationDate).getTime() - 7200000)
        );
        data4.expirationDate1 = data4.expirationDate1.split("-").join(".");
      }
       console.log(store.state.order,"store.state.order")
      return store.state.order;
    }
  },
  methods: {
    ...mapMutations(["setorder"]),
    ...mapMutations(["setcontractsList"]),
    getdata1() {
      this.$http.get(api.AccountURL).then(({ data }) => {
        this.hal = false;
        this.accountList = [data.data];
        console.log(this.accountList, "000");
      });
    },
    get() {
      this.orderArr = store.state.order;
      this.addallList = store.state.arr;
      this.contractsList = store.state.contractsLists;
      // console.log(this.addallList, "addallList");
      this.getnewArr();
    },
    getnewArr() {
      this.contractsList = store.state.contractsLists;
      console.log(this.addallList, this.contractsList, "77777777777777");
      for (let i = 0; i < this.addallList.length; i++) {
        for (let j = 0; j < this.contractsList.length; j++) {
          if (this.contractsList[j].symbol === this.addallList[i].symbolName) {
            this.newArr = this.addallList;
          }
        }
      }
    },
    shows(indexs) {
      if (this.thisIndex === null) {
        this.thisIndex = indexs;
      } else {
        this.thisIndex = null;
      }
    },
    up(index) {
      if (this.nullIndex === null) {
        this.nullIndex = index;
      } else {
        this.nullIndex = null;
      }
    },
    getaccount() {
      this.contractsList = store.state.contractsLists;
      this.result = this.contractsList.map((item, value) => {
        return item.orderDirection === 1
          ? parseFloat(item.data2)
          : parseFloat(item.data1);
      });
      let reduce = this.result.reduce((pre, item) => {
        return pre + item;
      }, 0);
      if (this.accountList[0]) {
        this.accountList[0].data3 =
          parseInt(this.accountList[0].balance) + reduce;
      }
    },
    // resultnum() {
    //   for (let i = 0; i < this.result.length; i++) {
    //     this.result[i] = parseFloat(this.result[i]);
    //   }
    //   return this.result;
    // },
    //长按
    showDeleteButton(e, e1, e2, e3, a) {
      console.log(a, "稍稍");
      console.log("长按了吗a");
      var that = this;
      window.localStorage.setItem("params", e3);
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          that.Loop = 0;
          this.selectType();
          this.active = true;
          this.positionId = e;
          this.volume = e1;
          this.index = e2;
          console.log(e, e1, e2, e3);
          console.log("长安了");
        }.bind(this),
        1000
      );
      return false;
    },
    gotouchmove() {
      clearTimeout(this.Loop); //清除定时器
      this.Loop = 0;
    },
    gotouchmove2() {
      clearTimeout(this.Loop); //清除定时器
      this.Loop = 0;
    },
    showDeleteButton2(e, e4, index) {
      var that = this;
      window.localStorage.setItem("params", e);
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          that.Loop = 0;
          this.selectType();
          this.active = false;
          this.id = e;
          this.orderID = e4;
          this.indexs = index;
        }.bind(this),
        1000
      );
      if (that.Loop != 0) {
        this.shows(e);
      }
      return false;
    },
    emptyTime(e, a) {
      var that = this;
      clearTimeout(this.Loop); //清空定时器，防止重复注册定时器
      if (that.Loop != 0) {
        this.shows(e);
      }
      return false;
    },
    emptyTime2(e) {
      var that = this;
      clearTimeout(this.Loop); //清空定时器，防止重复注册定时器
      if (that.Loop != 0) {
        this.up(e);
      }
      return false;
    },
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      console.log(item, "长按");
      if (item.name === "交易" || item.name === "Trade") {
      // this.show = false;
        this.$router.push("/transaction-place");
      } else if (
        item.name === "平仓" ||
        item.name === "Close" ||
        item.name === "平倉"
      ) {
        // console.log(this.index);
        this.close(this.index);
      } else if (
        item.name === "修改价位" ||
        item.name === "Price revisio" ||
        item.name === "修改價位"
      ) {
      // this.show = false;
      window.localStorage.setItem("orderid", this.orderID);

        this.$router.push("/transaction-modify");
      }
      if (
        item.name === "删除" ||
        item.name === "Delete" ||
        item.name === "刪除"
      ) {
        this.delete(this.indexs);
      }
    },
    selectType(item) {
      console.log(item, "chang");
      this.show = true;
      this.itemw = item;
    },
    //删除
    close(index) {
      this.$http
        .post(api.CloseURL, {
          volume: this.volume,
          positionId: this.positionId,
          comment: ""
        })
        .then(({ data }) => {
          if (data.code == 0) {
            store.state.contractsLists.splice(this.index, 1);
            this.getdata1();
          }
        });
    },
    delete(indexs) {
      this.$http.delete(api.Deleteorder + this.orderID).then(({ data }) => {
        if (data.code == 0) {
          store.state.order.splice(this.indexs, 1);
        }
      });
    },
    transaction() {
      this.$router.push({
        name: "transaction-place",
        params: { symbol: this.$route.params.symbol }
      });
    }
  },
  watch: {
    "$store.state.mydata": function(newer, old) {
      this.positionList = newer;
    },
    "$store.state.contractsLists": function(news, old) {
      if (news.length == 0) {
        this.ino = false;
      } else if (old.length != 0 || news.length != 0) {
        this.ino = true;
      }
    },
    "$store.state.order": function(newss, olds) {
      console.log(newss, olds, "1");
      if (newss.length == 0) {
        this.out = false;
      } else if (olds.length != 0 || newss.length != 0) {
        console.log(newss, olds, "2");
        this.out = true;
      }
    }
  }
};
</script>


 