<template>
    <!-- 分享 -->
    <div class="back backpass">
      <div class="back-B">
        <div class="back-C">
      <img style="width:20px;height:20px;position:absolute;top:14px" @click="home" class="img1" src="../../assets/images/fanhui.png"/>
     <div class="text" style="margin:auto">
      <img class="img2" style="height:40px;" src="../../assets/images/logo1.png"/>
     </div>
        </div>
     <div class="img3">
       <img src="../../assets/images/share_pic.png" alt="">
     </div>
     <p>全球首家CFD数字资产交易平台</p>
     <div class="iosand">
       <div class="margins">
         <h5>ios用户</h5>
         <img  :src="iosimg" alt="">
       </div>
       <div>
         <h5>Android用户</h5>
         <img  :src="andimg" alt="">
       </div>
     </div>
     <p class="down">扫码下载app</p>
     <p>网址：http://www.bbook8.com</p>
      <div class="pace"></div>
      </div>
    </div>
</template>
<style lang="scss">
.back {
  position: fixed;
  top: 0;
  left: 0;
  background: #182566;
  width: 100%;
  height: 100%;
}
.backpass {

   .back-B {
  background:#182566;
  border: none;
  padding-bottom: 1.333333rem /* 100/75 */;
  .back-C {
    display: flex;
  }
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

  }


</style>
<script>
export default {
  data() {
    return {
      iosimg:"",
      andimg:""
      


    }
  },
  created() {
     this.iosimg = window.localStorage.getItem("iosimg")
    this.andimg = window.localStorage.getItem("Androidsimg")

  },
  methods:{
    home(){

      this.$router.go(-1)
    }
  }
}
</script>