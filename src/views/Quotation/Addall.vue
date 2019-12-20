<template>
  <div class="addall-page">
    <!-- <Navheader class="navbar" ref="child" @click="back"></Navheader> -->
    <div class="navheader">
      <div class="arrow">
        <van-icon id="van-icon" name="arrow-left"  color="blue" @click="go" />
      </div>
    </div>

    <div v-for="(item,index) in list" :key="index" class="addall-a">
      <div>
        <van-icon id='van-icon2' name="add"  color="#6BD76A" @click="add(index)" />
      </div>
      <router-link :to="'/detail/' + item.symbolName" class="addall-right">
        <h5>{{item.symbolName}}</h5>
        <p>{{item.description}}</p>
      </router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.addall-page {
  padding-top: .4rem /* 30/75 */;
  //  margin-bottom: 1.333333rem /* 100/75 */;
 
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
    padding-bottom: 30px;
    margin-bottom: 30px;
    display: flex;
     padding-left: .6rem /* 45/75 */;
    .addall-right {
      padding-left: 44px;
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
// import Navheader from "../../components/Navheader";
import { mapMutations } from "vuex";
import store from "../../store";
import mixin from "../../common/mixin/mixin"

export default {
 mixins: [mixin],

  data() {
    return {
      // list: [],
      other: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapMutations(["setArr"]),
    // ...mapMutations(["setAddall"]),
    go() {
      this.$router.push({ name: "quotation" });
      console.log("go");
    },

    detail(symbolName) {
      console.log()
    },
    back() {
      this.refs.child.navback();
    },
    getData() {    
       this.setAddall(this.list)
    },
    add(index) {
      this.other.push(this.list.splice(index, 1));
      for (var i = 0; i < this.other.length; i++) {
        for (var j = 0; j < this.other[i].length; j++) {
          this.other[i][j].bid = "0.00";
          this.other[i][j].ask = "0.00";
        }
      }

      this.setArr(this.other);

      console.log("add", index);
    }
  },
  components: {
  }
};
</script>