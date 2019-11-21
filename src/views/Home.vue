<template>
  <div class="home">
    <fixed class="position"></fixed>
    
    <van-swipe id="swiper" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img v-lazy="item" />
      </van-swipe-item>
    </van-swipe>
    
    <div class="home-btn">
      <router-link to="/login">
      <div class="btn" id="login-btn">
        <a >登录</a>
      </div>
      </router-link>
      <router-link to="/register">
      <div class="btn" id="regist-btn">
        <a href>立即注册</a>
      </div>
      </router-link>
    </div>
    <btch class="margin"></btch>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-top: 2rem /* 150/75 */;
 
  //   color: red;
  .margin {
   //  margin-bottom: 60px;
    padding: .533333rem /* 40/75 */ 0rem /* 0/75 */ 1.066667rem /* 80/75 */ 0rem /* 0/75 */;
    background: white;
    height: 4rem /* 300/75 */;
    box-sizing: border-box;
  }

  img {
    width: 100%;
    display: block;
  }
  .position {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .home-btn {
    width: 100%;
    padding: 1.066667rem /* 80/75 */ 0rem /* 0/75 */;
    height: 5.333333rem /* 400/75 */;
    box-sizing: border-box;
//   background: rgba($color: #0000, $alpha: 0.9);
  background: #2e2e2f;


    //   display: flex;
    //   flex-direction: column;

    .btn {
      width: 7.666667rem /* 575/75 */;
      height: 1.066667rem /* 80/75 */;
      // background: rgba($color: #ff7349, $alpha: 0.95);
      background: #ff6537;

      //   margin-bottom: 30px;
      text-align: center;
      line-height: 1.066667rem /* 80/75 */;
      margin: .4rem /* 30/75 */ auto;
      border-radius: .533333rem /* 40/75 */;
      font-size: .533333rem /* 40/75 */;
      border: .013333rem /* 1/75 */ solid white;
      

      a {
        color: white;
      }
    }
  }
}
</style>
<style lang="scss">
#swiper {
//   margin-bottom: 20px;
  .van-swipe__indicator {
    width: .24rem /* 18/75 */;
    height: .24rem /* 18/75 */;
  }
}
</style>
<script>
import Fixed from "../components/Fixed";
import Btch from "../components/Btch";
import Enlig from "../components/Enlig";

export default {
  data() {
    return {
      images: [require("../assets/lunbo1.jpg"), require("../assets/lunbo2.jpg")]
    };
  },
  components: {
    Fixed,
    Btch,
    Enlig
  }
};
</script>