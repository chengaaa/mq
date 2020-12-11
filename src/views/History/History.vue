<template>
  <div id="app">
    <loading v-show="LOADING"></loading>
    <div class="page">
      <div class="h">
        <div class="history-header">
          <div class="left">
            <van-icon id="van-icon" name="arrow-left" color="#c9c9c9" @click="back" />
          </div>
          <div class="right-left">
            <span :class="{blue, white}" @click="Orders('Orders')">{{$t('m.Orders')}}</span>
            <span :class="{blue1, white1}" @click="Deals('Deals')">{{$t('m.Deals')}}</span>
          </div>
          <div class="right-right">
            <router-link class="iconfont" tag="div" :to="'/history-time/' + this.params">&#xe608;</router-link>
          </div>
        </div>
      </div>
      <div v-show="page1" class="con">
        <div v-for="(item, index) in arrList" :key="index">
          <div class="border">
            <div @click="open(index)">
              <div class="top">
                <div class="top1">
                  <h4>{{item.symbol}},</h4>
                  <span
                    :class="{'hong':item.orderDirection == -1,'lan': item.orderDirection == 1 }"
                  >{{item.orderDirection == -1? "sell":"buy"}}</span>
                </div>
                <h5>{{item.dateTime.split('-').join(".").replace("T"," ").replace("Z","").substring(0,19)}}</h5>
              </div>
              <div class="bot">
                <p>{{item.volume.toFixed(2)}} / {{(item.volume + item.remainingVolume).toFixed(2)}} at {{item.orderPrice}}</p>
                <span v-if="item.orderStatus === 11">filled</span>
                <span v-else-if="item.orderStatus === 7">canceled</span>
                <span v-else-if="item.orderStatus === 17">expired</span>
                <span v-else>placed</span>
              </div>
            </div>
            <div class="history-deail" v-show="index === openIndex">
              <div class="deail-left">
                <div class="deail-left1">
                  <p>S/L:</p>
                  <span>{{item.stopLoss == 0? "-":item.stopLoss}}</span>
                </div>
                <div class="deail-left2">
                  <p>T/P:</p>
                  <span>{{item.takeProfit == 0? "-":item.takeProfit}}</span>
                </div>
              </div>
              <div class="deail-right">
                <h5>#{{item.orderID}}</h5>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div class="fixed">
          <div class="fixed-flex">
            <h2>{{$t('m.Filled')}}</h2>
            <span>{{flied?flied:"0"}}</span>
          </div>
          <div class="fixed-flex">
            <h2>{{$t('m.Canceled')}}</h2>
            <span>{{canceled? canceled:"0"}}</span>
          </div>
          <div class="fixed-flex">
            <h2>{{$t('m.Total')}}</h2>
            <span>{{sum?sum:"0"}}</span>
          </div>
          <div></div>
        </div>
      </div>
      <div v-show="page2" class="con">
        <div v-for="(item, index) in dealList" :key="index">
          <div class="border">
            <div @click="open(index)">
              <div class="top">
                <div class="top1" v-show="item.symbol !='' ">
                  <h4>{{item.symbol?item.symbol:"买入"}},</h4>
                  <span
                    :class="{'hong':item.orderDirection == -1,'lan': item.orderDirection == 1 }"
                  >{{item.orderDirection == -1? "sell,out":"buy,in"}}</span>
                </div>
                <div class="top1" v-show="item.symbol ==='' ">
                  <h4 class="padding">{{item.comment.indexOf("d-") === 0 || item.comment.indexOf("Deposit") === 0?$t('m.Depo'):""}}</h4>
                  <h4 class="padding">{{item.comment.indexOf("w-") === 0 || item.comment.indexOf("Withdrawal") === 0?$t('m.Withdraws'):""}}</h4>
                  <h4 class="padding">{{item.comment.indexOf("Credit out") === 0?$t('m.CreditWithdraws'):""}}</h4>
                  <h4 class="padding">{{item.comment.indexOf("Credit in") === 0?$t('m.CreditDeposits'):""}}</h4>
                  <h4 class="padding">{{item.comment.indexOf("commission") === 0?$t('m.Commission'):""}}</h4>
                </div>
                <h5>{{item.dateTime.split('-').join(".").replace("T"," ").replace("Z","").substring(0,19)}}</h5>
              </div>
              <div class="bot">
                <p v-show="item.symbol !=''">{{item.volume.toFixed(2)}} at {{item.price}}</p>
                <p v-show="item.symbol ===''"></p>
                <span
                  :class="{'hong': item.pnl < 0,'lan': item.pnl > 0}"
                >{{item.pnl == 0? '':item.pnl}}</span>
              </div>
            </div>
            <div class="history-deail" v-show="index === openIndex">
              <div class="deail-left">
                <div class="deail-left1">
                  <p>Deal:</p>
                  <span>{{item.executionId}}</span>
                </div>
                <div class="deail-left2">
                  <p>Order:</p>
                  <span>{{item.positionId}}</span>
                </div>
              </div>
              <div class="order-right">
                <div class="order-left1">
                  <p>Swap:</p>
                  <span>{{item.swap}}</span>
                </div>
                <div class="order-left2">
                  <p>Charges:</p>
                  <span v-show="!item.commission">-</span>
                  <span v-show="item.commission">{{item.commission}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed2">
         
            <div class="fixed2-flex">
              <h3>{{$t('m.Deposit')}}</h3>
              <p>{{deposit?(deposit).toFixed(2):"0.00"}}</p>
            </div>
            <div class="fixed2-flex">
              <h3>{{$t('m.Profit')}}</h3>
              <p>{{pnlsum?(pnlsum).toFixed(2):"0.00"}}</p>
            </div>
            <div class="fixed2-flex">
              <h3>{{$t('m.Swap')}}</h3>
              <p>{{kucun?(kucun).toFixed(2):"0.00"}}</p>
            </div>
            <div class="fixed2-flex">
              <h3>{{$t('m.Commission')}}</h3>
              <p>0.00</p>
            </div>
            <div class="fixed2-flex">
              <h3>{{$t('m.balance')}}</h3>
              <p v-show="balance">{{balance}}</p>
              <p v-show="balance === ''">0.00</p>
            </div>
          
          
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page {
   width: 100%;
  height: 100%;
  position: fixed;
  background: #262626;
  overflow: auto;
}
.padding {
  padding-top:.133333rem /* 10/75 */;
}
.con {
  padding-top: 1.2rem /* 90/75 */;
}
.hong {
  color: #e54440;
}
.lan {
  color: #3278fe;
}
// .fixed {
//   width: 100%;
//   height: 1.466667rem;
//   background: white;
//   display: flex;
//   -webkit-box-pack: justify;
//   -ms-flex-pack: justify;
//   justify-content: space-between;
//   padding-bottom: 1.5rem;
//   padding-top: 0.35rem;
//  color:#333333;
//      font-family: 'Sans Serif';
//   h2 {
//     padding-left: 0.133333rem /* 10/75 */;
//     margin-bottom: 0.173333rem /* 13/75 */;
//       font-size:.4rem /* 30/75 */;
//       color:#797979;
//   }
//   p {
//     padding-right: 0.133333rem /* 10/75 */;
//     margin-bottom: 0.173333rem /* 13/75 */;
//     font-size:.4rem /* 30/75 */;
//   }
// }
.fixed {
  padding-left: 0.13rem;
  padding-right: 0.13rem;
  .fixed-flex {
    display: flex;
    justify-content: space-between;
    height: 1.066667rem /* 80/75 */;
    align-items: center;
    border-bottom: 0.013333rem /* 1/75 */ solid #565656;
    h2 {
      font-size: 18px;
      color: #c9c9c9;
    }
    span {
      font-size: 20px;
      color: white;
      font-weight: 700;
    }
  }
}


.fixed2 {
  padding-left: 0.13rem;
  padding-right: 0.13rem;
  .fixed2-flex {
    display: flex;
    justify-content: space-between;
    height: 1.066667rem /* 80/75 */;
    align-items: center;
    border-bottom: 0.013333rem /* 1/75 */ solid #565656;
    h3 {
      font-size: 18px;
      color: #c9c9c9;
    }
    p {
      font-size: 20px;
      color: white;
      font-weight: 700;
    }
  }
}
// .fixed2 {
//   width: 100%;
//   height: 4rem;
//   background: white;
//   display: -webkit-box;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-box-pack: justify;
//   -ms-flex-pack: justify;
//   justify-content: space-between;
//   padding: 0.133333rem 0rem;
//   color:#333333;
//      font-family: 'Sans Serif';
//   h3,
//   p {
//     margin-bottom: 0.133333rem /* 10/75 */;
//     font-size: .4rem /* 30/75 */;
//   }
//   h3 {
//     padding-left: 0.133333rem /* 10/75 */;
//     color:#797979;
//   }
//   p {
//     padding-right: 0.133333rem /* 10/75 */;
//   }
// }
.iconfont {
  font-size: 0.533333rem /* 40/75 */;
  color: #c9c9c9;
}
.page {
  .h {
    position: fixed;
    width: 100%;
    // background: white;
    .history-header {
      display: flex;
      justify-content: space-between;
      padding: 0.266667rem /* 20/75 */ 0.266667rem /* 20/75 */ 0.266667rem
        /* 20/75 */ 0.01rem;
            background: #262626;
      .van-icon {
        font-size: 0.733333rem;
        width: 40%;
      }
      .right-left {
        span {
          display: inline-block;
          width: 1.333333rem /* 100/75 */;
          height: 0.666667rem /* 50/75 */;
          line-height: 0.666667rem /* 50/75 */;
          font-size: 0.333333rem /* 25/75 */;
          text-align: center;
          border: 1px solid #c9c9c9;
          font-family: "Tahoma", "Sans Serif";
        }
      }
    }
  }
  .border {
    line-height: 0.43rem /* 30/75 */;
    padding: 0.133333rem /* 10/75 */ 0.133333rem /* 10/75 */;
    border: 0.013333rem /* 1/75 */ solid #565656;
    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.133333rem /* 10/75 */;
      font-family: "Sans Serif";
      h5 {
        font-size: 13px;
        // font-weight: 700;
        color: #4c4c4c;
        font-family: "Sans Serif";
      }
      .top1 {
        display: flex;
        h4 {
          font-size:18px;
          font-weight: 700;
          color: #c9c9c9;
          // font-family: pingfang;
        }
        span {
          font-size:17px;
          font-weight: 700;
        }
      
      }
    }
    .bot {
      display: flex;
      justify-content: space-between;
      font-family: "Tahoma", "Sans Serif";
      p {
        font-size: 0.32rem /* 24/75 */;
        color: #4c4c4c;
      }
      span {
        font-size: 19px;
        color: #c9c9c9;
      }
    }
  }
}
.history-deail {
  padding-top: 0.533333rem /* 40/75 */;
  display: flex;
  justify-content: space-between;
  font-family: "Tahoma", "Sans Serif";
  .deail-left {
    width: 30%;
    padding-top: 0.133333rem /* 10/75 */;
    p {
      color: #c6c5ca;
      font-size: 0.32rem /* 24/75 */;
    }
    span {
      font-size: 0.32rem /* 24/75 */;
    }
    .deail-left1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.133333rem /* 10/75 */;
    }
    .deail-left2 {
      display: flex;
      justify-content: space-between;
    }
  }
  .deail-right {
    padding-top: 0.666667rem /* 50/75 */;
    h5 {
      font-size: 0.346667rem /* 26/75 */;
    }
  }
}
.order-right {
  width: 35%;
  .order-left1,
  .order-left2 {
    display: flex;
    justify-content: space-between;
    p,
    span {
      font-size: 0.346667rem /* 26/75 */;
      color: #c6c5ca;
    }
    span {
      color: #000000;
    }
  }
}

