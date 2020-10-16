<template>
  <div class="quttry">
    <loading v-show="LOADING"></loading>
    <div class="quttry-title">
      <van-icon name="arrow-left" color="#2b66c6" id="van-icon" @click="home" />
      <h2>{{$t('m.Withdraw')}}</h2>
    </div>
    <div class="usdt">
      <h5>{{$t('m.Currency')}}</h5>
      <p>USDT</p>
    </div>
    <div class="border"></div>
    <div class="usdt">
      <h5>{{$t('m.Chainname')}}</h5>
      <p @click="sheet">{{this.chain}}</p>
    </div>
    <div class="pickers">
 <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="$t('m.Cancel')"
      @cancel="onCancel"
      @select="onSelect"
    />
    </div>
   
    <div class="border"></div>
    <div class="usdt">
      <h5>{{$t('m.Withdrawaladdress')}}</h5>
       <input type="text" v-model="orderSn" @keyup="check">
    </div>
     <div class="border"></div>
    <div class="usdt">
      <h5>{{$t('m.Withdrawalquantity')}}</h5>
      
      <input type="text" :placeholder="$t(this.hold)" v-model="Amountmoney" @keyup="check">
    </div>
     <div class="border"></div>

    <div class="blance">
       <p>{{$t('m.Availablequantity')}}: </p> <span>{{balance}} USDT</span>
    </div>
     <div class="usdt">
      <h5>{{$t('m.Addressremarks')}}</h5>
   <input type="text">

      <!-- <input type="text" v-model="comment" > -->
    </div>
     <div class="border"></div>
    <div class="usdt">
      <h5>{{$t('m.Networkcharge')}}</h5>
      <p >{{charge}}</p>
      <!-- <input type="text" v-model="charge" > -->
    </div>
    <div class="tips">{{$t('m.Tips')}}</div>
    
    <div class="border1">
          <div class="button">
        <input type="button" :value="$t('m.Determine')" class="backblue" @click="apply" v-show="but===true">
        <input type="button" :value="$t('m.Determine')" class="back" v-show="but===false">
    </div>
    </div>
    <!-- <van-popup v-model="show2" :close-on-click-overlay="show3">
        <h3>请输入邮箱/短信验证码</h3>
        <input type="text">
        <div>
            <input type="button" value="取消">
            <input type="button" value="确认">
        </div>
    </van-popup> -->
        <div
      style="width:100%;height:100%;position:absolute;top:0;background:rgba(0,0,0,.5);"
      v-if="tip"
    >
    <div class="Recommendation">
        <div class="inputs">
       {{$t('m.Warning')}}{{Amountmoney - 5}}USDT
        </div>
        <div class="button">
          <button @click="close">{{$t('m.Cancellation')}}</button>
          <button @click="open2">OK</button>
        </div>
      </div>
  </div>
  </div>
</template>
<style scoped>
.pickers >>> .van-action-sheet {
  color: white;

}
.pickers >>> .van-action-sheet__cancel, .van-action-sheet__item 
{
  background: #262626;
}
.pickers >>>  .van-action-sheet__gap {
  background: #2d2e2a;
}
</style>
<style lang="scss" scoped>

.tips {
  text-align: center;
  // height: 0.666667rem;
  // line-height: 0.666667rem;
  color: red;
  padding-top:0.266667rem;
  font-size: 13px;
      background: #1e1e1e;

}
.back {
  background: #88befa;
}
.backblue {
  background:#127df6;
}

