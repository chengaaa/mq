<template>
    <div class="echarts-page">
    <div class="navheader">
      <div class="arrow">
        <van-icon id="van-icon" name="arrow-left"  color="blue" @click="gobacks" />
      </div>
    </div>
      <div>
       
      </div>
      <div class="selected">
     <div class="title"><span>选择名称</span> <select v-model="bordername" autocomplete="off" >
          <option >ETHUSD</option>
          <option >BTCUSD</option>
          <option >BCHUSD</option>
        </select></div>
          <div class="title"> <span>选择日期</span><select v-model="bordertime" autocomplete="off" >
          <option >M1</option> 
          <option >M5</option>
          <option >M15</option>
          <option >M30</option>
          <option >H1</option>
          <option >H4</option>
          <option >day</option>
          <option >week</option>
          <option >month</option>
        </select></div>
        <div class="title">

        <input type="button" value="确定" @click="check">
        </div>
        </div>
    <div id="echarts" ></div>
  </div>


</template>
<style lang="scss" scoped>
.echarts-page {
  padding-top: 0.4rem /* 30/75 */;
  // width: 10rem /* 750/75 */;
  width:100%;
  height: 100%;
  .selected {
    display: flex;
    justify-content: center;
    // align-items: center;
  }

  // height: 14rem /* 1050/75 */;
  #van-icon {
    font-size: 0.733333rem /* 55/75 */;
  }
  #van-icon2 {
    font-size: 0.8rem /* 60/75 */;
  }
  .arrow {
    padding-left: 0.2rem /* 15/75 */;
    // margin-bottom: 0.266667rem /* 20/75 */;
  }
  .title {
      text-align: center;
      span {
        font-size: .346667rem /* 26/75 */;
      }

    select {
      font-size:.346667rem /* 26/75 */;
      height: .8rem /* 60/75 */;
      width: 2.266667rem /* 170/75 */;
      text-align:center;
      text-align-last:center;
      margin-bottom: 0.266667rem /* 20/75 */;
      font-weight: 700;
      appearance: none;

      option {
          text-align: center;
      }
     
    }
    input {
      margin-top:.04rem /* 3/75 */;
      width: 1.333333rem;
      height:.693333rem /* 52/75 */;
      margin-left: .133333rem /* 10/75 */;
      line-height: .666667rem /* 50/75 */;
      appearance: none;
      border: 1px solid #127df6;
    }
  }
}
</style>
<script>
const Header = () => import("../../components/Header");
var api = require("../../api/api")
import {
  getNowFormatDates,
  getNowFormatDate,
  getUTCtime
} from "../../tools/check.js";
// var echarts = require("echarts");
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
      bordername:"BTCUSD",
      bordertime:"M30",
      rawData: [],
      setInterName: null
    };
  },
  created() {
     
  },
  mounted() {
    this.getdate();
    var echartss = document.getElementById("echarts");
    echartss.style.height = window.innerHeight - 130 + "px";
    echartss.style.width = window.innerWidth + "px";
    this.initchart();
  },
  beforeDestroy() {
   this.setInterName = null
  },
  components: {
    Header
  },
  methods: {
    gobacks() {
      this.$router.go(-1);
      console.log("go");
    },
    check() {
      this.initchart()
    },
    getdate() {
      //starttime
      this.starttime = new Date();
      this.endtime = new Date(new Date().setDate(new Date().getDate() + 1));
      // this.starttime = getUTCtime(this.starttime);
      // this.endtime = getUTCtime(this.endtime);
      console.log(this.endtime,"cuo")
      this.starttime = this.starttime.getTime()
      this.endtime = this.endtime.getTime()
      console.log( this.starttime,"1")
      console.log( this.endtime,"2")
    },
    initchart() {
      var echartss = document.getElementById("echarts");
      let myChart = echarts.init(document.getElementById("echarts"));
      function resizeDom(dom) {
        //通过窗体高宽计算容器高宽，渲染echart图表的div的宽高度已达到自适应目的
        dom.style.width = window.innerWidth + "px";
        console.log(dom.style.width, "1");
        console.log(dom.style.height, "2");
        dom.style.height = window.innerHeight - 130 + "px";
      }

      var rawData = [
        [
          "2015/9/2",
          "3027.68",
          "3160.17",
          "-6.46",
          "-0.20%",
          "3019.09",
          "3194.48",
          "438170176",
          "42326236",
          "-"
        ],
        [
          "2015/9/1",
          "3157.83",
          "3166.62",
          "-39.36",
          "-1.23%",
          "3053.74",
          "3180.33",
          "432432448",
          "42041164",
          "-"
        ],
        [
          "2015/8/31",
          "3203.56",
          "3205.99",
          "-26.36",
          "-0.82%",
          "3109.16",
          "3207.86",
          "397431392",
          "43106860",
          "-"
        ],
        [
          "2015/8/28",
          "3125.26",
          "3232.35",
          "148.76",
          "4.82%",
          "3102.95",
          "3235.84",
          "443136928",
          "47463100",
          "-"
        ],
        [
          "2015/8/27",
          "2978.03",
          "3083.59",
          "156.3",
          "5.34%",
          "2906.49",
          "3085.42",
          "400308384",
          "40428928",
          "-"
        ],
        [
          "2015/8/26",
          "2980.79",
          "2927.29",
          "-37.68",
          "-1.27%",
          "2850.71",
          "3092.04",
          "466699680",
          "46178896",
          "-"
        ],
        [
          "2015/8/25",
          "3004.13",
          "2964.97",
          "-244.94",
          "-7.63%",
          "2947.94",
          "3123.03",
          "352325088",
          "35873576",
          "-"
        ],
        [
          "2015/8/24",
          "3373.48",
          "3209.91",
          "-297.84",
          "-8.49%",
          "3191.88",
          "3388.36",
          "334671776",
          "35881888",
          "-"
        ],
        [
          "2015/8/21",
          "3609.96",
          "3507.74",
          "-156.55",
          "-4.27%",
          "3490.54",
          "3652.84",
          "369920480",
          "45061648",
          "-"
        ],
        [
          "2015/8/20",
          "3754.57",
          "3664.29",
          "-129.82",
          "-3.42%",
          "3663.61",
          "3788.01",
          "390063072",
          "50119500",
          "-"
        ],
        [
          "2015/8/19",
          "3646.8",
          "3794.11",
          "45.95",
          "1.23%",
          "3558.38",
          "3811.43",
          "475396224",
          "59951332",
          "-"
        ],
        [
          "2015/8/18",
          "3999.13",
          "3748.16",
          "-245.5",
          "-6.15%",
          "3743.39",
          "4006.34",
          "543770816",
          "72246720",
          "-"
        ],
        [
          "2015/8/17",
          "3947.84",
          "3993.67",
          "28.33",
          "0.71%",
          "3907.4",
          "3994.54",
          "460432064",
          "62632768",
          "-"
        ],
        [
          "2015/8/14",
          "3976.41",
          "3965.33",
          "10.78",
          "0.27%",
          "3939.83",
          "4000.68",
          "467988224",
          "64746644",
          "-"
        ],
        [
          "2015/8/13",
          "3869.91",
          "3954.56",
          "68.24",
          "1.76%",
          "3838.16",
          "3955.79",
          "430073280",
          "57868552",
          "-"
        ],
        [
          "2015/8/12",
          "3881.23",
          "3886.32",
          "-41.59",
          "-1.06%",
          "3871.14",
          "3937.77",
          "442688256",
          "59705028",
          "-"
        ],
        [
          "2015/8/11",
          "3928.81",
          "3927.91",
          "-0.51",
          "-0.01%",
          "3891.18",
          "3970.34",
          "538923456",
          "71228992",
          "-"
        ],
        [
          "2015/8/10",
          "3786.03",
          "3928.42",
          "184.21",
          "4.92%",
          "3775.85",
          "3943.62",
          "497304320",
          "65262204",
          "-"
        ],
        [
          "2015/8/7",
          "3692.61",
          "3744.2",
          "82.67",
          "2.26%",
          "3686.3",
          "3756.74",
          "340757184",
          "44548504",
          "-"
        ],
        [
          "2015/8/6",
          "3625.5",
          "3661.54",
          "-33.03",
          "-0.89%",
          "3614.74",
          "3710.57",
          "274074656",
          "35751512",
          "-"
        ],
        [
          "2015/8/5",
          "3745.65",
          "3694.57",
          "-61.97",
          "-1.65%",
          "3676.39",
          "3782.35",
          "366423008",
          "48385028",
          "-"
        ],
        [
          "2015/8/4",
          "3621.85",
          "3756.54",
          "133.64",
          "3.69%",
          "3601.29",
          "3757.03",
          "362901664",
          "46403624",
          "-"
        ],
        [
          "2015/8/3",
          "3614.99",
          "3622.91",
          "-40.82",
          "-1.11%",
          "3549.5",
          "3648.94",
          "363968704",
          "44599160",
          "-"
        ],
        [
          "2015/7/31",
          "3655.67",
          "3663.73",
          "-42.04",
          "-1.13%",
          "3620.17",
          "3729.51",
          "350955712",
          "46047224",
          "-"
        ],
        [
          "2015/7/30",
          "3773.79",
          "3705.77",
          "-83.4",
          "-2.20%",
          "3685.96",
          "3844.37",
          "457943232",
          "61597792",
          "-"
        ],
        [
          "2015/7/29",
          "3689.82",
          "3789.17",
          "126.17",
          "3.44%",
          "3612.06",
          "3792.07",
          "434352096",
          "55749196",
          "-"
        ],
        [
          "2015/7/28",
          "3573.14",
          "3663",
          "-62.56",
          "-1.68%",
          "3537.36",
          "3762.53",
          "563330048",
          "68505752",
          "-"
        ],
        [
          "2015/7/27",
          "3985.57",
          "3725.56",
          "-345.35",
          "-8.48%",
          "3720.44",
          "4051.16",
          "556003264",
          "72129808",
          "-"
        ],
        [
          "2015/7/24",
          "4124.75",
          "4070.91",
          "-53.02",
          "-1.29%",
          "4044.83",
          "4184.45",
          "627424896",
          "84302208",
          "-"
        ],
        [
          "2015/7/23",
          "4022.27",
          "4123.92",
          "97.88",
          "2.43%",
          "4019.04",
          "4132.61",
          "563585984",
          "74353184",
          "-"
        ],
        [
          "2015/7/22",
          "3996.43",
          "4026.04",
          "8.37",
          "0.21%",
          "3960.86",
          "4042.34",
          "520732224",
          "67883192",
          "-"
        ],
        [
          "2015/7/21",
          "3939.9",
          "4017.67",
          "25.57",
          "0.64%",
          "3912.8",
          "4041.82",
          "504288000",
          "64641684",
          "-"
        ],
        [
          "2015/7/20",
          "3948.42",
          "3992.11",
          "34.76",
          "0.88%",
          "3927.12",
          "4021.33",
          "539106688",
          "68825560",
          "-"
        ],
        [
          "2015/7/17",
          "3831.42",
          "3957.35",
          "134.18",
          "3.51%",
          "3814.15",
          "3994.48",
          "481726272",
          "59306700",
          "-"
        ],
        [
          "2015/7/16",
          "3758.5",
          "3823.18",
          "17.47",
          "0.46%",
          "3688.44",
          "3877.51",
          "492256224",
          "56985892",
          "-"
        ],
        [
          "2015/7/15",
          "3874.97",
          "3805.7",
          "-118.78",
          "-3.03%",
          "3741.25",
          "3914.27",
          "601301312",
          "70053656",
          "-"
        ],
        [
          "2015/7/14",
          "3958.37",
          "3924.49",
          "-45.9",
          "-1.16%",
          "3855.56",
          "4035.43",
          "670558784",
          "83007464",
          "-"
        ],
        [
          "2015/7/13",
          "3918.99",
          "3970.39",
          "92.58",
          "2.39%",
          "3858.64",
          "4030.19",
          "643489024",
          "78243056",
          "-"
        ],
        [
          "2015/7/10",
          "3707.46",
          "3877.8",
          "168.47",
          "4.54%",
          "3677.43",
          "3959.22",
          "586364288",
          "68043416",
          "-"
        ],
        [
          "2015/7/9",
          "3432.45",
          "3709.33",
          "202.14",
          "5.76%",
          "3373.54",
          "3748.48",
          "656914624",
          "67331096",
          "-"
        ],
        [
          "2015/7/8",
          "3467.4",
          "3507.19",
          "-219.93",
          "-5.90%",
          "3421.53",
          "3599.25",
          "680356928",
          "70024832",
          "-"
        ],
        [
          "2015/7/7",
          "3654.78",
          "3727.12",
          "-48.79",
          "-1.29%",
          "3585.4",
          "3750.57",
          "698818752",
          "77607256",
          "-"
        ],
        [
          "2015/7/6",
          "3975.21",
          "3775.91",
          "89",
          "2.41%",
          "3653.04",
          "3975.21",
          "831139264",
          "94342040",
          "-"
        ],
        [
          "2015/7/3",
          "3793.71",
          "3686.92",
          "-225.85",
          "-5.77%",
          "3629.56",
          "3927.13",
          "548163072",
          "64805412",
          "-"
        ],
        [
          "2015/7/2",
          "4058.62",
          "3912.77",
          "-140.93",
          "-3.48%",
          "3795.25",
          "4080.39",
          "586015616",
          "73600680",
          "-"
        ],
        [
          "2015/7/1",
          "4214.15",
          "4053.7",
          "-223.52",
          "-5.23%",
          "4043.37",
          "4317.05",
          "598769408",
          "83807088",
          "-"
        ],
        [
          "2015/6/30",
          "4006.75",
          "4277.22",
          "224.19",
          "5.53%",
          "3847.88",
          "4279.97",
          "709176576",
          "94152464",
          "-"
        ],
        [
          "2015/6/29",
          "4289.77",
          "4053.03",
          "-139.84",
          "-3.34%",
          "3875.05",
          "4297.47",
          "673786368",
          "90427136",
          "-"
        ],
        [
          "2015/6/26",
          "4399.93",
          "4192.87",
          "-334.91",
          "-7.40%",
          "4139.53",
          "4456.9",
          "565217920",
          "78783568",
          "-"
        ],
        [
          "2015/6/25",
          "4711.76",
          "4527.78",
          "-162.37",
          "-3.46%",
          "4483.55",
          "4720.7",
          "572797568",
          "86537976",
          "-"
        ],
        [
          "2015/6/24",
          "4604.58",
          "4690.15",
          "113.66",
          "2.48%",
          "4552.13",
          "4691.77",
          "543003712",
          "81506272",
          "-"
        ],
        [
          "2015/6/23",
          "4471.61",
          "4576.49",
          "98.13",
          "2.19%",
          "4264.77",
          "4577.94",
          "473526112",
          "69361720",
          "-"
        ],
        [
          "2015/6/19",
          "4689.93",
          "4478.36",
          "-306.99",
          "-6.42%",
          "4476.5",
          "4744.08",
          "452689632",
          "68545816",
          "-"
        ],
        [
          "2015/6/18",
          "4942.52",
          "4785.36",
          "-182.54",
          "-3.67%",
          "4780.87",
          "4966.77",
          "507440896",
          "78584504",
          "-"
        ],
        [
          "2015/6/17",
          "4890.55",
          "4967.9",
          "80.47",
          "1.65%",
          "4767.22",
          "4983.66",
          "537101120",
          "83026672",
          "-"
        ],
        [
          "2015/6/16",
          "5004.41",
          "4887.43",
          "-175.56",
          "-3.47%",
          "4842.1",
          "5029.68",
          "550801408",
          "89542056",
          "-"
        ],
        [
          "2015/6/15",
          "5174.42",
          "5062.99",
          "-103.36",
          "-2.00%",
          "5048.74",
          "5176.79",
          "637803968",
          "106499200",
          "-"
        ],
        [
          "2015/6/12",
          "5143.34",
          "5166.35",
          "44.76",
          "0.87%",
          "5103.4",
          "5178.19",
          "625627904",
          "106016744",
          "-"
        ],
        [
          "2015/6/11",
          "5101.44",
          "5121.59",
          "15.56",
          "0.30%",
          "5050.76",
          "5122.46",
          "563990528",
          "97467056",
          "-"
        ],
        [
          "2015/6/10",
          "5049.2",
          "5106.04",
          "-7.5",
          "-0.15%",
          "5001.49",
          "5164.16",
          "596969024",
          "100642824",
          "-"
        ],
        [
          "2015/6/9",
          "5145.98",
          "5113.53",
          "-18.35",
          "-0.36%",
          "5042.96",
          "5147.45",
          "729893824",
          "115080864",
          "-"
        ],
        [
          "2015/6/8",
          "5045.69",
          "5131.88",
          "108.78",
          "2.17%",
          "4997.48",
          "5146.95",
          "855035072",
          "130992456",
          "-"
        ],
        [
          "2015/6/5",
          "5016.09",
          "5023.1",
          "75.99",
          "1.54%",
          "4898.07",
          "5051.63",
          "772240832",
          "123230064",
          "-"
        ],
        [
          "2015/6/4",
          "4912.95",
          "4947.1",
          "37.12",
          "0.76%",
          "4647.41",
          "4947.96",
          "674952384",
          "105227024",
          "-"
        ],
        [
          "2015/6/3",
          "4924.38",
          "4909.98",
          "-0.55",
          "-0.01%",
          "4822.44",
          "4942.06",
          "611453824",
          "101018000",
          "-"
        ],
        [
          "2015/6/2",
          "4844.7",
          "4910.53",
          "81.79",
          "1.69%",
          "4797.55",
          "4911.57",
          "623748096",
          "99874576",
          "-"
        ],
        [
          "2015/6/1",
          "4633.1",
          "4828.74",
          "216.99",
          "4.71%",
          "4615.23",
          "4829.5",
          "593389056",
          "93445544",
          "-"
        ],
        [
          "2015/5/29",
          "4603.47",
          "4611.74",
          "-8.52",
          "-0.18%",
          "4431.56",
          "4698.19",
          "611262400",
          "95536560",
          "-"
        ],
        [
          "2015/5/28",
          "4943.74",
          "4620.27",
          "-321.45",
          "-6.50%",
          "4614.24",
          "4986.5",
          "782964544",
          "124792600",
          "-"
        ],
        [
          "2015/5/27",
          "4932.85",
          "4941.71",
          "30.82",
          "0.63%",
          "4857.06",
          "4958.16",
          "681165376",
          "111626184",
          "-"
        ],
        [
          "2015/5/26",
          "4854.85",
          "4910.9",
          "97.1",
          "2.02%",
          "4779.08",
          "4911.69",
          "704892864",
          "113850936",
          "-"
        ],
        [
          "2015/5/25",
          "4660.08",
          "4813.8",
          "156.2",
          "3.35%",
          "4656.83",
          "4814.67",
          "682461376",
          "107929560",
          "-"
        ],
        [
          "2015/5/22",
          "4584.98",
          "4657.6",
          "128.17",
          "2.83%",
          "4562.99",
          "4658.27",
          "655591296",
          "100717320",
          "-"
        ],
        [
          "2015/5/21",
          "4456.44",
          "4529.42",
          "83.13",
          "1.87%",
          "4438.26",
          "4530.48",
          "464996512",
          "72908056",
          "-"
        ],
        [
          "2015/5/20",
          "4434.98",
          "4446.29",
          "28.74",
          "0.65%",
          "4432.28",
          "4520.54",
          "514106208",
          "80608056",
          "-"
        ],
        [
          "2015/5/19",
          "4285.78",
          "4417.55",
          "134.06",
          "3.13%",
          "4285.78",
          "4418.4",
          "436735232",
          "69381256",
          "-"
        ],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""]
      ].reverse();
      function calculateMA(dayCount, data) {
        var result = [];
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
      //日期
      var dates = rawData.map(function(item) {
        return item[0];
      });

      var data = rawData.map(function(item) {
        return [+item[1], +item[2], +item[5], +item[6]];
      });

      console.log(data, "data");
      console.log(dates, "data1");
      var option = {
        backgroundColor: "#21202D",
        legend: {
          data: ["日K", "MA5", "MA10", "MA20", "MA30"],
          inactiveColor: "#777",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
            type: "cross",
            lineStyle: {
              color: "#376df4",
              width: 2,
              opacity: 1
            }
          }
        },
        xAxis: {
          type: "category",
          data: dates,
          axisLine: { lineStyle: { color: "#8392A5" } }
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: "#8392A5" } },
          splitLine: { show: false }
        },
        grid: {
          // bottom: 80,
        },
        dataZoom: [
          // {
          //     textStyle: {
          //       color: "#8392A5"
          //     },
          //     handleIcon:
          //       "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          //     handleSize: "80%",
          //     dataBackground: {
          //       areaStyle: {
          //         color: "#8392A5"
          //       },
          //       lineStyle: {
          //         opacity: 0.8,
          //         color: "#8392A5"
          //       }
          //     },
          //     handleStyle: {
          //       color: "#fff",
          //       shadowBlur: 3,
          //       shadowColor: "rgba(0, 0, 0, 0.6)",
          //       shadowOffsetX: 2,
          //       shadowOffsetY: 2
          //     }
          // },
          {
            type: "inside"
          }
        ],
        animation: false,
        series: [
          {
            type: "candlestick",
            name: "日K",
            data: data,
            itemStyle: {
              color: "#FD1050",
              color0: "#0CF49B",
              borderColor: "#FD1050",
              borderColor0: "#0CF49B"
            }
          },
          {
            name: "MA5",
            type: "line",
            data: calculateMA(5, data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          },
          {
            name: "MA10",
            type: "line",
            data: calculateMA(10, data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          },
          {
            name: "MA20",
            type: "line",
            data: calculateMA(20, data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          },
          {
            name: "MA30",
            type: "line",
            data: calculateMA(30, data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          }
        ]
      };
      console.log(option.xAxis.data, "o");

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
         .post(
         api.ChartURL,{
              from: this.starttime ,
              to: this.endtime,
              type: this.bordertime,
              symbol: this.bordername
          }
        )
       
        .then(({ data }) => {
          console.log(data, "图标");
          // if (data.code === 0) {
            var datab = data.data;
            var arrall = [];
            var b = datab.map(item => {
              console.log(item,"999999999999999999")
              var open = item.open;
              var close = item.close;
              var lowest = item.low;
              var highest = item.high;
              var time = (item.timestamp) / 1000 - 7200;
              // console.log(time,"time")
              var arr = [open, close, lowest, highest, time];
              console.log(arr,"333")
              return arr;
            });
            dates = b.map(function(item) {
              return getNowFormatDate(new Date(item[4] * 1000));
            });
            data = b.map(function(item) {
              // console.log(item, "item");
              return [+item[0], +item[1], +item[2], +item[3]];
            });
            console.log(dates, "3");
            console.log(data, "4");
            console.log(getNowFormatDate(new Date(1586162580 * 1000)), "0");
            // data0 = splitData(b);
            // console.log(data0, "44444444444");
            option.xAxis.data = dates;
            option.series[0].data = data;
            option.series[1].data = calculateMA(5, data);
            option.series[2].data = calculateMA(10, data);
            option.series[3].data = calculateMA(20, data);
            option.series[4].data = calculateMA(30, data);
            myChart.setOption(option);
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
         this.setInterName = null
      this.setInterName = setInterval(() => {
        this.getdate();
        this.$http
           .post(
          api.ChartURL,{
              from: this.starttime ,
              to: this.endtime,
              type: this.bordertime,
              symbol: this.bordername
          }
        )
          .then(({ data }) => {
            if (data.code === 0) {
              // console.log(data, "sjb");
              var datac = data.data;
              var arrall = [];
              var c = datac.map(item => {
                // console.log(item,"999999999999999999")
                var opens = item.open;
                var closes = item.close;
                var lowests = item.low;
                var highests = item.high;
                var times = (item.timestamp) / 1000 - 7200;
                var arrs = [opens, closes, lowests, highests, times];
                // arrall.push(arr);
                console.log(arrs, "ac");
                return arrs;
              });
              dates = c.map(function(item) {
                return getNowFormatDate(new Date(item[4] * 1000));
              });

              data = c.map(function(item) {
                console.log(item, "item");
                return [+item[0], +item[1], +item[2], +item[3]];
              });
              option.xAxis.data = dates;
              option.series[0].data = data;
              option.series[1].data = calculateMA(5, data);
              option.series[2].data = calculateMA(10, data);
              option.series[3].data = calculateMA(20, data);
              option.series[4].data = calculateMA(30, data);
              myChart.setOption(option);
            } else {
              // Toast({
              //   message: "网络错误",
              //   duration: 1000
              // });
            }
          });
      }, 1000 * 60);
      myChart.setOption(option);
      resizeDom(echartss);
      // window.addEventListener("resize", () => {
      //   resizeDom(echartss); //重置div宽高度
      //   myChart.resize(); //重绘echart图表
      // });
    }
  }
};
</script>