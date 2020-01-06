<template>
  <div id="app">
    <div class="history-header">
      <div class="left"></div>

      <div class="right-left">
        <span :class="{blue, white}" @click="Orders('Orders')">Orders</span>

        <span :class="{blue1, white1}" @click="Deals('Deals')">Deals</span>
      </div>
      <div class="right-right">
        <router-link class="iconfont" tag="div" :to="'/history-time/' + this.params">&#xe608;</router-link>
      </div>
    </div>
    <p v-show="page1">page1</p>
    <p v-show="page2">page2</p>
  </div>
</template>
<style lang="scss" scoped>
.iconfont {
  font-size: 0.533333rem /* 40/75 */;
  color: blue;
}
.history-header {
  display: flex;
  justify-content: space-between;
  padding: 0.266667rem /* 20/75 */ 0.266667rem /* 20/75 */;
  .right-left {
    span {
      display: inline-block;
      width: 1.333333rem /* 100/75 */;
      height: .666667rem /* 50/75 */;
      line-height: .666667rem /* 50/75 */;
      font-size: .333333rem /* 25/75 */;
      text-align: center;
      border: 1px solid blue
    }
  }    
}
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
</style>
<script>
export default {
  data() {
    return {
      blue: true,
      white: false,
      blue1: false,
      white1: true,
      page1: true,
      page2: false,
      date: new Date(),
      Monthdate: "",
      params:"Orders"
    };
  },
  created() {
    this.getdate();
    this.getMonthdate();
    this.getList();
  },
  methods: {
    Orders(O) {
      (this.blue = true), (this.white = false);
      this.white1 = true;
      (this.page2 = false), (this.page1 = true);
      this.params = O
      console.log("orders",O);
      console.log(this.date);
      console.log(new Date(), "hhhhhhhhhhhhhhh");
      console.log(new Date().setMonth(new Date().getMonth() - 1), "减一个月");
    },
    Deals(D) {
      (this.blue1 = true), (this.white1 = false);
      this.white = true;
      (this.page2 = true), (this.page1 = false);
      this.params = D
       
      console.log("deail");
    },
    getdate() {
      this.date.toLocaleDateString();
      var date1 =
        this.date.toLocaleDateString() +
        " " +
        this.date.toTimeString().substring(0, 8);
      this.date =
        date1
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";
      console.log(this.date);
    },
    
    getMonthdate() {
      this.Monthdate = new Date(new Date().setMonth(new Date().getMonth() - 1));
      var date2 =
        this.Monthdate.toLocaleDateString() +
        " " +
        this.Monthdate.toTimeString().substring(0, 8);
      this.Monthdate =
        date2
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";
      console.log(this.Monthdate);
    },

    getList() {
      this.$http
        .get("/history/orders?from=" + this.Monthdate + "&to=" + this.date)
        .then(({ data }) => {
          console.log(data.data);
        });
    }
  }
};
</script>