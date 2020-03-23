<template lang="">
    <div class="echarts-page">
    <!-- <Navheader class="navbar" ref="child" @click="back"></Navheader> -->
    <div class="navheader">
      <div class="arrow">
        <van-icon id="van-icon" name="arrow-left"  color="blue" @click="gobacks" />
      </div>
    </div>

    <div id="echarts" style="width:100%;height:400px"> </div>
  </div>
</template>
<style lang="scss" scoped>
.echarts-page {
  padding-top: 0.4rem /* 30/75 */;
  #van-icon {
    font-size: 0.733333rem /* 55/75 */;
  }
  #van-icon2 {
    font-size: 0.8rem /* 60/75 */;
  }
  .arrow {
    padding-left: 0.2rem /* 15/75 */;
    margin-bottom: 0.266667rem /* 20/75 */;
  }
}
</style>
<script>
import Header from "../../components/Header";
import { calculateMA } from "../../tools/check.js";
import { getNowFormatDate, getUTCtime } from "../../tools/check.js";
var echarts = require("echarts");
// // 引入柱状图
// require('echarts/lib/chart/candlestick');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');

export default {
  data() {
    return {
      starttime: "",
      endtime: "",
      bordername: "",
      rawData: [],
      setInterName: null
      
    };
  },
  created() {
    this.bordername = this.$route.params.id;
  },
  mounted() {
    this.getdate();

    this.initchart();
  },
  beforeDestroy() {
    if (this.setInterName) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.setInterName); //关闭
    }
  },
  components: {
    Header
  },
  methods: {
    gobacks() {
      this.$router.push({ name: "quotation" });
      console.log("go");
    },

    getdate() {
      //starttime
      this.starttime = new Date(new Date().setHours(new Date().getHours() - 2));
      this.endtime = new Date();
      this.starttime = getUTCtime(this.starttime);
      this.endtime = getUTCtime(this.endtime);
    },

    initchart() {
      let myChart = echarts.init(document.getElementById("echarts"));
      var upColor = "#ec0000";
      var upBorderColor = "#8A0000";
      var downColor = "#00da3c";
      var downBorderColor = "#008F28";

      // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      var data0 = splitData([
        [2320.26, 2320.26, 2287.3, 2362.94, "1583753820"],
        [2300, 2291.3, 2288.26, 2308.38, "1583753830"],
        [2295.35, 2346.5, 2295.35, 2346.92, "1583753850"],
        [2347.22, 2358.98, 2337.35, 2363.8, "1583753860"],
        [2360.75, 2382.48, 2347.89, 2383.76, "1583753870"],
        [2383.43, 2385.42, 2371.23, 2391.82, "1583753880"],
        [2377.41, 2419.02, 2369.57, 2421.15, "1583753890"],
        [2425.92, 2428.15, 2417.58, 2440.38, "1583753910"],
        [2411, 2433.13, 2403.3, 2437.42, "1583753920"],
        [2432.68, 2434.48, 2427.7, 2441.73, "1583753930"],
        [2430.69, 2418.53, 2394.22, 2433.89, "1583753940"],
        [2416.62, 2432.4, 2414.4, 2443.03, "1583753950"],
        [2441.91, 2421.56, 2415.43, 2444.8, "1583753960"],
        [2420.26, 2382.91, 2373.53, 2427.07, "1583753970"],
        [2383.49, 2397.18, 2370.61, 2397.94, "1583753980"],
        [2378.82, 2325.95, 2309.17, 2378.82, "1583753990"],
        [2322.94, 2314.16, 2308.76, 2330.88, "1583754100"],
        [2320.62, 2325.82, 2315.01, 2338.78, "1583754110"],
        [2313.74, 2293.34, 2289.89, 2340.71, "1583754120"],
        [2297.77, 2313.22, 2292.03, 2324.63, "1583754130"],
        [2322.32, 2365.59, 2308.92, 2366.16, "1583754140"],
        [2364.54, 2359.51, 2330.86, 2369.65, "1583754150"],
        [2332.08, 2273.4, 2259.25, 2333.54, "1583754160"],
        [2274.81, 2326.31, 2270.1, 2328.14, "1583754170"],
        [2333.61, 2347.18, 2321.6, 2351.44, "1583754180"],
        [2340.44, 2324.29, 2304.27, 2352.02, "1583754190"],
        [2326.42, 2318.61, 2314.59, 2333.67, "1583754200"],
        [2314.68, 2310.59, 2296.58, 2320.96, "1583754210"],
        [2309.16, 2286.6, 2264.83, 2333.29, "1583754220"],
        [2282.17, 2263.97, 2253.25, 2286.33, "1583754230"],
        [2255.77, 2270.28, 2253.31, 2276.22, "1583754240"],
        [2269.31, 2278.4, 2250, 2312.08, "1583754250"],
        [2267.29, 2240.02, 2239.21, 2276.05, "1583754260"],
        [2244.26, 2257.43, 2232.02, 2261.31, "1583754270"],
        [2257.74, 2317.37, 2257.42, 2317.86, "1583754280"],
        [2318.21, 2324.24, 2311.6, 2330.81, "1583754290"],
        [2321.4, 2328.28, 2314.97, 2332, "1583754300"],
        [2334.74, 2326.72, 2319.91, 2344.89, "1583754310"],
        [2318.58, 2297.67, 2281.12, 2319.99, "1583754310"],
        [2299.38, 2301.26, 2289, 2323.48, "1583754310"],
        [2273.55, 2236.3, 2232.91, 2273.55, "1583754310"],
        [2238.49, 2236.62, 2228.81, 2246.87, "1583754310"],
        [2229.46, 2234.4, 2227.31, 2243.95, "1583754310"],
        [2234.9, 2227.74, 2220.44, 2253.42, "1583754310"],
        [2232.69, 2225.29, 2217.25, 2241.34, "1583754310"],
        [2196.24, 2211.59, 2180.67, 2212.59, "1583754310"],
        [2215.47, 2225.77, 2215.47, 2234.73, "1583754310"],
        [2224.93, 2226.13, 2212.56, 2233.04, "1583754310"],
        [2236.98, 2219.55, 2217.26, 2242.48, "1583754310"],
        [2218.09, 2206.78, 2204.44, 2226.26, "1583754310"],
        [2199.91, 2181.94, 2177.39, 2204.99, "1583754310"],
        [2169.63, 2194.85, 2165.78, 2196.43, "1583754310"],
        [2195.03, 2193.8, 2178.47, 2197.51, "1583754310"],
        [2181.82, 2197.6, 2175.44, 2206.03, "1583754310"],
        [2201.12, 2244.64, 2200.58, 2250.11, "1583754310"]
      ]);

      function splitData(rawData) {
        var categoryData = [];
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(
            getNowFormatDate(new Date(rawData[i].splice(4, 1) * 1000))
          );

          values.push(rawData[i].splice(0, 4));
        }

        return {
          categoryData: categoryData,
          values: values
        };
      }

      function calculateMA(dayCount, values) {
        var result = [];
        for (var i = 0, len = values.length; i < len; i++) {
          console.log(data0.values, "data0.values");
          if (i < dayCount) {
            result.push("-");
            continue;
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            sum += values[i - j][1];
          }
          result.push(sum / dayCount);
        }
        return result;
      }

   
      myChart.setOption(option);
      this.$http
        .get(
          "/chart?symbol=" +
            this.bordername +
            "&from=" +
            this.starttime +
            "&to=" +
            this.endtime
        )
        .then(({ data }) => {
          if (data.code === 0) {
            console.log(data, "sjb");
            var datab = data.data;
            var arrall = [];
            var b = datab.map(item => {
              // console.log(item,"999999999999999999")
              var open = item.open;
              var close = item.close;
              var lowest = item.low;
              var highest = item.high;
              var time = item.timestamp;
              var arr = [open, close, lowest, highest, time];
              // arrall.push(arr);
              // console.log(arr,"arr")
              return arr;
            });
            data0 = splitData(b);
            option.xAxis.data = data0.categoryData;
            option.series[0].data = data0.values;
            myChart.setOption(option);

            console.log(data0.categoryData, "11111");
            console.log(data0.values, "1111111");
            console.log(datab, "splitData");
          } else {
            Toast({
              message: "网络错误",
              duration: 1000
            });
          }
        });
    }
  },
  watch: {

  }
};
</script>