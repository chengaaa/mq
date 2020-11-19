<template>
 <div class="red" >
    <div class="red-title">
      <h1 class="red-img">
        <img src="../../assets/images/logo1.png" alt />
      </h1>
    </div>
    <div class="redtext">
      <h4>注册即送 50USDT 红包</h4>
    </div>
    <div class="img">
      <img src="../../assets/images/03.png" alt="">
    </div>
    <div class="redtext2">
      <h6>如何领取新人红包</h6>
    </div>
    <div class="order">
      <img src="../../assets/images/tuoyuan.png" alt="">
      <p>注册BBOOK8 入金交易1次 不限制仓位大小</p>
    </div>
    <div class="zhong">
    <img src="../../assets/images/changxia.png" alt="">
    </div>
    <div class="order">
      <img  src="../../assets/images/tuoyuan.png" alt="">
      <p>邀请1位好友注册 您即可获得50USDT</p>
    </div>
    <div class="zhong">
    <img  src="../../assets/images/changxia.png" alt="">
</div>
    <div class="order">
      <img src="../../assets/images/tuoyuan.png" alt="">
      <p>邀请三位好友注册并入金交易1次</p>
    </div>
    <div class="warn">
      <p>新手红包须知:</p>
      <!-- <p>所有入金量必须大于100USDT，不限制开仓仓位大小，只有按图例流程操作</p>
      <p>才可获得相应奖励，邀请超过五位交易者入金交易的，可享高额返佣，详情</p>
      <p>请看合伙人制度。</p> -->
       <p>所有入金量必须大于100USDT，不限制开仓仓位大小，只有按图例流程操作才可获得相应奖励，邀请超过五位交易者入金交易的，可享高额返佣，详情请看合伙人制度。</p>
      
    </div>
 </div>
</template>
<style lang="scss" scoped>
.red {
  background: #262626;
    background: #262626;
    position: fixed;
    bottom: 0;
    top: 0;
    overflow: auto;
 
  .red-title {
    width: 100%;
    display: flex;
    position: relative;
   
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
  .redtext,.redtext2
  {
    height: 2.4rem /* 180/75 */;
    line-height: 2.4rem /* 180/75 */;
    text-align: center;
    color: #ababab;
    font-size: 18px;
    font-weight: 700;
    border-top: 1px solid #565656;
    h4 {
      font-size: 18px;
    }
  }
  .redtext2 {
    border-top: none;

  }
  .img {
    img {

    width:10rem /* 750/75 */;
    }
  }
  .order {
    display: flex;
    // justify-content: space-around;
    padding-left:1.333333rem /* 100/75 */;
    padding-right:1.333333rem /* 100/75 */;
    img {
      width: 9px;
      height: 9px;
      position: relative;
      top: .266667rem /* 20/75 */;
    }
    p {
      width: 100%;
      text-align: center;
      font-size: 13px;
    color: #ababab;
    margin-bottom: 10px;
    margin-top: 10px;
    // margin-left: 25px
    }
  }
  .warn {
    height: 4rem /* 300/75 */;
    margin-top:.533333rem /* 40/75 */ ;
    p {
      color: #ababab;
      padding-left: 45px;
      padding-right: 40px;
      line-height: 14px;
    }
  }
  .zhong {
    text-align: center;

    img {
     height: .8rem /* 60/75 */;
    }
  }
}
  
</style>