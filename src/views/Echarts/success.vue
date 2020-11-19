<template>
  <div class="echarts-page">
    <div class="navheader">
      <div class="arrow" style="float: left">
        <van-icon
          id="van-icon"
          name="arrow-left"
          color="#127df6"
          @click="gobacks"
        />
      </div>
      <div></div>
      <div class="selected">
        <div class="title">
          <!-- <span>选择名称</span> -->
          <select v-model="bordername" autocomplete="off">
            <option
              v-for="(item, index) in bordernames"
              :key="index"
              :value="item.name"
            >
              {{ item.name }}
            </option>
            <!-- <option >BTCUSD</option> -->
            <!-- <option >BCHUSD</option> -->
            <!-- <option >ETHUSD</option> -->
          </select>
        </div>
        <div class="title">
          <!-- <span>选择日期</span> -->
          <select v-model="bordertime" autocomplete="off">
            <option
              v-for="(item, index) in bordertimes"
              :key="index"
              :value="item.name"
            >
              {{ item.name }}
            </option>
            <!-- <option >M5</option>
          <option >M15</option>
          <option >M30</option>
          <option >H1</option>
          <option >H4</option>
          <option >D</option>
          <option >W</option>
          <option >M</option>-->
          </select>
        </div>
        <div class="title">
          <input type="button" value="OK" @click="check" />
        </div>
      </div>
    </div>
    <div id="echarts"></div>
  </div>
</template>
<style lang="scss" scoped>
.echarts-page {
  padding-top: 0.4rem /* 30/75 */;
  width: 100%;
  height: 100%;
  .selected {
    display: flex;
    justify-content: center;
  }
  #van-icon {
    font-size: 0.733333rem /* 55/75 */;
  }
  #van-icon2 {
    font-size: 0.8rem /* 60/75 */;
  }
  .arrow {
    padding-left: 0.2rem /* 15/75 */;
  }
  .title {
    text-align: center;
    span {
      font-size: 0.346667rem /* 26/75 */;
    }
    select {
      font-size: 0.346667rem /* 26/75 */;
      height: 0.8rem /* 60/75 */;
      width: 2.266667rem /* 170/75 */;
      text-align: center;
      text-align-last: center;
      margin-bottom: 0.266667rem /* 20/75 */;
      font-weight: 700;
      appearance: none;
      margin-right: 0.8rem;
      border-radius: 4px;
      option {
        text-align: center;
      }
    }
    input {
      margin-top: 0.04rem /* 3/75 */;
      width: 1.333333rem;
      height: 0.693333rem /* 52/75 */;
      margin-left: 0.133333rem /* 10/75 */;
      line-height: 0.666667rem /* 50/75 */;
      appearance: none;
      border: 1px solid #127df6;
    }
  }
}
</style>
<script>
const Header = () => import("../../components/Header");
var api = require("../../api/api");
import {
  getNowFormatDates,
  getNowFormatDate,
  getUTCtime,
} from "../../tools/check.js";

