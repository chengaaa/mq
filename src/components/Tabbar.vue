<template>
  <van-tabbar v-model="active" inactive-color="white" active-color="#ff6537">
    <van-tabbar-item v-for="(item,index) in tabbars" :key="index" :to="(item.name)">
      <van-icon
        class="iconfont"
        class-prefix="icon"
        slot="icon"
        slot-scope="props"
        :name="props.active ? item.active1:item.normal"
        @click="tab(index)"
      ></van-icon>
      <span>{{item.title}}</span>
      <!-- <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" /> -->
    </van-tabbar-item>
  </van-tabbar>
</template>
<style lang="scss" scoped>
.iconfont {
  font-size: .533333rem /* 40/75 */;
}
.van-tabbar {
  height: 1.493333rem /* 112/75 */;
  background: #2e2e2f;
  .van-tabbar-item {
    font-size: 0.32rem /* 24/75 */;
  }
}
</style>

<script>
export default {
  data() {
    return {
      active: 0,
      tabbars: [
        {
          name: "/home",
          title: "首页",
          normal: "ai-home",
          active1: "ai-home"
        },
        {
          name: "/transaction",
          title: "交易",
          normal: "jiaoyi",
          active1: "jiaoyi"
        },
        {
          name: "/quotation",
          title: "行情",
          normal: "zichancopy",
          active1: "zichancopy"
        },
        {
          name: "/history",
          title: "历史",
          normal: "lishi",
          active1: "lishi"
        },
        {
          name: "/account",
          title: "账户",
          normal: "zhanghu",
          active1: "zhanghu"
        }
      ]
    };
  },

  mounted() {
    // const tabIndex = window.localStorage.getItem("tab") == "" ? 0 : tabIndex || false ;
    const tabIndex = JSON.parse(window.sessionStorage.getItem("tab"))
      ?JSON.parse(window.sessionStorage.getItem("tab"))
      : 0;

    this.active = tabIndex;
    console.log(tabIndex);
  },

  methods: {
    tab(index) {
      
      this.active = index;
      // console.log(this.active);
      window.sessionStorage.setItem("tab", this.active);
    // console.log(JSON.parse(window.localStorage.getItem("tab")) ) 
      // console.log(index);
    }
  }
};
</script>