.quttry {
   width: 100%;
    height: 100%;
    position: fixed;
     background:#262626;
  .quttry-title {
    display: flex;
    align-items: center;
    height: 1.173333rem /* 88/75 */;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    background:#1e1e1e;
    border-bottom: 1px solid #565656;
    h2 {
      flex: 1;
      text-align: center;
      font-size: 0.493333rem /* 37/75 */;
          color: white;

    }
    #van-icon {
      width: 0.1rem;
      font-size: 0.56rem /* 42/75 */;
    }
  }
  .usdt {
    display: flex;
    height: 1.2rem /* 90/75 */;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    background:#1e1e1e;
    h5 {
      font-size: 0.426667rem /* 32/75 */;
          color: white;
    }
    p {
      font-size: 0.4rem /* 30/75 */;
      color: #666666;
    }
    input {
        text-align: end;
        width: 80%;
         font-size: 0.4rem /* 30/75 */;
      color: #666666;
    background:#1e1e1e;

    }
    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
         font-size: .32rem /* 24/75 */;
    color:#666666;
    
}
  }
  .border {
    height: 0.32rem /* 24/75 */;
    background: #2d2e2a;
  }
  .blance {
      width: 100%;
      height:1.333333rem /* 100/75 */;
      background: #1e1e1e;
      display: flex;
      padding-top: .266667rem /* 20/75 */;
     
      p {
          font-size: .32rem /* 24/75 */;
          color:#9f9f9f;
          padding-left: .32rem /* 24/75 */;

      }
      span {
          font-size: .32rem /* 24/75 */;
          color:#2e7bfd; 
      }
  }
  .border1 {
      padding-top: 0.8rem;
      background: #1e1e1e ;
  .button {
      padding-left: .32rem /* 24/75 */;
      padding-right: .32rem /* 24/75 */;
      input {
      height: 1.2rem /* 90/75 */;
      width: 100%;
      // background:#127df6 ;
      color: white;
      font-size: .373333rem /* 28/75 */;
      appearance: none;
      }
  }

  }
  
}
.Recommendation {
    width: 90%;
    height: 5.333333rem /* 400/75 */;
    // border: 1px solid red;
    border-radius: 6px;
    background: white;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .input,.inputs {
      text-align: center;
      margin-top: 1.3rem;
      input {
        width: 80%;
        height: 1rem /* 75/75 */;
        text-align: center;
        border: 1px solid #cfcccc;
        font-size: 13px;
        appearance: none;
      }
    }
    .inputs {
      font-size: 20px;
      line-height: 30px;
    }
    .button {
      margin-top: 1.333333rem /* 100/75 */;
      text-align: right;
      // margin-left: 1.8rem /* 200/75 */;
      width: 90%;
      button {
        width: 20%;
        height: 0.8rem /* 60/75 */;
        margin-left: 0.266667rem /* 20/75 */;
        appearance: none;
        border-radius: 4px;
        font-size: 14px;
      }
      :nth-child(1) {
        background: white;
        border: 1px solid #cfcccc;
      }
      :nth-child(2) {
        background: #2e7bfd;
        border: 1px solid #cfcccc;
        color: white;
      }
    }
  }
</style>
<script>
var api = require("../../api/api") ;
const Loading = () => import("../../components/Loading");
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      chain: "USDT-ERC20",
      show: false,
      but: false,
      actions: [{ name: "USDT-Omni" }, { name: "USDT-ERC20" }],
      hold:"m.Minimum",
      orderSn: "",
      Amountmoney:"",
      comment:"",
      charge:"5",
      tip:false,
      balance:localStorage.getItem("balance")
    };
  },
  created() {
    // this.$store.commit("hideLoading");

  },
   components: {
    Loading,
  },
   computed: {
    ...mapState(["LOADING"]),
  },
  methods: {
    onCancel() {
      this.show = false;
    },
    close() {
     this.tip = false
    },
   
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      if (item.name === "USDT-Omni") {
        this.chain = "USDT-Omni";
      } else if (item.name === "USDT-ERC20") {
        this.chain = "USDT-ERC20";
      }
      console.log(item);
    },
    sheet() {
      this.show = true;
    },
    home() {
      this.$router.push("/account");
    },
     check() {
      if (this.orderSn != "" && this.Amountmoney != "") {
        this.but = true;
      } else {
        this.but = false;
      }
    },
    apply() {
      console.log("99999")
          if(this.orderSn === "" || this.Amountmoney === "") {
        return
      } 
      if(this.Amountmoney < 20) {
        this.$toast(this.$t("m.Minimum"))
        return
      }
      this.tip = true
  
    },
    open2(){
        this.$store.commit("showLoading");
        // this.show2 = true
         this.userId = this.$store.state.user;
        this.login = this.$store.state.userId;
        this.bankAccountName = this.$store.state.accountName;
        console.log(this.userId, this.login, this.bankAccountName);
        this.$http
          .post(api.WithdrawURL, {
            userId: this.userId,
            account: this.login,
            //提币金额
            withdrawAmount: this.Amountmoney,
            //账户名称
            bankAccountName: this.bankAccountName,
            //提币地址
            bankAccountNumber: this.orderSn,
            bankName: this.chain
          })
          .then(({ data }) => {
    this.$store.commit("hideLoading");
            console.log(data, "aaa");
            this.tip = false
            if (data.mcode === "m0000000") {
            this.$toast(this.$toast(this.$t("m.Submitted")));
            this.$router.push("/account")
            } else if(data.mcode === "PUB_TASK_0000014") {
              this.$toast(this.$toast(this.$t("m.balancenot2")));
              // 可用余额不足
            } else if(data.mcode === "TA_ACCOUNT0000012") {
              this.$toast(this.$toast(this.$t("m.balancenot2")));
            }
          });

    }
  }
};
</script>