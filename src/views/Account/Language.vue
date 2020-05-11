<template>
  <div class="language">
    <div class="navheader">
      <div class="arrow">
        <van-icon id="van-icon" name="arrow-left" color="blue" @click="goo" />
      </div>
      <div class="english" @click="english">
        <p>{{eng}}</p>
        <i class="iconfont" v-show="show ==='English'">&#xe62a;</i>
      </div>
      <div class="chinese" @click="chinese">
        <p>{{chine}}</p>
        <i class="iconfont" v-show="show==='中文'">&#xe62a;</i>
      </div>
       <div class="chinese" @click="tccs">
        <p>{{tcc}}</p>
        <i class="iconfont" v-show="show==='繁體'">&#xe62a;</i>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.language {
  // padding-top: 0.4rem /* 30/75 */;
  background:#eee;
  min-height: 14.666667rem /* 1100/75 */;
     font-family: 'Tahoma','Sans Serif';

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
    font-size: .453333rem /* 34/75 */;
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
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      show:"中文",
      eng:"English",
      chine:"中文",
      tcc:"繁體",
      sh:"English",
    }
  },
  created() {
    this.sh = this.$store.state.eng;
    if (this.sh === "English") {
      this.show = "English";
    } else if (this.sh === "中文") {
      this.show = "中文";
    } else if(this.sh === "繁體") {
      this.show = "繁體";

    }
  },
  methods: {
    ...mapMutations(["setActions"]),
    ...mapMutations(["setActionss"]),
    goo() {
      this.$router.push({ name: "account",params:{id:this.sh} });
    },
    english() {
      this.show = "English";
      this.$i18n.locale = "en-US";
      localStorage.setItem("lang", "en-US");
      this.sh = "English"
      localStorage.setItem("engs", "English");
      let arr = [
        {name:"Close"},
        {name:"Trade"},
        {name:"Price revision"},]
      this.setActions(arr)
      let arrs =  [
        {name:"Delete"},
        {name:"Modify"},
        {name:"Trade"},]
      this.setActionss(arrs)
    },
    chinese() {
      this.show = "中文";
      this.$i18n.locale = "zh-CN";
      localStorage.setItem("lang", "zh-CN");
      this.sh = "中文"
      localStorage.setItem("engs", "中文");
       let arr = [
        {name:"平仓"},
        {name:"交易"},
        {name:"修改价位"},]
      this.setActions(arr)
      let arrs =  [
        {name:"删除"},
        {name:"修改"},
        {name:"交易"},]
      this.setActionss(arrs)
    },
    tccs() {
      this.show = "繁體";
      this.$i18n.locale = "tc-US";
      localStorage.setItem("lang", "tc-US");
      this.sh = "繁體"
      localStorage.setItem("engs", "繁體");
        let arr = [
        {name:"平倉"},
        {name:"交易"},
        {name:"修改價位"},]
      this.setActions(arr)
      let arrs =  [
        {name:"刪除"},
        {name:"修改"},
        {name:"交易"},]
      this.setActionss(arrs)
      




    }
    
  },
  
};
</script>