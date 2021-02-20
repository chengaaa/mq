<template>
  <div class="home" >
    <div class="home-title">
      <div class="dow" @click="Android">下载APP</div>
      <h1 class="home-img">
        <img src="../../assets/images/logo1.png" alt />
      </h1>
      <div v-if="!tokens" class="login" @click="login">{{$t('m.Login')}}/{{$t('m.Register')}}</div>
    </div>
    <!-- <div class="logo2">
      <img src="../../assets/images/logo2.png" alt="">
      <span>bbook8已解决信息延迟问题 并已升级页面 更多问题请和客服反馈 感谢使用</span>
    </div> -->
    <van-notice-bar :left-icon="img" :scrollable="true" color="#000" background="#ffffff">
  <van-swipe
    vertical
    class="notice-swipe"
    :autoplay="3000"
    :show-indicators="false"
  >
    <van-swipe-item>{{announcement.substring(1,22)}}</van-swipe-item>
    <van-swipe-item>{{announcement.substring(22)}} </van-swipe-item>
  </van-swipe>
</van-notice-bar>
<div class="threeN"  >
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ffab26" >
  <van-swipe-item >
    <img class="swiper" :src="schpng1"  alt="">
    </van-swipe-item>
     <van-swipe-item >
    <img class="swiper" :src="schpng2" alt="">
    </van-swipe-item>
     <van-swipe-item >
    <img class="swiper" :src="schpng3" alt="">
    </van-swipe-item>
     <van-swipe-item>
    <img class="swiper" :src="schpng4" alt="">
    </van-swipe-item>
   
</van-swipe>
</div>
   <div class="newguide" @click="tradingguide">
     <div  class="newgs">
       <div  class="newg">
       <div>
         <img src="../../assets/images/book.png" alt="">
       </div>
       <div>
       <div  class="display display3">
         <h1>新手交易指南</h1>
         <span>NOVICE TRADING GUIDE</span>
       </div>
       <div class="display">
         <span>入门教学</span>
         <span>INTRODUCTION TEACHING</span>
       </div>
       
       </div>
     </div>
   </div>
   </div>
<div class="three">
   <div v-for="(item,index) in three" :key="index" class="threeA" :class="['threeA', active==index?'threeC':'']" >
     <div class="threeB" @click="change(index)">
      <img :src="item.img" alt="">
      <div >
      <h3>{{item.title}}</h3>
      <span>{{item.engtitle}}</span>
      </div>
     </div>
   </div>
   </div>

   <div class="four"  >
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ffab26" >
  <van-swipe-item>
    <img class="swiper2" :src="smallschpng1"  alt="">
    </van-swipe-item>
     <van-swipe-item>
    <img class="swiper2" :src="smallschpng2" alt="">
    </van-swipe-item>
     <van-swipe-item>
    <img class="swiper2" :src="smallschpng3" alt="">
    </van-swipe-item>
     <van-swipe-item>
    <img class="swiper2" :src="smallschpng4" alt="">
    </van-swipe-item>
    <!-- <van-swipe-item v-if="lang==='English'">
      <img class="swiper" :src="smallenpng1" alt="">
      </van-swipe-item>
      <van-swipe-item v-if="lang==='English'">
      <img class="swiper2" :src="smallenpng2" alt="">
      </van-swipe-item>
      <van-swipe-item v-if="lang==='English'">
      <img class="swiper" :src="smallenpng3" alt="">
      </van-swipe-item>
      <van-swipe-item v-if="lang==='English'">
      <img class="swiper2" :src="smallenpng4" alt="">
      </van-swipe-item>
       <van-swipe-item v-if="lang==='繁體'">
      <img class="swiper" :src="smalltchpng1" alt="">
      </van-swipe-item>
      <van-swipe-item v-if="lang==='繁體'">
      <img class="swiper2" :src="smalltchpng2" alt="">
      </van-swipe-item>
      <van-swipe-item v-if="lang==='繁體'">
      <img class="swiper" :src="smalltchpng3" alt="">
      </van-swipe-item>
      <van-swipe-item v-if="lang==='繁體'">
      <img class="swiper2" :src="smalltchpng4" alt="">
      </van-swipe-item> -->
  
</van-swipe>
</div>
  
