<template>
  <div class="history-time">
    <div class="history-timeheader">
      <van-icon id="van-icon" name="arrow-left" color="blue" @click="place" />
      <h4>history</h4>
    </div>
    <div v-for="(item,index) in list" :key="index" class="history-timecontent">
      <p @click="choose(item)">{{item.last}}</p>
      <i class="iconfont" v-show="ischoose === item.last">&#xe62a;</i>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.iconfont {
  font-size: 0.666667rem /* 50/75 */;
  color: blue;
  line-height: 1.066667rem /* 80/75 */;
}
.history-time {
  padding-top: 0.4rem /* 30/75 */;
  padding-left: 0.4rem /* 30/75 */;
  padding-right: 0.4rem /* 30/75 */;
  .history-timeheader {
    display: flex;
    margin-bottom: 0.8rem /* 60/75 */;
    h4 {
      font-size: 0.533333rem /* 40/75 */;
    }
  }
  .history-timecontent {
    display: flex;
    border-bottom: 1px solid black;
    p {
      width: 100%;
      height: 1.066667rem /* 80/75 */;
      line-height: 1.066667rem /* 80/75 */;
      margin-top: 0.066667rem /* 5/75 */;
      font-size: 0.4rem /* 30/75 */;

      padding-left: 0.133333rem /* 10/75 */;
    }
  }

  #van-icon {
    font-size: 0.733333rem /* 55/75 */;
    width: 40%;
  }
}
</style>
<script>
export default {
  data() {
    return {
      list: [
        { last: "Last week" },
        { last: "Last month" },
        { last: "Last 3 months" },
        { last: "Last 6 months" },
        { last: "Last year" },
        { last: "Custom" }
      ],
      ischoose: "Last month",
      newdate: ""
    };
  },
  created() {
    console.log(this.$route.params);
  },
  methods: {
    place() {
      // this.$router.go(-1)
      this.$router.push("/history");
      console.log("back");
    },
    choose(item) {
      this.ischoose = item.last;
      if (item.last === "Last month") {
        this.getMonthdate();
      } else if (item.last === "Last week") {
        this.getWeekdate();
      } else if(item.last === "Last 3 months") {
          this.get3Monthdate()
      }
      console.log(item.last);
    },
    //上一个月
    getMonthdate() {
      this.newdate = new Date(new Date().setMonth(new Date().getMonth() - 1));
      var date2 =
        this.newdate.toLocaleDateString() +
        " " +
        this.newdate.toTimeString().substring(0, 8);
      this.newdate =
        date2
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";
      console.log(this.newdate);
    },
    //上一周
    getWeekdate() {
      this.newdate = new Date(new Date().setDate(new Date().getDate() - 7));
      var date3 =
        this.newdate.toLocaleDateString() +
        " " +
        this.newdate.toTimeString().substring(0, 8);
      this.newdate =
        date3
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";
      console.log(this.newdate);
    },
    //上三个月
    get3Monthdate() {
      this.newdate = new Date(new Date().setMonth(new Date().getMonth() - 3));
      var date4 =
        this.newdate.toLocaleDateString() +
        " " +
        this.newdate.toTimeString().substring(0, 8);
      this.newdate =
        date4
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";
      console.log(this.newdate);
    },
    //上六个月
     get6Monthdate() {
      this.newdate = new Date(new Date().setMonth(new Date().getMonth() - 6));
      var date5 =
        this.newdate.toLocaleDateString() +
        " " +
        this.newdate.toTimeString().substring(0, 8);
      this.newdate =
        date5
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";
      console.log(this.newdate);
    },


  }
};
</script>