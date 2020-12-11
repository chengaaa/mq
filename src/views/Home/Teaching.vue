<template>
<div class="teaching">
    <div class="teaching-title">
          <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home"/>
          <h2>{{$t('m.Teaching')}}</h2>
    </div>
    <div class="teaching-title2">
        <h3>{{$t('m.Howtorecharge')}}？</h3>
    </div>
    <!-- <div class="imglist">
        <img  src="../../assets/image/chongzhi1.png" alt="">
    </div> -->
    <div class="imglist">
        <img  v-for="(item,index) in imgList" :key="index" :src="item.url" alt="">
    </div>

     <div class="teaching-title2">
        <h3>{{$t('m.Howtocurrency')}}？</h3>
    </div>
    <!-- <div class="imglist">
        <img  src="../../assets/image/chongzhi1.png" alt="">
    </div> -->
    <div class="imglist">
        <img  v-for="(item,index) in imgList2" :key="index" :src="item.url" alt="">
    </div>
    </div>


</template>
<style lang="scss" scoped>
.teaching {
   .teaching-title  {
    height: 1.173333rem /* 88/75 */;
       display:flex;
       align-items: center;
    padding-left:.32rem /* 24/75 */;
    padding-right:.453333rem /* 34/75 */;

       margin-bottom:.533333rem /* 40/75 */;
          #van-icon {
        width:0.1rem;
        font-size:.56rem /* 42/75 */;
    }
       h2 {
           text-align: center;
           flex:1;
            font-size: .453333rem /* 34/75 */;
        color:#333333;
       }
   }
   .teaching-title2 {
       text-align: center;
       margin-bottom: .4rem /* 30/75 */;
       h3 {
            font-size: .453333rem /* 34/75 */;
            font-weight:700;
            margin-top: 12px;

       }
   }
   .imglist {
    //    margin-bottom: 1.066667rem /* 80/75 */;
       img {
           width: 100%;
           height:100%;
        //    vertical-align: bottom;
       }
   }
}
    
</style>
<script>
export default {
    data() {
        return {
          imgList:[
              {
                  name:"1",
                  url:require("../../assets/images/chongzhi1.png")
              },
               {
                  name:"2",
                  url:require("../../assets/images/chongzhi2.png")
              },
               {
                  name:"3",
                  url:require("../../assets/images/chongzhi3.png")
              },
               {
                  name:"4",
                  url:require("../../assets/images/chongzhi4.png")
              },
               {
                  name:"5",
                  url:require("../../assets/images/chongzhi5.png")
              },
              
          ],
          imgList2:[
              {
                  name:"5",
                  url:require("../../assets/images/tibi1.png")
              },
               {
                  name:"6",
                  url:require("../../assets/images/tibi2.png")
              },
               {
                  name:"7",
                  url:require("../../assets/images/tibi3.png")
              },
               {
                  name:"8",
                  url:require("../../assets/images/tibi4.png")
              }
          ]
        }
    },
    methods: {
        home() {
            this.$router.go(-1)
        }
    }
}
</script>