<!-- 
    <div class="home-guide">
      <div class="left" @click="tradingguide">
        <img src="../../assets/image/组11@2x.png" alt />
        <h3>{{$t('m.NoviceTradingGuide')}}</h3>
        <span>{{$t('m.Introductionteaching')}}</span>
      </div>
      <div class="right" @click="join">
        <img src="../../assets/image/组1@2x.png" alt />
        <h3>{{$t('m.Jointheofficialgroup')}}</h3>
        <span>{{$t('m.Getnewredenvelopes')}}</span>
      </div>
    </div> -->
    <div class="home-last">
      <div class="home-last1">
        <h4>{{$t('m.Name')}}</h4>
        <h4>{{$t('m.Latestprice')}}</h4>
        <h4>{{$t('m.Upanddown')}}</h4>
      </div>
      <div>
      <div class="home-last2" v-for="(item,index) in homeArr" :key="index">
       
        <div class="home-one">
            <img  :src="item.img" alt="">
          <div class="home-one1">
            <div class="display1">
            <h3 >{{(item.designation).slice(0,3)}}</h3>
            <span>/USDT</span>
            </div>
          <p>{{$t(item.designationchinese)}}</p>

          </div>
        </div>
        <div class="home-two">
          <h3>{{((item.price + item.price2) / 2).toFixed(2)}}</h3>
          <p v-show="CNY && USD">￥{{(((item.price + item.price2) / 2) * (CNY/USD)).toFixed(2)}}</p>
        </div>
        <div class="home-three">
          <input type="button" :class="(((((item.price + item.price2 ) / 2 ) - item.open) /item.open) * 100).toFixed(2) >= 0?'backgreen':'backgreenred'" :value="(((((item.price + item.price2 ) / 2 ) - item.open) /item.open) * 100).toFixed(2) >= 0? '+' + (((((item.price + item.price2 ) / 2 ) - item.open) /item.open) * 100).toFixed(2) + '%':(((((item.price + item.price2 ) / 2 ) - item.open) /item.open) * 100).toFixed(2) + '%'" />
        </div>
      </div>
      </div>
       <!-- <div class="app">
         <div>{{$t('m.Download')}}</div>
         <div>
       <button style="color:black" @click="Android" class="button3"> -->
         <!-- <a :href="Android">Android</a> -->
         <!-- <a href="#">Android</a> -->
         <!-- Android
         </button>
       <button class="button3">
         <a :href="ios">IOS</a>
       </button>
       </div>
     </div> -->
    </div>
       <div class="back back1" v-show="customerdata">
      <div class="back-A">
      <img @click="closecustomer" class="img1" src="../../assets/images/icon_close.png"/>
     <div class="text">
      <img class="img2" src="../../assets/images/logo1.png"/>
     </div>
     <div class="customerimg" v-for="(item,index) in group" :key="index">
       <h4>{{$t('m.Contact')}}</h4>
       <img :src="item.address" alt="">
       <h4>{{$t('m.Scanning')}}</h4>
     </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.four >>> .van-swipe__indicators {
    top: -25px !important;
  }
  .threeN >>> .van-swipe__indicator {
    width: 9px;
    height: 9px;
  }
  .four >>> .van-swipe__indicator {
    width: 5px;
    height: 5px;
  }
