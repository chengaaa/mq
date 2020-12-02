<template>
  <div class="toggle">
     <div class="toggle-title">
      <van-icon name="arrow-left" color="#3e79dc" id="van-icon" @click="home" />
      <h2>{{$t('m.Changeui')}}</h2>
    </div>
    <div style="display:flex;justify-content:space-around;padding-top: 20px;">
    <div class="toggle-img" @click="isQuan">
      <h5>{{$t('m.New')}}</h5>
      <img style="width:150px" src="../../assets/images/jingdian.jpg" alt="">
      <p style="text-align:center" >
      <img v-show="quan == 'xin'" style="width:15px" src="../../assets/images/circle-quan.png" alt="">
      <img v-show="quan == 'jingdian'" style="width:15px" src="../../assets/images/quan.png" alt="">
      </p>
    </div>
    <div class="toggle-img"  @click="isQuan2">
      <h5>{{$t('m.Classic')}}</h5>
      <img style="width:150px" src="../../assets/images/jingdian.jpg" alt="">
      <p style="text-align:center">
      
      <img v-show="quan == 'xin'" style="width:15px" src="../../assets/images/quan.png" alt="">
      <img v-show="quan == 'jingdian'" style="width:15px" src="../../assets/images/circle-quan.png" alt="">
      </p>
    </div>
    </div>
  </div>
</template>
<style lang="scss">
.toggle {
  background-color: #262626;
  position: fixed;
  bottom: 0;
  top: 0;
  width: 100%;
  .toggle-title {
    display: flex;
    align-items: center;
    height: 1.173333rem /* 88/75 */;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    border-bottom: 1px solid #3e3e3e;
     h2 {
      flex: 1;
      text-align: center;
      font-size: 18px;
      color: white;
    }
    #van-icon {
      width: 0.1rem;
      font-size: 0.56rem /* 42/75 */;
    }
  }
  .toggle-img {
    h5 {
      color: white;
      text-align: center;
    }
  }
}
  
</style>
<script>
export default {
  data() {
    return {
      quan: localStorage.getItem("quan")

    }
  },
  created() {
     this.quan = localStorage.getItem("quan")
     console.log(this.quan,"aaaaaaaaaaa")
  },
  methods: {
      home() {
      this.$router.push("/account");
    },
    isQuan() {
      this.quan = 'xin'
      localStorage.setItem("quan",this.quan)
      localStorage.setItem("transaction","new")

    },
    isQuan2() {
      this.quan = 'jingdian'
      localStorage.setItem("quan",this.quan)
      localStorage.setItem("transaction","classic")





    }
  },
}
</script>