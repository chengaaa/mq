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
      <span>{{$t(item.title)}}</span>
      <!-- <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" /> -->
    </van-tabbar-item>
  </van-tabbar>
</template>
<style lang="scss"scoped >
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
          title: "m.Home",
          normal: "ai-home",
          active1: "ai-home"
        },
       
        {
          name: "/quotation",
          title: "m.Quotes",
          normal: "zichancopy",
          active1: "zichancopy"
        },
         {
          name: "/transaction",
          title: "m.Trade",
          normal: "jiaoyi",
          active1: "jiaoyi"
        },
        {
          name: "/history",
          title: "m.History",
          normal: "lishi",
          active1: "lishi"
        },
        {
          name: "/account",
          title: "m.Account",
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
