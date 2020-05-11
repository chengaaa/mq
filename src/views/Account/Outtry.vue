<template>
  <div class="outtry">
    <div class="outtry-title">
      <van-icon id="van-icon" name="arrow-left" color="blue" @click="back" />
      <h3>{{$t('m.Withdraw')}}</h3>
    </div>
    <div class="entry-depositAmount">
      <p>{{$t('m.Withdrawamount')}}</p>
      <div class="entry-input">
        <input type="number" :placeholder="$t('m.Amountplaceholder')" id="blance" />
        <span>USDT</span>
      </div>
    </div>
    <div class="Address-type">
      <div class="text">{{$t('m.Withdrawaddresstype')}}</div>
      <div class="switch-tab">
        <div class="left" :class="{white}" @click="left">ERC20</div>
        <div class="middle" :class="{white1}" @click="middle">TRC20</div>
        <div class="right" :class="{white2}" @click="right">OMNI</div>
      </div>
    </div>
    <div class="address">
      <div class="address-text">{{$t('m.Withdrawaddress')}}</div>

      <textarea id="textarea" name="text" :autofocus="true"></textarea>
    </div>
    <div class="submit" @click="apply">
      <div>{{$t("m.Submit")}}</div>
    </div>
  </div>
</template>
<style lang="scss">
.outtry {
  padding-top: 0.4rem /* 30/75 */;
  .white {
    background: blue;
    color: white;
  }
  //    .white1 {
  //       background: white;
  //       color: blue;
  //   }
  .white1 {
    background: blue;
    color: white;
  }
  .white2 {
    background: blue;
    color: white;
  }

  .van-icon {
    font-size: 0.733333rem;
    width: 40%;
    margin-bottom: 0.566667rem /* 20/75 */;
  }
  .outtry-title {
    display: flex;
    h3 {
      font-size: 0.4rem /* 30/75 */;
      font-weight: 500;
    }
  }
  .entry-depositAmount {
    line-height: 0.933333rem /* 70/75 */;
    height: 0.933333rem /* 70/75 */;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    padding-left: 0.2rem /* 15/75 */;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.266667rem /* 20/75 */;
    p {
      font-size: 0.333333rem /* 25/75 */;
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
  .Address-type {
    display: flex;
    justify-content: space-between;
    .text {
      font-size: 0.333333rem /* 25/75 */;
      line-height: 0.666667rem /* 50/75 */;
      padding-left: 0.2rem;
    }
    .switch-tab {
      display: flex;
      justify-content: space-around;
      margin-right: 0.533333rem /* 40/75 */;
      margin-bottom: 0.4rem /* 30/75 */;

      div {
        width: 1.333333rem /* 100/75 */;
        height: 0.666667rem /* 50/75 */;
        line-height: 0.666667rem /* 50/75 */;
        border: 1px solid blue;
        text-align: center;
        font-size: 0.306667rem /* 23/75 */;

        &:nth-child(1) {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-right: none;
        }
        &:nth-child(3) {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          border-left: none;
        }
      }
    }
  }
  .address {
    display: flex;
    justify-content: space-between;
    textarea {
      width: 5.333333rem /* 400/75 */;
      height: 1.333333rem /* 100/75 */;
      margin-right: 0.533333rem /* 40/75 */;
      font-size: 0.32rem /* 24/75 */;
      -webkit-appearance: none;
    }
    .address-text {
      line-height: 1.333333rem /* 100/75 */;
      padding-left: 0.2rem;
      font-size: 0.333333rem /* 25/75 */;
    }
  }

  .submit {
    margin-top: 1.333333rem /* 100/75 */;
    height: 0.8rem /* 60/75 */;
    background: #ff6537;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      color: white;
      font-size: 0.4rem /* 30/75 */;
    }
  }
}
</style>
<script>
import { baseURL1, baseURL2, baseURL3 } from "../../utls";

export default {
  data() {
    return {
      white: true,
      white1: false,
      white2: false,
      userId: "",
      login: "",
      withdrawAmount: "",
      bankAccountName: "",
      bankAccountNumber: "",
      bankName: "ERC20"
    };
  },
  methods: {
    back() {
      this.$router.push("/account");
    },
    left() {
      this.white = true;
      this.white2 = false;
      this.white1 = false;
      this.bankName = "ERC20";
    },
    middle() {
      this.white = false;
      this.white1 = true;
      this.white2 = false;
      this.bankName = "TRC20";
    },
    right() {
      this.white = false;
      this.white1 = false;
      this.white2 = true;
      this.bankName = "OMNI";
    },
    apply() {
      var balance = document.getElementById("blance").value;
      var textarea = document.getElementById("textarea").value;
      if (balance === "") {
        this.$toast(this.$toast(this.$t("m.Withdrawplaceholder")));
      } else if (textarea === "") {
        this.$toast(this.$toast(this.$t("m.Pleaseenterthecorrectaddress")));
      } else {
        this.userId = this.$store.state.user;
        this.login = this.$store.state.userId;
        this.withdrawAmount = balance;
        this.bankAccountName = this.$store.state.accountName;
        this.bankAccountNumber = textarea;
        this.bankName = this.bankName;

        console.log(this.userId, this.login);
        this.$http
          .post(baseURL3 + "/account/withdraw", {
            userId: this.userId,
            account: this.login,
            withdrawAmount: this.withdrawAmount,
            bankAccountName: this.bankAccountName,
            bankAccountNumber: this.bankAccountNumber,
            bankName: this.bankName
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
  }
};
</script>