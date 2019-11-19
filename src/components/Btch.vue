<template>
  <div class="btch">
    <ul v-for="(item,index) in List" :key="index">
      <li class="btch-A">
        <i class="iconfont">{{item.icon}}</i>
        <span>{{item.text}}</span>
        <div class="text">
          <span>{{item.usd}}</span>
          <span>≈</span>
          <span>{{((item.usd)*(item.rate)).toFixed(0)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.btch {
  display: flex;
    justify-content: space-evenly;

  .btch-A {
    display: flex;
    flex-direction: column;
    width: 1.786667rem /* 134/75 */;
  
    
    // height: 134px;
    // background: red;
    .iconfont {
      font-size: 1.2rem /* 90/75 */;
      color: #ff6537;
    //   color:rgba($color: #ff7349, $alpha: 0.95);

      text-align: center;
      margin-bottom: .266667rem /* 20/75 */;
    }
    .text {
        text-align: center;
        span {
            font-size: .266667rem /* 20/75 */;
        }
    }
    span {
      font-size: .32rem /* 24/75 */;
      margin-bottom: .266667rem /* 20/75 */;
      text-align: center;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      List: [
        {
          usd: 183,
          rate: 6.96,
          //指数
          aindex: 5.64,
          icon: "\ue637",
          text: "BTC/USDT"
        },
        {
          usd: 183,
          rate: 6.96,
          //指数
          aindex: 5.64,
          icon: "\ue6ae",
          text: "ETH/USDT"
        },
        {
          usd: 183,
          rate: 6.96,
          //指数
          aindex: 5.64,
          icon: "\ue624",
          text: "BCH/USDT"
        }
      ]
    };
  }
};
</script>