<template>
  <div class="history-time">
    <div class="history-timeheader">
      <van-icon id="van-icon" name="arrow-left" color="#c9c9c9" @click="place" />
      <h4>history</h4>
    </div>
    <div class="pad">
    <div v-for="(item,index) in list" :key="index" class="history-timecontent">
      <p @click="choose(item)">{{$t(item.last)}}</p>
      <i class="iconfont" v-show="ischoose === item.last">&#xe62a;</i>
    </div>
    </div>
    <div class="Start-End" v-show="StartEnd">
      <div class="Start">
        <label for="Start Date">{{$t("m.StartDate")}}</label>
        <input type="text" :value="value1" id="Start Date" @click="showdata('start')" />
      </div>
      <div class="Start">
        <label for="End Date">{{$t("m.EndDate")}}</label>
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
  </div>
</template>
<style lang="scss" scoped>
.iconfont {
  font-size: 0.666667rem /* 50/75 */;
  color: #c9c9c9;
  line-height: 1.066667rem /* 80/75 */;
}
.history-time {
  padding-top: 0.4rem /* 30/75 */;
  padding-left: 0.1rem /* 30/75 */;
  padding-right: 0.4rem /* 30/75 */;
     font-family: 'Tahoma','Sans Serif';
      width: 100%;
  height: 100%;
  position: fixed;
  background: #262626;
  .history-timeheader {
    display: flex;
    margin-bottom: 0.8rem /* 60/75 */;
    h4 {
      color: #c9c9c9;
      font-size: 0.533333rem /* 40/75 */;
    }
  }
  .pad {
padding-left: 0.3rem;
  .history-timecontent {
    display: flex;
    border-bottom: 1px solid #565656;    padding-right: 10px;
    p {
      width: 100%;
      height: 1.066667rem /* 80/75 */;
      line-height: 1.066667rem /* 80/75 */;
      margin-top: 0.066667rem /* 5/75 */;
      font-size: 0.4rem /* 30/75 */;
      padding-left: 0.133333rem /* 10/75 */;
      color: #c9c9c9;
    }
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
        font-size: .32rem /* 24/75 */;
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
import { getNowFormatDate,getUTCtime,isDayLightSaving} from "../../tools/check.js";
export default {
  data() {
    return {
      list: [
        { last: "m.Lastday" },
        { last: "m.Lastweek" },
        { last: "m.Lastmonth" },
        { last: "m.Last3months" },
        { last: "m.Last6months" },
        { last: "m.Lastyear" },
        { last: "m.Custom" }
      ],
      ischoose: "m.Lastweek",
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
      difference:"",
      diftimer:""
    };
  },
  created() {
    console.log(this.$route.params);
    console.log(this.newdate, "123");
    this.getdiftime()
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
    },
    onCon1(value2) {
      this.value2 = value2;
      this.val2();
      this.show1 = false;
      this.enddate = value2;
      this.endvalue();
    },
      //获取时区差
    // getdifference() {
    // var d1 = new Date(2009, 0, 1);
    // var d2 = new Date(2009, 6, 1);
		// if (d1.getTimezoneOffset() != d2.getTimezoneOffset())
		// {
    //   // alert('夏令时'); //夏令时
    //   this.difference = -(new Date().getTimezoneOffset() /60) 
    //   this.diftimer = 2
    //   console.log( this.difference)
		// }
		// else
		// {
    //  this.difference = -(new Date().getTimezoneOffset() /60) - 6
    //   this.diftimer = 1

    //   // alert(Intl.DateTimeFormat().resolvedOptions().timeZone); //非夏令时
    // }
    //   // var num = (new Date().getTimezoneOffset() /60) + 10


    // }

    getdiftime() {
      if(isDayLightSaving(new Date())) {
               this.diftimer = 2
        } else {
               this.diftimer = 1

        }
    },
    //params开始时间
    startvalue() {
      var data0 = new Date(this.newdate.setHours(new Date().getHours() + this.diftimer));
      this.newdate = getUTCtime(this.newdate);
    },
    //params 结束时间
    endvalue() {
  var date9 = new Date(this.enddate.setHours(new Date().getHours() + this.diftimer));
      this.enddate = getUTCtime(this.enddate);
    },
    //开始时间
    val() {
      var a =
        this.value1.toLocaleDateString() +
        " " +
        this.value1.toTimeString().substring(0, 9);
      this.value1 = a.split("/").join(".");
      console.log(this.value1);
    },
    //结束时间
    val2() {
      var b =
        this.value2.toLocaleDateString() +
        " " +
        this.value2.toTimeString().substring(0, 9);
      this.value2 = b.split("/").join(".");
    },
    choose(item) {
      this.ischoose = item.last;
      console.log(item)
       if (item.last === "m.Lastday") {
        this.getDaydate();
         this.StartEnd = false
      }else if (item.last === "m.Lastmonth") {
        this.getMonthdate();
         this.StartEnd = false
      } else if (item.last === "m.Lastweek") {
        this.getWeekdate();
         this.StartEnd = false
      } else if (item.last === "m.Last3months") {
        this.get3Monthdate();
         this.StartEnd = false
      } else if (item.last === "m.Last6months") {
        this.get6Monthdate();
         this.StartEnd = false
      } else if (item.last === "m.Lastyear") {
        this.getFullYear();
         this.StartEnd = false
      } else if(item.last === "m.Custom") {
       this.StartEnd = true
      }
    },
    //上一个月
    getMonthdate() {
      this.newdate = new Date(new Date().setMonth(new Date().getMonth() - 1));
      this.newdate =  new Date(this.newdate.setHours(new Date().getHours() + this.diftimer))
       this.newdate = getUTCtime(this.newdate)
    },
    //前一天
      getDaydate() {
      this.newdate = new Date(new Date().setDate(new Date().getDate() - 1));
      this.newdate =  new Date(this.newdate.setHours(new Date().getHours() + this.diftimer))
       this.newdate = getUTCtime(this.newdate)
    },
    //上一周
    getWeekdate() {
      this.newdate = new Date(new Date().setDate(new Date().getDate() - 7));
      this.newdate =  new Date(this.newdate.setHours(new Date().getHours() + this.diftimer))
       this.newdate = getUTCtime(this.newdate)
    },
    //上三个月
    get3Monthdate() {
      this.newdate = new Date(new Date().setMonth(new Date().getMonth() - 3));
      this.newdate =  new Date(this.newdate.setHours(new Date().getHours() + this.diftimer))
       this.newdate = getUTCtime(this.newdate)
    },
    //上六个月
    get6Monthdate() {
      this.newdate = new Date(new Date().setMonth(new Date().getMonth() - 6));
        this.newdate =  new Date(this.newdate.setHours(new Date().getHours() + this.diftimer))
       this.newdate = getUTCtime(this.newdate)
    },
    //上一年
    getFullYear() {
      this.newdate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      );
      this.newdate =  new Date(this.newdate.setHours(new Date().getHours() + this.diftimer))
       this.newdate = getUTCtime(this.newdate)
    },
    place() {
      this.$router.push({
        name: "history",
        params: { begin: this.newdate, end: this.enddate }
      });
      console.log("back");
      console.log(this.newdate);
    }
  },
};
</script>