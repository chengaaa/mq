<template>
  <div class="navheader">
    <div class="arrow">
      <van-icon name="arrow-left" size="80" color="blue" @click="navback"/>
      
      
    </div>
  </div>
</template>
<style lang="scss" scoped >
.navheader {
  // display: flex;
    // padding: 30px 60px 30px 60px;
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index: 1;
 

  
  
}
  

  
</style>
<script>
export default {
  data() {
    return{

    }
  },
  methods: {
    navback() {
       console.log("fanhui ")
       this.$router.go(-1);
    }
  }
}
</script>