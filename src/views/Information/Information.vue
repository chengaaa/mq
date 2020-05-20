<template>
<div class="information">
<div class="information-title">
      <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home" />
      <h2>热点新闻</h2>
    </div>
   <div v-for="(item,index) in list" :key="index">
    <div class="shuxian">
      <i class="iconfont icon-xiaoyuandian"  ></i>
     </div>
    <div class="information-content" >
        <h3 :id="'icon'+ index">{{item.title}}</h3>
        <span>{{item.time}}</span>
        <p>{{item.content}}</p>
    </div>
 </div>
    </div>

</template>
<style lang="scss" scoped>
 #icon0 {
        padding-top: 0px;
        margin-top:.266667rem /* 20/75 */;
    }
.shuxian {
    position: relative;
   
.icon-xiaoyuandian {
    font-size: .9rem /* 60/75 */;
    position: absolute;
    top:-.133333rem /* 10/75 */;
    left: -0.1rem;
    color:#127df6;
}

}

.icon-icon-test {
    font-size: .8rem /* 60/75 */;

}
.information {
 padding-left: 0.32rem /* 24/75 */;

 .information-title {
    display: flex;
    align-items: center;
    height: 1.173333rem /* 88/75 */;
    // margin-bottom: 0.4rem /* 30/75 */;
   
    padding-right: 0.32rem /* 24/75 */;
    background:white;
    h2 {
      flex: 1;
      text-align: center;
      font-size: .453333rem /* 34/75 */;
      color: #333333;
    }
    #van-icon {
      width: 0.1rem;
      font-size: 0.56rem /* 42/75 */;
    }
    }   

    .information-content {
 margin-left: 0.32rem /* 24/75 */;
 padding-left: 0.32rem /* 24/75 */;
 text-align: start;
 border-left: 1px dashed #000000;


        h3 {
            font-size: .373333rem /* 28/75 */;
            margin-bottom: .2rem /* 15/75 */;
            padding-top:.266667rem /* 20/75 */;

        }
        span {
            font-size: .293333rem /* 22/75 */;
            color:#b3b3b3;
            
        }
        p {
            margin-top: .266667rem /* 20/75 */;
            font-size: .346667rem /* 26/75 */;
            color:#888888;
            line-height: .426667rem /* 32/75 */;
            padding-right: .32rem /* 24/75 */;

             text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;



        }
    }
 }
    
</style>

<script>
export default {
    data() {
        return {
            list:[
                {
                  title:"人民网 :  数字人民币要来啦？央行回应！",
                  time:"发布于2020-04-20 18:30",
                  content:"2020年突如其来的一场新冠肺炎疫情，给传统产业带来冲击的同时，也为数字经济新业态的发展创造了有利条件，引发了人们对数字货币的普遍关注。日前，一张央行数字货币在农行账户内测的照片在网络上流传开......"
                },
                 {
                  title:"人民网 :  数字人民币要来啦？央行回应！",
                  time:"发布于2020-04-20 18:30",
                  content:"2020年突如其来的一场新冠肺炎疫情，给传统产业带来冲击的同时，也为数字经济新业态的发展创造了有利条件，引发了人们对数字货币的普遍关注。日前，一张央行数字货币在农行账户内测的照片在网络上流传开......"
                },
                 {
                  title:"人民网 :  数字人民币要来啦？央行回应！",
                  time:"发布于2020-04-20 18:30",
                  content:"2020年突如其来的一场新冠肺炎疫情，给传统产业带来冲击的同时，也为数字经济新业态的发展创造了有利条件，引发了人们对数字货币的普遍关注。日前，一张央行数字货币在农行账户内测的照片在网络上流传开......"
                }
            ]
        }
    },
    methods:{
        home() {
            console.log("fanhui")
            this.$router.go(-1)
        },

    }
    
}
</script>
    