</style>
<style lang="scss" scoped>
@import "../../common/mixin/ff.scss";
body {
  // font-family: sourcehansanscn L;
}
  .back {
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(26, 26, 26, 0.5);
    position: fixed;
    bottom: 0;
    top: 0;
    width: 100%;
    .back-A,.back-B {
      padding-left: 0.533333rem;
      padding-right: 0.533333rem;
      background: rgba(26, 26, 26, 0.8);
      width: 70%;
      // height: 400px;
      border: 2px solid #ebebeb;
      text-align: right;
      border-radius: 6px;
      position: relative;
      padding-bottom:0.4rem;
      .img1 {
        width: 30px;
        height: 30px;
        position: relative;
        top: 15px;
        left: 5px;
      }
      .text {
        text-align: left;
        .img2 {
          width: 50%;
        }
      }
      .customerimg {
   text-align: center;
    h4 {
      color: white;
      text-align: center;
      font-weight: 700;
      padding: 0.266667rem 0rem /* 0/75 */;
      font-size: 16px;
    }
        img {
          width:3.333333rem /* 250/75 */;
          height: 3.333333rem /* 250/75 */;
        }
      }
      .lasts {
        height: 5.333333rem /* 400/75 */;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        :nth-child(1) {
          border-bottom: 1px solid white;
        }
        .last {
          text-align: center;
          font-size: 16px;
          padding-top: 0.533333rem;
          padding-bottom: 0.533333rem;
        }
      }
      .ok {
        font-size: 14px;
        width: 2.133333rem /* 160/75 */;
        height: 0.933333rem;
        line-height: 0.933333rem;
        background: #384ca3;
        margin: 0 auto;
        text-align: center;
        color: white;
        border-radius: 6px;
      }
    }
    .back-B {
  background:#182566;
  border: none;
  padding-bottom: 1.333333rem /* 100/75 */;
  .text {
    text-align: center;
  }
  .img3 {
    text-align: center;
    margin-top: .266667rem /* 20/75 */;
     img {
          // width: 3.5rem;
    height: 3.5rem;
  }

  } 
  p {
    text-align: center;
    // padding-top: 0.133333rem ;
    padding-bottom:0.133333rem ;
    font-size: 16px;
    color: #c9ccda;
    margin-top: 0.266667rem;
  }
  .pace {
    // height:0.666667rem;
  }
   
    }
    .iosand {
      display:flex;justify-content:center;margin-top:20px;
      .margins {
      margin-right: .533333rem /* 40/75 */;
      }
      h5 {
        color:white;text-align:center;
        padding:.4rem /* 30/75 */ 0px;
        font-size:16px;
      }
      img {
        width:2.666667rem /* 200/75 */;
      }
    }
    .down {
      margin-bottom:.533333rem /* 40/75 */;
    }
  }
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
  .van-swipe {
    position: static;
  }
  .swiper {
    width: 100%;
  }
    .swiper2 {
    width: 95%;
  }
  .newguide {
    height: 2.666667rem /* 200/75 */;
    background: #262626;
    .newgs {
    width:85%;
       margin:auto;
       border:1px solid white;
       border-radius:8px;
       .newg {
    display:flex;
    justify-content:space-evenly;
    align-items: center;
    padding: 0.28rem  0.266667rem;
    img {
      width:50px;height:50px;
    }
    .display3 {
      margin-bottom:4px}
    }
    }
  }
  .three {
  display:flex;
  justify-content: space-around;
  margin-top:0.2rem;
  margin-bottom:1.8rem;
  .threeA {
    display:flex;
  }
  .threeB {
    display:flex; 
    color: #c9c9c9;
    margin-left:0.2rem;
    margin-right:0.2rem;
    padding-bottom:0.3rem;
    img {
    width:25px;height:25px;margin-right:10px;
    }
    h3 {
       margin-bottom:5px;text-align:left;
    }
  }
  .threeC {
    // border-bottom:2px solid white;
  }
  }
  .threeN {
  height:200px;position:relative
  }
  .four {
    height:1.333333rem /* 100/75 */;position:relative;text-align: center;
  }
  .display {
    display: flex;
    color: #c9c9c9;
    h1 {
      font-size: 15px;
      margin-right: 2px;
      font-weight: 700;
      color:white;
      // font-family: sourcehansanscn B;
    }
    span {
      margin-left: 8px;
    }
  }
 .green{
    color: #1dd086;
  }
  .greenred {
    color: red;
  }
  .backgreen {
    background: #36673a
  }
  .backgreenred {
    background: #a0332e;
  }
