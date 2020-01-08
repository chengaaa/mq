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
    <div class="Start-End" v-show="StartEnd">
      <div class="Start">
        <label for="Start Date">Start Date:</label>
        <input type="text" :value="value1" id="Start Date" @click="showdata('start')" />
      </div>
      <div class="Start">
        <label for="End Date">End Date:</label>
        <input type="text" :value="value2" id="End Date" @click="showdata('end')" />
      </div>
    </div>
    <!-- 开始时间 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onCon"
        @cancel="show = false"
      />
      <!-- 结束时间 -->
    </van-popup>
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        v-if="datePicker == 'end'"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onCon1"
        @cancel="show = false"
      />
    </van-popup>
    <!-- <van-datetime-picker
      cancel-button-text="取消"
      confirm-button-text="确认"
      @cancel="picker = false"
      v-show="picker"
      v-model="timenow"
      type="datetime"
      @confirm="onCon"
    />-->
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
  .Start-End {
    margin-top: .266667rem /* 20/75 */;
    .Start {
      display: flex;
      justify-content: space-between;
      height: .666667rem /* 50/75 */;
      label {
        font-size: .32rem /* 24/75 */;
      }
      input {
        text-align:end;
        width: 80%;
      }
    }
  }
}
</style>
<style lang="scss">
.van-picker__cancel, .van-picker__confirm {
  font-size: .4rem /* 30/75 */;
}

.van-popup--bottom {
  height: 4.666667rem /* 350/75 */ !important
}
.van-picker-column__item {
  font-size: .333333rem /* 25/75 */;
}
.van-picker__toolbar {
  height: 1.6rem /* 120/75 */;
}
</style>
<script>
import { Popup } from "vant";
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
      //params开始时间
      newdate: "",
      //params结束时间
      enddate: "",
      //页面中显示的开始时间
      value1: "",
      //页面中显示的结束时间
      value2: "",
      show: false,
      show1: false,
      datePicker: "",
      minDate: new Date(1990, 1, 1),
      maxDate: new Date(2030, 1, 1),
      currentDate: new Date(),
      StartEnd: false,
      // term1:true,
      // term2:true,
      // picker: true,
      // timenow: new Date(),
    };
  },
  created() {
    console.log(this.$route.params);
    console.log(this.newdate, "123");
  },
  methods: {
    showdata(picker) {
      this.datePicker = picker;
      console.log(this.datePicker);
      if (this.datePicker === "start") {
        this.show = true;
      } else if (this.datePicker === "end") this.show1 = true;
    },

    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    onCon(value1) {
      this.value1 = value1;
      this.val();
      this.show = false;
      this.newdate = value1;
      this.startvalue();
      console.log(this.newdate);
    },
    onCon1(value2) {
      this.value2 = value2;
      this.val2();
      this.show1 = false;
      this.enddate = value2;
      this.endvalue();
      console.log(this.enddate);
    },
    //params开始时间
    startvalue() {
      var data0 =
        this.newdate.toLocaleDateString() +
        " " +
        this.newdate.toTimeString().substring(0, 8);
      this.newdate =
        data0
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";
    },
//params 结束时间
    endvalue() {
      var data9 =
        this.enddate.toLocaleDateString() +
        " " +
        this.enddate.toTimeString().substring(0, 8);
      this.enddate =
        data9
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";
    },
    //开始时间
    val() {
      var a =
        this.value1.toLocaleDateString() +
        " " +
        this.value1.toTimeString().substring(0, 8);
      this.value1 = a.split("/").join(".");

      console.log(this.value1);
    },
    //结束时间
    val2() {
      var b =
        this.value2.toLocaleDateString() +
        " " +
        this.value2.toTimeString().substring(0, 8);
      this.value2 = b.split("/").join(".");

      console.log(this.value2);
    },

    choose(item) {
      this.ischoose = item.last;
      console.log(item)
      if (item.last === "Last month") {
        this.getMonthdate();
         this.StartEnd = false
      } else if (item.last === "Last week") {
        this.getWeekdate();
         this.StartEnd = false
      } else if (item.last === "Last 3 months") {
        this.get3Monthdate();
         this.StartEnd = false
      } else if (item.last === "Last 6 months") {
        this.get6Monthdate();
         this.StartEnd = false
      } else if (item.last === "Last year") {
        this.getFullYear();
         this.StartEnd = false
      } else if(item.last === "Custom") {
       this.StartEnd = true
      }
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
    //上一年
    getFullYear() {
      this.newdate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      );
      var date6 =
        this.newdate.toLocaleDateString() +
        " " +
        this.newdate.toTimeString().substring(0, 8);
      this.newdate =
        date6
          .split("/")
          .join("-")
          .replace(" ", "T") + "Z";
      console.log(this.newdate);
    },
    place() {
      // this.$router.go(-1)
      this.$router.push({
        name: "history",
        params: { begin: this.newdate, end: this.enddate }
      });
      console.log("back");
      console.log(this.newdate);
    }
  }
};
</script>