<template>
  <div class="language">
    <div class="navheader">
      <div class="arrow">
        <van-icon id="van-icon" name="arrow-left" color="blue" @click="goo" />
      </div>
      <div class="english" @click="english">
        <p>English</p>
        <i class="iconfont" v-show="show ===true">&#xe62a;</i>
      </div>
      <div class="chinese" @click="chinese">
        <p>中文</p>
        <i class="iconfont" v-show="show===false">&#xe62a;</i>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.language {
  // padding-top: 0.4rem /* 30/75 */;
  background:#eee;
  min-height: 14.666667rem /* 1100/75 */;
  .arrow {
    display: flex;
    justify-content: space-between;
  padding-top: .2rem /* 15/75 */;
  padding-bottom: .2rem;
  background: white;

    padding-left: 0.1rem /* 15/75 */;
    margin-bottom: 0.266667rem /* 20/75 */;
    .arrow-right {
      margin-right: 0.533333rem /* 40/75 */;
      font-size: 0.733333rem /* 55/75 */;
      color: blue;
    }
  }
  .english,
  .chinese {
    height: 1.1rem /* 100/75 */;
    line-height: 1.1rem /* 100/75 */;
    background: white;
    // margin-bottom: 0.2rem /* 15/75 */;
    font-size: 0.533333rem /* 40/75 */;
    padding-left: 0.5rem /* 20/75 */;
    display: flex;
    justify-content: space-between;
    padding-right: 0.266667rem /* 20/75 */;
    border-bottom: 1px solid #eee;
    
  }
 
}
</style>
<style lang="scss" scoped>
 .iconfont {
    font-size: 0.666667rem /* 50/75 */;
    font-weight: 700;
    color: blue;
  }
  .van-icon {
    font-size: 0.75rem /* 64/75 */;
  }
  
</style>
<script>
export default {
  data() {
    return {
      show:false
    }
  },
  methods: {
    goo() {
      this.$router.push({ name: "account" });
      console.log("goo");
    },
    english() {
      this.show = true;
      this.$i18n.locale = "en-US";
      localStorage.setItem("lang", "en-US");

      console.log("en");
    },
    chinese() {
      this.show = false;

      this.$i18n.locale = "zh-CN";
      localStorage.setItem("lang", "zh-CN");

      console.log("zh");
    },
    
  },
  
};
</script>