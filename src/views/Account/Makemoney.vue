<template>
<div class="makemoney">
   
    <van-icon id="van-icon" name="arrow-left" color="blue" @click="back" />
    <div class="makemoney-p">
        <p class="p">{{$t('m.Pleasedeposit')}}<span>{{depositAmount}}</span>{{$t('m.USDTintofollowingaddress')}}</p>
        <div class="makemoney-copy">
            <div class="copy">
            <p>0x90b6be546c2cd370ef47b53d2a11037a2a98a045</p><i class="iconfont cobyOrderSn" data-clipboard-action="copy"  :data-clipboard-text="orderData.orderSn" @click="copyLink">&#xe654;</i></div>
            <div class="erweima">
            <img src="../../assets/erweima.jpg" alt="">
            </div>
        </div>
        <div class="comment"><p>{{$t('m.Andentertransfer')}}60000</p></div>
    </div>

    <div class="submit" @click="recharge" v-show="issh">
      <div >{{$t('m.Submit')}}</div>
    </div>
   <div class="submit" v-show="!issh">
      <div >{{$t('m.Submit')}}</div>
    </div>


<Toastss v-show="isPopupVisible" :routerData="routerData" :routerData2 ="routerData2"></Toastss>






</div>
</template>

<style lang="scss">
.makemoney {
padding-top:.4rem /* 30/75 */;
.makemoney-p {
     padding-left: .266667rem /* 20/75 */;
   p {
       font-size: .333333rem /* 25/75 */;
   } 
   .p {
       margin-bottom: .333333rem /* 25/75 */;
   }
   .makemoney-copy {
       .copy {
           display: flex;
          
           p {
       font-size: .333333rem /* 25/75 */;
       padding-left: .133333rem /* 10/75 */;
               
           }
         
       }
       .erweima {
           margin-top:.2rem /* 15/75 */;
           display: flex;
           justify-content: center;
           align-items: center;
       }
   }
   .comment {
       margin-top: .533333rem /* 40/75 */;
       padding-left: .4rem /* 30/75 */;
   }
}

.van-icon{
    font-size: 0.733333rem;
    width: 40%;
    margin-bottom: .566667rem /* 20/75 */;
} 

   .submit {
    margin-top: 1.333333rem /* 100/75 */;
    height: .8rem /* 60/75 */;
    background: #ff6537;
    display: flex;
    justify-content: center;
    align-items: center;
    
    div {
     color: white;
      font-size: .4rem /* 30/75 */;
     
    }
  }


}
.iconfont {
    font-size: .533333rem /* 40/75 */;
}
    
</style>

<script>
// import { getCode } from "../../rsa";
import { baseURL1, baseURL2, baseURL3 } from "../../utls";
const Toastss = ()=>import("../../components/Toastss.vue");


export default {
    data() {
      return {
          orderData: {
            orderSn:'0x90b6be546c2cd370ef47b53d2a11037a2a98a045'
          },
         depositAmount:'' ,
           userId: "",
      login: "",
      comment: "",
      signature: "",
     accountName:"",
     isPopupVisible:false,
    //  routerData:"提交成功",
    //  routerData2:"你的入金申请已经提交，我们会尽快调整你的账户余额",
      routerData:"m.Submitted",
     routerData2:"m.Explain",
     issh:true,
    
      }
    },
    components:{
         Toastss
    },
    created() {
     this.depositAmount = this.$store.state.depositAmount
     
    },
    methods: {
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
 back() {
     this.$router.go(-1)
 },
 recharge() {
   this.issh = false
      this.userId = this.$store.state.user;
        this.login = this.$store.state.userId;
        this.accountName = this.$store.state.accountName;
        console.log(this.userId, this.login);

        // this.depositAmount = Number(Number(this.$store.state.depositAmount).toFixed(2)) 
        this.depositAmount =  this.$store.state.depositAmount
      //   console.log(this.depositAmount, "this.depositAmount ");
      //   console.log(this.depositAmount);
        // this.signature = getCode(
        //   this.userId+this.login+"USD"+this.depositAmount
        // );
        this.$http.post(
          baseURL3 +
            "/account/deposit",
          {
            userId: this.userId ,
            account: this.login,
            depositAmount: this.depositAmount,
            // payCurrency: "USD",
            comment: this.accountName + " deposit " + this.depositAmount ,
         
          },
          // {
          //      headers: {
          //     "x-api-token": "TypwwEg8E21FlKYZ",
          //     "x-api-tenantid": "T002509",
          //     "Content-Type": "application/json",
          //     "cache-control": "no-cache"
          //   }
          // }

         
        ).then(({data})=>{
           console.log(data)
           if(data.mcode === "m0000000") {
           this.isPopupVisible = true
           }
        });
      }
 }
    
}
</script>
    
