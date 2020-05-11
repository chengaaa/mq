<template>
  <keep-alive>
    <div class="quotation">
      <div class="header">
        <div class="edit-icon" @click="skipEditPage">
          <van-icon name="edit" color="blue" id="van-icon" />
        </div>
        <div class="switch-tab">
          <div class="left" :class="{blue, white}">{{$t('m.Simple')}}</div>
          <div class="right" :class="{blue1, white1}" @click="Orders('Orders')">{{$t('m.Advanced')}}</div>
        </div>
        <div class="add-icon" @click="skipAddPage">
          <van-icon name="plus" color="blue" id="van-icon" />
        </div>
      </div>
      <!-- 简单的 -->
      <div>
        <van-action-sheet
          :cancel-text="$t('m.Cancel')"
          v-model="show"
          :actions="actions"
          @select="onSelect"
        />
      </div>
      <!-- <div v-for="(itema, indexs) in QuotationArr" :key="indexs"> -->
      <div v-show="page1">
        <!-- <div class="div" v-for="(itemss, indexx) in QuotationArr" :key="indexx"> -->
        <div class="div">
          <div
            class="hh"
            v-for="(itemsss, indexxx) in QuotationArr"
            :key="indexxx"
            tag="div"
            @click="selectType(itemsss.symbolName)"
          >
            <h1>{{(itemsss.symbolName).slice(0,itemsss.symbolName.indexOf('.'))}}</h1>
            <p :id="itemsss.symbolName">{{itemsss.bid}}</p>

            <span :id="itemsss.path">{{itemsss.ask}}</span>
          </div>
        </div>
      </div>

      <!-- 高级的 -->
      <div v-show="page2">
        <div class="div">
          <div
            class="hh"
            v-for="(itemsss, indexxx) in QuotationArr"
            :key="indexxx"
            tag="div"
            @click="selectType(itemsss.symbolName)"
          >
            <h1>{{itemsss.symbolName}}</h1>
            <p :id="itemsss.symbolName">{{itemsss.bid}}</p>

            <span :id="itemsss.path">{{itemsss.ask}}</span>
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
.blue {
  background: blue;
  color: white;
}
.white {
  background: white;
  color: blue;
}
.blue1 {
  background: blue;
  color: white;
}
.white1 {
  background: white;
  color: blue;
}
.quotation {
  padding-top: 1.366667rem /* 80/75 */;
  padding-left: 0.4rem /* 30/75 */;
  padding-right: 0.4rem /* 30/75 */;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    // background: #f5f5f5;
    position: fixed;
    top: 0.266667rem /* 20/75 */;
    width: 100%;
    height: 1.173333rem /* 88/75 */;
    z-index: 100;
    border-bottom: 1px solid #e5e5e5;
    #van-icon {
      font-size: 0.733333rem /* 55/75 */;
    }
    .edit-icon {
      flex: 1;
      // text-align: center;
      // padding-left: 20px;
      div {
        height: 0.586667rem /* 44/75 */;
        width: 0.586667rem /* 44/75 */;
      }
    }
    .add-icon {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: flex-end;
      padding-right: 0.533333rem /* 40/75 */;
    }
    .switch-tab {
      flex: 1.6;
      display: flex;
      flex-direction: row;
      text-align: center;
      line-height: 0.8rem /* 60/75 */;
      div {
        flex: 1;
        // color: #3278fe;
        border: 1px solid #3278fe;
        height: 0.8rem /* 60/75 */;
        font-family: "Tahoma", "sans-serif";
        &.left {
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          font-size: 0.32rem /* 24/75 */;
        }
        &.right {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          font-size: 0.32rem /* 24/75 */;
        }
        // &.active {
        //   color: #fff;
        //   background: #3278fe;
        // }
      }
    }
    .add-icon {
      flex: 1;
    }
  }

  .active {
    color: blue;
  }
  .noactive {
    color: brown;
  }
  .hh {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #b9b6b6;
    padding-top: 0.133333rem /* 10/75 */;
    padding-bottom: 0.133333rem /* 10/75 */;
    h1 {
      font-size: 0.4rem /* 30/75 */;
      font-family: "HelveticaNeueLT-Pro-57-Cn";
      font-weight: 700;
    }

    p,
    span {
      color: blue;
      font-family: "HelveticaNeueLT-Pro-57-Cn";
      font-size: 0.4rem /* 30/75 */;
    }
  }

  .div {
    width: 100%;
    height: 1.066667rem /* 80/75 */;
    line-height: 1.066667rem /* 80/75 */;
    font-size: 0.373333rem /* 28/75 */;
  }
}
</style>
<script>
// import Header from "../../components/Header";
import store from "../../store";
import router from "../../router";
import { mapMutations } from "vuex";
import init from "../../tools/websocket";

