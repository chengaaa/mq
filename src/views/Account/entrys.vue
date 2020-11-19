<template>
  <div class="entry">
    <div class="entry-title">
      <van-icon name="arrow-left" color="#2e7bfd" id="van-icon" @click="home" />
      <h2>{{$t('m.Deposit')}}</h2>
    </div>
    <div class="usdt">
      <p>{{$t('m.Currency')}}</p>
      <p>USDT</p>
    </div>
    <div class="border"></div>
    <div class="usdt">
      <p>{{$t('m.Chainname')}}</p>
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
    <div class="text">
 <p>{{$t('m.Pleasese')}}<span style="color: #dc5d56;fontWeight:700;fontSize:18px"> {{depositAmount}}USDT </span>{{$t('m.Pleasese2')}}</p>
        <p style="color: #dc5d56">{{$t('m.For')}}</p>
        <!-- <p style="color:red">入数量</p> -->
    </div>
       
    <div class="erweima">
      <img v-if="chain === 'USDT-ERC20'" src="../../assets/image/chongzhiERC20.jpg" alt />
      <img v-if="chain === 'USDT-Omni'" src="../../assets/image/chongzhiOmni.jpg" alt />
    </div>
    <div class="address">
      <h5>{{$t('m.Chargingaddress')}}</h5>
      <p v-if="chain === 'USDT-ERC20'">{{this.orderData.orderERC20}}</p>
      <p v-if="chain === 'USDT-Omni'">{{this.orderData.orderOmni}}</p>
      <input
        type="button"
        :value="$t('m.Copyaddress')"
        class="cobyOrderSn"
        data-clipboard-action="copy"
        :data-clipboard-text="chain === 'USDT-ERC20'? orderData.orderERC20:orderData.orderOmni"
        @click="copyLink"
      />
    </div>
    <div class="deail" v-if="language === 'zh-CN'">
      <p style="padding:0px 10px 0px 10px">您只能向此地址充值 {{this.chain}},其他资产充入 {{this.chain}}地址将无法找回</p>
      <p v-if="this.chain === 'USDT-ERC20'">使用 {{this.chain}} 地址充值需要</p>
      <p v-if="this.chain === 'USDT-ERC20'">12个网络确认才能到账</p>
    </div>

    <div class="deail" v-else-if="language === 'en-US'">
      <p>You can only deposit {{this.chain}} to this address; other assets sent cannot be retrieved.</p>
      <p v-if="this.chain === 'USDT-ERC20'"> Depositing via {{this.chain}} requires</p>
      <p v-if="this.chain === 'USDT-ERC20'">12 network confirmations before we can credit your account balance</p>
    </div>
    <div class="deail" v-else>
      <p>您只能向此地址充值 {{this.chain}},其他資產充入 {{this.chain}}地址將無法找回</p>
      <p v-if="this.chain === 'USDT-ERC20'" >使用 {{this.chain}} 地址充值需要</p>
      <p v-if="this.chain === 'USDT-ERC20'">12個網絡確認才能到賬</p>
    </div>
    <!-- <div class="numbers">
      <h2>{{$t('m.Rechargequantity')}}</h2>
      <input type="number" v-model="depositAmount" />
      <span>USDT</span>
    </div> -->
    <!-- <div class="tell">
      <span>{{$t('m.Recharging')}}</span>
    </div> -->
    <div class="button">
      <input type="button" :value="$t('m.Recharged')" @click="recharge" v-show="yes" />
      <input type="button" :value="$t('m.Recharged')" v-show="!yes" />
    </div>
    <Toastss v-show="isPopupVisible" :routerData="routerData" :routerData2="routerData2"></Toastss>
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
.picker >>> .van-popup {
  background: #262626;
}
</style>
<style lang="scss" scoped>
.entry {
  background: #1e1e1e;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .entry-title {
    display: flex;
    align-items: center;
    height: 1.173333rem /* 88/75 */;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    border-bottom: 1px solid #565656;
    h2 {
      flex: 1;
      text-align: center;
      font-size: 0.493333rem /* 37/75 */;
      color: #ffffff;
    }
    #van-icon {
      width: 0.1rem;
      font-size: 0.56rem /* 42/75 */;
    }
  }
  .usdt {
    display: flex;
    height: .933333rem /* 70/75 */;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    font-size: 0.453333rem /* 34/75 */;
    :nth-child(1) {
      color: #ececec;

    }
     :nth-child(2) {
      color: #6f6f6f;
      
    }
  }
  .border {
    height: 5px;
    background: #2d2e2a;
  }
  .erweima {
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 2.573333rem /* 193/75 */;
      height: 2.573333rem;
    }
  }
  .text {
    height: 1.733333rem /* 130/75 */;
    text-align: center;
    line-height: .533333rem /* 40/75 */;
    // background: aqua;
    padding-top: .2rem /* 15/75 */;
    // padding-bottom: .2rem /* 15/75 */;
    padding-left: .2rem /* 15/75 */;
    padding-right: .2rem /* 15/75 */;
    font-size: 14px;
    p {
      color: #ffffff;
    }
  }
  .address {
    text-align: center;
    padding-right: 0.32rem /* 24/75 */;
    padding-left: 0.32rem /* 24/75 */;
    h5 {
      font-size: 0.373333rem /* 28/75 */;
      color: #757575;
      margin-bottom: 10px;
    }
    p {
      font-size: 0.346667rem /* 26/75 */;
      margin-bottom:10px;
      color: #ffffff;
    }
    input {
      appearance: none;
      width: 100%;
      height: 1.226667rem /* 92/75 */;
      border: 1px solid #367ce5;
      color: #367ce5;
      background: #1e1e1e;
      font-size: 0.4rem /* 30/75 */;
      border-radius: 3px;
    }
  }
  .deail {
    margin-top: 0.2rem /* 15/75 */;
    margin-bottom: 0.533333rem /* 40/75 */;
    text-align: center;
    line-height: 0.533333rem /* 40/75 */;
    color: #656565;
    font-size: 0.32rem /* 24/75 */;
  }
  .numbers {
    height: 0.693333rem /* 52/75 */;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.32rem /* 24/75 */;
    margin-bottom: 0.533333rem /* 40/75 */;
    h2 {
      width: 25%;
      font-size: 0.346667rem /* 26/75 */;
      text-align: center;
    }
    input {
      width: 60%;
      border: 1px solid #999999;
      height: 0.693333rem /* 52/75 */;
      border-radius: 3px;
      font-size: 0.346667rem /* 26/75 */;
      appearance: none;
    }
    span {
      width: 10%;
    }
  }
  .tell {
    text-align: center;
    // color: red;
    font-size: 0.32rem /* 24/75 */;
    margin-bottom: 0.613333rem /* 46/75 */;
  }
  .button {
    text-align: center;
    height: .666667rem /* 50/75 */;
    input {
      appearance: none;
      width: 4rem /* 300/75 */;
      height: 1.093333rem /* 82/75 */;
      border-radius: 3px;
      background: #2e7bfd;
      color: white;
      font-size: 0.373333rem /* 28/75 */;
      // position: fixed;
      // bottom: 0px;
      // left: 0px;
    }
  }
}
</style>
<script>
const Toastss = () => import("../../components/Toastss.vue");
var api = require("../../api/api");
export default {
  components: {
    Toastss
  },
  data() {
    return {
    nums:"",
      show: false,
      chain: "USDT-ERC20",
      depositAmount: "",
      yes: true,
      b: true,
      isPopupVisible: false,
      routerData: "m.Submitted",
      routerData2: "m.Explain",
      actions: [{ name: "USDT-Omni" }, { name: "USDT-ERC20" }],
      language: localStorage.getItem("lang"),
      orderData: {
        orderERC20: "0x7e993Daa2ED89C672Db4CE3Dc54A96e2Ee469Bec",
        orderOmni: "17awb5V6kSZ8vk6CguycwNrYb4fya9futR"
      }
    };
  },
  created() {
 var rand =  this.getRandomInt(0.01,0.5)
//  this.depositAmount =Number(this.$route.params.id)
this.depositAmount =Number((Number(this.$route.params.id) + Number(rand)).toFixed(2))
  console.log(this.depositAmount,"this.depositAmount")
  },
  methods: {
    onCancel() {
      this.show = false;
    },
     getRandomInt(min,max){
    return (Math.random()*(max-min+0.01)+min) 
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
    },
    sheet() {
      this.show = true;
    },
    home() {
      this.$router.push("/entry");
    },
    copyLink() {
      let _this = this;
      let clipboard = new this.clipboard(".cobyOrderSn");
      clipboard.on("success", function() {
        if (_this.b) {
          _this.$toast(_this.$t("m.Replicationsuccess"));
          _this.b = false;
          setTimeout(() => {
            _this.b = true;
            clipboard.destroy();
          }, 1000);
        }
      });
      clipboard.on("error", function() {
        _this.$toast(_this.$t("m.copyfailed"));
      });
    },
    recharge() {
      this.userId = this.$store.state.user;
      this.login = this.$store.state.userId;
      this.accountName = this.$store.state.accountName;
      this.depositAmount = Number(this.depositAmount).toFixed(2);
      this.$http
        .post(api.DepositURL, {
          userId: this.userId,
          account: this.login,
          depositAmount: this.depositAmount,
          // payCurrency: "USD",
          comment: this.accountName + " deposit " + this.depositAmount +" " + this.chain
        })
        .then(({ data }) => {
          if (data.mcode === "m0000000") {
            this.isPopupVisible = true;
            this.yes = false;
          } else if (data.mcode === "TA_ACCOUNT0000047") {
            this.$toast(this.$t("m.Invalid"));
          }
        });
    }
  }
};
</script>
