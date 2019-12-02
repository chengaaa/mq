<template>
  <div class="download">
    <div>
      <h1>BLITZ BOOK</h1>
    </div>
    <div>
      <h2>多平台终端选择</h2>
    </div>
    <div class="download-b">
        <div class="span">

        
      <i class="iconfont icon-mac"></i><span><a href="">ios下载</a> </span>
      </div>
      <div class="span">
      <i class="iconfont icon-anzhuo"></i><span><a href="">Android</a></span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">

body {
  background: #ff6537;
  display: flex;
  justify-content: center;
  align-items: center;
  //    padding-top: 50%;
  .download {
      .iconfont {
          font-size:1rem /* 75/75 */;
          color: white;
          padding-left: .64rem /* 48/75 */;
      }
    h1 {
      padding-top: 1.333333rem /* 100/75 */;
      text-align: center;
      font-size: 0.8rem /* 60/75 */;
      margin-bottom: 2.666667rem /* 200/75 */;
    }
    h2 {
      font-size: 0.733333rem /* 55/75 */;
      color: white;
      margin-bottom: 2.666667rem /* 200/75 */;
      text-align: center;
    }
    .download-b {
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
       
        .span {
            width: 6.666667rem /* 500/75 */;
            height: 1.6rem /* 120/75 */;
            line-height:1.6rem /* 120/75 */;
            display: flex;
            justify-content: flex-start;
        //   margin-left: 1.333333rem /* 100/75 */;
        margin-bottom: .933333rem /* 70/75 */;
          text-align: center;
          border: 4px solid white;
          border-radius: .8rem /* 60/75 */;
           &:first-child {
        //   margin-left: -0.133333rem /* 10/75 */;
        }
        }
      span {
        font-size: .8rem /* 60/75 */;
        a {
            color: white;
            padding-left: .866667rem /* 65/75 */;
        }
       
        
       
      }
    }
  }
}
</style>
<script>
export default {};
</script>