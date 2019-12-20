<template>
  <div class="transaction">
    <div class="transaction-A">
      <h3 @click="ha">12345USD</h3>
      <span>
        <i class="iconfont" @click="transaction">&#xe644;</i>
      </span>
    </div>
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
        <span v-if="item.data3">{{item.data3 - item.margin}}</span>
        <span v-else>{{item.marginFree}}</span>
      </div>
      <div class="transaction-B1">
        <p>{{$t('m.Marginlevel')}}</p>
        <span
          v-if="item.margin != 0 && item.data3"
        >{{((item.data3 / item.margin) * 100).toFixed(2)}}</span>
        <span v-else>{{item.marginLevel}}</span>
      </div>
    </div>
    <div class="transaction-C">
      <h4>{{$t('m.Position')}}</h4>
    </div>
    <div class="transaction-D">
      <div
        v-for="(items,indexs) in contractsList"
        :key="indexs"
        class="transaction-D1"
        @click="shows(indexs)"
        @touchstart="showDeleteButton(items.positionId,items.volume,indexs)"
        @touchend="emptyTime(items)"
      >
        <div class="top">
          <div class="left">
            <div class="flex">
              <h5>{{items.symbol}},</h5>
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
    <div class="transaction-C">
      <h4>{{$t('m.Orders')}}</h4>
    </div>
    <div class="transaction-E">
      <!-- <van-action-sheet
          cancel-text="取消"
          v-model="show"
          :actions="actionss"
          @select="onSelect"
      />-->
      <!-- <div v-for="(items,indexs) in ordersList" :key="indexs"> -->
      <div
        v-for="(item, index) in orderArr"
        :key="index"
        @click="up(index)"
        @touchstart="showDeleteButton2(item.symbol,item.orderID)"
        @touchend="emptyTime(item)"
      >
        <div class="top">
          <div class="left">
            <div class="flex">
              <h5>{{item.symbol}},</h5>
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
              <div class="a">
                <p>{{$t('m.Price')}}</p>
                <span>-</span>
              </div>
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
    <van-action-sheet
      cancel-text="取消"
      v-model="show"
      :actions="actions"
      @select="onSelect"
      v-if="active"
    />
    <van-action-sheet
      cancel-text="取消"
      v-model="show"
      :actions="actionss"
      @select="onSelect"
      v-else
    />
  </div>