.app {
  // background: rgba($color: #000000, $alpha:0.5);
  height:1.6rem /* 120/75 */;
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  margin-top: 0.133333rem;
  color: #eff0f2;
  font-size: 22px;
  .button3 {
    appearance: none;
    width: 2.4rem /* 180/75 */;
    height:.933333rem /* 70/75 */;
    border: 1px solid black;
    border-radius: 8px;
    font-size: 18px;
    margin-right: .066667rem /* 5/75 */;
    background: white;
    a {
    color: black;

    }
  }
}
.home {
  background: #262626;
 
 
  .home-title {
    width: 100%;
    display: flex;
    position: relative;
    .dow {
      color: #c9c9c9;
    position: absolute;
    top: 0.48rem;
    left: .266667rem /* 20/75 */;
    background: #262626;
    height: 30px;
    line-height: 30px;
    width: 90px;
    border-radius: 20px;
    text-align: center;
    border: 1px solid #c9c9c9;
    }
    .login {
      position: absolute;right: 15px;color: #c9c9c9;bottom: 15px;font-size: 14px;
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
  .logo2 {
    text-align: center;
    padding: 2px 5px;
    
    img {
      width: 14px;
      height: 14px;
      margin-right: 2px;
    position: relative;
    top: 2px;

    }
    span{
      text-align: center;
    }
  }
  .home-banner {
    height: 6.666667rem /* 500/75 */;
    margin-bottom: 0.32rem /* 24/75 */;
      // padding-top: 1.173333rem;
    img {
      width: 100%;
      height: 6.666667rem /* 500/75 */;
    }
  }
  .home-news {
    display: flex;
    height: 1.293333rem /* 97/75 */;
    border-bottom: 1px solid #eeeeee;
    padding-left: 0.32rem /* 24/75 */;
     .icon-gonggao3{
    font-size:.533333rem /* 40/75 */;
    color: red;
  }
   
    img {
      width: 1.066667rem /* 80/75 */;
      height: 1.066667rem /* 80/75 */;
    }
    .p {
      height: 1.066667rem /* 80/75 */;
      line-height: 0.533333rem /* 40/75 */;
      font-size: 0.4rem /* 30/75 */;
      color: #000000;
      padding-left:.24rem /* 18/75 */;
    }
  }

  .home-number {
    display: flex;
    justify-content: space-between;
    padding-left: 0.693333rem /* 52/75 */;
    margin-right: 0.693333rem /* 52/75 */;
    width: 88.5%;
    .home-number11,
    .home-number12,
    .home-number10 {
      height: 2.533333rem /* 190/75 */;
      text-align: center;
      padding-top: 0.426667rem /* 32/75 */;

      h5 {
        font-size: 0.533333rem /* 40/75 */;
        margin-bottom: 0.12rem /* 9/75 */;
        // color: red;
      }
      p {
        font-size: 0.346667rem /* 26/75 */;
        text-align: center;
        margin-bottom: 0.133333rem /* 10/75 */;
        // color: red;
      }
      span {
        font-size: 0.373333rem /* 28/75 */;
        text-align: center;
        color: #a7a7a7;
      }
      .iconfont {
        color: #127df6;
        font-size: 0.386667rem /* 29/75 */;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
    .home-number10 {
      .iconfont {
        color: #f9a135;
        font-size: 0.386667rem /* 29/75 */;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
    .home-number12 {
      .iconfont {
        color: #4fce59;
        font-size: 0.386667rem /* 29/75 */;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
    .home-number2,
    .home-number3,
    .home-number4 {
      h4 {
        font-size: 18px;//嗯
      }
      span {
        font-size: 0.266667rem /* 20/75 */;
        line-height: 0.533333rem /* 40/75 */;
        color: #a7a7a7;
      }
    }
    .home-number2 {
      display: flex;
      margin-bottom: 0.146667rem /* 11/75 */;
      text-align: center;

      .iconfont {
        font-size: 0.386667rem /* 29/75 */;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }

    .home-number3 {
      display: flex;
      margin-bottom: 0.146667rem /* 11/75 */;
      .iconfont {
        font-size: 0.386667rem /* 29/75 */;
        color: #127df6;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
    .home-number4 {
      margin-bottom: 0.146667rem /* 11/75 */;

      display: flex;
      .iconfont {
        font-size: 0.386667rem /* 29/75 */;
        color: #4fce59;
        margin-right: 0.133333rem /* 10/75 */;
      }
    }
  }
  .border {
    border: 1px solid #fafcff;
  }

  .login-button {
    display: flex;
    justify-content: space-between;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    height: 2.586667rem /* 194/75 */;
    padding-top: 0.8rem /* 60/75 */;
    box-sizing: border-box;
    .login-left,
    .login-right {
      width: 4.453333rem /* 334/75 */;
      font-size: 0.346667rem /* 26/75 */;
    }
    .login-left {
      p {
        margin-bottom: 0.32rem /* 24/75 */;
      }
    }
    .login-right {
      display: flex;
      padding-top: 0.266667rem /* 20/75 */;

      input {
        width: 2.066667rem /* 155/75 */;
        height: 0.8rem /* 60/75 */;
        text-align: center;
        border-radius: 4px;
        appearance: none;
      }
      :nth-child(1) {
        margin-right: 0.346667rem /* 26/75 */;
        background: #127df6;
        color: white;
      }
      :nth-child(2) {
        background: white;
        color: #707070;
        border: 1px solid #666666;
      }
    }
  }

  .home-guide {
    height: 4.173333rem /* 313/75 */;
    display: flex;
    justify-content: space-between;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    margin-top: 0.066667rem /* 5/75 */;
    margin-bottom: 0.533333rem /* 40/75 */;
    .left,
    .right {
      width: 4.453333rem /* 334/75 */;
      height: 2.72rem /* 204/75 */;

      text-align: center;
      padding-top: 0.8rem /* 60/75 */;
      padding-bottom: 0.64rem /* 48/75 */;

      h3 {
        font-size: 0.346667rem /* 26/75 */;
        font-weight: 700;
        margin-bottom: 0.16rem /* 12/75 */;
      }
      span {
        font-size: 0.32rem /* 24/75 */;
        color: #a7a7a7;
      }
      //
    }
    .left {
      box-shadow: 0px 1px 4px #eff0f2;

      img {
        width: 1.613333rem /* 121/75 */;
        height: 1.533333rem /* 115/75 */;
        margin-bottom: 0.16rem /* 12/75 */;
      }
    }
    .right {
      box-shadow: 0px 1px 4px #eff0f2;

      img {
        width: 1.213333rem /* 91/75 */;
        height: 1.48rem /* 111/75 */;
        margin-bottom: 0.16rem /* 12/75 */;
      }
    }
  }

  .home-last {
    // height: 7.44rem /* 558/75 */;
    margin-bottom: 1.4rem;
    color: #c9c9c9;
    .home-last1 {
      display: flex;
      justify-content: space-between;
      font-size:14px;
      // color: #333333;
      height: 1.186667rem /* 89/75 */;
      line-height: 1.186667rem /* 89/75 */;
      // border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #565656;
      // margin-left: 0.32rem /* 24/75 */;
      // margin-right: 0.32rem /* 24/75 */;
      padding-left:1.4rem /* 40/75 */ ;
      padding-right: 1rem /* 40/75 */;
    }
    .home-last2 {
      display: flex;
      justify-content: space-between;
      padding-left: 0.32rem /* 24/75 */;
      padding-right: 0.32rem /* 24/75 */;
      padding-top: 10px;
      padding-bottom: 10px;
          background: #262626;
    border-bottom: 1px solid #565656;
      .home-one {
        display: flex;
        flex:1;
        .display1 {
          display:flex}
        
          img {
            width: .8rem /* 60/75 */;
            height: .8rem /* 60/75 */;
            margin-right: .266667rem /* 20/75 */;

          }
        .home-one1 {
          display: flex;
          flex-direction: column;
          
          h3 {
            font-size: 16px;
            // font-family:sourcehansanscn B;
            color:white;
          }
          span {
            font-size: 14px;
   
            // line-height: 0.533333rem;
            // color: #a7a7a7;
          }
        
        }
        p {
          // color: #a7a7a7;
          font-size: 12px;
              margin-top: 4px;
          // margin-top: 0.133333rem /* 10/75 */;
          // text-align: center;
          // margin-left:0.266667rem;
        }
      }
      .home-two {
        width: 35%;
        text-align: left;
        h3 {
          font-size: 16px;//嗯
          color:white;
          // font-family: sourcehansanscn B;
        }
        p {
          color: #a7a7a7;
          font-size: 16px;
          margin-top: 0.133333rem /* 10/75 */;
        }
      }
      .home-three {
        // flex: 1;
        input {
          width: 2.133333rem /* 160/75 */;
          height: 0.866667rem /* 65/75 */;
          // background: #1dd086;
          appearance: none;
          border-radius: 4px;
          color: white;
          font-size: 16px;
          font-weight: 700;
          // font-family: sourcehansanscn B ;
        }
      }
    }
  }
}
</style>
<style lang="scss">
</style>
<script>
import { mapMutations } from "vuex";
import store from "../../store";
import { getUTCtime } from "../../tools/check.js";
var api = require("../../api/api");

export default {
  data() {
    return {
      tokens: "",
      lang: localStorage.getItem("engs"),
      Androids:"",
      ios:"",
      homeList: [],
      CNY: null,
      USD: null,
      schpng1:"",
      schpng2:"",
      schpng3:"",
      schpng4:"",
      smallschpng1:"",
      smallschpng2:"",
      smallschpng3:"",
      smallschpng4:"",
      active:0,
      announcement:"",
      img:require("../../assets/images/logo2.png"),
      group:[],
      customerdata:false,
      three:[
        { img:require("../../assets/images/group.png"),
          title:"官方群组",
          engtitle:"OFFICIAL GROUP",
        },
        { img:require("../../assets/images/red.png"),
          title:"新人红包",
          engtitle:"RED ENVELOPES"
        },
        { img:require("../../assets/images/hehuoren.png"),
          title:"合伙人",
          engtitle:"PARTNER"
        }
      ],
      List: [
        {
          designation: "BTCUSD.",
          price: 9782.36,
          price2: 9782.36,
          tariff: "￥0.00",
          designationchinese: "m.BTC",
          percentage: "+0.52%",
          icontext: "\ue62d",
          img:require("../../assets/images/icon_btc.png")
        },
        {
          designation: "ETHUSD.",
          price: 214.73,
          price2: 214.73,
          tariff: "￥0.00",
          designationchinese: "m.ETH",
          percentage: "-1.25%",
          icontext: "\ue63a",
          img:require("../../assets/images/icon_eth.png")

        },
        {
          designation: "BCHUSD.",
          price: 256.23,
          price2: 256.23,
          tariff: "￥798.23",
          designationchinese: "m.BCH",
          percentage: "-2.56%",
          icontext: "\ue62d",
          img:require("../../assets/images/icon_bch.png")

        },
         {
          designation: "XRP-USDT",
          price: 0.2492,
          price2: 0.2492,
          tariff: "￥798.23",
          designationchinese: "m.XRP",
          percentage: "-2.56%",
          icontext: "\ue62d",
          img:require("../../assets/images/icon_xrp.png")

        },
         {
          designation: "LTC-USDT",
          price: 59.97,
          price2: 59.97,
          tariff: "￥798.23",
          designationchinese: "m.LTC",
          percentage: "-2.56%",
          icontext: "\ue62d",
          img:require("../../assets/images/icon_ltc.png")

        },
         {
          designation: "BSV-USDT",
          price: 162.19,
          price2: 162.19,
          tariff: "￥798.23",
          designationchinese: "m.BSV",
          percentage: "-2.56%",
          icontext: "\ue62d",
          img:require("../../assets/images/icon_bsv.png")

        },
         {
          designation: "EOS-USDT",
          price: 2.508,
          price2: 2.508,
          tariff: "￥798.23",
          designationchinese: "m.EOS",
          percentage: "-2.56%",
          icontext: "\ue62d",
          img:require("../../assets/images/icon_eos.png")

        },
         {
          designation: "ETC-USDT",
          price: 5.102,
          price2: 5.102,
          tariff: "￥798.23",
          designationchinese: "m.ETC",
          percentage: "-2.56%",
          icontext: "\ue62d",
          img:require("../../assets/images/icon_etc.png")

        },
         {
          designation: "LINK-USDT",
          price: 12.144,
          price2: 12.144,
          tariff: "￥798.23",
          designationchinese: "m.LINK",
          percentage: "-2.56%",
          icontext: "\ue62d",
          img:require("../../assets/images/icon_link.png")

        },
         {
          designation: "TRX-USDT",
          price: 0.02586,
          price2: 0.02586,
          tariff: "￥798.23",
          designationchinese: "m.TRX",
          percentage: "-2.56%",
          icontext: "\ue62d",
          img:require("../../assets/images/icon_trx.png")

        },
        
      ]
    };
  },

  created() {
    this.tokens = localStorage.getItem("token");
    // this.rate();
    this.rate()
    // this.CNY = localStorage.getItem("CNY")
    // this.USD = localStorage.getItem("USD")
    this.getbanner()
    this.getnotice()
    this.getappinfo()
    this.getcustomer()
    // this.getaccount()
    // this.homewebsocket()
  },

  beforeRouteEnter(to, from, next) {
    if (from.path === "/login") {
      next(vm => {
        vm.tokens = localStorage.getItem("token");
        if (vm.tokens) {
          // vm.get();
          vm.getdata3();
          vm.getdata2();
          vm.getdata6();
        }
      });
    }
    next();
  },

  mounted() {
  },
  computed: {
    homeArr: function() {
      if (this.homeList) {
        for (let i = 0; i < this.List.length; i++) {
          for (let j = 0; j < this.homeList.length; j++) {
            var data1 = this.List[i];
            var data2 = this.homeList[j];
            if (data1.designation == data2.symbol) {
              data1.price = Number(data2.ask);
              data1.price2 = Number(data2.bid);
            }
          }
        }
      }
        for(var i = 0;i <this.List.length; i++) {
        var designations = this.List[i]
         if(designations.designation === "BTCUSD.") {
         designations.open = store.state.exchangeBTCUSD.open
        } else if(designations.designation === "BCHUSD.") {
         designations.open = store.state.exchangeBCHUSD.open
        } else if (designations.designation === "ETHUSD.") {
        designations.open = store.state.exchangeETHUSD.open
        }
        else if (designations.designation === "XRP-USDT") {
        designations.open = store.state.exchangeXRPUSD.open
        }
        else if (designations.designation === "LTC-USDT") {
        designations.open = store.state.exchangeLTCUSD.open
        }
        else if (designations.designation === "BSV-USDT") {
        designations.open = store.state.exchangeBSVUSD.open
        }
        else if (designations.designation === "EOS-USDT") {
        designations.open = store.state.exchangeEOSUSD.open
        }
        else if (designations.designation === "ETC-USDT") {
        designations.open = store.state.exchangeETCUSD.open
        }
        else if (designations.designation === "LINK-USDT") {
        designations.open = store.state.exchangeLINKUSD.open
        }
        else if (designations.designation === "TRX-USDT") {
        designations.open = store.state.exchangeTRXUSD.open
        }
      }
      return this.List;
    }
  },
  components: {},
  activated() {
     this.lang = localStorage.getItem("engs")
      this.CNY = localStorage.getItem("CNY")
    this.USD = localStorage.getItem("USD")
  },
  methods: {
    ...mapMutations(["setorder"]),
    ...mapMutations(["setcontractsList"]),
    ...mapMutations(["setArr"]),
    // ...mapMutations(["setMax"]),
    // ...mapMutations(["setMax1"]),
    // ...mapMutations(["setMax2"]),
    // ...mapMutations(["setLow"]),
    // ...mapMutations(["setLow1"]),
    // ...mapMutations(["setLow2"]),
    ...mapMutations(["setexchangeArr"]),
    tradingguide() {
      this.$router.push("/tradingguide");
    },
    change(index) {
        this.active=index;
        if(index === 0) {
          this.customer()
  
} else if (index === 1) {
  this.$router.push("/envelopes")
} else if(index === 2) {
  this.$router.push("/partnership")
}
    },
     customer() {
      this.customerdata = true
      // this.$router.push("/customer");
    },
     closecustomer() {
      this.customerdata = false;
    },
     //首页的汇率
     rate() {
      this.$http.get(api.getnumber).then(data => {
        this.CNY = data.data.rates.CNY;
        this.USD = data.data.rates.USD;
        localStorage.setItem("CNY",this.CNY)
        localStorage.setItem("USD",this.USD)
      });
    },
      getcustomer() {
       this.$http.get(api.social).then(({data})=>{
            this.group = data
        })

    },
    join() {
      this.$router.push("/join");
    },
    news() {
      this.$router.push("/information");
    },
    getbanner() {
      this.$http.get(api.banner).then(({data})=>{
        this.schpng1 = data.big[0]
        this.schpng2 = data.big[1]
        this.schpng3 = data.big[2]
        this.schpng4 = data.big[3]
        this.smallschpng1 = data.small[0]
        this.smallschpng2 = data.small[1]
        this.smallschpng3 = data.small[2]
        this.smallschpng4 = data.small[3]
      })

    },
    getnotice() {
  this.$http.get(api.notice).then(({data})=>{
    this.announcement = data.announcement[0]

  })
    },
    // rate() {
    //   this.$http.get(api.getnumber).then(data => {
    //     this.CNY = data.data.rates.CNY;
    //     this.USD = data.data.rates.USD;
    //     localStorage.setItem("CNY",this.CNY)
    //     localStorage.setItem("USD",this.USD)
    //   });
    // },
   
    //     getaccount() {
    //  this.$http
    //         .get(api.AccountURL)
    //         .then(({ data }) => {
    //           console.log(data);
    //           if (data.code === 0) {
    //             // this.$store.commit("hideLoading");
    //             // this.accountList.push(data.data);
    //             localStorage.setItem("balance", data.data.balance);
    //             // console.log(this.accountList, " this.accountList");
    //           } else {
    //           }
    //         })
    //     },

    getdata3() {
      this.$http.get(api.Positionorders).then(({ data }) => {
        this.ordersList = data.data;
        var order = this.ordersList;
        for (var i = 0; i < order.length; i++) {
          if (store.state.mydata.length !=0) {
            for (var j = 0; j < store.state.mydata.length; j++) {
              var data0 = order[i];
              var data1 = store.state.mydata[j];
              if (data0.symbolName === data1.symbol) {
                order[i].ask = data1.ask;
                order[i].bid = data1.bid;
              } else {
                // return;
              }
            }
          } else {
            order[i].ask = "0.00";
            order[i].bid = "0.00";
          }
        }

        this.setorder(order);
      });
    },
    getdata2() {
      this.$http.get(api.Positioncontracts).then(({ data }) => {
        this.contractsList = data.data;
        var contractsLists = this.contractsList;
        for (var f = 0; f < this.contractsList.length; f++) {
          if (store.state.mydata.length != 0) {
            for (var j = 0; j < store.state.mydata.length; j++) {
              var data0 = this.contractsList[f];
              var data1 = store.state.mydata[j];
              if (data0.symbolName === data1.symbol) {
                this.contractsList[f].ask = data1.ask;
                this.contractsList[f].bid = data1.bid;
              } else {
                // return;
              }
            }
          } else {
            this.contractsList[f].bid = "0.00";
            this.contractsList[f].ask = "0.00";
          }
        }
        this.setcontractsList(contractsLists);
      });
    },
    getdata6() {
      this.$http.get(api.MarketURL).then(({ data }) => {
        this.all = data.data;
        for(var i =0;i <this.all.length;i++) {
 if(this.all[i].symbolName === "ETHUSD.") {
           this.all[i].img = require("../../assets/images/icon_eth.png")
        } if(this.all[i].symbolName === "BTCUSD.") {
          this.all[i].img = require("../../assets/images/icon_btc.png")
        }if(this.all[i].symbolName === "BCHUSD.") {
          this.all[i].img = require("../../assets/images/icon_bch.png")
        }
        }
         
        for (var i = 0; i < this.all.length; i++) {
          if (store.state.mydata.length != 0) {
            for (var j = 0; j < store.state.mydata.length; j++) {
              var data0 = this.all[i];
              var data1 = store.state.mydata[j];
            
              if (data0.symbolName === data1.symbol) {
                this.all[i].ask = data1.ask;
                this.all[i].bid = data1.bid;
              } else if(!data0.ask){
                this.all[i].ask = "0.00"
                this.all[i].bid = "0.00"
              }
            }
          } else {
            this.all[i].bid = "0.00";
            this.all[i].ask = "0.00";

          }
                this.setArr(this.all);
        }
      });
    },
    // getuserId() {

    // get() {
    //   this.$http.get(api.chart).then((data)=>{
    //   var dataarrBCHUSD = data.data.BCHUSD
    //   var dataarrBTCUSD = data.data.BTCUSD
    //   var dataarrETHUSD = data.data.ETHUSD
    //   this.setexchangeBCHUSD(dataarrBCHUSD)
    //   this.setexchangeBTCUSD(dataarrBTCUSD)
    //   this.setexchangeETHUSD(dataarrETHUSD)
    
    //   })
      // this.starttime = new Date(new Date().setDate(new Date().getDate() - 1));
      // this.starttime = new Date(
      //   this.starttime.setHours(new Date().getHours() + 2)
      // );
      // this.starttime = getUTCtime(this.starttime);
      // console.log(this.starttime, "this.starttime");
      // this.endtime = new Date(new Date().setHours(new Date().getHours() + 2));
      // this.endtime = getUTCtime(this.endtime);
      // console.log(this.endtime, "this.endtime");
      // this.$http
      //   .get(api.chartBTCUSD + this.starttime + "&to=" + this.endtime)
      //   .then(({ data }) => {
      //     this.list = data.data;
      //     console.log(this.list, "图标1");
      //     this.high();
      //   });
      // this.$http
      //   .get(api.chartETHUSD + this.starttime + "&to=" + this.endtime)
      //   .then(({ data }) => {
      //     this.list1 = data.data;
      //     console.log(this.list, "图标2");
      //     this.high1();
      //   });
      // this.$http
      //   .get(api.chartBCHUSD + this.starttime + "&to=" + this.endtime)
      //   .then(({ data }) => {
      //     this.list2 = data.data;
      //     console.log(this.list, "图标3");
      //     this.high2();
      //   });
    // },
    // high() {
    //   for (let i = 0; i < this.list.length - 1; i++) {
    //     this.max = this.list[0].high;
    //     this.max =
    //       this.max < this.list[i + 1].high ? this.list[i + 1].high : this.max;
    //     this.low = this.list[0].low;
    //     this.low =
    //       this.low < this.list[i + 1].low ? this.list[i + 1].low : this.low;
    //   }
    //   this.setMax(this.max);
    //   this.setLow(this.low);
    //   console.log(this.max, "max");
    // },
    // high1() {
    //   for (let i = 0; i < this.list1.length - 1; i++) {
    //     this.max1 = this.list1[0].high;
    //     this.max1 =
    //       this.max1 < this.list1[i + 1].high
    //         ? this.list1[i + 1].high
    //         : this.max1;
    //     this.low1 = this.list1[0].low;
    //     this.low1 =
    //       this.low1 < this.list1[i + 1].low1 ? this.list[i + 1].low : this.low1;
    //   }
    //   this.setMax1(this.max1);
    //   this.setLow1(this.low1);
    //   console.log(this.max1, "max");
    // },
    // high2() {
    //   for (let i = 0; i < this.list2.length - 1; i++) {
    //     this.max2 = this.list2[0].high;
    //     this.max2 =
    //       this.max2 < this.list2[i + 1].high
    //         ? this.list2[i + 1].high
    //         : this.max2;
    //     this.low2 = this.list2[0].low;
    //     this.low2 =
    //       this.low2 < this.list2[i + 1].low ? this.list2[i + 1].low : this.low2;
    //   }
    //   this.setMax2(this.max2);
    //   this.setLow2(this.low2);
    // },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    Android() {
    //   var u = navigator.userAgent;
    //  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //  if(isAndroid) {
       
    //    window.location.href = this.Androids

    //  }else {
    //   //  this.$toast("请下载ios版本")
    //   //  this.getappinfo()
    //    window.location.href = this.ios

    //  }
    this.$router.push("/down")

    },
    getappinfo() {
      this.$http.get(api.appinfo).then(({data})=>{
         this.ios = data.ios.address
         this.Androids = data.android.address
          window.localStorage.setItem("iosimg", data.ios.qr)
          window.localStorage.setItem("Androidsimg", data.android.qr)
    
         

             })
    }
  },
  watch: {
    "$store.state.mydata2": function(newer2, old2) {
      this.homeList = newer2;
    }
  }
};
</script>

    
