<template>
  <div class="addall-page">
    <!-- <Navheader class="navbar" ref="child" @click="back"></Navheader> -->
    <div class="navheader">
      <div class="arrow">
        <van-icon id="van-icon" name="arrow-left"  color="blue" @click="go" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.addall-page {
  padding-top: .4rem /* 30/75 */;
    #van-icon {
        font-size: .733333rem /* 55/75 */;
    }
     #van-icon2 {
       font-size: .8rem /* 60/75 */;
     }
     .arrow {
       padding-left: .2rem /* 15/75 */;
       margin-bottom: .266667rem /* 20/75 */;
     }
  .addall-a {
    border-bottom: 1px solid #d1d1d1;
    padding-bottom: .2rem /* 15/75 */;
    margin-bottom: .2rem /* 15/75 */;
    display: flex;
     padding-left: .6rem /* 45/75 */;
    .addall-right {
      padding-left: .586667rem /* 44/75 */;
      h5 {
        font-size: 0.4rem /* 30/75 */;
        margin-bottom: 0.173333rem /* 13/75 */;
      }
      p {
        font-size: 0.293333rem /* 22/75 */;
      }
    }
  }
}
</style>
<script>
import { mapMutations } from "vuex";
import store from "../../store";
import mixin from "../../common/mixin/mixin"
export default {
  data() {
    return {
      other: []
    };
  },
  created() {
    this.getData();
  },
  beforeUpdate() {},
  methods: {
    ...mapMutations(["setArr"]),
    go() {
      this.$router.push({ name: "quotation" });
    },
    detail(symbolName) {
    },
    back() {
      this.refs.child.navback();
    },
    getData() {    
       this.setAddall(this.list)
    },
  },
  components: {
  }
};
</script>