<template>
  <div class="transaction-placeall">
    <div class="arrow">
      <van-icon id="van-icon" name="arrow-left" color="blue" @click="gos" />
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

  .arrow {
    padding-top: 0.4rem /* 30/75 */;
    padding-bottom: 0.4rem /* 30/75 */;

    display: flex;
    justify-content: space-between;
    padding-left: 0.2rem /* 15/75 */;
    margin-bottom: 0.266667rem /* 20/75 */;
    background: white;
  }
  .content-a {
    margin-top: 0.8rem /* 60/75 */;

    .concent {
      .concent-b {
        display: flex;
        justify-content: space-between;

        background: white;
        padding: 0.333333rem /* 25/75 */ 0.4rem /* 30/75 */;
        border-bottom: 1px solid #b9b6b6;

        p {
            width:100%;
          font-size: .426667rem /* 32/75 */;
     font-family: 'Tahoma','Sans Serif';

        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.iconfont {
  font-size:.506667rem /* 38/75 */;
  font-weight: 700;
  color: blue;
}
.van-icon {
  font-size: 0.733333rem /* 55/75 */;
}
</style>
<script>
// import store from "../../store"
export default {
  data() {
    return {
      params: "",
      isshows: ""
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
        name: "transaction-place",
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