<template>
  <div class="quttry">
    <div class="quttry-title">
      <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home" />
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
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="$t('m.Cancel')"
      @cancel="onCancel"
      @select="onSelect"
    />
    <div class="border"></div>
    <div class="usdt">
      <h5>{{$t('m.Withdrawaladdress')}}</h5>
       <input type="text" v-model="orderSn">
    </div>
     <div class="border"></div>
    <div class="usdt">
      <h5>{{$t('m.Withdrawalquantity')}}</h5>
      
      <input type="text" :placeholder="$t(this.hold)" v-model="Amountmoney">
    </div>
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
    
    <div class="border1">
          <div class="button">
        <input type="button" :value="$t('m.Determine')" @click="apply">
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
  
  </div>
</template>
<style lang="scss" scoped>

.quttry {
   width: 100%;
    height: 100%;
    position: fixed;
     background:#f5f5f5;
  .quttry-title {
    display: flex;
    align-items: center;
    height: 1.173333rem /* 88/75 */;
    // margin-bottom: 0.4rem /* 30/75 */;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    background:white;
    h2 {
      flex: 1;
      text-align: center;
      font-size: 0.493333rem /* 37/75 */;
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
    background:white;
    h5 {
      font-size: 0.426667rem /* 32/75 */;
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
    }
    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
         font-size: .32rem /* 24/75 */;
    color:#9f9f9f;
}
  }
  .border {
    height: 0.32rem /* 24/75 */;
    background: #f5f5f5;
  }
  .blance {
      width: 100%;
      height:1.333333rem /* 100/75 */;
      background: #f5f5f5;
      display: flex;
      padding-top: .266667rem /* 20/75 */;
     
      p {
          font-size: .32rem /* 24/75 */;
          color:#9f9f9f;
          padding-left: .32rem /* 24/75 */;

      }
      span {
          font-size: .32rem /* 24/75 */;
          color:#127df6; 
      }
  }
  .border1 {
      padding-top: 1.066667rem /* 80/75 */;
    //   height:5rem /* 700/75 */;
      background: #f5f5f5 ;
  .button {
      padding-left: .32rem /* 24/75 */;
      padding-right: .32rem /* 24/75 */;
      input {
      height: 1.2rem /* 90/75 */;
      width: 100%;
      background:#127df6 ;
      color: white;
      font-size: .373333rem /* 28/75 */;
      appearance: none;
      }
  }

  }
  
}
</style>
<script>
export default {
  data() {
    return {
      chain: "USDT-ERC20",
      show: false,
    //   show2: false,
    //   show3:false,
      actions: [{ name: "USDT-Omni" }, { name: "USDT-ERC20" }],
      hold:"m.Minimum",
      orderSn: "",
      Amountmoney:"",
      comment:"",
      charge:"5",
      balance:localStorage.getItem("balance")
  

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
    apply() {
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
            console.log(data, "aaa");
            if (data.mcode === "m0000000") {
        this.$toast(this.$toast(this.$t("m.Submitted")));
        this.$router.push("/account")




            }
          });
    }
  }
};
</script>