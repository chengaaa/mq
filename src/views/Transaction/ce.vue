<template>
  <div>
    <div v-for="(item,index) in datalist" :key="index">
      <p>{{item.symbol}}</p>
      <span>{{item.ask}}</span>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import store from "../../store";

export default {
  data() {
    return {
      positionList: [],
      addallList:[],
      newArr:[]
    };
  },
  created() {
   this.getnewArr();
   this.addallList = store.state.addall;
  },
  methods: {
getnewArr() {
      for (let i = 0; i < this.addallList.length; i++) {
        for (let j = 0; j < store.state.contractsLists.length; j++) {
          if (store.state.contractsLists[j].symbol === this.addallList[i].symbolName) {
            this.newArr.push(this.addallList[i]);
            console.log(this.newArr,"1")
          }
        }
      }
    },
  },
  computed: {
    datalist: function() {
      if (this.positionList) {
        for (let a = 0; a < this.positionList.length; a++) {
          for (let b = 0; b < store.state.contractsLists.length; b++) {
            var data5 = this.positionList[a];
            var data6 = store.state.contractsLists[b];
            if (data5.symbol == data6.symbol) {
              //   // console.log("ask");

              data6.ask = data5.ask;
              data6.bid = data5.bid;
            }
          }
          // console.log(this.contractsList, "11111");
          // console.log(this.positionList, "0000");
        }
      }
       if (this.newArr) {
        for (let i = 0; i < store.state.contractsLists.length; i++) {
          for (let j = 0; j < this.newArr.length; j++) {
            var arr1 = this.newArr[j];
            var arr2 = store.state.contractsLists[i];
            if (arr1.symbolName === arr2.symbol) {
              //  console.log(arr1.symbolName,arr2.symbol)
              arr2.contractSize = arr1.contractSize;
              arr2.data1 = (
                arr2.contractSize *
                arr2.volume *
                (arr2.ask - arr2.openPrice)
              ).toFixed(2);
              arr2.data2 = (
                arr2.contractSize *
                arr2.volume *
                (arr2.bid - arr2.openPrice)
              ).toFixed(2);
            }
          }
        }
        // this.contractsList = this.contractsList;
        // console.log(this.contractsList, "vvvvvvvv");
      }

      return store.state.contractsLists;
    }
  },
  watch: {
    "$store.state.mydata": function(newer, old) {
      // console.log(newer, old, "nnnnnnnn");
      this.positionList = newer;
      //   this.getOrderArr();
      //   this.getContractsList();
      //   this.getAddall();
      //   this.getaccount();
    },
    $route: {
      handler(val, oldVal) {
        console.log(val.path);
        if (val.path === "/transaction") {
          this.$nextTick(() => {
            this.get();
            this.getContractsList();
            this.getAddall();
          });
        }
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>