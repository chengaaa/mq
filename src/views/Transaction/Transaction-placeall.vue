<template>
  <div class="transaction-placeall">
    <div class="arrow">
      <van-icon id="van-icon" name="arrow-left" color="#457ee7" @click="gos" />
    </div>
    <div class="content-a">
      <!-- <div v-for="(item,index) in getdata" :key="index" class="concent"> -->
        <div class="concent">
        <div v-for="(items,indexs) in getdata" :key="indexs" class="concent-b">
          <p @click="choose(items.symbolName)">{{(items.symbolName).slice(0,items.symbolName.indexOf('.'))}}</p>
          <i class="iconfont" v-show="isshows === items.symbolName ">&#xe62a;</i>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.transaction-placeall {
  background: #2c2d28;
    position: fixed;
    width: 100%;
    height: 100%;
  .arrow {
    padding-top: 0.4rem /* 30/75 */;
    padding-bottom: 0.4rem /* 30/75 */;
    display: flex;
    justify-content: space-between;
    padding-left: 0.2rem /* 15/75 */;
    margin-bottom: 0.266667rem /* 20/75 */;
    background: #262626;
  }
  .content-a {
    margin-top: 0.8rem /* 60/75 */;
    .concent {
      .concent-b {
        display: flex;
        justify-content: space-between;
        height: 18px;
        background: #2c2d28;
        padding: 0.333333rem /* 25/75 */ 0.4rem /* 30/75 */;
        border-bottom: 1px solid #585954;
        p {
            width:100%;
            font-size: .426667rem /* 32/75 */;
            font-family: 'Tahoma','Sans Serif';
            color: #fcfcfa;

        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.iconfont {
  font-size:24px;
  font-weight: 700;
  color: #457ee7;
}
.van-icon {
  font-size: 30px;
}
</style>
<script>
// import store from "../../store"
export default {
  data() {
    return {
      params: "",
      isshows: localStorage.getItem("params")
    };
  },
  created() {
    console.log(this.$store.state.arr,"state.arr");
  },
  methods: {
    choose(item) {
      this.params = item;
      window.localStorage.setItem("params",this.params)
      this.isshows = item
      console.log(item, "choose");
    },
    gos() {
      this.$router.push({
        name: "transaction",
        params: { symbol: this.params }
      });
      console.log("goo");
    }
  },
  computed: {
    getdata() {
      return this.$store.state.arr;
    }
  },
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = "#eee";
    next();
  },
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = "";
    next();
  },
};
</script>