export default {
  data() {
    return {
      num0: "0",
      num1: "0",
      isActive: true,
      //   QuotationArr: [],
      //实时更新的数据
      newMydata: [],
      timeout: 28 * 1000, //30秒一次心跳
      show: false,
      itemw: "",
      page1: true,
      page2: false,
      blue: true,
      white: false,
      blue1: false,
      white1: true,
      actions: [
        { name: this.$t("m.Transaction") },
        { name: this.$t("m.Chart") },
        { name: this.$t("m.Detailed") }

        // { name: '选项', subname: '描述信息' }
      ]
    };
  },
  components: {
    // Header
  },
  created() {
    this.p();
    this.get();

    console.log(this.newMydata, "my");
    console.log(store.state.arr, "myaaaaa");
  },
  mounted() {},
  computed: {
    QuotationArr: function() {
      if (this.newMydata) {
        for (let i = 0; i < store.state.arr.length; i++) {
          for (let j = 0; j < this.newMydata.length; j++) {
            var data1 = store.state.arr[i];
            var data2 = this.newMydata[j];
            console.log(data1, "data1");
            console.log(data2, "data2");
            if (data1.symbolName == data2.symbol) {
              data1.ask = data2.ask;
              data1.bid = data2.bid;
            }
          }
        }

        for (let i = 0; i < store.state.arr.length; i++) {
          for (let j = 0; j < this.newMydata.length; j++) {
            var sym1 = store.state.arr[i];
            var sym2 = this.newMydata[j];

            if (sym1.symbolName == sym2.symbol) {
              // console.log(this.QuotationArr[i]);
              var ask = store.state.arr[i].ask;
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
              var bid = store.state.arr[i].bid;
              if (this.num1 < bid) {
                document.getElementById(sym1.path).style.color = "blue";
                document.getElementById(sym1.symbolName).style.color = "blue";
              } else if (this.num1 > bid) {
                document.getElementById(sym1.path).style.color = "red";
                document.getElementById(sym1.symbolName).style.color = "red";
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

    Orders(O) {
      console.log("hao");
      this.$router.push({ path: "/quotation-deail" });

      (this.blue = true), (this.white = false);
      this.white1 = true;
      //   (this.page2 = false), (this.page1 = true);
      this.params = O;
    },
    Deals(D) {
      (this.blue1 = true), (this.white1 = false);
      this.white = true;
      (this.page2 = true), (this.page1 = false);
      this.params = D;
    },
    skipEditPage() {
      this.$router.push({ path: "/priceEdit" });
    },
    skipAddPage() {
      this.$router.push({ path: "/priceAdd" });
    },
    p() {
      console.log(store.state.arr, "hhh");
    },
    get() {
      console.log(store.state.arr, "s");
    },
    connect() {},
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      console.log(item);
      if (item.name === this.$t("m.Transaction")) {
        this.$router.push("/transaction-place");
      } else if (item.name === this.$t("m.Detailed")) {
        this.$router.push({
          path: "/detail/" + this.itemw
        });
      } else if (item.name === this.$t("m.Chart")) {
        this.$router.push({
          path: "/echarts/" + this.itemw
        });
      }
    },
    selectType(item) {
      console.log(item);
      window.localStorage.setItem("params", item);
      this.show = true;
      this.itemw = item;
    },
    getuserId() {
      this.userid = store.state.userId;
      console.log(this.userid, " this.userid");
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