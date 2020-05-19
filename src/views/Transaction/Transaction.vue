<template>
  <div class="transaction">
    <div class="transaction-A">
      <!-- <h3 v-for="(items,index) in gettitle">{{items}}</h3> -->
      <h3 v-if="this.tit">{{tit.toFixed(2)}} USD</h3>
      <h3 v-else-if="!this.tit">0.00 USD</h3>
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
          <span v-if="item.data3">{{item.data3}}</span>
          <span v-else>{{item.equity}}</span>
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
        @click="shows(indexs)"
        @touchstart="showDeleteButton(items.positionId,items.volume,indexs,items.symbol)"
        @touchend="emptyTime(items)"
      >
        <div class="top">
          <div class="left">
            <div class="flex">
              <h5>{{(items.symbol).slice(0,items.symbol.indexOf('.'))}},</h5>
              <span
                :class="{'red':items.orderDirection == -1,
              'blue':items.orderDirection == 1}"
              >{{items.orderDirection === 1? "buy" : "sell"}}{{items.volume}}</span>
            </div>
            <div class="openPrice">
              <p>{{items.openPrice}}</p>
              <span>-&gt;</span>
              <p v-if="items.orderDirection === -1">{{items.ask}}</p>
              <p v-else-if="items.orderDirection === 1">{{items.bid}}</p>
            </div>
          </div>
          <div class="right">
            <span v-if="items.contractSize && items.orderDirection === -1">{{items.data1}}</span>
            <span v-else-if="items.contractSize && items.orderDirection === 1">{{items.data2}}</span>
            <span v-else>{{(items.pnl)}}</span>
          </div>
        </div>
        <div class="bottom" v-show="indexs === thisIndex">
          <h5>{{(items.openTime.split('-').join(".")).replace("T"," ").replace("Z","")}}</h5>
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
        @click="up(index)"
        @touchstart="showDeleteButton2(item.symbol,item.orderID,index)"
        @touchend="emptyTime(item)"
      >
        <div class="top">
          <div class="left">
            <div class="flex">
              <h5>{{(item.symbol).slice(0,item.symbol.indexOf('.'))}},</h5>
              <!-- <span :class="{'red':item.orderDirection == -1,
              'blue':item.orderDirection == 1}">{{if(item.orderType === 7) {"buy limit"}}}</span>-->
              <span :class="{'blue' :item.orderType === 7}" v-if="item.orderType === 7">buy limit</span>
              <span
                :class="{'blue' :item.orderType === 9}"
                v-else-if="item.orderType === 9"
              >buy stop</span>
              <span :class="{'blue' :item.orderType === 3}" v-else>buy market</span>
            </div>
            <p>{{item.volume}} at {{item.orderPrice}}</p>
          </div>
          <div class="right">
            <span v-if="item.orderDirection === 1">{{item.ask}}</span>
            <span v-else-if="item.orderDirection === -1">{{item.bid}}</span>
          </div>
        </div>
        <div class="bottom" v-show="index === nullIndex">
          <h5>{{(item.dateTime.split('-').join(".")).replace("T"," ").replace("Z","")}}</h5>

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
              </div> -->
              <div class="a">
                <p>{{$t('m.Date')}}</p>
                <span>-</span>
              </div>
              <div class="a">
                <p>{{$t('m.Time')}}</p>
                <span>-</span>
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
      :close-on-click-overlay="false"
      v-if="active"
      id="modal"
    />
    <van-action-sheet
      :cancel-text="$t('m.Cancel')"
      v-model="show"
      :actions="actionss"
      @select="onSelect"
      :close-on-click-overlay="false"
      v-else
    />
    </keep-alive>
  </div>
</template>

