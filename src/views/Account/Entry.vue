<template>
  <div class="entry">
    <van-icon id="van-icon" name="arrow-left" color="blue" @click="back" />

    <div class="entry-depositAmount">
      <p>{{$t('m.Amount')}}</p>
      <div class="entry-input">
        <input type="number" :placeholder="$t('m.Amountplaceholder')" id="blance"  />
        <span>USDT</span>
      </div>
    </div>
        <div id="blance1" class="message none">{{$t('m.more')}}</div>
    <!-- <div>
      <div>选择币种</div>
      <select class="bs-select form-control" v-model="selecte">
        <option selected>USDT</option>
      </select>
    </div>-->
    <!-- <div>
      <label for>备注</label>
      <input type="text" placeholder="申请备注" id="comment" v-model="comment" />
      <div id="blance2" class="message none"></div>
    </div>-->
    <div class="submit" @click="apply">
      <div>{{$t("m.Next")}}</div>
    </div>
  </div>
</template>
<style lang="scss">
.none {
  display: none;
}
.entry {
  padding-top: 0.4rem /* 30/75 */;

  .van-icon {
    font-size: 0.733333rem;
    width: 40%;
    margin-bottom: 0.566667rem /* 20/75 */;
  }
  .entry-depositAmount {
    line-height: 0.933333rem /* 70/75 */;
    height: 0.933333rem /* 70/75 */;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    padding-left: 0.2rem /* 15/75 */;
    display: flex;
    justify-content: space-between;
    p {
      font-size: .333333rem /* 25/75 */;
    }
    .entry-input {
      line-height: 0.933333rem /* 70/75 */;
      height: 0.933333rem /* 70/75 */;
      display: flex;
      justify-content: space-between;
      padding-right: 0.8rem /* 60/75 */;
    }
    div {
      font-size: 0.333333rem /* 25/75 */;
      margin-bottom: 0.4rem /* 30/75 */;
    }

    input {
      border: none;
      width: 3.7rem /* 200/75 */;
      font-size: 0.333333rem /* 25/75 */;
      line-height: 0.933333rem /* 70/75 */;

    }
   
  }
   #blance1 {
      color: red;
      font-size: .266667rem /* 20/75 */;
      position: relative;
      //   top: -0.666667rem;
      left: 2.5rem;
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
</style>
<script>
import { baseURL1, baseURL2, baseURL3 } from "../../utls";
import { checkEntry } from "../../tools/check.js";
import { mapMutations } from "vuex";


export default {
  data() {
    return {
      // selecte: "USDT",
    
    };
  },
  created() {
    console.log(this.$store.state.userId, "");
  },
  methods: {
    ...mapMutations(["setDepositAmount"]),

    apply() {
      checkEntry();
        var blance = document.getElementById("blance").value;
      if(blance === "" || blance < 10 ) {
        return
      } else {
       blance = Number(blance).toFixed(2)
        this.setDepositAmount(blance)
        this.$router.push("/makemoney");
      }
      // var comment = document.getElementById("comment").value;
      // if (blance === "") {
      //   return;
      // } else {
      //   this.userId = this.$store.state.user;
      //   this.login = this.$store.state.userId;
      //   console.log(this.userId, this.login);

      //   this.depositAmount = Number(Number(this.depositAmount).toFixed(2));
      //   console.log(this.depositAmount, "this.depositAmount ");
      //   console.log(this.depositAmount);
      //   this.signature = getCode(
      //     this.userId + this.login + "USDT" + this.depositAmount
      //   );
      //   this.$http.post(
      //     baseURL3 +
      //       "/account/" +
      //       this.userId +
      //       "/3616/" +
      //       this.login +
      //       "/deposit",
      //     {
      //       depositAmount: this.depositAmount,
      //       payCurrency: "USDT",
      //       comment: this.comment,
      //       signature: this.signature
      //     },

      //     {
      //       headers: {
      //         "x-api-token": "TypwwEg8E21FlKYZ",
      //         "x-api-tenantid": "T002509",
      //         "Content-Type": "application/json",
      //         "cache-control": "no-cache"
      //       }
      //     }
      //   );
      // }
    },
    back() {
      this.$router.push("/account");
    }
  }
};
</script>