export default {
  data() {
    return {
      starttime: "",
      endtime: "",
      bordername: "BTCUSD",
      bordertime: "M15",
      rawData: [],
      setInterName: null,
      bordernames: [
        { name: "BTCUSD", id: "0" },
        { name: "BCHUSD", id: "1" },
        { name: "ETHUSD", id: "2" },
      ],
      bordertimes: [
        { name: "M5" },
        { name: "M15" },
        { name: "M30" },
        { name: "H1" },
        { name: "H4" },
        { name: "D" },
        { name: "W" },
        { name: "M" },
      ],
      lastdata: "",
      websokArr: [],
      time: "",
      param: "",
      dataArr: "",
      datab: "",
      b: "",
      myChart: null,
      option: "",
    };
  },
  created() {
    this.demo();
    this.datestr();
    this.Lastchart();
    if (this.$route.params.id) {
      this.bordername = this.$route.params.id.slice(
        0,
        this.$route.params.id.indexOf(".")
      );
      this.bordername = this.bordername;
    } else {
      this.bordername = this.bordername;
      return;
    }
    console.log(this.$route.params.id, "params");
  },
  mounted() {
    this.getdate();
    var echartss = document.getElementById("echarts");
    echartss.style.height = window.innerHeight - 120 + "px";
    echartss.style.width = window.innerWidth + "px";
    this.initchart();
  },
  beforeDestroy() {
    this.setInterName = null;
    clearInterval(this.setInterName);
  },
  components: {
    Header,
  },

  methods: {
    gobacks() {
      this.$router.go(-1);
      console.log("go");
    },
    check() {
      this.getdate();
      clearInterval(this.setInterName);
      this.initchart();
    },
    //图表最后一根
    Lastchart() {
      this.$http
        .get(api.Lastchart, {
          params: {
            symbol: this.bordername,
            type: this.bordertime,
          },
        })
        .then(({ data }) => {
          this.lastdata = [data][0];
          console.log(this.lastdata, "王晓丽");
        });
    },
    getdate() {
      //starttime
      if (this.bordertime === "M5") {
        this.endtime = new Date();
        this.starttime = new Date(
          new Date().setHours(new Date().getHours() - 5)
        );
      } else if (this.bordertime === "M15") {
        this.endtime = new Date();
        this.starttime = new Date(
          new Date().setHours(new Date().getHours() - 15)
        );
      } else if (this.bordertime === "M30") {
        this.endtime = new Date();
        this.starttime = new Date(
          new Date().setHours(new Date().getHours() - 30)
        );
      } else if (this.bordertime === "H1") {
        this.endtime = new Date();
        this.starttime = new Date(
          new Date().setHours(new Date().getHours() - 60)
        );
      } else if (this.bordertime === "H4") {
        this.endtime = new Date();
        this.starttime = new Date(
          new Date().setHours(new Date().getHours() - 240)
        );
      } else if (this.bordertime === "D") {
        this.endtime = new Date();
        this.starttime = new Date(
          new Date().setDate(new Date().getDate() - 60)
        );
      } else if (this.bordertime === "W") {
        this.endtime = new Date();
        this.starttime = new Date(
          new Date().setDate(new Date().getDate() - 420)
        );
      } else if (this.bordertime === "M") {
        this.endtime = new Date();
        this.starttime = new Date(
          new Date().setMonth(new Date().getMonth() - 60)
        );
        console.log(this.starttime, "starttime");
      }
      this.starttime = parseInt(new Date(this.starttime).getTime() / 1000);
      this.endtime = parseInt(new Date(this.endtime).getTime() / 1000);
    },
    datestr() {
      var d1 = new Date(2009, 0, 1);
      var d2 = new Date(2009, 6, 1);
      console.log(d1.getTimezoneOffset(), d2.getTimezoneOffset(), "d1d2");
      if (d1.getTimezoneOffset() != d2.getTimezoneOffset()) {
        // alert('夏令时'); //夏令时
      } else {
        // alert(Intl.DateTimeFormat().resolvedOptions().timeZone); //非夏令时
      }
    },
    demo() {
      new Date().getTimezoneOffset() / 60; //与utc时间相比差几个小时
      var data = new Date(
        new Date().getTime() +
          new Date().getTimezoneOffset() * 60 * 1000 +
          8 * 60 * 60 * 1000
      );
      console.log(data.getTime() + 21600000, "多少"); //6小时之后的时间
    },

    initchart() {
      this.Lastchart();
      var echartss = document.getElementById("echarts");
      this.myChart = echarts.init(document.getElementById("echarts"));
      function resizeDom(dom) {
        //通过窗体高宽计算容器高宽，渲染echart图表的div的宽高度已达到自适应目的
        dom.style.width = window.innerWidth + "px";
        console.log(dom.style.width, "1");
        console.log(dom.style.height, "2");
        dom.style.height = window.innerHeight - 130 + "px";
      }

      function calculateMA(dayCount, data) {
        var result = [];
        if (data) {
          for (var i = 0, len = data.length; i < len; i++) {
            if (i < dayCount) {
              result.push("-");
              continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
              sum += data[i - j][1];
            }
            result.push(sum / dayCount);
          }
          return result;
        }
      }

      // var dates, data;
      this.option = {
        backgroundColor: "#21202D",
        legend: {
          data: ["日K", "MA5", "MA10", "MA20", "MA30"],
          inactiveColor: "#777",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
            type: "cross",
            lineStyle: {
              color: "#376df4",
              width: 2,
              opacity: 1,
            },
          },
        },
        xAxis: {
          type: "category",
          data: this.time,
          axisLine: { lineStyle: { color: "#8392A5" } },
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: "#8392A5" } },
          splitLine: { show: false },
        },
        grid: {},
        dataZoom: [
          {
            type: "inside",
          },
        ],
        animation: false,
        series: [
          {
            type: "candlestick",
            name: "日K",
            data: this.param,
            itemStyle: {
              color: "#FD1050",
              color0: "#0CF49B",
              borderColor: "#FD1050",
              borderColor0: "#0CF49B",
            },

            markLine: {
              symbol: "none", //去掉警戒线最后面的箭头
              label: {
                position: "end", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
              },
              data: [
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "dashed",
                    color: "#FA3934",
                  },
                  yAxis: "", // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                },
              ],
            },
          },
          {
            name: "MA5",
            type: "line",
            data: calculateMA(5, this.param),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
            },
          },
          {
            name: "MA10",
            type: "line",
            data: calculateMA(10, this.param),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
            },
          },
          {
            name: "MA20",
            type: "line",
            data: calculateMA(20, this.param),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
            },
          },
          {
            name: "MA30",
            type: "line",
            data: calculateMA(30, this.param),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
            },
          },
        ],
      };
      console.log(this.option.xAxis.data, "o");

      // window.localStorage.setItem("params", this.bordername)
      this.$http
        // .get(
        //   baseURL1 +
        //     "/chart?symbol=" +
        //     this.bordername +
        //     ".&from=" +
        //     this.starttime +
        //     "&to=" +
        //     this.endtime
        // )
        .post(api.ChartURL, {
          from: this.starttime,
          to: this.endtime,
          type: this.bordertime,
          symbol: this.bordername,
        })

        .then(({ data }) => {
          console.log(data, "图标");
          // if (data.code === 0) {

          this.dataArr = data;

          this.dataArr.unshift(this.lastdata);
          console.log(this.dataArr, "dataArr");
          this.datab = this.dataArr.reverse();
          console.log(this.datab, "datab");
          var arrall = [];
          this.b = this.datab.map((item) => {
            var open = item.open;
            var close = item.close;
            var lowest = item.low;
            var highest = item.high;
            var time = item.timestamp;
            // console.log(time,"time")
            var arr = [open, close, lowest, highest, time];
            return arr;
          });
          this.time = this.b.map(function (item) {
            return getNowFormatDate(new Date(item[4] * 1000));
          });

          this.param = this.b.map(function (item) {
            // console.log(item, "item");
            return [+item[0], +item[1], +item[2], +item[3]];
          });
          console.log(this.param, "疯了吧");
          console.log(getNowFormatDate(new Date(1586162580 * 1000)), "0");
          this.option.xAxis.data = this.time;
          this.option.series[0].data = this.param;
          this.option.series[0].markLine.data[0].yAxis = this.param[
            this.param.length - 1
          ][1];
          console.log(this.option.series, " this.option.series");
          this.option.series[1].data = calculateMA(5, this.param);
          this.option.series[2].data = calculateMA(10, this.param);
          this.option.series[3].data = calculateMA(20, this.param);
          this.option.series[4].data = calculateMA(30, this.param);

          this.myChart.setOption(this.option);
          resizeDom(echartss);
          // window.addEventListener("resize", () => {
          //   resizeDom(echartss); //重置div宽高度
          //   myChart.resize(); //重绘echart图表
          // });

          // } else {
          // Toast({
          //   message: "网络错误",
          //   duration: 1000
          // });
          // }
        });

      // this.setInterName = setInterval(() => {
      //   this.getdate();
      //   this.$http
      //     .post(api.ChartURL, {
      //       from: this.starttime,
      //       to: this.endtime,
      //       type: this.bordertime,
      //       symbol: this.bordername
      //     })
      //     .then(({ data }) => {
      //       if (data.code === 0) {
      //         var datac = data.reverse();
      //         var arrall = [];
      //         var c = datac.map(item => {
      //           var opens = item.open;
      //           var closes = item.close;
      //           var lowests = item.low;
      //           var highests = item.high;
      //           var times = item.timestamp;
      //           var arrs = [opens, closes, lowests, highests, times];
      //           return arrs;
      //         });
      //         dates = c.map(function(item) {
      //           return getNowFormatDate(new Date(item[4] * 1000));
      //         });

      //         data = c.map(function(item) {
      //           console.log(item, "item");
      //           return [+item[0], +item[1], +item[2], +item[3]];
      //         });
      //         option.xAxis.data = dates;
      //         option.series[0].data = data;
      //         option.series[1].data = calculateMA(5, data);
      //         option.series[2].data = calculateMA(10, data);
      //         option.series[3].data = calculateMA(20, data);
      //         option.series[4].data = calculateMA(30, data);
      //         myChart.setOption(option);
      //       } else {

      //       }
      //     });
      // }, 1000 * 60);
      this.myChart.setOption(this.option);
      resizeDom(echartss);
      // window.addEventListener("resize", () => {
      //   resizeDom(echartss); //重置div宽高度
      //   myChart.resize(); //重绘echart图表
      // });
    },
  },
  watch: {
    "$store.state.mydata": function (newer, old) {
      this.websokArr = newer;
       console.log(this.lastdata.close,"last") 
      this.param[0][0] = 19990
      this.param[0][1] = 10999
      this.param[0][2] = 10878
      this.param[0][3] = 19088
      this.option.series[0].data = this.param;


      //  this.dataArr.push(this.lastdata)

      console.log(this.option, "this.option");
      // this.myChart.setOption(this.option,true);

      console.log(this.websokArr, "websokArr");
      console.log(this.dataArr, "this.dataArr");
    },
  },
};
</script>