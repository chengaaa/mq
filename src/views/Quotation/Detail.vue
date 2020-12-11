<template>
  <div class="detail">
    <div v-for="(item,index) in list" :key="index" v-show="item.symbolName === listName">
      <div class="detail-a">
        <Navheader class="navbar" ref="child" @click="backgo"></Navheader>
        <h2>{{(item.symbolName).slice(0,item.symbolName.indexOf('.'))}}</h2>
      </div>
      <div class="detail-b">
        <p>{{item.description.toUpperCase()}}</p>
      </div>
      <div class="detail-c">
        <div class="bottom">
          <p>{{$t('m.Digits')}}</p>
          <span>{{item.digits}}</span>
        </div>
        <div class="bottom">
          <p>{{$t('m.Stopslevel')}}</p>
          <span>{{item.stopsLevel}}</span>
        </div>
        <div class="bottom">
          <p>{{$t('m.Contractsize')}}</p>
          <span>{{item.contractSize}}</span>
        </div>
        <div class="bottom">
          <p>{{$t('m.Profitcalculation')}}</p>
          <span v-show="item.calcMode === 0">Forex</span>
          <span v-show="item.calcMode === 1">Futures</span>
          <span v-show="item.calcMode === 2">CFD</span>
          <span v-show="item.calcMode === 3">CFD index</span>
          <span v-show="item.calcMode === 4">CFD leverage</span>
          <span v-show="item.calcMode === 5">Forex no leverage</span>
          <span v-show="item.calcMode === 6 || item.calcMode > 6 ">{{item.calcMode}}</span>
        </div>
        <div class="bottom">
          <p>{{$t('m.Swaptype')}}</p>
          <span  v-if="item.swapType === 'SWAP_BY_POINTS' ">Points</span>
          <span v-else>{{item.swapType}}</span>
        </div>
        <div class="bottom">
          <p>{{$t('m.Swaplong')}}</p>
          <span>{{item.swapLong}}</span>
        </div>
        <div class="bottom">
          <p>{{$t('m.Swapshort')}}</p>
          <span>{{item.swapShort}}</span>
        </div>


      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
body {
  background: #efeef3;
  font-family: "HelveticaNeueLT-Pro-57-Cn";
  .detail {
    background: #efeef3;
    .detail-a {
      width: 100%;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      background: white;
      h2 {
        text-align: center;
        font-size: 0.426667rem /* 32/75 */;
  font-family: "HelveticaNeueLT-Pro-57-Cn";

      }
    }
    .detail-b {
      padding: 0.213333rem /* 16/75 */ 0rem /* 0/75 */ 0.213333rem /* 16/75 */
        0.2rem /* 44/75 */;
      p {
        font-size: 14px;
        font-weight: 700;
  font-family: "HelveticaNeueLT-Pro-57-Cn";

      }
    }
    .detail-c {
      height: 2.4rem /* 180/75 */;
      background: white;
      // border-bottom: 1px solid #666666;
      p {
        font-size: 0.373333rem /* 28/75 */;
      }
      span {
        // font-size: 0.333333rem /* 25/75 */;
      }

      .top {
        height: 1.186667rem /* 89/75 */;
        line-height: 1.186667rem /* 89/75 */;
        margin-left: 0.466667rem /* 35/75 */;
        padding-right: 0.4rem /* 30/75 */;
        border-bottom: 1px solid #666666;
        display: flex;
        justify-content: space-between;
      }
      .bottom {
        // height: 1.186667rem /* 89/75 */;
        line-height: 1.186667rem /* 89/75 */;
        display: flex;
        justify-content: space-between;
        margin-right: 0.4rem /* 30/75 */;
        margin-left: 0.466667rem /* 35/75 */;
        // padding-right: .666667rem /* 50/75 */;
        border-bottom: 1px solid #8f8f8f;
        p {
          font-family: "Tahoma";
         color:#080808;

        }
        
        span {
          width: 2.133333rem /* 160/75 */;
          color:#535353;
          text-align: center;
        }
      }
    }
    .navbar {
      padding-top: 0.266667rem /* 20/75 */;
      font-size: 0.3333333333333rem;
    }
  }
}
</style>
<style>
.van-icon-arrow-left {
  font-size: 26px;
}
.van-action-sheet {
  padding-bottom: 10px;
}
</style>
<script>
const Navheader = ()=> import("../../components/Navheader");
import store from "../../store";
export default {
  data() {
    return {
      list: [],
      listName: ""
    };
  },
  components: {
    Navheader
  },
  methods: {
    backgo() {
      this.refs.child.navback();
    }
  },
  created() {
    this.list = store.state.arr;
    this.listName = this.$route.params.id;
  }
};
</script>