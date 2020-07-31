<template>
  <div class="navheader">
    <div class="arrow">
      <van-icon name="arrow-left"  color="blue" @click="navback"/>
    </div>
  </div>
</template>
<style lang="scss" scoped >
.navheader {
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index: 1;
}
</style>
<style lang="scss">
.van-icon-arrow-left {
  font-size:26px;
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
       this.$router.go(-1);
    }
  }
}
</script>