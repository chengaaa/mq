<template>
  <!-- <div class="customer"> -->
<div class="join">
    <div class="join-title">
          <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home"/>
          <h2>{{$t('m.Joinofficialgroup')}}</h2>
    </div>
    <div class="Telegram" v-for="(item,index) in group" :key="index">
        <div class="icons">
        <i class="iconfont" style="color:#00ca0c" >{{"\ue623"}}</i><p>{{$t(item.group_name)}}</p>
        </div>
        <img :src="item.address" alt="">
        
        <span>{{$t(item.deail)}}</span>
    </div>
    </div>
    <!-- <div class="customer-title">
      <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home" />
      <h2>{{$t('m.ContactCustomer')}}</h2>
    </div> -->
    <!-- <div class="flex">
       <i class="iconfont icon-weixin"></i>
       <p>{{$t('m.AddWechat')}}: 15817080296</p>
    </div> -->
    <!-- <div class="flex">
       <i class="iconfont icon-telegram"></i>
       <p>{{$t('m.AddTelegram')}}: 15817080296</p>

    </div> -->
  <!-- </div> -->
</template>
<style lang="scss" scoped>
// .customer {
//   padding-left: 0.32rem /* 24/75 */;
//   padding-right: 0.32rem /* 24/75 */;
//   .customer-title {
//     display: flex;
//     align-items: center;
//     height: 1.173333rem /* 88/75 */;
//     margin-bottom: 0.4rem /* 30/75 */;
//     h2 {
//       flex: 1;
//       text-align: center;
//       font-size: 0.453333rem /* 34/75 */;
//       color: #333333;
//     }
//     #van-icon {
//       width: 0.1rem;
//       font-size: 0.56rem /* 42/75 */;
//     }
//   }
//   .flex {
//       display: flex;
//       justify-content: space-between;
//       height: 1.6rem /* 120/75 */;
//       border-bottom: 1px solid #eeeeee;
//       align-items: center;
//       font-size: .48rem /* 36/75 */;
//       .icon-weixin {
//           font-size: .6rem /* 50/75 */;
//           color:#00ca0c;
//       }
//       .icon-telegram {
//           font-size: .6rem /* 50/75 */;
//           color:#13c6fe;
//       }
//   }
// }
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
           font-size: 18px;
}
 
       }
       img{
       width: 3.266667rem /* 245/75 */;
       height: 3.266667rem /* 245/75 */;
       margin-bottom: .5rem /* 16/75 */;
       }
       p {
           padding-left:.186667rem /* 14/75 */;
           font-size: 18px;
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
var api = require("../../api/api");

export default {
  data() {
    return {
      group:''
    };
  },
    created() {
        this.$http.get(api.social).then(({data})=>{
            this.group = data
            console.log(data,"data")
        })

    },
  methods: {
    home() {
      this.$router.go(-1);
    }
  }
};
</script>