.blue {
  background: #4669ff;
  color: white;
}
.white {
  background: #262626;
  color: #c9c9c9;
}
.blue1 {
  background: #4669ff;
  color: white;
}
.white1 {
  background: #262626;
  color: #c9c9c9;
}
</style>
<script>
import { getNowFormatDate, getUTCtime, getCNAtime,isDayLightSaving } from "../../tools/check.js";
import { FormatDate } from "../../tools/check.js";
const Loading = () => import("../../components/Loading");
import { mapState } from "vuex";
var api = require("../../api/api");
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
      params: "Orders",
      arrList: [],
      arrLists: [],
      dealList: [],
      flied: null,
      canceled: null,
      sum: null,
      openIndex: -1,
      pnlsum: null,
      kucun: null,
      deposit: null,
      balance: "",
      //时区差
      difference:"",
      //跟服务器时间差
      diftimer:""
     
    };
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(["LOADING"])
  },
  created() {
    // this.isDayLightSaving()
    // this.getdifference()
       this.isDay()
    this.getdate();
    this.getList();
    this.getdealsList();
    this.getAccount();
  },
  methods: {
    back() {
      this.$router.push("/account");
    },
    Orders(O) {
      (this.blue = true), (this.white = false);
      this.white1 = true;
      (this.page2 = false), (this.page1 = true);
      this.params = O;
    },
    Deals(D) {
      (this.blue1 = true), (this.white1 = false);
      this.white = true;
      (this.page2 = true), (this.page1 = false);
      this.params = D;
    },
      isDay() {
        if(isDayLightSaving(new Date())) {
               this.diftimer = 2
        } else {
               this.diftimer = 1

        }
      },
   
  //  isDayLightSaving(){
  //       let date = new Date();
  //       console.log(date,"========现在的时间");
  //       let parisDateString = date.toLocaleTimeString("en-US", {
  //           timeZone: "Europe/Paris"
  //       });
  //       let utcDateString = date.toLocaleTimeString("en-US", {timeZone: "UTC"});
  //       console.log(parisDateString,"========paris分割");
  //       console.log(utcDateString,"========utc时间分割");
  //       let parisArr = parisDateString.split(" ");
  //       let utcArr = utcDateString.split(" ");
  //       let parisHour = Number(parisArr[0].split(":")[0]) ;
  //       let utcHour = Number(utcArr[0].split(":")[0]);
  //       console.log(parisHour,parisArr,"========法分割");
  //       console.log(utcHour,utcArr,"========utc分割");
  //       if (parisHour > utcHour){
  //           if (parisHour == utcHour+2){
  //             //是夏令时
  //              this.difference = -(new Date().getTimezoneOffset() /60) 
  //              this.diftimer = 2
  //              console.log( this.difference,this.diftimer,"王哈哈哈")
  //               // return true
  //           }else{
  //               this.difference = -(new Date().getTimezoneOffset() /60) 
  //               this.diftimer = 1
  //              console.log( this.difference,this.diftimer,"李哈哈哈")

  //           }
  //       }else{
  //           if (parisHour+12 == utcHour+2){
  //             //夏令时
  //              this.difference = -(new Date().getTimezoneOffset() /60) 
  //              this.diftimer = 2
  //              console.log( this.difference,this.diftimer,"张哈哈哈")

  //               // return true
  //           }else{
  //              this.difference = -(new Date().getTimezoneOffset() /60) 
  //               this.diftimer = 1
  //              console.log( this.difference,this.diftimer,"周哈哈哈")

  //           }
  //       }
  //   // console.log(isDayLightSaving(),"========最后分割")
  //   },



    //获取时区差
    // getdifference() {
    // var d1 = new Date(2009, 0, 1);
    // var d2 = new Date(2009, 6, 1);
		// if (d1.getTimezoneOffset() != d2.getTimezoneOffset())
		// {
    //   alert('夏令时'); //夏令时z
    //   this.difference = -(new Date().getTimezoneOffset() /60) 
    //   this.diftimer = 2
    //   console.log( this.difference)
		// }
		// else
		// {
    //   console.log(-new Date().getTimezoneOffset() /60,"怎么回事")
    //  this.difference = -(new Date().getTimezoneOffset() /60) - 6
    //   this.diftimer = 1
    //   console.log( this.difference,"我也不知道")
    //   // alert(Intl.DateTimeFormat().resolvedOptions().timeZone); //非夏令时
    // }
    //   // var num = (new Date().getTimezoneOffset() /60) + 10


    // },
  
    getdate() {
      //结束时间
      // var num = (new Date().getTimezoneOffset() /60) + 10
      // console.log(num,"en")
   
      var date1 = new Date(new Date().setHours(new Date().getHours() + this.diftimer));
    //  var data1 =  new Date() + this.difference
      this.date = getUTCtime(date1);
    },
    //  getdate() {
    //   //结束时间
    //   var date1 = new Date(new Date().setHours(new Date().getHours() + 2));
    //   this.date = getUTCtime(date1);
    // },
    getWeekdate() {
      this.newdate = new Date(new Date().setDate(new Date().getDate() - 7));
      this.newdate = new Date(this.newdate.setHours(new Date().getHours() + this.diftimer));
      this.Monthdate = getUTCtime(this.newdate);
    },
    getList() {
      (this.flied = null), (this.canceled = null), (this.sum = null);
      if (this.$route.params.begin) {
        this.Monthdate = this.$route.params.begin;
      } else {
        this.getWeekdate();
      }
      this.$store.commit("showLoading");
      this.$http
        .get(api.Historyorders + this.Monthdate + "&to=" + this.date)
        .then(({ data }) => {
          if (data.code === 0) {
            this.$store.commit("hideLoading");
            this.arrLists = data.data;
            this.arrListreg();
            this.splices2();
            this.list();
          }
        });
    },
    arrListreg() {
      this.arrList = this.arrLists.reverse();
      for (var i in this.arrList) {
          if(isDayLightSaving(new Date(this.arrList[i].dateTime))) {
               this.diftimer = 2
        } else {
               this.diftimer = 1
        }
        this.arrList[i].dateTime = 
          new Date(this.arrList[i].dateTime).getTime()
         this.arrList[i].dateTime = (this.arrList[i].dateTime) - this.diftimer *60*60*1000 ;
         this.arrList[i].dateTime = new Date(this.arrList[i].dateTime)
        this.arrList[i].dateTime = moment(this.arrList[i].dateTime)
        //   // .subtract(this.diftimer, "h")
          .format();
      }
    },
    getAccount() {
      this.$http.get(api.AccountURL).then(({ data }) => {
        this.balance = data.data.balance;
      });
    },
    list() {
      this.arrList.forEach(item => {
        if (item.orderStatus === 11) {
          this.flied += 1;
        } else if (item.orderStatus === 7) {
          this.canceled += 1;
        }
        if (item.symbol) {
          this.sum += 1;
        }
      });
    },
    getdealsList() {
      this.pnlsum = null;
      this.kucun = null;
      this.deposit = null;
      if (this.$route.params.begin) {
        this.Monthdate = this.$route.params.begin;
      } else {
        this.getWeekdate();
      }
      this.$http
        .get(api.Historyexecutions + this.Monthdate + "&to=" + this.date)
        .then(({ data }) => {
          if (data.code === 0) {
            this.dealList = data.data;
            this.dealListreg();
            this.splices();
            this.executionsList();
          }
        })
        .catch(error => {
          if (error.status === 403) {
            this.$router.push("/apply");
          }
        });
    },
    executionsList() {
      this.dealList.forEach(item => {
        if (item.symbol === "") {
          if (item.comment) {
            this.deposit += JSON.parse(item.pnl);
          }
        } else {
          this.kucun += JSON.parse(item.swap);
          this.pnlsum += JSON.parse(item.pnl);
        }
      });
    },
    dealListreg() {
       this.dealList = this.dealList.reverse();
      for (var i in this.dealList) {
          if(isDayLightSaving(new Date(this.dealList[i].dateTime))) {
               this.diftimer = 2
        } else {
               this.diftimer = 1
        }
        this.dealList[i].dateTime = 
          new Date(this.dealList[i].dateTime).getTime()
         this.dealList[i].dateTime = (this.dealList[i].dateTime) - this.diftimer *60*60*1000 ;
         this.dealList[i].dateTime = new Date(this.dealList[i].dateTime)
        this.dealList[i].dateTime = moment(this.dealList[i].dateTime)
        //   // .subtract(this.diftimer, "h")
          .format();
      }
    },
    //去除dealList symbol的点
    splices() {
      for (let i = 0; i < this.dealList.length; i++) {
        this.dealList[i].symbol = this.dealList[i].symbol.replace(/\./, "");
        this.dealList = this.dealList;
      }
    },
    //去除arrList symbol的点
    splices2() {
      for (let i = 0; i < this.arrList.length; i++) {
        this.arrList[i].symbol = this.arrList[i].symbol.replace(/\./, "");
        this.arrList = this.arrList;
      }
    },

    open(index) {
      if (this.openIndex === null) {
        this.openIndex = index;
      } else {
        this.openIndex = null;
      }
    }
  },
  watch: {}
};
</script>