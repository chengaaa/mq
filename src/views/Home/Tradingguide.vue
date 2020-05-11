<template>
<div class="guide">
    <div class="guide-title">
          <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home"/>
          <h2>{{$t('m.NoviceTradingGuide')}}</h2>

    </div>
    
    <div class="guide-top">
        <img src="../../assets/image/新手交易指南-稿件2_03.png" alt="">
        <h3>{{$t('m.Howtotransaction')}}</h3>
    </div>
    <div class="guide-top" @click="teaching">
        <img src="../../assets/image/新手交易指南-稿件2_06.png" alt="">
        <h3>{{$t('m.Teaching')}}</h3>
    </div>
    
</div>

</template>
<style lang="scss" scoped>
.guide {
    padding-left:.32rem /* 24/75 */;
    padding-right:.32rem /* 24/75 */;


.guide-title {
    display:flex;
    height: 1.173333rem /* 88/75 */;
   align-items: center;
   margin-bottom:.666667rem /* 50/75 */;
    #van-icon {
        width:0.1rem;
        font-size:.56rem /* 42/75 */;
    }
    h2 {
        flex:1;
        text-align: center;
        font-size: .453333rem /* 34/75 */;
        color:#333333;
    }
}
.guide-top {
    background:#f5f5f5;
    display: flex;
    margin-bottom: .693333rem /* 52/75 */;
    height: 6rem /* 450/75 */;
    align-items: center;
    justify-content: space-around;
    padding-left:1.386667rem /* 104/75 */;
    padding-right: 1.386667rem /* 104/75 */;
    font-size: .56rem /* 42/75 */;
    img {
        width:2.373333rem /* 178/75 */;
        height: 2.173333rem /* 163/75 */;
    }
   h3 {
       color:#333333;
       text-align: center;
   }
}
}
    
</style>
<script>
export default {
    methods:{
        home() {
            // this.$router.push("/")
            this.$router.go(-1)
        },
        teaching() {
            this.$router.push("/teaching")
        }
    }
    
}
</script>
    
