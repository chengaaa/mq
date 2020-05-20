<template>
<div class="join">
    <div class="join-title">
          <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home"/>
          <h2>{{$t('m.Joinofficialgroup')}}</h2>
    </div>
    <div class="Telegram" v-for="(item,index) in list" :key="index">
        <img :src="item.url" alt="">
        <div class="icons">
        <i class="iconfont" :id=" 'ine' +index" >{{item.icon}}</i><p>{{$t(item.name)}}</p>
        </div>
        <span>{{$t(item.deail)}}</span>
    </div>
    </div>
</template>
<style lang="scss" scoped>
.join {
    padding-left: .32rem /* 24/75 */;
    padding-right: .32rem /* 24/75 */;
   .join-title {
       display: flex;
       align-items: center;
       height: 1.173333rem /* 88/75 */;
       margin-bottom: .4rem /* 30/75 */;
       h2 {
           flex:1;
           text-align: center;
               font-size: .453333rem /* 34/75 */;
        color:#333333;
       }
        #van-icon {
        width:0.1rem;
        font-size:.56rem /* 42/75 */;
    }
   } 
   .Telegram {
       height: 5.6rem /* 420/75 */;
       margin-bottom: .4rem /* 30/75 */;
    //    text-align: center;
    background: #f5f5f5;
       display:flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       font-size: .373333rem /* 28/75 */;
       .icons {
           display: flex;
           margin-bottom: .32rem /* 24/75 */;

           .iconfont {
    font-size: .48rem /* 36/75 */;
}
 
       }
       img{
       width: 3.266667rem /* 245/75 */;
       height: 3.266667rem /* 245/75 */;
       margin-bottom: .213333rem /* 16/75 */;
       }
       p {
           padding-left:.186667rem /* 14/75 */;
       }
   }
}
 #ine0 {
     color: #13c6fe;
 }
 #ine1 {
     color: #00ca0c;
 }
 #ine2 {
     color: #25a3d6;
 }
    
</style>
<script>
export default {
    data() {
        return{
          list:[
             {
                 url:require("../../assets/image/group1.png"),
                 name:"m.ScanjoinQQ",
                 deail:"m.officialQQaccount",
                 icon:"\ue613"
             },
               {
                 url:require("../../assets/image/group2.png"),
                 name:"m.Wechatgroup",
                 deail:"m.Wechataccount",
                 icon:"\ue623"

             },
               {
                 url:require("../../assets/image/group3.png"),
                 name:"m.Telegramgroup",
                 deail:"m.Telegramaccount",
                 icon:"\ue63d"

             }
          ]
        }
    },
    methods:{
        home(){
            this.$router.go(-1)
        }
    },
    mounted() {
 // 切换页面时滚动条自动滚动到顶部
    window.scrollTo(0,0);
}
}
</script>