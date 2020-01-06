<template>
  <keep-alive>
    <div class="quotation">
      <div>
        <Header class="quotation-header"></Header>
      </div>
      <div>
        <van-action-sheet cancel-text="取消" v-model="show" :actions="actions" @select="onSelect" />
      </div>
      <div v-for="(itema, indexs) in QuotationArr" :key="indexs">
        <div class="div" v-for="(itemss, indexx) in itema" :key="indexx">
          <div
            class="hh"
            v-for="(itemsss, indexxx) in itema"
            :key="indexxx"
            tag="div"
            @click="selectType(itemsss.symbolName)"
          >
            <h1>{{itemsss.symbolName}}</h1>
            <p :id="itemsss.symbolName">{{itemsss.ask}}</p>

            <span :id="itemsss.path">{{itemsss.bid}}</span>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>
<style lang="scss">
.van-popup--safe-area-inset-bottom {
  .van-action-sheet__item {
    height: 1.333333rem /* 100/75 */;
    font-size: 0.533333rem /* 40/75 */;
  }
  .van-action-sheet__cancel,
  .van-action-sheet__item {
    height: 1.6rem /* 120/75 */;
    line-height: 1.333333rem /* 100/75 */;
    font-size: 0.533333rem /* 40/75 */;
  }
}
</style>
<style lang="scss" scoped>
.quotation {
  padding-top: 1.6rem /* 120/75 */;
  padding-left: 0.666667rem /* 50/75 */;
  .active {
    color: blue;
  }
  .noactive {
    color: brown;
  }
  .hh {
    display: flex;
    justify-content: space-around;
  }
  p,
  span {
    color: blue;
  }
  .quotation-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .div {
    width: 100%;
    height: 1.066667rem /* 80/75 */;
    line-height: 1.066667rem /* 80/75 */;
    border-bottom: 1px solid black;
    font-size: 0.373333rem /* 28/75 */;
  }
}
</style>
<script>
import Header from "../../components/Header";
import store from "../../store";
import router from "../../router";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      num0: "0",
      num1: "0",
      isActive: true,
      //   QuotationArr: [],
      //实时更新的数据
      newMydata: [],
      // ws: null, //建立的连接
      // lockReconnect: false, //是否真正建立连接
      timeout: 28 * 1000, //30秒一次心跳
      show: false,
      itemw: "",
      actions: [
        { name: "交易" },
        { name: "详细情况" }
        // { name: '选项', subname: '描述信息' }
      ]
    };
  },
  components: {
    Header
  },

  created() {
    this.get();
    console.log(this.newMydata, "my");
  },
  mounted() {},
  computed: {
    QuotationArr: function() {
      if (this.newMydata) {
        for (let i = 0; i < store.state.arr.length; i++) {
          for (let j = 0; j < this.newMydata.length; j++) {
            var data1 = store.state.arr[i][0];
            var data2 = this.newMydata[j];
            if (data1.symbolName == data2.symbol) {
              data1.ask = data2.ask;
              data1.bid = data2.bid;
            }
          }
        }

        for (let i = 0; i < store.state.arr.length; i++) {
          for (let j = 0; j < this.newMydata.length; j++) {
            var sym1 = store.state.arr[i][0];
            var sym2 = this.newMydata[j];

            if (sym1.symbolName == sym2.symbol) {
              // console.log(this.QuotationArr[i]);
              var ask = store.state.arr[i][0].ask;
              // console.log(ask,"askaskaskaskask")
              if (this.num0 < ask) {
                document.getElementById(sym1.symbolName).style.color = "blue";
              } else if (this.num0 > ask) {
                document.getElementById(sym1.symbolName).style.color = "red";
              }
              //else{
              //     document.getElementById(sym1.symbolName).style.color="red";
              // }
              this.num0 = ask;
            }
            //bid
            if (sym1.symbolName == sym2.symbol) {
              var bid = store.state.arr[i][0].bid;
              if (this.num1 < bid) {
                document.getElementById(sym1.path).style.color = "blue";
              } else if (this.num1 > bid) {
                document.getElementById(sym1.path).style.color = "red";
              }
              //else{
              //     document.getElementById(sym1.symbolName).style.color="red";
            }
            this.num1 = bid;
          }
        }
      }
      return store.state.arr;
    }
  },
  methods: {
    ...mapMutations(["setdataArr"]),
    ...mapMutations(["setArr"]),

    get() {
      console.log(store.state.arr);
      //   this.QuotationArr = store.state.arr;
    },

    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      console.log(item);
      if (item.name === "交易") {
        this.$router.push("/transaction-place");
      } else if (item.name === "详细情况") {
        this.$router.push({
          path: "/detail/" + this.itemw
        });
      }
      //   Toast(item.name);
    },
    selectType(item) {
      console.log(item);
      this.show = true;
      this.itemw = item;
    }
  },
  watch: {
    "$store.state.mydata": function(newer, old) {
      // console.log(newer, old, "nnnnnnnn");
      this.newMydata = newer;
    }
  }
};
</script>