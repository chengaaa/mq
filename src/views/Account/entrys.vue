<template>
  <div class="entry">
    <div class="entry-title">
      <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home" />
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
      <van-action-sheet
  v-model="show"
  :actions="actions"
  :cancel-text="$t('m.Cancel')"
  @cancel="onCancel"
  @select="onSelect"
/>
 <div class="border"></div>
 <div class="erweima">
     <img v-if="chain === 'USDT-ERC20'" src="../../assets/image/chongzhiERC20.jpg" alt="">
     <img v-if="chain === 'USDT-Omni'" src="../../assets/image/chongzhiOmni.jpg" alt="">
 </div>
 <div class="address">
     <h5>{{$t('m.Chargingaddress')}}</h5>
     <p v-if="chain === 'USDT-ERC20'">{{this.orderData.orderERC20}}</p>
     <p v-if="chain === 'USDT-Omni'">{{this.orderData.orderOmni}}</p>
     <input type="button" :value="$t('m.Copyaddress')" class="cobyOrderSn" data-clipboard-action="copy"  :data-clipboard-text="orderData.orderSn" @click="copyLink">
 </div>
 <div class="deail" v-if="language === 'zh-CN'">
     <p>您只能向此地址充值 {{this.chain}},其他资产充入 {{this.chain}}</p>
     <p>地址将无法找回,使用 {{this.chain}} 地址充值需要</p>
     <p>12个网络确认才能到账</p>
 </div>
 
  <div class="deail" v-else-if="language === 'en-US'">
     <p>  You can only deposit {{this.chain}} to this address; other assets sent cannot be retrieved. Depositing via {{this.chain}}  requires</p>
     <p></p>
     <p>12 network confirmations before we can credit your account balance</p>
 </div>
  <div class="deail" v-else>
     <p>您只能向此地址充值 {{this.chain}},其他資產充入 {{this.chain}}</p>
     <p>地址將無法找回,使用 {{this.chain}} 地址充值需要</p>
     <p>12個網絡確認才能到賬</p>
 </div>
 <div class="numbers">
     <h2>{{$t('m.Rechargequantity')}}</h2>
     <input type="number" v-model="depositAmount">
     <span>USDT</span>
 </div>
 <div class="tell">
     <span>{{$t('m.Recharging')}}</span>
 </div>
 <div class="button">
     <input type="button" :value="$t('m.Recharged')" @click="recharge" v-show="yes">
     <input type="button" :value="$t('m.Recharged')" v-show="!yes">
 </div>
<Toastss v-show="isPopupVisible" :routerData="routerData" :routerData2 ="routerData2"></Toastss>

  </div>
  
</template>
<style lang="scss" scoped>
.entry {
  
  
  .entry-title {
    display: flex;
    align-items: center;
    height: 1.173333rem /* 88/75 */;
       padding-left: 0.32rem /* 24/75 */;
  padding-right: 0.32rem /* 24/75 */;
    h2 {
      flex: 1;
      text-align: center;
      font-size: .493333rem /* 37/75 */;
      color: #333333;
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
  font-size: .453333rem /* 34/75 */;
  }
  .border {
    height:.32rem /* 24/75 */;
    background: #f5f5f5;
  }
  .erweima {
      height: 5.386667rem /* 404/75 */;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
          width:3.946667rem /* 296/75 */;
          height: 3.906667rem /* 293/75 */;
      }
  }
  .address {
      text-align: center;
       padding-right: .32rem /* 24/75 */;
          padding-left: .32rem /* 24/75 */ ;
      h5 {
          font-size: .373333rem /* 28/75 */;
          color:#666666;
          margin-bottom: .506667rem /* 38/75 */;
      }
      p {
          font-size: .346667rem /* 26/75 */;
          margin-bottom: .453333rem /* 34/75 */;
          
      }
      input {
          appearance: none;
          width:100%;
          height: 1.226667rem /* 92/75 */;
          border: 1px solid #127df6;
          color:#127df6;
          background: white;
          font-size: .4rem /* 30/75 */;
          border-radius: 3px;
         
      }
  }
  .deail {
      margin-top:.2rem /* 15/75 */;
      margin-bottom:.533333rem /* 40/75 */;
      text-align: center;
      line-height: .533333rem /* 40/75 */;
      color: #acacac;
      font-size: .32rem /* 24/75 */;
  }
  .numbers {
      height: .693333rem /* 52/75 */;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: .32rem /* 24/75 */;
      margin-bottom:.533333rem /* 40/75 */;
      h2 {
          width: 25%;
          font-size: .346667rem /* 26/75 */;
          text-align: center;
      }
      input {
          width: 60%;
          border: 1px solid #999999; height: .693333rem /* 52/75 */;
          border-radius: 3px;
          font-size: .346667rem /* 26/75 */;
          appearance: none;
      }
      span {
          width: 10%;
      }
  }
  .tell {
      text-align: center;
      color: red;
      font-size: .32rem /* 24/75 */;
      margin-bottom: .613333rem /* 46/75 */;
  }
  .button {
      text-align: center;
      height:3.2rem /* 90/75 */;
      input {
          appearance: none;
          width: 4rem /* 300/75 */;
          height: 1.093333rem /* 82/75 */;
          border-radius: 3px;
          background: #127df6;
          color: white;
          font-size:.373333rem /* 28/75 */;
      }
  }
}
</style>
<script>
const Toastss = ()=>import("../../components/Toastss.vue");
var api = require("../../api/api")
export default {
    components:{
Toastss
    },
      data() {
    return {
      show: false,
      chain:"USDT-ERC20",
      depositAmount:"",
      yes:true,
      isPopupVisible:false,
       routerData:"m.Submitted",
     routerData2:"m.Explain",
        actions: [
        { name: 'USDT-Omni' },
        { name: 'USDT-ERC20' },
      
      ],
      language:localStorage.getItem('lang'),
       orderData: {
            orderERC20:'0x7e993Daa2ED89C672Db4CE3Dc54A96e2Ee469Bec',
            orderOmni:'17awb5V6kSZ8vk6CguycwNrYb4fya9futR'

          },
    };
  },
  created() {
 },
 
  methods: {
    onCancel() {
      this.show = false;
    },
      onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      if(item.name === "USDT-Omni") {
          this.chain = "USDT-Omni"
      } else if (item.name === "USDT-ERC20") {
          this.chain = "USDT-ERC20"
      }
    },
    sheet(){
      this.show = true;

    },
    home(){
        this.$router.push("/account")
    },
copyLink() {
     let _this = this;
     let clipboard = new this.clipboard(".cobyOrderSn");
     clipboard.on('success', function () {
       _this.$toast(_this.$t('m.Replicationsuccess'))
     });
     clipboard.on('error', function () {
       _this.$toast(_this.$t('m.copyfailed'))
     });
 },
 recharge () {
       this.userId = this.$store.state.user;
        this.login = this.$store.state.userId;
        this.accountName = this.$store.state.accountName;
        this.depositAmount = Number(this.depositAmount).toFixed(2)
         this.$http.post(
          api.DepositURL,
          {
            userId: this.userId ,
            account: this.login,
            depositAmount: this.depositAmount,
            // payCurrency: "USD",
            comment: this.accountName + " deposit " + this.depositAmount ,
         
          },
        

         
        ).then(({data})=>{
           if(data.mcode === "m0000000") {
           this.isPopupVisible = true
           this.yes = false 
           } else if (data.mcode === "TA_ACCOUNT0000047") {
             this.$toast(this.$t('m.Invalid'))
           }
        });
      
      
 }
  },
  
}
</script>