</template>
<style lang="scss">
.van-popup--safe-area-inset-bottom {
  // height: 4.666667rem /* 350/75 */;
  // background: red;

  .van-action-sheet__item {
    height: 1.333333rem /* 100/75 */;
    font-size: 0.533333rem /* 40/75 */;
  }
  .van-action-sheet__cancel,
  .van-action-sheet__item {
    height: 1.6rem /* 120/75 */;
    line-height: 1.333333rem /* 100/75 */;
    font-size: 0.533333rem /* 40/75 */;
  }
}
</style>
<style lang="scss" scoped>
.transaction {
  min-height: 17.333333rem /* 1300/75 */;
  background:#eee;
  .iconfont {
    font-size: 0.666667rem /* 50/75 */;
  }

  .transaction-A {
    width: 100%;
    //    height:1.333333rem /* 100/75 */;
    background: #2e7bfd;
    display: flex;
    color: white;

    font-size: 0.666667rem /* 50/75 */;
    line-height: 1.333333rem /* 100/75 */;
    h3 {
      flex: 1;
      text-align: center;
    }
    span {
      width: 0.933333rem /* 70/75 */;
    }
  }
  .transaction-B {
    // height: 3.733333rem /* 280/75 */;
    background: white;
    font-size: 0.4rem /* 30/75 */;
    line-height: 0.6rem /* 45/75 */;
    padding: 0.133333rem /* 10/75 */ 0.293333rem /* 22/75 */;
    color: #545454;
    .transaction-B1 {
      display: flex;
      justify-content: space-between;
    }
  }
  .transaction-C {
    padding: 0.106667rem /* 8/75 */ 0.293333rem /* 22/75 */;

    h4 {
      font-weight: 600;
      font-size: 0.466667rem /* 35/75 */;
      background: #eee;
     padding: .2rem /* 15/75 */ 0rem /* 0/75 */;
    }
  }
  .transaction-D {
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

      .top {
        display: flex;
        font-size: 0.4rem /* 30/75 */;
        justify-content: space-between;
        margin-bottom: 0.533333rem /* 40/75 */;
        .left {
          .flex {
            display: flex;
            margin-bottom: 0.2rem /* 15/75 */;
            h5 {
              font-size: 0.466667rem /* 35/75 */;
              font-weight: 700;
            }
            span {
              font-size: 0.4rem /* 30/75 */;
              font-weight: 700;
              // color:blue;
            }
          }
          p {
            font-size: 0.4rem /* 30/75 */;
            font-weight: 500;
          }
          .openPrice {
            display: flex;
          }
        }
        .right {
          height: 0.933333rem /* 70/75 */;
          line-height: 0.933333rem /* 70/75 */;
          span {
            font-size: 0.533333rem /* 40/75 */;
            font-weight: 600;
            color: blue;
          }
        }
      }
      .bottom {
        color: #acacac;
        font-size: 0.4rem /* 30/75 */;
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
          }
        }
      }
    }
  }
  .transaction-E {
    margin-bottom: 1.333333rem /* 100/75 */;
    padding: 0.106667rem /* 8/75 */ 0.293333rem /* 22/75 */;

    .blue {
      color: blue;
    }
    .red {
      color: red;
    }
    // height: 400px;
    background: white;

    .top {
      display: flex;
      font-size: 0.4rem /* 30/75 */;
      justify-content: space-between;
      margin-bottom: 0.533333rem /* 40/75 */;
      .left {
        .flex {
          display: flex;
          margin-bottom: 0.2rem /* 15/75 */;
          h5 {
            font-size: 0.466667rem /* 35/75 */;
            font-weight: 700;
          }
          span {
            font-size: 0.4rem /* 30/75 */;
            font-weight: 700;
            // color:blue;
          }
        }
        p {
          font-size: 0.4rem /* 30/75 */;
          font-weight: 500;
        }
      }
      .right {
        height: 0.933333rem /* 70/75 */;
        line-height: 0.933333rem /* 70/75 */;
        span {
          font-size: 0.533333rem /* 40/75 */;
          font-weight: 600;
          color: blue;
        }
      }
    }
    .bottom {
      color: #acacac;
      font-size: 0.4rem /* 30/75 */;
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

export default {
  mixins: [mixin],
  data() {
    return {
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
      //删除项数组
      actions: [
        { name: "平仓" },
        { name: "交易" }
        // { name: '选项', subname: '描述信息' }
      ],
      actionss: [
        { name: "删除" },
        { name: "修改" },
        { name: "交易" }
        // { name: '选项', subname: '描述信息' }
      ]
    };
  },
  computed: {
    //     params() {
    //  this.params =  this.contractsList[symbol]
    //     }
  },
  created() {
    this.get();
    this.getdata1();
    this.getdata2();
    
  },
 
  mounted() {},
  methods: {
    ...mapMutations(["setorder"]),
ha() {
console.log(this.$route.params,"ha")
},
    getdata2() {
      this.$http.get("/position/contracts").then(({ data }) => {
        this.contractsList = data.data;
        for (var f = 0; f < this.contractsList.length; f++) {
          console.log(this.contractsList[f], "fffff");
          this.contractsList[f].bid = "0.00";
          this.contractsList[f].ask = "0.00";
        }
        this.getnewArr();
      });
    },
    getdata1() {
      this.$http.get("/account").then(({ data }) => {
        // this.accountList.push(data.data);

        this.accountList = [data.data];
        // this.accountList[0].data3 = '0.00'
        console.log(this.accountList, "111");
      });
    },

    getnewArr() {
      for (let i = 0; i < this.addallList.length; i++) {
        for (let j = 0; j < this.contractsList.length; j++) {
          if (this.contractsList[j].symbol === this.addallList[i].symbolName) {
            this.newArr.push(this.addallList[i]);
          }
        }
      }
    },

    get() {
      this.orderArr = store.state.order;
      this.addallList = store.state.addall;
      // console.log(this.orderArr,"555555555555")
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
    getOrderArr() {
      if (this.positionList) {
        for (let h = 0; h < this.positionList.length; h++) {
          for (let j = 0; j < this.orderArr.length; j++) {
            // console.log(this.positionList[h], "0000");
            // console.log(this.orderArr[j], "11111");
            var data3 = this.positionList[h];
            var data4 = this.orderArr[j];
            if (data3.symbol == data4.symbol) {
              // console.log("ask");
              data4.ask = data3.ask;
              data4.bid = data3.bid;
            }
          }
        }
        this.orderArr = this.orderArr;
        // console.log(this.orderArr, "orderArr");
      }
    },
    getContractsList() {
      if (this.positionList) {
        for (let a = 0; a < this.positionList.length; a++) {
          for (let b = 0; b < this.contractsList.length; b++) {
            var data5 = this.positionList[a];
            var data6 = this.contractsList[b];
            if (data5.symbol == data6.symbol) {
              //   // console.log("ask");

              data6.ask = data5.ask;
              data6.bid = data5.bid;
            }
          }
          // console.log(this.contractsList, "11111");
          // console.log(this.positionList, "0000");
        }
        this.contractsList = this.contractsList;
      }
    },
    //有合约数量的数组
    getAddall() {
      // console.log(this.addallList)
      if (this.newArr) {
        for (let i = 0; i < this.contractsList.length; i++) {
          for (let j = 0; j < this.newArr.length; j++) {
            var arr1 = this.newArr[j];
            var arr2 = this.contractsList[i];
            if (arr1.symbolName === arr2.symbol) {
              //  console.log(arr1.symbolName,arr2.symbol)
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
          }
        }
        this.contractsList = this.contractsList;
        // console.log(this.contractsList, "vvvvvvvv");
      }
    },

    getaccount() {
      this.result = this.contractsList.map((item, value) => {
        // console.log(item, value, "niaho");

        return item.orderDirection === 1 ? item.data2 : item.data1;
      });
      this.resultnum();
      // console.log(this.result, "hhahaahahah");

      let reduce = this.result.reduce((pre, item) => {
        return pre + item;
      }, 0);
      // console.log(reduce, "reduce");
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
    showDeleteButton(e, e1, e2, indexs) {
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          this.selectType();

          this.active = true;
          this.positionId = e;
          this.volume = e1;
          this.index = indexs;

          console.log(e, "succe");
          console.log(e1, "succe1");
          console.log(this.comment, "succe2");
          console.log(indexs, "successss");
          // alert("长按了")
        }.bind(this),
        1000
      );
    },
    showDeleteButton2(e, e4) {
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          this.selectType();

          this.active = false;
          console.log(e, "eeeeeeeeeeee");
          console.log(e4, "eeeeeeeeeeee");
          this.id = e;
          this.orderID = e4;

          // alert("长按了")
        }.bind(this),
        1000
      );
    },
    emptyTime(e) {
      clearTimeout(this.Loop); //清空定时器，防止重复注册定时器
    },
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      console.log(item);
      if (item.name === "交易") {
        this.$router.push("/transaction-place");
      } else if (item.name === "平仓") {
        this.close(this.index);
      }
      if (item.name === "删除") {
        console.log("删除");
        this.$http.delete("/trade/order/" + this.orderID).then(({ data }) => {
          console.log(data, "data");
          if (data.code == 0) {
            this.orderArr.splice(this.index, 1);
          }
        });
        // this.deleteorder();
      }
      //   Toast(item.name);
    },
    selectType(item) {
      console.log(item);
      this.show = true;
      this.itemw = item;
    },
    //删除

    close(index) {
      console.log(index, "taibangle");
      this.$http
        .post("/position/contract/close", {
          volume: this.volume,
          positionId: this.positionId,
          comment: ""
        })
        .then(({ data }) => {
          console.log(this.positionId);
          console.log(data.code, "data.code");
          if (data.code == 0) {
            this.contractsList.splice(this.index, 1);
            this.getdata1();

            // this.getContractsList()
          }
        });
    },
    transaction() {
      this.$router.push({name:"transaction-place",params:{symbol:this.$route.params.symbol}});
    }
  },
  watch: {
    "$store.state.mydata": function(newer, old) {
      // console.log(newer, old, "nnnnnnnn");
      this.positionList = newer;
      this.getOrderArr();
      this.getContractsList();
      this.getAddall();
      this.getaccount();
    },
    deep: true
  }
};
</script>