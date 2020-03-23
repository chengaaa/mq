<template>
  <div class="account">
    <div class="header">
      <div class="header-icon">
        <i class="icon-morentouxiang iconfont"></i>
      </div>

      <!-- <img src="../../assets/BLITZ BOOK 8.png" alt=""> -->
       
      <div class="header-name" v-for="(item,index) in accountList" :key="index">
        <h3>{{item.accountName}}</h3>
        <!-- <p>60001 - real\usdPME-B1</p> -->
          <span>{{item.account}}</span><span>-{{item.group}}</span>

      </div>
    </div>
    <div class="account-1" v-for="(item,index) in accountList" :key="index">
      <div class="top">
        <h4>账户余额</h4>
        <p>￥{{item.balance}}</p>
      </div>

    
      <div class="bottom">
        <i class="icon-yuetixian iconfont"></i>
        <p>余额提现</p>

        <hr style="transform:rotate(180deg)" />
        <i class="icon-chongbi iconfont"></i>
        <p>充值入款</p>
      </div>
    </div>
    <div class="back">
      <div class="p">
        <p  @click="language">语言切换</p>
      </div>
      <div class="p">
        <p>意见反馈</p>
      </div>
      <div class="logout">
         <router-link tag="p" @click.native="logout" to="/">退出登录</router-link>
        <!-- <p>退出登录</p> -->
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.icon-morentouxiang {
  font-size: 1.333333rem /* 100/75 */;
  color: #eee;
}
.icon-yuetixian,
.icon-chongbi {
  font-size: 0.6rem /* 45/75 */;
  color: #ed7946;
}
.account {
  height: 10.666667rem /* 800/75 */;
  // padding-bottom: 2rem /* 100/75 */;

  .header {
    padding-top: 0.5rem;
    padding-left: 0.8rem;

    height: 4rem /* 300/75 */;
    background: #ed7946;
    display: flex;
    .header-name {
      padding-left: 0.4rem /* 30/75 */;
    }
    h3 {
      //   padding-top: 1.333333rem /* 100/75 */;
      //   padding-left: 2.6rem;
      font-size: 0.56rem /* 42/75 */;
      color: white;
      font-weight: 300;
      margin-bottom: 0.2rem;

    }
    span {
      //   padding-left: 2rem /* 150/75 */;
      //   margin-top: .066667rem /* 5/75 */;
      //   padding-left: 2rem;
      color: white;
      font-size: 0.373333rem /* 28/75 */;
    }
  }
  .account-1 {
    height: 4.46rem;
    margin-left: 0.533333rem /* 40/75 */;
    margin-right: 0.533333rem /* 40/75 */;
    border-radius: 0.266667rem /* 20/75 */;
    position: relative;
    top: -1.7rem;
    background: #eee;
    .top {
      height: 2.133333rem /* 160/75 */;
      line-height: 2.133333rem /* 160/75 */;
      border-bottom: 1px dashed #d6d6d6;
      padding-left: 0.666667rem /* 50/75 */;
      padding-right: 0.4rem /* 30/75 */;
      font-size: 0.466667rem /* 35/75 */;
      display: flex;
      justify-content: space-between;
      color: #535353;
      h4 {
      }
    }
    .bottom {
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-around;
      padding-left: 0.8rem /* 60/75 */;
      padding-right: 0.8rem /* 60/75 */;
      line-height: 2.2rem;
      i {
        width: 0.933333rem /* 70/75 */;
      }
      p {
        // width:2.133333rem /* 160/75 */;
        height: 2.4rem /* 180/75 */;
        text-align: center;
        font-size: 0.373333rem /* 28/75 */;
        // border-right: 1px solid black;
      }
      p:nth-child(2) {
      }
    }
  }
  .back {
    background: #eee;

    .p {
      height: 1.2rem /* 90/75 */;
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      line-height: 1.333333rem /* 100/75 */;
      padding-left: 1.066667rem /* 80/75 */;
      background: white;

      p {
        font-size: 0.4rem /* 30/75 */;
      }
    }
    .logout {
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      text-align: center;
      margin-top: 0.8rem /* 10/75 */;
      //   margin-bottom: 1.133333rem /* 10/75 */;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      background: white;
      font-size: 0.4rem /* 30/75 */;
    }
  }
}
</style>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      accountList: []
    };
  },
  created() {
    this.$store.commit("showLoading");

    this.getdata();
  },
  methods: {
    ...mapMutations(["delToken"]),

    getdata() {
      this.$store.commit("showLoading");

      this.$http.get("/account").then(({ data }) => {
  
        console.log(data, "dadtadtadta");
        this.accountList.push(data.data);
        console.log(this.accountList,"vvvvvvvvvvvvv");
      });
    },
    logout() {
      this.$http.post("/logout").then(({ data }) => {
        console.log(data);
        if (data.code == 0) {
          this.delToken();
          this.$router.push("/phone");
        }
      });
    },
    language() {
      this.$router.push({ name: "language" });
    }
  }
};
</script>