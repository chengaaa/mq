<template>
  <div class="toggle">
     <div class="toggle-title">
      <van-icon name="arrow-left" color="#3e79dc" id="van-icon" @click="home" />
      <h2>切换交易界面</h2>
    </div>
    <div style="display:flex;justify-content:space-around">
    <div class="toggle-img">
      <h5>新</h5>
      <img style="width:150px" src="../../assets/images/jingdian.jpg" alt="">
      <p style="text-align:center" @click="isQuan">
      <img v-show="quan" style="width:15px" src="../../assets/images/circle-quan.png" alt="">
      <img v-show="!quan" style="width:15px" src="../../assets/images/quan.png" alt="">
      </p>
    </div>
    <div class="toggle-img">
      <h5>经典</h5>
      <img style="width:150px" src="../../assets/images/jingdian.jpg" alt="">
      <p style="text-align:center" @click="isQuan2">
      
      <img v-show="quan" style="width:15px" src="../../assets/images/quan.png" alt="">
      <img v-show="!quan" style="width:15px" src="../../assets/images/circle-quan.png" alt="">
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
      quan: window.sessionStorage.getItem("quan")

    }
  },
  created() {
     this.quan = window.sessionStorage.getItem("quan")
  },
  methods: {
      home() {
      this.$router.push("/account");
    },
    isQuan() {
      this.quan = true
      window.sessionStorage.setItem("quan",this.quan)
      localStorage.setItem("transaction","new")

    },
    isQuan2() {
      
      this.quan = false
      window.sessionStorage.setItem("quan",this.quan)
      localStorage.setItem("transaction","classic")





    }
  },
}
</script>