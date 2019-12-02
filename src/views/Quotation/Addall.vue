<template>
  <div class="addall-page">
    <Navheader class="navbar" ref="child" @click="back"></Navheader>

    <div v-for="(item,index) in list" :key="index" class="addall-a" @click="detail">
      <div>
        <van-icon name="add" size="70" color="#6BD76A" @click="add(index)" />
      </div>
      <router-link :to="'/detail/' + index" class="addall-right">
        <h5>{{item.symbolName}}</h5>
        <p>{{item.description}}</p>
      </router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.addall-page {
  padding-top: 1.333333rem /* 100/75 */;
  padding-left: 0.533333rem /* 40/75 */;
  .navbar {
    padding-top: 0.4rem /* 30/75 */;
    padding-right: 0.8rem /* 60/75 */;
    // padding-left: .533333rem /* 40/75 */;
    background: white;

    width: 100%;
    height: 0.8rem /* 60/75 */;
    // background: black;
    // box-sizing: border-box;
  }
  .addall-a {
    border-bottom: 1px solid #d1d1d1;
    padding-bottom: 30px;
    margin-bottom: 30px;
    display: flex;
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
import Navheader from "../../components/Navheader";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      list: [],
      other: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapMutations(["setArr"]),

    detail() {
      //   this.$router.push("/detail");
    },
    back() {
      this.refs.child.navback();
    },
    getData() {
      // let { params } = this.$route;
      // console.log("你好",params)
      console.log("你好", this.$route);

      this.$http.get("/market/symbols").then(({ data }) => {
        this.list = data.data;
        console.log(data);
        console.log(this.list);
      });
    },
    add(index) {
      this.list.splice(index, 1);

      this.other.push(this.list.splice(index, 1));
      console.log("other", this.other);
      var arr = this.other;
      // arr[index][0].ask = 0;
      // console.log("index",arr[index])
      this.setArr(arr);
      console.log(arr[index][0],"arrarr");

      // localStorage.setItem("temp", arr);
      // console.log(typeof localStorage.getItem("temp"))

      console.log("add", index);
    }
  },

  components: {
    Navheader
  }
};
</script>