<style lang="scss">
.van-popup--bottom.van-popup--round {
  padding-bottom: 0.533333rem /* 40/75 */;
}
.van-popup--safe-area-inset-bottom {
  // height: 4.666667rem /* 350/75 */;
  // background: red;

  .van-action-sheet__item {
    height: 1.333333rem /* 100/75 */;
    font-size: 0.533333rem /* 40/75 */;
  }
  .van-action-sheet__cancel,
  .van-action-sheet__item {
    // height: 1.6rem /* 120/75 */;
    // height: 1.333333rem /* 100/75 */;
    //  line-height: 1.333333rem /* 100/75 */;
    font-size: 0.533333rem /* 40/75 */;
  }
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
      background: #2e7bfd;
      display: flex;
      color: #fff;

      font-size: .533333rem /* 40/75 */;
      line-height: 1.333333rem /* 100/75 */;
      h3 {
        flex: 1;
        text-align: center;
          font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';

      }
      span {
        width: 0.933333rem /* 70/75 */;
        height: .666667rem /* 50/75 */;
        line-height: 1.4666667rem /* 50/75 */;
      }
    }
    .transaction-B {
      // height: 3.733333rem /* 280/75 */;
      background: white;
      font-size: .426667rem /* 32/75 */;
      line-height: 0.6rem /* 45/75 */;
      padding: 0.133333rem /* 10/75 */ 0.293333rem /* 22/75 */;
      color: #545454;
      .transaction-B1 {
        display: flex;
        justify-content: space-between;
        p ,span {
          font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';
          color:#666;
        }
        span {
      font-size: .4rem /* 30/75 */;
            
        }
      }
    }
    .transaction-C {
      padding: 0.106667rem /* 8/75 */ 0.293333rem /* 22/75 */;

      h4 {
        font-weight: 600;
        font-size: .373333rem /* 28/75 */;
        background: #eee;
        padding: 0.2rem /* 15/75 */ 0rem /* 0/75 */;
        font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';
        color:#6d6d6d;

      }
    }
    .transaction-C3 {
      padding: 0.106667rem /* 8/75 */ 0.293333rem /* 22/75 */;

      h4 {
        font-weight: 600;
        background: #eee;
        padding: 0.2rem /* 15/75 */ 0rem /* 0/75 */;
        font-size: .373333rem /* 28/75 */;
        padding: 0.2rem /* 15/75 */ 0rem /* 0/75 */;
        font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';
        color:#6d6d6d;
      }
    }
    .transaction-D {
      border-bottom: 0.013333rem /* 1/75 */ solid #b9b6b6;
      border-top: 0.013333rem /* 1/75 */ solid #b9b6b6;

      .blue {
        color: blue;
      }
      .red {
        color: red;
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
              font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';

          border-bottom: 0.013333rem /* 1/75 */ solid #b9b6b6;

          .left {
            .flex {
              display: flex;
              margin-bottom: 0.2rem /* 15/75 */;
              h5 {
               font-size: .426667rem /* 32/75 */;
                font-weight: 700;
              }
              span {
                // font-size: 0.4rem /* 30/75 */;
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
               font-family: 'Tahoma','Sans Serif';
               font-size:.32rem /* 24/75 */;
               color: #4c4c4c;

            }
          }
          .right {
            height: 0.933333rem /* 70/75 */;
            line-height: 0.933333rem /* 70/75 */;
            span {
              font-size:.426667rem /* 32/75 */;
              font-weight: 600;
              color: blue;
            }
          }
        }
        .bottom {
          color: #acacac;
          font-size: .32rem /* 24/75 */;
          font-family: 'Tahoma';
          h5 {
            margin-bottom: 0.533333rem /* 40/75 */;
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
                color:black;
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
        color: blue;
      }
      .red {
        color: red;
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
              font-family: 'HelveticaNeueLT-Pro-57-Cn','Sans Serif';

        .left {
          .flex {
            display: flex;
            margin-bottom: 0.2rem /* 15/75 */;
            h5 {
              font-size: .426667rem /* 32/75 */;
              font-weight: 700;
            }
            span {
              font-size: 0.4rem /* 30/75 */;
              font-weight: 700;
              // color:blue;
            }
          }
          p {
            font-weight: 500;
             font-family: 'Tahoma','Sans Serif';
               font-size:.32rem /* 24/75 */;
               color: #4c4c4c;
          }
        }
        .right {
          height: 0.933333rem /* 70/75 */;
          line-height: 0.933333rem /* 70/75 */;
          span {
           font-size:.426667rem /* 32/75 */;
            font-weight: 600;
            color: blue;
          }
        }
      }
      .bottom {
        color: #acacac;
          font-size: .32rem /* 24/75 */;
          font-family: 'Tahoma';
        h5 {
          margin-bottom: 0.533333rem /* 40/75 */;
        }
        span {
          color:black;
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
}
</style>
<script>
import store from "../../store";
import { mapMutations } from "vuex";
import mixin from "../../common/mixin/mixin";
var api = require("../../api/api")

export default {
  mixins: [mixin],
  data() {
    return {
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
      Loop: null,
      show: false,
      active: false,
      positionId: "",
      volume: "",
      comment: "",
      orderID: "",

      index: 0,
      indexs: 0,
      //删除项数组
      actions: [
        { name: 'Close' },
        { name: 'Trade'},
        { name: 'Price revision' }
        // { name: '选项', subname: '描述信息' }
      ],
      actionss: [
        { name: 'Delete' },
        { name:'Modify' },
        { name: 'Trade'}
        // { name: '选项', subname: '描述信息' }
      ]
    };
  },

  mounted() {
    console.log(this.newArr, "datassssssssssss");
    this.get();
  
  },
  brforeUpdate() {
    // this.gettitle()
  },

  activated() {
    console.log("激活了");
 
    this.$nextTick(() => {
      // this.get();
      //  this.getContractsList()
      this.actions = this.$store.state.actions
      this.actionss = this.$store.state.actionss
      console.log(this.$store.state.actions,"好了")
      this.getdata1();
    });
  },
  deactivated() {
console.log(this.actions,"9")
    console.log("失效了");
  },
  computed: {
    datalist: function() {
      if (this.positionList) {
        // this.ino = true;
        for (let a = 0; a < this.positionList.length; a++) {
          for (let b = 0; b < store.state.contractsLists.length; b++) {
            var data5 = this.positionList[a];
            var data6 = store.state.contractsLists[b];
            if (data5.symbol == data6.symbol) {
              // console.log(data6, "data5");

              data6.ask = data5.ask;
              data6.bid = data5.bid;
            }
          }
          // console.log(this.contractsList, "11111");
          // console.log(this.positionList, "0000");
        }
      }
      if (this.newArr) {
        this.tit = 0;
        // this.ino = true;

        for (let i = 0; i < store.state.contractsLists.length; i++) {
          for (let j = 0; j < this.newArr.length; j++) {
            var arr1 = this.newArr[j];
            var arr2 = store.state.contractsLists[i];
            console.log(arr1,arr2)
            if (arr1.symbolName === arr2.symbol) {
               console.log( this.newArr,"00000000")
              arr2.contractSize = arr1.contractSize;
              arr2.data1 = (
                arr2.contractSize *
                arr2.volume *
                (arr2.ask - arr2.openPrice)
              ).toFixed(2);
              arr2.data2 = (
                arr2.contractSize *
                arr2.volume *
                (arr2.bid - arr2.openPrice)
              ).toFixed(2);
            }
            console.log(store.state.contractsLists,"store.state.contractsLists")
            if (arr1.symbolName === arr2.symbol) {
              if (arr2.orderDirection === -1) {
                // console.log(arr2.orderDirection === -1)
                this.tit = this.tit + arr2.data1 * 1;
                this.tit = this.tit;
              }
            }
            if (arr1.symbolName === arr2.symbol) {
              if (arr2.orderDirection === 1) {
                this.tit = this.tit + arr2.data2 * 1;
                this.tit = this.tit;
              }
            }
          }
        }
      }

      return store.state.contractsLists;
    },
    dataorder: function() {
      if (this.positionList) {
        for (let h = 0; h < this.positionList.length; h++) {
          for (let j = 0; j < store.state.order.length; j++) {
            var data3 = this.positionList[h];
            var data4 = store.state.order[j];
            if (data3.symbol == data4.symbol) {
              data4.ask = data3.ask;
              data4.bid = data3.bid;
            }
          }
        }
      }
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
        console.log(this.accountList,"000")
      });
    },

    getnewArr() {
      console.log( this.addallList,this.contractsList,"77777777777777")
      for (let i = 0; i < this.addallList.length; i++) {
        for (let j = 0; j < this.contractsList.length; j++) {
          // console.log(this.contractsList[j].symbol === this.addallList[i].symbolName)
          if (this.contractsList[j].symbol === this.addallList[i].symbolName) {
            this.newArr.push(this.addallList[i]);
            console.log(this.newArr,"h")
          }
        }
      }
    },

    get() {
      this.orderArr = store.state.order;
      this.addallList = store.state.arr;
      this.contractsList = store.state.contractsLists;
      console.log(this.addallList, "addallList");

      // console.log(this.contractsList, "555555555555");
      this.getnewArr();
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
      this.result = this.contractsList.map((item, value) => {
        console.log(item, value, "niaho");

        return item.orderDirection === 1 ? item.data2 : item.data1;
      });
      console.log(this.result, "hhahaahahah");
      this.resultnum();

      let reduce = this.result.reduce((pre, item) => {
        return pre + item;
      }, 0);
      console.log(reduce, "reduce");
      if (this.accountList[0]) {
        this.accountList[0].data3 =
          parseInt(this.accountList[0].balance) + reduce;
        // console.log(this.accountList, "this.accountList");
      }
    },
    resultnum() {
      for (let i = 0; i < this.result.length; i++) {
        this.result[i] = parseInt(this.result[i]);
      }
      return this.result;
    },
    //长按
    showDeleteButton(e, e1, e2, e3) {
      window.localStorage.setItem("params", e3);
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          this.selectType();

          this.active = true;
          this.positionId = e;
          this.volume = e1;
          this.index = e2;
        console.log(e,e1,e2,e3)
          // console.log(e, "succe");
          // console.log(e1, "succe1");
          // console.log(this.comment, "succe2");
          // console.log(this.index, "successss");
          // alert("长按了")
        }.bind(this),
        1000
      );
    },
    gotouchmove() {
      clearTimeout(this.Loop); //清除定时器
    },
    showDeleteButton2(e, e4, index) {
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          this.selectType();

          this.active = false;
          this.id = e;
          this.orderID = e4;
          this.indexs = index;

          // alert("长按了")
        }.bind(this),
        1500
      );
    },
    emptyTime(e) {
      clearTimeout(this.Loop); //清空定时器，防止重复注册定时器
    },
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      console.log(item,"长按");
      if (item.name ===  '交易' || item.name ===  'Trade') {
        this.$router.push("/transaction-place");
      } else if (item.name === '平仓' || item.name === 'Close' ) {
        // console.log(this.index);
        this.close(this.index);
      } else if (item.name === '修改价格' || item.name === 'Price revisio') {
        this.$router.push("/transaction-modify");
      }
      if (item.name === '删除' || item.name === 'Delete') {
        this.delete(this.indexs);
        // console.log("删除", this.indexs);

        // this.deleteorder();
      }
      //   Toast(item.name);
    },
    selectType(item) {
      console.log(item,"chang");
      this.show = true;
      this.itemw = item;
    },
    //删除

    close(index) {
      // console.log(index, "taibangle");
      this.$http
        .post(api.CloseURL, {
          volume: this.volume,
          positionId: this.positionId,
          comment: ""
        })
        .then(({ data }) => {
          // console.log(this.positionId);
          // console.log(data.code, "data.code");
          if (data.code == 0) {
            store.state.contractsLists.splice(this.index, 1);
            this.getdata1();

            // this.getContractsList()
          }
        });
    },
    delete(indexs) {
      // console.log(indexs, "shabi");
      this.$http.delete(api.Deleteorder + this.orderID).then(({ data }) => {
        // console.log(data, "data");
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
      console.log(newer, old, "nnnnnnnn");
      this.positionList = newer;
      //   this.getOrderArr();
      this.getaccount();
      // this.gettitle()
    },
    "$store.state.contractsLists": function(news, old) {
      console.log(news, old, "5");

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


 