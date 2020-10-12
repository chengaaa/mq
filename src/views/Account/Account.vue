<template>
  <div class="background">
    <div class="home-title">
      <h1 class="home-img">
        <img src="../../assets/images/logo1.png" alt />
      </h1>
    </div>
    <div class="account">
      <!-- <loading v-show="LOADING"></loading> -->
      <div class="account-top" v-show="!tokens">
        <!-- <div class="account-title" > -->
        <!-- <h3>设置</h3> -->
        <!-- </div> -->
        <div class="account-welcom">
          <div class="hello">
            <img src="../../assets/images/touxiang.png" alt="">
            <p>立即登录BBOOK8开启交易</p>
            <!-- <span>{{$t('m.Welcometo')}} B BOOK 8</span> -->
          </div>
          <div class="hello2">
            <input type="button" :value="$t('m.Login')" @click="login" />
            <input type="button" :value="$t('m.Register')" @click="register" />
          </div>
        </div>
      </div>

      <div class="account-top1" v-show="tokens">
        <!-- <div class="account-title" >
          <h3>设置</h3>
        </div>-->
        <div class="account-welcom">
          <div class="hello" v-for="(item,index) in accountList" :key="index">
            <p>{{item.accountName}}</p>
          </div>
        </div>
      </div>
      <div class="account-middledle">
        <div
          class="account-middle"
          v-show="tokens"
          v-for="(item,index) in accountList"
          :key="index"
        >
          <!-- <div class="middle-left">
            <h4>{{$t('m.Availableassets')}}</h4>
            <span>98743.24</span>
          </div>-->
          <div class="middle-right">
            <h4>USDT</h4>
            <span>{{item.balance}}</span>
          </div>
        </div>
        <!-- <div class="account-middle2" v-show="!tokens">
          <img src="../../assets/image/logo3.png" alt />
        </div> -->
      </div>
      <div class="account-bottom">
        <div class="account-bottom1" v-show="tokens">
          <div class="account-flex">
            <img src="../../assets/image/chongzhi.png" alt />
            <p class="account-flex1" @click="entry">
              <span>{{$t('m.Deposit')}}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </p>
          </div>

          <div class="account-flex">
            <img src="../../assets/image/tibi.png" alt />
            <p class="account-flex1" @click="outtry">
              <span>{{$t('m.Withdraw')}}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </p>
          </div>
          <div class="account-flex">
            <img src="../../assets/image/历史.png" alt />
            <p class="account-flex1" @click="history">
              <span>{{$t('m.History')}}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </p>
          </div>
           <div class="account-flex">
            <img src="../../assets/image/修改密码.png" alt />
            <p class="account-flex1" @click="changePassword">
              <span>{{$t('m.ChangePassword')}}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </p>
          </div>
          
        </div>
        <div class="account-bottom2">
           <div class="account-flex">
            <img src="../../assets/images/icon_share.png" alt />
            <div class="account-flex1" @click="customer">
              <span>{{$t('m.Share')}}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </div>
          </div>
         
          <div class="account-flex">
            <img src="../../assets/images/icon_language.png" alt />
            <div class="account-flex1" @click="language">
              <span>{{$t("m.Interface")}}</span>
              <div class="language">
                <p>{{she}}</p>
                <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
              </div>
            </div>
          </div>
           <div class="account-flex">
            <img src="../../assets/images/icon_customer_service.png" alt />
            <div class="account-flex1" @click="customer">
              <span>{{$t('m.Customerservice')}}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </div>
          </div>
        </div>
        

        
        <div class="boder"></div>
      </div>
      <div class="about">
        <p><img src="../../assets/images/icon_about_us.png" alt=""><span>关于我们</span><span>ABOUT US</span></p>
        </div>
        <div class="account-bottom3" v-show="tokens">
          <router-link tag="p" @click.native="logout" to="/">{{$t("m.Logout")}}</router-link>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#van-icon {
  font-size: 0.48rem /* 36/75 */;
}
.language {
  display: flex;
  justify-content: space-between;
  width: 1.333333rem /* 100/75 */;
      align-items: center;
  p {
    color: #aaaaaa;
    font-size: 0.32rem /* 24/75 */;
  }
}
.background {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #262626;
  overflow: auto;
 
  .home-title {
    width: 100%;
    display: flex;
    position: relative;
    h1 {
      background: #262626;
      width: 100%;
      height: 1.173333rem /* 88/75 */;
      padding: 0.333333rem /* 25/75 */ 0rem /* 0/75 */ 0rem /* 0/75 */ 0rem
        /* 0/75 */;
      margin: auto;
      text-align: center;}
      img {
        width: 4rem /* 300/75 */;
        // height: .8rem /* 60/75 */;
        margin: 0 auto;
        position: relative;
        top: 50%;
        margin-top: -0.8rem;
      }
  }

  .account {
    .account-top1 {
      height: 3.333333rem /* 250/75 */;
      background: #127df6;
      .account-title {
        height: 1.173333rem /* 88/75 */;
        line-height: 1.173333rem /* 88/75 */;
        text-align: center;
        font-size: 0.48rem /* 36/75 */;
        color: white;
      }
      .account-welcom {
        font-size: 0.613333rem /* 46/75 */;
        text-align: center;
        height: 3.146667rem /* 236/75 */;
        line-height: 2.5rem;
        color: white;
      
      }
    }
    .account-top {
      height: 4.666667rem /* 350/75 */;
      background: #262626;
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      .account-title {
        height: 1.173333rem /* 88/75 */;
        line-height: 1.173333rem /* 88/75 */;
        text-align: center;
        font-size: 0.48rem /* 36/75 */;
        color: white;
      }
      .account-welcom {
        height: 1.92rem /* 144/75 */;
        padding-top: 0.773333rem /* 58/75 */;
        font-size: 0.586667rem /* 44/75 */;
        .hello {
          text-align: center;
          // margin-bottom: 0.72rem /* 54/75 */;
          display: flex;
          justify-content: center;
          width: 80%;
          margin: 0 auto;
          img {
           width:1.066667rem /* 80/75 */;
           height:1.066667rem /* 80/75 */;
          }
        }

        p {
          margin-bottom: 0.266667rem /* 20/75 */;
          color: #c9c9c9;
        font-size: 18px;
        line-height: 40px;
        margin-left: 10px;

        }
        span {
          color: white;
        }

        .hello2 {
          font-size: 0.453333rem /* 34/75 */;
          text-align: center;
          display: flex;
    justify-content: center;
          :nth-child(1) {
            width: 2.666667rem /* 200/75 */;
            height:1.066667rem /* 80/75 */;
            margin-top: 0.266667rem /* 20/75 */;
            appearance: none;
            border-radius: 4px;
            text-align: center;
            background: #4669ff;
            color: #c9c9c9;
            margin-right:.933333rem /* 70/75 */;
          }
          :nth-child(2) {
            width: 2.666667rem /* 200/75 */;
            height:1.066667rem /* 80/75 */;
            margin-top: 0.266667rem /* 20/75 */;
            appearance: none;
            border-radius: 4px;
            text-align: center;
            background: #4669ff;
            color: #c9c9c9;
            // border: 1px solid white;
          }
        }
      }
    }
    .account-middledle {
      background: #f5f5f5;
      position: relative;

      .account-middle,
      // .account-middle2 {
        // width: 88.4%;
        // height: 3.066667rem /* 230/75 */;
        // background: white;
        // position: absolute;
        // top: -1.4rem;
        // border-radius: 4px;
        // // box-shadow: 0px 5px 10px #dfe0e2;
        // box-shadow:0px 4px 6px 0px #dfe0e2, 0px 2px 0px -2px #dfe0e2;
        // display: flex;
        // justify-content: center;
        // margin-left: 0.64rem /* 48/75 */;
        // margin-right: 0.64rem /* 48/75 */;

        .middle-left,
        .middle-right {
          width: 4.373333rem /* 328/75 */;
          text-align: center;
          margin-top: 0.88rem;
          margin-bottom: 0.88rem;
          font-size: 0.506667rem /* 38/75 */;
          color: #127df6;
          h4 {
            margin-bottom: 0.32rem /* 24/75 */;
            color: black;
          }
        }
        
        .middle-left {
          border-right: 1px solid #eeeeee;
        }
      // }
      // .account-middle2 {
        img {
          width: 5.5rem /* 459/75 */;
          margin: auto;
        }
      // }
    }
    .account-bottom {
      background: #f5f5f5;
      // padding-top: 2rem /* 150/75 */;
      // box-sizing: content-box;
      .account-flex {
        display: flex;
        align-items: center;
         padding-left: 20px;
        padding-right: 20px;
          border-bottom: 1px solid #eeeeee;
        // margin-right: 0.626667rem /* 47/75 */;
      height: 1.346667rem /* 101/75 */;
        // justify-content: space-between;
        img {
          width: 0.666667rem /* 50/75 */;
          height: 0.693333rem /* 52/75 */;
          margin-right: 0.186667rem /* 14/75 */;
        }
        span {
          height: 0.693333rem /* 52/75 */;
          line-height: 0.693333rem /* 52/75 */;
          font-size: 14px;
          color: #c9c9c9;
        }
      }
      .account-flex1 {
        height: 1.186667rem /* 89/75 */;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .account-bottom1,
      .account-bottom2 {
        // height:2.466667rem /* 200/75 */;
        background: #262626;
        // padding-left: 0.64rem /* 48/75 */;
      }
      .account-bottom1 {
        height:4.8rem /* 360/75 */;
        margin-bottom: 0.293333rem /* 22/75 */;
        // .account-flex:nth-child(1) {
        //   border-bottom: 1px solid #eeeeee;
        // }
        //  .account-flex:nth-child(2) {
        //   border-bottom: 1px solid #eeeeee;
        // }
        //  .account-flex:nth-child(3) {
        //   border-bottom: 1px solid #eeeeee;
        // }
      }
      .account-bottom2 {
        // margin-bottom: 0.666667rem /* 50/75 */;
        .account-flex:nth-child(1) {
          // border-bottom: 1px solid #eeeeee;
        }
      }

      .account-bottom3 {
        height: 1.2rem /* 90/75 */;
        line-height: 1.2rem /* 90/75 */;
        background: #ffffff;
        text-align: center;
        font-size: 0.4rem /* 30/75 */;
        
       
      }
      .boder {
        // height: 1.493333rem;
      }
     
    }
  }
   .about {
        background: #262626 ;
          padding:0.533333rem 1rem;
        p {
          // width: 80%;
          height: 30px;
            line-height: 30px;

          border: 1px solid #fff;
          background: #262626;
          padding:10px 10px;
           border-radius: 6px;
          display: flex;

            img {
           width:.666667rem /* 50/75 */;
           height:.666667rem /* 50/75 */;
           margin-left: 0.333333rem;
           margin-right: 0.333333rem;
          }
          span {
            color: white;
            font-size: 16px;
            font-weight: 800;
          }
          :nth-child(3)  {
            color: #c9c9c9;
            font-size: 12px;
            font-weight: 500;
            margin-left: 0.4rem;

          }
        }
      }
}
</style>
<script>
import store from "../../store";
const Loading = () => import("../../components/Loading");
import { mapMutations } from "vuex";
import { mapState } from "vuex";
var api = require("../../api/api")

export default {
  data() {
    return {
      tokens: "",
      accountList: [],
      accounts: [],
      she: ""
    };
  },
  created() {
    this.she = localStorage.getItem("engs");
    this.setEng(this.she);

    this.tokens = localStorage.getItem("token");
    if (this.tokens) {
      // this.$store.commit("showLoading");

      this.getdata();
    } else {
      return
      // this.$store.commit("hideLoading");
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(["LOADING"])
  },
  mounted() {
 window.scrollTo(0,0);
  },
  activated() {
    this.tokens = localStorage.getItem("token");
    this.she = localStorage.getItem("engs");
    this.$nextTick(()=>{
    if (this.tokens) {
      this.getdata();
    } else {
      return
    }

    })
    
  },
  methods: {
    ...mapMutations(["delToken"]),
    ...mapMutations(["delUserId"]),
    ...mapMutations(["delUser"]),
    ...mapMutations(["setEng"]),
    ...mapMutations(["setEng"]),
    ...mapMutations(["delAccountName"]),
    

    getdata() {
      // this.$store.commit("showLoading");
      this.$http
        .get(api.AccountURL)
        .then(({ data }) => {
          console.log(data);
          if (data.code === 0) {
            // this.$store.commit("hideLoading");
            this.accountList = []
            this.accountList.push(data.data);
            localStorage.setItem("balance", data.data.balance);
            console.log(this.accountList, " this.accountList");
          } else {
          }
        })
        .catch(error => {
          // this.$store.commit("hideLoading");
        });
    },
    logout() {
      this.$http.post(api.LogoutURL).then(({ data }) => {
        console.log(data,"ha");
        if (data.code == 0) {
          // sessionStorage.clear();
          // localStorage.clear();
         localStorage.removeItem("token")
          this.delUserId();
          this.delUser();
          this.delAccountName()
          // this.delToken();
          this.$router.push("/login");
        }
      });
    },
    history() {
      this.$router.push("/history");
    },
    changePassword() {
      this.$router.push("/changepassword");
    },
    language() {
      this.$router.push({ name: "language" });
    },
    entry() {
      this.$router.push("/entry");
    },
    outtry() {
      this.$router.push("/outtry");
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    customer() {
      this.$router.push("/customer");
    }
  }
};
</script>