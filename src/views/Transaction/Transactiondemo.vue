<template>
  <div>
    <!-- 经典 -->
    <div class="transaction" v-show="istransaction == 'classic'">
      <div>
        <div class="transaction-A" :class="tit < 0 ? red : blue">
          <!-- <h3 v-for="(items,index) in gettitle">{{items}}</h3> -->
          <!-- <h3>{{tit?tit.toFixed(2):}} USD</h3> -->
          <!-- <h3 v-else>0.00 USD</h3> -->
          <h3 v-if="this.tit">{{ tit.toFixed(2) }}</h3>
          <h3 v-else>00.00</h3>
          <span>
            <img src="../../assets/add.jpg" alt @click="transaction" />
            <!-- <i class="iconfont" @click="transaction">&#xe644;</i> -->
          </span>
        </div>
        <div v-show="hal">
          <div class="transaction-B">
            <div class="transaction-B1">
              <p>{{ $t("m.Balance") }}</p>
              <span>0.00</span>
            </div>
            <div class="transaction-B1">
              <p>{{ $t("m.Equity") }}</p>
              <span>0.00</span>
            </div>
            <div class="transaction-B1">
              <p>{{ $t("m.Margin") }}</p>
              <span>0.00</span>
            </div>
            <div class="transaction-B1">
              <p>{{ $t("m.Freemargin") }}</p>

              <span>0.00</span>
            </div>
            <div class="transaction-B1">
              <p>{{ $t("m.Marginlevel") }}</p>
              <span>0.00</span>
            </div>
          </div>
        </div>
        <div v-show="accountList">
          <div
            v-for="(item, index) in accountList"
            :key="index"
            class="transaction-B"
          >
            <div class="transaction-B1">
              <p>{{ $t("m.Balance") }}</p>
              <span>{{ item.balance }}</span>
            </div>
            <div class="transaction-B1">
              <p>{{ $t("m.Equity") }}</p>
              <span v-if="item.data3">{{ Number(item.data3).toFixed(2) }}</span>
              <span v-else>{{ Number(item.equity).toFixed(2) }}</span>
            </div>
            <div class="transaction-B1">
              <p>{{ $t("m.Margin") }}</p>
              <span>{{ item.margin }}</span>
            </div>
            <div class="transaction-B1">
              <p>{{ $t("m.Freemargin") }}</p>
              <span v-if="item.data3">{{
                (item.data3 - item.margin).toFixed(2)
              }}</span>
              <span v-else>{{ Number(item.marginFree).toFixed(2) }}</span>
            </div>
            <div class="transaction-B1">
              <p>{{ $t("m.Marginlevel") }}</p>
              <span v-if="item.margin != 0 && item.data3">{{
                ((item.data3 / item.margin) * 100).toFixed(2)
              }}</span>
              <span v-else>{{ item.marginLevel }}</span>
            </div>
          </div>
        </div>
        <div v-show="ino" class="transaction-C">
          <h4>{{ $t("m.Position") }}</h4>
        </div>
        <div class="transaction-D">
          <div
            v-for="(items, indexs) in datalist"
            :key="indexs"
            class="transaction-D1"
            @touchstart="
              showDeleteButton(
                items.positionId,
                items.volume,
                indexs,
                items.symbol,
                $event
              )
            "
            @touchmove="gotouchmove"
            @touchend="emptyTime(indexs, $event)"
          >
            <div class="top">
              <div class="left">
                <div class="flex">
                  <h5>{{ items.symbol.slice(0, 3) }}/USDT,</h5>
                  <span
                    :class="{
                      red: items.orderDirection == -1,
                      blue: items.orderDirection == 1,
                    }"
                    >{{ items.orderDirection === 1 ? "buy" : "sell" }}
                    {{ items.volume }}</span
                  >
                </div>
                <div class="openPrice">
                  <p>{{ items.openPrice }}</p>
                  <span>-&gt;</span>
                  <p v-show="items.orderDirection === -1">{{ items.ask }}</p>
                  <p v-show="items.orderDirection === 1">{{ items.bid }}</p>
                </div>
              </div>
              <div class="right">
                <span
                  :class="items.data1 < 0 ? 'colorred' : 'colorblue'"
                  v-if="items.contractSize && items.orderDirection === -1"
                  >{{ items.data1 }}</span
                >
                <span
                  :class="items.data2 < 0 ? 'colorred' : 'colorblue'"
                  v-else-if="items.contractSize && items.orderDirection === 1"
                  >{{ items.data2 }}</span
                >
                <span
                  :class="items.pnl < 0 ? 'colorred' : 'colorblue'"
                  v-else
                  >{{ items.pnl }}</span
                >
              </div>
            </div>
            <div class="bottom" v-show="indexs === thisIndex">
              <h5>{{ items.openTime1 }}</h5>
              <div class="left1-right1">
                <div class="left1">
                  <div class="a">
                    <p>{{ $t("m.StopLoss") }}</p>
                    <span>{{ items.stopLoss ? items.stopLoss : "-" }}</span>
                  </div>
                  <div class="a">
                    <p>{{ $t("m.TakeProfit") }}</p>
                    <span>{{ items.takeProfit ? items.takeProfit : "-" }}</span>
                  </div>
                  <div class="a">
                    <p>{{ $t("m.orderID") }}</p>
                    <span>{{ items.positionId }}</span>
                  </div>
                </div>
                <div class="right1">
                  <div class="a">
                    <p>{{ $t("m.Swap") }}</p>
                    <span>{{ items.swap }}</span>
                  </div>
                  <div class="a">
                    <p>{{ $t("m.Taxes") }}</p>
                    <span>-</span>
                  </div>
                  <div class="a">
                    <p>{{ $t("m.Charges") }}</p>
                    <span>-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="out" class="transaction-C3">
          <h4>{{ $t("m.Orderss") }}</h4>
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
            @touchstart="showDeleteButton2(item.symbol, item.orderID, index)"
            @touchmove="gotouchmove2"
            @touchend="emptyTime2(index)"
          >
            <div class="top">
              <div class="left">
                <div class="flex">
                  <h5>{{ item.symbol.slice(0, 3) }}/USDT,</h5>
                  <!-- <span :class="{'red':item.orderDirection == -1,
              'blue':item.orderDirection == 1}">{{if(item.orderType === 7) {"buy limit"}}}</span>-->
                  <span
                    :class="{
                      blue: item.orderType === 7 && item.orderDirection === 1,
                    }"
                    v-show="item.orderType === 7 && item.orderDirection === 1"
                    >buy limit</span
                  >
                  <span
                    :class="{
                      red: item.orderType === 7 && item.orderDirection === -1,
                    }"
                    v-show="item.orderType === 7 && item.orderDirection === -1"
                    >sell limit</span
                  >

                  <span
                    :class="{
                      blue: item.orderType === 9 && item.orderDirection === 1,
                    }"
                    v-show="item.orderType === 9 && item.orderDirection === 1"
                    >buy stop</span
                  >
                  <span
                    :class="{
                      red: item.orderType === 9 && item.orderDirection === -1,
                    }"
                    v-show="item.orderType === 9 && item.orderDirection === -1"
                    >sell stop</span
                  >

                  <!-- <span :class="{'blue' :item.orderType === 3}" v-else>buy market</span> -->
                </div>
                <p>{{ item.volume }} at {{ item.orderPrice }}</p>
              </div>
              <div class="right">
                <span v-if="item.orderDirection === 1">{{ item.ask }}</span>
                <span v-else-if="item.orderDirection === -1">{{
                  item.bid
                }}</span>
              </div>
            </div>
            <div class="bottom" v-show="index === nullIndex">
              <h5>{{ item.dateTime1 }}</h5>
              <div class="left1-right1">
                <div class="left1">
                  <div class="a">
                    <p>{{ $t("m.StopLoss") }}</p>
                    <span>{{ item.stopLoss ? item.stopLoss : "-" }}</span>
                  </div>
                  <div class="a">
                    <p>{{ $t("m.TakeProfit") }}</p>
                    <span>{{ item.takeProfit ? item.takeProfit : "-" }}</span>
                  </div>
                  <div class="a">
                    <p>{{ $t("m.orderID") }}</p>
                    <span>{{ item.orderID }}</span>
                  </div>
                </div>
                <div class="right1">
                  <!-- <div class="a">
                <p>{{$t('m.Price')}}</p>
                <span>-</span>
              </div>-->
                  <div class="a">
                    <p>{{ $t("m.Date") }}</p>
                    <span v-show="item.orderDuration === 0">-</span>
                    <span v-show="item.orderDuration === 2">{{
                      item.expirationDate1.slice(
                        0,
                        item.expirationDate1.indexOf(" ")
                      )
                    }}</span>
                  </div>
                  <div class="a">
                    <p>{{ $t("m.Time") }}</p>
                    <span v-show="item.orderDuration === 0">-</span>

                    <span v-show="item.orderDuration === 2">{{
                      item.expirationDate1.slice(
                        item.expirationDate1.indexOf(" ")
                      )
                    }}</span>
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
    </div>
    <!-- 新的 -->
    <div
      style="overflow: auto"
      class="transaction2"
      v-show="istransaction == 'new'"
    >
      <div class="home-title">
        <h1 class="home-img">
          <img src="../../assets/images/logo1.png" alt />
        </h1>
      </div>
      <div class="transaction2-place" @click="allName">
        <div class="place2">
          <div class="tab">
            <i class="iconfont">&#xe60d;</i>
            <img class="place2-img" :src="imgname" alt="" />
            <div>
              <div class="tab-a">
                <h3 v-show="headerName">
                  {{ headerName.slice(0, 3) }}
                </h3>
                <span>/USDT</span>
                <!-- <h3 @click="all" v-else>ETHUSD</h3> -->
                <!-- <h3 @click="all" v-for="header in headerName" :key="header.symbol">{{header.symbol}}</h3> -->
              </div>
              <h3 class="tab-b">比特币</h3>
            </div>
          </div>

          <div class="transactionplace-e">
            <div
              v-for="(items, indexs) in dataorder2"
              :key="indexs"
              class="box"
            >
              <div
                v-show="items.symbolName === headerName"
                :class="items.bid < bidnum ? 'colorred' : 'colorblue'"
              >
                <div class="math">
                  <h2>{{ items.bid.substring(0, items.bid.indexOf(".")) }}</h2>
                  <span>{{ items.bid.slice(items.bid.indexOf("."), -1) }}</span>
                  <h6>{{ items.bid.substr(-1, 1) }}</h6>
                </div>
                <div class="max">最高{{ items.max }}</div>
              </div>
              <div
                v-show="items.symbolName === headerName"
                :class="items.ask < asknum ? 'colorred' : 'colorblue'"
              >
                <div class="math">
                  <h2>{{ items.ask.substring(0, items.ask.indexOf(".")) }}</h2>
                  <span>{{ items.ask.slice(items.ask.indexOf("."), -1) }}</span>
                  <h6>{{ items.ask.substr(-1, 1) }}</h6>
                </div>
                <div class="low">最低{{ items.low }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="transaction3-place">
        <div class="display-A place3">
          <h6 @click="trans">交易</h6>
          <h6 @click="entrust">委托({{ orderArr.length }})</h6>
          <h6 @click="Position">持仓({{ contractsList.length }})</h6>
        </div>
      </div>
      <div v-show="one">
        <div class="one display-A">
          <div class="one-a">
            <h5>结算币种</h5>
            <p>USDT</p>
          </div>
          <div class="one-a">
            <h5>可用资金(USDT)</h5>
            <p>{{ Free }}</p>
          </div>
          <div class="one-a">
            <h5>实际杠杆</h5>
            <p>20X</p>
          </div>
          <div class="one-a">
            <div class="set" @click="set">
              <h5>高级设置</h5>
              <i class="iconfont" v-show="setting">&#xe60d;</i>
              <i class="iconfont" v-show="!setting">&#xe635;</i>
            </div>
          </div>
        </div>
        <div class="input-place">
          <p>开仓手数 [1 手=1 BTC]</p>
          <input type="text" />
          手
        </div>
        <!-- 高级设置 -->
        <div class="set" v-show="setting">
          <div class="setting">
            <h6>限价</h6>
            <input type="text" placeholder="未设置" />
          </div>
          <div class="setting">
            <h6>止损</h6>
            <input type="text" placeholder="未设置" />
          </div>
          <div class="setting">
            <h6>获利</h6>
            <input type="text" placeholder="未设置" />
          </div>
        </div>
        <div
          class="dataorder2 display-A"
          v-for="(items, indexs) in dataorder2"
          :key="indexs"
        >
          <div
            v-if="items.symbolName === headerName"
            :class="items.bid < bidnum ? 'colorred' : 'colorblue'"
          >
            <div class="math">
              <h2>{{ items.bid.substring(0, items.bid.indexOf(".")) }}</h2>
              <span>{{ items.bid.slice(items.bid.indexOf("."), -1) }}</span>
              <h6>{{ items.bid.substr(-1, 1) }}</h6>
            </div>
          </div>
          <div
            v-if="items.symbolName === headerName"
            :class="items.ask < asknum ? 'colorred' : 'colorblue'"
          >
            <div class="math">
              <h2>{{ items.ask.substring(0, items.ask.indexOf(".")) }}</h2>
              <span>{{ items.ask.slice(items.ask.indexOf("."), -1) }}</span>
              <h6>{{ items.ask.substr(-1, 1) }}</h6>
            </div>
          </div>
        </div>
        <div class="button" v-show="!setting">
          <div class="transactionplace-f2">
            <div style="background: #fa807d; border-radius: 4px">
              Sell by Market
            </div>
            <p style="background: #3f75f1; border-radius: 4px">Buy by Market</p>
          </div>
        </div>
        <div class="button" v-show="setting">
          <div class="transactionplace-f2">
            <div style="background: #fa807d; border-radius: 4px">Sell</div>
            <p style="background: #3f75f1; border-radius: 4px">Buy</p>
          </div>
        </div>
      </div>
      <div v-show="two" class="entrust">
        <div class="entrust-A" v-for="(item, index) in dataorder" :key="index">
          <div class="entrust-B display-A">
            <div>
              <h3>{{ item.symbol.slice(0, item.symbol.indexOf(".")) }}</h3>
              <p :class="item.orderDirection === 1 ? 'buy' : 'sell'">
                {{ item.orderDirection === 1 ? "BUY" : "SELL" }}
              </p>
            </div>
            <div>
              <h3>{{ item.dateTime1 }}</h3>
              <p class="buy" @click="deletes(item.orderID)">撤单</p>
            </div>
          </div>
          <div class="entrust-C display-A">
            <div>
              <h3>委托价格</h3>
              <p>{{ item.orderPrice }}</p>
            </div>
            <div>
              <h3>委托手数</h3>
              <p>{{ item.volume }}</p>
            </div>
            <div>
              <h3>委托价值</h3>
              <p>
                {{ item.contractSize * item.volume }}
                {{ item.symbol.slice(0, 3) }}
              </p>
            </div>
            <div>
              <h3>成交手数</h3>
              <p>{{ item.volume - item.remainingVolume }}</p>
            </div>
          </div>
          <div class="entrust-D display-A">
            <div>
              <p>止损/获利</p>
            </div>
            <div>
              <h5>状态</h5>
              <h6>已挂单</h6>
            </div>
            <div>
              <h5>止损</h5>
              <h6>未设置</h6>
            </div>
            <div>
              <h5>获利</h5>
              <h6>未设置</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="modify-Mask">
        <div class="modify">
          <div class="display-A modify-a">
            <p>止损</p>
            <input type="text" />
          </div>
          <div class="display-A modify-a">
            <p>获利</p>
            <input type="text" />
          </div>
          <div class="display-A modify-b">
            <p>取消</p>
            <span>完成</span>
          </div>
        </div>
      </div>

      <div v-show="three" class="position">
        <div
          class="position-A"
          v-for="(items, indexs) in datalist"
          :key="indexs"
        >
          <div class="position-A1">
            <h5>BTCUSD</h5>
            <p class="buy">BUY</p>
            <span>20X</span>
          </div>
          <div class="position-B1 display-A">
            <div>
              <h6>开仓均价</h6>
              <p>14155.36</p>
            </div>
            <div>
              <h6>盈亏</h6>
              <p>+1233.33 USDT</p>
            </div>
          </div>

          <div class="position-C1 display-A">
            <div>
              <h5>手数</h5>
              <p>0.03</p>
            </div>
            <div>
              <h5>止损</h5>
              <p>未设置</p>
            </div>
            <div>
              <h5>获利</h5>
              <p>未设置</p>
            </div>
          </div>
          <div class="position-D1 display-A">
            <div>
              <h5>强平价格</h5>
              <h5>保证金</h5>
            </div>
            <div>
              <p>7496.26</p>
              <p>21.23</p>
            </div>
          </div>
          <p class="close">平仓</p>
        </div>
      </div>
      <div
        style="color: white"
        class="summary"
        v-for="(item, index) in accountList"
        :key="index"
      >
        <div>
          <h4>
            <img src="../../assets/images/yuan.png" alt="" />
            <span>结余</span>
          </h4>
          <span>{{ item.balance }}</span>
        </div>
        <div>
          <h4>
            <img src="../../assets/images/yuan.png" alt="" />
            <span>净值</span>
          </h4>
          <span v-if="item.data3">{{ Number(item.data3).toFixed(2) }}</span>
          <span v-else>{{ Number(item.equity).toFixed(2) }}</span>
        </div>
        <div>
          <h4>
            <img src="../../assets/images/yuan.png" alt="" />
            <span>预付款</span>
          </h4>
          <span>{{ item.margin }}</span>
        </div>
        <div>
          <h4>
            <img src="../../assets/images/yuan.png" alt="" />
            <span>可用预付款</span>
          </h4>
          <span v-if="item.data3">{{
            (item.data3 - item.margin).toFixed(2)
          }}</span>
          <span v-else>{{ Number(item.marginFree).toFixed(2) }}</span>
        </div>
        <div>
          <h4>
            <img src="../../assets/images/yuan.png" alt="" />
            <span>预付款比率(%)</span>
          </h4>
          <span v-if="item.margin != 0 && item.data3">{{
            ((item.data3 / item.margin) * 100).toFixed(2)
          }}</span>
          <span v-else>{{ item.marginLevel }}</span>
        </div>
      </div>
      <div style="height: 150px"></div>
    </div>
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
    min-height: 17.333333rem;
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
  .transaction2 {
    min-height: 17.333333rem;
    background: #262626;
    .iconfont {
      position: relative;
      top: 5px;
    }
    .home-title {
      width: 100%;
      display: flex;
      position: relative;
      .dow {
        color: #c9c9c9;
        position: absolute;
        top: 0.48rem;
        left: 0.266667rem /* 20/75 */;
        background: #262626;
        height: 30px;
        line-height: 30px;
        width: 90px;
        border-radius: 20px;
        text-align: center;
        border: 1px solid #c9c9c9;
      }
      .login {
        position: absolute;
        right: 15px;
        color: #c9c9c9;
        bottom: 15px;
        font-size: 14px;
      }
      h1 {
        background: #262626;
        width: 100%;
        height: 1.173333rem /* 88/75 */;
        padding: 0.333333rem /* 25/75 */ 0rem /* 0/75 */ 0rem /* 0/75 */ 0rem
          /* 0/75 */;
        margin: auto;
        text-align: center;
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
    .transaction2-place {
      padding-top: 10px;
      background: #2c2d28;
      padding-bottom: 10px;
      .place2 {
        display: flex;
        justify-content: space-between;
        .place2-img {
          height: 30px;
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      .tab {
        color: white;
        display: flex;
        .tab-a {
          display: flex;
          h3 {
            font-size: 18px;
            font-weight: 700;
          }
          span {
            font-size: 16px;
          }
        }
        .tab-b {
          margin-top: 4px;
        }
      }
      .transactionplace-e {
        width: 60%;
        .math {
          display: flex;
          justify-content: center;
          h2 {
            font-size: 20px;
            font-weight: 700;
          }
          span {
            font-size: 24px;
            font-weight: 700;
            position: relative;
            top: -3px;
          }
          h6 {
            font-weight: 700;
            font-size: 16px;
            position: relative;
            top: -6px;
          }
        }
        .max {
          text-align: center;
          color: #f0efed;
        }
        .low {
          text-align: center;
          color: #f0efed;
        }
        .box {
          display: flex;
          justify-content: space-between;
          padding-right: 0.373333rem /* 28/75 */;
        }
      }
    }
    .transaction3-place {
      padding-top: 15px;
      padding-bottom: 15px;
      border: 1px solid #595959;
      .place3 {
        align-items: center;
        color: #9f9f9f;
        font-size: 18px;
        h6 {
          font-weight: 700;
        }
      }
    }
    .one {
      color: white;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 14px;
      .one-a {
        text-align: center;
        .set {
          display: flex;
          border-left: 1px solid #eeeeee;
          padding-left: 10px;
          h5 {
            font-size: 16px;
            line-height: 20px;
            width: 34px;
          }
        }
        h5 {
          margin-bottom: 10px;
          color: #9a9a9a;
        }
        p {
          color: #fdfdfd;
        }
      }
    }
    .input-place {
      padding-top: 0.64rem /* 48/75 */;
      padding-bottom: 0.64rem /* 48/75 */;
      display: flex;
      justify-content: center;
      color: white;
      font-size: 14px;
      input {
        width: 20%;
        background: #262626;
        border: 1px solid #eee;
        margin-left: 0.4rem /* 30/75 */;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
    .dataorder2 {
      .math {
        display: flex;
        h2 {
          font-size: 20px;
          font-weight: 700;
        }
        span {
          font-size: 24px;
          font-weight: 700;
          position: relative;
          top: -3px;
        }
        h6 {
          font-weight: 700;
          font-size: 16px;
          position: relative;
          top: -6px;
        }
      }
    }
    .set {
      .setting {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
        h6 {
          color: #ffffff;
        }
        input {
          background: #262626;
          text-align: right;
          color: #ffffff;
        }
      }
    }

    .transactionplace-f {
      font-size: 0.533333rem /* 40/75 */;
      display: flex;
      justify-content: space-between;
      color: white;

      div {
        width: 50%;
        height: 1.2rem /* 90/75 */;
        line-height: 1.2rem /* 90/75 */;
        // background: red;
        text-align: center;
        font-size: 0.466667rem /* 35/75 */;
      }
      p {
        width: 50%;
        height: 1.2rem /* 90/75 */;
        line-height: 1.2rem /* 90/75 */;
        text-align: center;
        // background: blue;
        font-size: 0.466667rem /* 35/75 */;
      }
    }
    .transactionplace-f2 {
      font-size: 0.533333rem /* 40/75 */;
      display: flex;
      justify-content: space-around;
      color: white;
      margin-top: 10px;

      div {
        width: 45%;
        height: 40px;
        line-height: 40px;
        // background: red;
        text-align: center;
        font-size: 0.466667rem /* 35/75 */;
      }
      p {
        width: 45%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        // background: blue;
        font-size: 0.466667rem /* 35/75 */;
      }
    }
    .summary {
      div {
        display: flex;
        justify-content: space-between;
        padding-left: 0.266667rem /* 20/75 */;
        padding-right: 0.533333rem /* 40/75 */;
        border-bottom: 1px solid rgba(89, 89, 89);
        padding-top: 5px;
        padding-bottom: 5px;
        h4 {
          display: flex;
          align-items: center;
        }
      }
      img {
        height: 30px;
        // position: relative;
        // top: 10px;
      }
      span {
        font-size: 16px;
        display: flex;
        align-items: center;
      }
    }
    .entrust {
      color: white;
      .entrust-A {
        margin-bottom: 14px;
      }
      .entrust-B {
        // display: flex;
        // justify-content: space-between;
        padding: 20px 15px;
        border: 1px solid rgba(89, 89, 89);
        background: #2c2d28;
        div {
          display: flex;
          align-items: center;
          p {
            // border: 1px solid #4877f9;
            // width: 55px;
            // height: 30px;
            // line-height: 30px;
            // text-align: center;
            // font-size: 18px;
            // color: #4877f9;
            // margin-left: 10px;
          }
          h3 {
            font-size: 16px;
          }
        }
      }
      .entrust-C {
        padding-top: 40px;
        padding-bottom: 40px;
        background: #2c2d28;
        // margin-bottom: 40px;
        div {
          text-align: center;
          font-size: 16px;
          h3 {
            color: #9a9a9a;
            margin-bottom: 10px;
          }
        }
      }
      .entrust-D {
        padding-bottom: 40px;
        background: #2c2d28;
        div {
          text-align: center;
          font-size: 16px;
          p {
            background: #3f75f1;
            padding: 10px 10px;
            border-radius: 4px;
            font-size: 12px;
          }
          h5 {
            color: #9a9a9a;
            margin-bottom: 10px;
          }
        }
      }
    }
    .modify-Mask {
      height: 100%;
      background: rgba(26, 26, 26, 0.5);
      position: fixed;
      width: 100%;
      bottom: 0;
      top: 0;
      .modify {
        background: #2c2d28;

        .modify-a {
          align-items: center;
          margin-bottom: 15px;
          input {
            background: #2c2d28;
            border: 1px solid #eee;
            width: 50%;
            height: 20px;
          }
        }
        .modify-b {
          p,
          span {
            background: #ee7a7b;
            padding: 12px 40px;
            border-radius: 4px;
          }
          span {
            background: #416fe7;
          }
        }
      }
    }

    .position {
      color: white;
      .position-A {
        background: #2c2d28;
        padding-bottom: 20px;
        .position-A1 {
          display: flex;
          color: white;
          width: 40%;
          justify-content: space-evenly;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 20px;
          padding-left: 24px;
          h5,
          span {
            font-size: 16px;
          }
          span {
            color: #4877f9;
            margin-left: 10px;
          }
        }
        .position-B1 {
          font-size: 16px;
          div {
            text-align: center;
            h6 {
              margin-bottom: 10px;
            }
          }
        }
        .position-C1 {
          justify-content: space-between;
          padding: 20px 34px;
          font-size: 16px;
          h5 {
            color: #9a9a9a;
            margin-bottom: 10px;
          }
        }
        .position-D1 {
          justify-content: space-between;
          padding-left: 15px;
          padding-right: 15px;
          border-top: 1px solid rgba(89, 89, 89);

          div {
            h5 {
              font-size: 16px;
              color: #9a9a9a;
              padding-top: 10px;
              padding-bottom: 10px;
            }
          }
          div {
            p {
              font-size: 16px;
              padding-top: 10px;
              padding-bottom: 10px;
            }
          }
        }
        .close {
          background: #3f75f1;
          width: 25%;
          text-align: center;
          margin: auto;
          padding-top: 10px;
          padding-bottom: 10px;
          border-radius: 4px;
          font-size: 14px;
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
  .buy,
  .sell {
    border: 1px solid #4877f9;
    width: 55px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    color: #4877f9;
    margin-left: 10px;
  }
  .sell {
    color: #9c3b28;
    border: 1px solid #9c3b28;
  }
  .display-A {
    display: flex;
    justify-content: space-around;
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
      istransaction: localStorage.getItem("transaction"),
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
      headerName: "BTCUSD.",
      buynum: "",
      sellnum: "",
      asknum: 0,
      bidnum: 0,
      imgname: "",
      //删除项数组
      actions: [
        { name: "m.Close" },
        { name: "m.Transaction" },
        { name: "m.Pricerevision" },
        // { name: '选项', subname: '描述信息' }
      ],
      actionss: [
        { name: "m.Delete" },
        // { name:'Modify' },
        { name: "m.Transaction" },
        // { name: '选项', subname: '描述信息' }
      ],
      one: true,
      two: false,
      three: false,
      setting: false,
      Free: "",
    };
  },
  created() {
    this.get();
    this.getdata1();
    this.actions = this.$store.state.actions;
    this.actionss = this.$store.state.actionss;
    this.headerName = window.localStorage.getItem("params");
    this.getarr();
  },
  mounted() {},
  brforeUpdate() {},
  activated() {
    console.log("激活了");
    this.$nextTick(() => {
      this.get();
      this.getaccount();
      this.actions = this.$store.state.actions;
      this.actionss = this.$store.state.actionss;
      this.getdata1();
      this.show = false;
      this.istransaction = localStorage.getItem("transaction");
      this.headerName = window.localStorage.getItem("params");
    });
  },
  deactivated() {},
  computed: {
    datalist: function () {
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
    dataorder: function () {
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
              data4.contractSize = data9.contractSize;
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
      console.log(store.state.order, "store.state.order");
      return store.state.order;
    },

    dataorder2: function () {
      for (let j = 0; j < this.newdata1.length; j++) {
        var data4 = this.newdata1[j];
        if (data4.symbolName == this.headerName) {
          this.asknum = data4.ask;
          this.bidnum = data4.bid;
          this.buynum = data4.ask;
          this.sellnum = data4.bid;
          this.imgname = data4.img;
        }
      }
      if (this.positionList) {
        for (let h = 0; h < this.positionList.length; h++) {
          for (let j = 0; j < this.newdata1.length; j++) {
            var data3 = this.positionList[h];
            var data4 = this.newdata1[j];
            if (data3.symbol == data4.symbolName) {
              data4.ask = data3.ask;
              data4.bid = data3.bid;
            }
            if (data4.symbolName === this.headerName) {
              this.buynum = data4.ask;
              this.sellnum = data4.bid;
            }

            if (data4.symbolName === "BTCUSD.") {
              if (store.state.exchangeBTCUSD) {
                data4.max = store.state.exchangeBTCUSD.high;
                // if (data4.ask > store.state.exchangeBTCUSD.high) {
                //   store.state.exchangeBTCUSD.high = data4.ask;
                //   store.state.arr[i].max = store.state.exchangeBTCUSD.high;
                // }
              }
              // else {
              //   store.state.arr[i].max = "0.00";
              // }
              if (store.state.exchangeBTCUSD) {
                data4.low = store.state.exchangeBTCUSD.low;
                // if (store.state.arr[i].bid < store.state.exchangeBTCUSD.low) {
                //   store.state.exchangeBTCUSD.low = store.state.arr[i].bid;
                //   store.state.arr[i].low = store.state.exchangeBTCUSD.low;
                // }
              }
              //  else {
              //   store.state.arr[i].low = "0.00";
              // }
              console.log(store.state.arr, "store.state.arr");
            } else if (data4.symbolName === "ETHUSD.") {
              if (store.state.exchangeETHUSD) {
                data4.max = store.state.exchangeETHUSD.high;
                // if (store.state.arr[i].ask > store.state.exchangeETHUSD.high) {
                //   store.state.exchangeETHUSD.high = store.state.arr[i].ask;
                //   store.state.arr[i].max = store.state.exchangeETHUSD.high;
                // }
              }
              // else {
              //   store.state.arr[i].max = "0.00";
              // }
              if (store.state.exchangeETHUSD) {
                data4.low = store.state.exchangeETHUSD.low;
                // if (store.state.arr[i].bid < store.state.exchangeETHUSD.low) {
                //   store.state.exchangeETHUSD.low = store.state.arr[i].bid;
                //   store.state.arr[i].low = store.state.exchangeETHUSD.low;
                // }
              }
              //  else {
              //   store.state.arr[i].low = "0.00";
              // }
            } else if (data4.symbolName === "BCHUSD.") {
              if (store.state.exchangeBCHUSD) {
                data4.max = store.state.exchangeBCHUSD.high;
                // if (store.state.arr[i].ask > store.state.exchangeBCHUSD.high) {
                //   store.state.exchangeBCHUSD.high = store.state.arr[i].ask;
                //   store.state.arr[i].max = store.state.exchangeBCHUSD.high;
                // }
              }
              //  else {
              //   store.state.arr[i].max = "0.00";
              // }
              if (store.state.exchangeBCHUSD) {
                data4.low = store.state.exchangeBCHUSD.low;
                // if (store.state.arr[i].bid < store.state.exchangeBCHUSD.low) {
                //   store.state.exchangeBCHUSD.low = store.state.arr[i].bid;
                //   store.state.arr[i].low = store.state.exchangeBCHUSD.low;
                // }
              }
              // else {
              //   store.state.arr[i].low = "0.00";
              // }
            }
          }
        }
      }
      return this.newdata1;
    },
  },
  methods: {
    ...mapMutations(["setorder"]),
    ...mapMutations(["setcontractsList"]),
    allName() {
      this.$router.push("/transaction-placeall");
    },
    getdata1() {
      this.$http.get(api.AccountURL).then(({ data }) => {
        this.hal = false;
        this.accountList = [data.data];
        console.log(this.accountList, "000");
      });
    },
    get() {
      this.orderArr = store.state.order;
      console.log(this.orderArr, "几个");
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
        this.Free = (
          this.accountList[0].data3 - this.accountList[0].margin
        ).toFixed(2);
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
        function () {
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
        function () {
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
          comment: "",
        })
        .then(({ data }) => {
          if (data.code == 0) {
            store.state.contractsLists.splice(this.index, 1);
            this.getdata1();
          }
        });
    },
    //经典删除
    delete(indexs) {
      this.$http.delete(api.Deleteorder + this.orderID).then(({ data }) => {
        if (data.code == 0) {
          store.state.order.splice(this.indexs, 1);
        }
      });
    },
    //新删除
    deletes(orderID) {
      this.$http.delete(api.Deleteorder + orderID).then(({ data }) => {
        if (data.code == 0) {
          store.state.order.splice(this.indexs, 1);
          this.get();
        }
      });
    },
    transaction() {
      this.$router.push({
        name: "transaction-place",
        params: { symbol: this.$route.params.symbol },
      });
    },
    getarr() {
      this.newdata1 = this.$store.state.arr;
      // for(var i = 0; i < this.newdata1.length; i++) {
      //   console.log(this.newdata1[i], "0000000000000");
      //   if(this.headerName === this.newdata1[i].symbolName ){
      //     this.num3 = this.newdata1[i].ask

      //   }

      //   console.log( this.holder)
      // }
    },
    trans() {
      this.one = true;
      this.two = false;
      this.three = false;
    },
    entrust() {
      this.one = false;
      this.two = true;
      this.three = false;
    },
    Position() {
      this.one = false;
      this.two = false;
      this.three = true;
    },
    set() {
      this.setting = !this.setting;
    },
  },
  watch: {
    "$store.state.mydata": function (newer, old) {
      this.positionList = newer;
    },
    "$store.state.contractsLists": function (news, old) {
      if (news.length == 0) {
        this.ino = false;
      } else if (old.length != 0 || news.length != 0) {
        this.ino = true;
      }
    },
    "$store.state.order": function (newss, olds) {
      console.log(newss, olds, "1");
      if (newss.length == 0) {
        this.out = false;
      } else if (olds.length != 0 || newss.length != 0) {
        console.log(newss, olds, "2");
        this.out = true;
      }
    },
  },
};
</script>


 