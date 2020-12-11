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
            <img src="../../assets/images/touxiang.png" alt="" />
            <p>{{ $t("m.Hideto") }}</p>
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
          <div class="hello" v-for="(item, index) in accountList" :key="index">
            <div class="accountname">
              <p>{{ item.accountName }}</p>
              <!-- <p>{{ date }}</p> -->
            </div>
            <div class="balance">
              <span>{{ item.balance }}</span>
              <h4>USDT</h4>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="account-middledle">
        <div
          class="account-middle"
          v-show="tokens"
          v-for="(item,index) in accountList"
          :key="index"
        > -->
      <!-- <div class="middle-left">
            <h4>{{$t('m.Availableassets')}}</h4>
            <span>98743.24</span>
          </div>-->
      <!-- <div class="middle-right">
            <h4>USDT</h4>
            <span>{{item.balance}}</span>
          </div>
        </div> -->
      <!-- <div class="account-middle2" v-show="!tokens">
          <img src="../../assets/image/logo3.png" alt />
        </div> -->
      <!-- </div> -->
      <div class="account-bottom">
        <div class="account-bottom1" v-show="tokens">
          <div class="account-flex">
            <img src="../../assets/images/icon_deposit.png" alt />
            <p class="account-flex1" @click="entry">
              <span>{{ $t("m.Deposit") }}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </p>
          </div>
          <div class="account-flex">
            <img src="../../assets/images/icon_withdraw.png" alt />
            <p class="account-flex1" @click="outtry">
              <span>{{ $t("m.Withdraw") }}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </p>
          </div>
          <div class="account-flex">
            <img src="../../assets/images/icon_history.png" alt />
            <p class="account-flex1" @click="history">
              <span>{{ $t("m.History") }}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </p>
          </div>
          
          <div class="account-flex">
            <img src="../../assets/images/icon_change_pw.png" alt />
            <p class="account-flex1" @click="changePassword">
              <span>{{ $t("m.ChangePassword") }}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </p>
          </div>
           <div class="account-flex">
            <img src="../../assets/images/icon_ui@2x.png" alt />
            <p class="account-flex1" @click="toggle">
              <span>{{$t('m.Changeui')}}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </p>
          </div>
        </div>
        <div class="account-bottom2">
          <div class="account-flex">
            <img src="../../assets/images/icon_share.png" alt />
            <div class="account-flex1" @click="shares">
              <span>{{ $t("m.Share") }}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </div>
          </div>
          <div class="account-flex">
            <img src="../../assets/images/icon_language.png" alt />
            <div class="account-flex1" @click="language">
              <span>{{ $t("m.Interface") }}</span>
              <div class="language">
                <p>{{ she }}</p>
                <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
              </div>
            </div>
          </div>
          <div class="account-flex">
            <img src="../../assets/images/icon_customer_service.png" alt />
            <div class="account-flex1" @click="customer">
              <span>{{ $t("m.Customerservice") }}</span>
              <van-icon name="arrow" color="#aaaaaa" id="van-icon" />
            </div>
          </div>
          
        </div>
        <div class="boder"></div>
      </div>
      <div class="about">
        <p>
          <img src="../../assets/images/icon_about_us.png" alt="" /><span
            >关于我们</span
          ><span>ABOUT US</span>
        </p>
      </div>
      <div class="account-bottom3" v-show="tokens">
        <router-link
          tag="p"
          class="p"
          @click.native="logout"
          to="/"
          >{{ $t("m.Logout") }}</router-link
        >
      </div>
      <div class="zhan"></div>
    </div>
    <!-- 语言切换 -->
    <div class="back" v-show="lang">
      <div class="back-A">
        <img
          class="img1"
          src="../../assets/images/icon_close.png"
        />
        <div class="text">
          <img class="img2" src="../../assets/images/logo1.png" />
        </div>
        <div class="picker">
          <!-- <div class="last">简体中文</div>
      <div class="last">繁体中文</div>
      <div class="last">english</div> -->
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
            :default-index="2"
          />
        </div>
        <div class="ok">{{$t('m.Yes')}}</div>
      </div>
    </div>
    <!-- 客服帮助 -->
     <div class="back back1" v-show="customerdata">
      <div class="back-A">
      <img @click="closecustomer" class="img1" src="../../assets/images/icon_close.png"/>
     <div class="text">
      <img class="img2" src="../../assets/images/logo1.png"/>
     </div>
     <div class="customerimg" v-for="(item,index) in group" :key="index">
       <h4>{{item.group_name}}</h4>
       <img :src="item.address" alt="">
       <h4>{{$t('m.Scanning')}}</h4>
     </div>
      </div>
    </div>
    <!-- 修改密码 -->
    <div class="back backpass" v-show="changepass">
      <div class="back-A">
      <img @click="closepassword" class="img1" src="../../assets/images/icon_close.png"/>
     <div class="text">
      <img class="img2" src="../../assets/images/logo1.png"/>
      <h3>{{accountname}}{{date}}</h3>
     </div>
     <div class="passwordup">
       <h4>{{$t('m.Origin')}}</h4>
       <input type="password" v-model="data.origin">
       <h4>{{$t('m.Newpassword')}}</h4>
       <input type="password" v-model="data.newPwd">
       <h4>{{$t('m.Verifypassword')}}</h4>
       <input type="password" v-model="data.verifyPwd">
       <div class="ok" @click="finish">{{$t('m.Yes')}}</div>
     </div>
      </div>
      
    </div>
     <!-- 分享 -->
    <div class="back backpass" v-show="share">
      <div class="back-B">
      <img @click="closeshare" class="img1" src="../../assets/images/icon_close.png"/>
     <div class="text">
      <img class="img2" src="../../assets/images/logo1.png"/>
     </div>
     <div class="img3">
       <img src="../../assets/images/share_pic.png" alt="">
     </div>
     <p>{{$t('m.Sharetitle')}}</p>
     <div class="iosand">
       <div class="margins">
         <h5>iOS {{$t('m.User')}}</h5>
         <img  :src="iosimg" alt="">
       </div>
       <div>
         <h5>Android {{$t('m.User')}}</h5>
         <img  :src="andimg" alt="">
       </div>
     </div>
     <p class="down">{{$t('m.Scan')}}</p>
     <p>{{$t('m.Address')}}：http://www.bbook8.com</p>
    
      <div class="pace"></div>
      </div>
      
    </div>

    

  </div>
</template>
<style  scoped>
.picker >>> .van-picker {
  background: rgba(26, 26, 26, 0.3);
}
.picker >>> .van-picker__mask {
  background-image: none;
}
.picker >>> .van-picker-column__item {
  color: white;
}
.picker >>> .van-picker__cancel {
  position: absolute;
  right: -0.533333rem;
  top: -4rem /* 170/75 */;
  opacity: 0;
}
.picker >>> .van-picker__confirm {
  position: absolute;
  bottom: -4rem /* 300/75 */;
  left: 36%;
  opacity: 0;
}
</style>

<style lang="scss" scoped>
   .router-link-active {
    color: white;
    font-size: 22px;
    text-align: center;
    margin-top: 0.266667rem;
    width: 50%;
    margin: 0.533333rem auto;
    line-height: 1.333333rem;
    border-radius: 4px;
    background: #2e7bfd;
        }

#van-icon {
  font-size: 0.48rem /* 36/75 */;
}
.language {
  display: flex;
  justify-content: space-between;
  width: 2rem /* 150/75 */;
  align-items: center;
  p {
    color: #aaaaaa;
    font-size: 12px;
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
      text-align: center;
    }
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
      // height: 4.666667rem /* 350/75 */;
      padding-top: 30px;
      padding-bottom: 30px;
      background: #262626;
      border-top: 1px solid #565656;
      border-bottom: 1px solid #565656;
      display: flex;
      justify-content: center;
      align-items: center;
      .account-title {
        height: 1.173333rem /* 88/75 */;
        line-height: 1.173333rem /* 88/75 */;
        text-align: center;
        font-size: 0.48rem /* 36/75 */;
        color: white;
      }
      .account-welcom {
        font-size: 22px;
        text-align: center;
        // height: 3.146667rem /* 236/75 */;
        // line-height: 2.5rem;
        color: #c9c9c9;
        .accountname {
          display: flex;
          justify-content: center;
          margin-bottom: 0.533333rem;
        }
        .balance {
          width: 6.666667rem /* 500/75 */;
          height: 2rem /* 150/75 */;
          background: #4669ff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          span {
            border-bottom: 1px solid #748fff;
            width: 40%;
            padding-bottom: 0.133333rem;
          }
          h4 {
            padding-top: 0.133333rem;
          }
        }
      }
    }
    .account-top {
      height: 4.666667rem /* 350/75 */;
      background: #262626;
      border-top: 1px solid #565656;
      border-bottom: 1px solid #565656;
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
            width: 0.8rem /* 80/75 */;
            height: 0.8rem /* 80/75 */;
            margin-right: 0.053333rem;
            position: relative;
            top: -0.04rem;
          }
        }

        p {
          margin-bottom: 0.266667rem /* 20/75 */;
          color: #c9c9c9;
          font-size: 18px;
          line-height: 0.533333rem;
          margin-left: 0.106667rem;
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
            width: 3rem;
            height: 1.066667rem /* 80/75 */;
            margin-top: 0.266667rem /* 20/75 */;
            appearance: none;
            border-radius: 4px;
            text-align: center;
            background: #4669ff;
            color: #c9c9c9;
            margin-right: 1.3rem /* 70/75 */;
          }
          :nth-child(2) {
            width: 3rem;
            height: 1.066667rem /* 80/75 */;
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
      background: #262626;
      // padding-top: 2rem /* 150/75 */;
      // box-sizing: content-box;
      .account-flex {
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom: 1px solid #565656;
        height: 50px;
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
        // height: 4.8rem /* 360/75 */;
        margin-bottom: 0.6rem;
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
        .account-flex:nth-child(1) {
          border-top: 1px solid #565656;
        }
      }

      .account-bottom3 {
        height: 1.2rem /* 90/75 */;
        line-height: 1.2rem /* 90/75 */;
        background: #ffffff;
        text-align: center;
        font-size: 0.4rem /* 30/75 */;
    
      }
    }
  }
  .about {
    background: #262626;
    // padding: 0.533333rem 1rem 1.333333rem /* 100/75 */ 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    // padding-top: 1.333333rem /* 100/75 */;
    // padding-bottom:1.333333rem /* 100/75 */ ;
    margin-top: 30px;
    p {
      // width: 80%;
      height: 30px;
      line-height: 30px;

      border: 1px solid #fff;
      background: #262626;
      padding: 10px 10px;
      border-radius: 6px;
      display: flex;

      img {
        width: 0.666667rem /* 50/75 */;
        height: 0.666667rem /* 50/75 */;
        margin-left: 0.333333rem;
        margin-right: 0.333333rem;
      }
      span {
        color: white;
        font-size: 16px;
        font-weight: 800;
      }
      :nth-child(3) {
        color: #c9c9c9;
        font-size: 12px;
        font-weight: 500;
        margin-left: 0.4rem;
      }
    }
  }
  .zhan {
    height: 100px;
  }

  .back {
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(26, 26, 26, 0.5);
    position: fixed;
    bottom: 0;
    top: 0;
    width: 100%;
    .back-A,.back-B {
      padding-left: 0.533333rem;
      padding-right: 0.533333rem;
      background: rgba(26, 26, 26, 0.8);
      width: 70%;
      // height: 400px;
      border: 2px solid #ebebeb;
      text-align: right;
      border-radius: 6px;
      position: relative;
      padding-bottom:0.4rem;
      .img1 {
        width: 30px;
        height: 30px;
        position: relative;
        top: 15px;
        left: 5px;
      }
      .text {
        text-align: left;
        .img2 {
          width: 50%;
        }
      }
      .customerimg {
   text-align: center;
    h4 {
      color: white;
      text-align: center;
      font-weight: 700;
      padding: 0.266667rem 0rem /* 0/75 */;
      font-size: 16px;
    }
        img {
          width:3.333333rem /* 250/75 */;
          height: 3.333333rem /* 250/75 */;
        }
      }
      .lasts {
        height: 5.333333rem /* 400/75 */;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        :nth-child(1) {
          border-bottom: 1px solid white;
        }
        .last {
          text-align: center;
          font-size: 16px;
          padding-top: 0.533333rem;
          padding-bottom: 0.533333rem;
        }
      }
      .ok {
        font-size: 14px;
        width: 2.133333rem /* 160/75 */;
        height: 0.933333rem;
        line-height: 0.933333rem;
        background: #384ca3;
        margin: 0 auto;
        text-align: center;
        color: white;
        border-radius: 6px;
      }
    }
    .back-B {
  background:#182566;
  border: none;
  padding-bottom: 1.333333rem /* 100/75 */;
  .text {
    text-align: center;
  }
  .img3 {
    text-align: center;
    margin-top: .266667rem /* 20/75 */;
     img {
          // width: 3.5rem;
    height: 3.5rem;
  }

  } 
  p {
    text-align: center;
    // padding-top: 0.133333rem ;
    padding-bottom:0.133333rem ;
    font-size: 13px;
    color: #c9ccda;
    margin-top: 0.266667rem;
  }
  .pace {
    // height:0.666667rem;
  }
   
    }
    .iosand {
      display:flex;justify-content:center;margin-top:20px;
      .margins {
      margin-right: .533333rem /* 40/75 */;
     

      }
      h5 {
        color:white;text-align:center;
        padding:.4rem /* 30/75 */ 0px;
        font-size:16px;
      }
      img {
        width:2.666667rem /* 200/75 */;
      }
    }
    .down {
      margin-bottom:.533333rem /* 40/75 */;
    }
  }

  .backpass {
    .back-A {
      // height: 6.666667rem /* 500/75 */;
    }
    h3 {
      color: #2f3d7e;
          font-size: 18px;
    position: relative;
    right: -.106667rem /* 8/75 */;
    margin-top: 0.133333rem;
    }
    .passwordup {
      text-align: left;
      margin-top: 0.266667rem;
      font-size: 18px;
      h4 {
      width: 100%;
        color: #c9c9c9;
        padding-top: 0.266667rem;
        padding-bottom:.266667rem /* 20/75 */ ;
        padding-left: .106667rem /* 8/75 */;
        
      }
      input {
        padding-left: .106667rem /* 8/75 */;
      width: 100%;
      color: #c9c9c9;
        background: rgba(26,26,26,.0);
        border-bottom: 2px solid #838384;
        // margin-top: 0.266667rem;
        margin-bottom:.693333rem /* 52/75 */ ;
    height: .8rem /* 60/75 */;
    appearance: none;
    border-radius:0px;
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
var api = require("../../api/api");

export default {
  data() {
    return {
      tokens: "",
      accountList: [],
      accounts: [],
      she: "",
      date: "",
      lang: false,
      customerdata:false,
      group:'',
      changepass:false,
      share:false,
      accountname:"",
      columns: ["简体中文", "繁体中文", "ENGLISH"],
       data: {
        origin: "",
        newPwd: "",
        verifyPwd: "",
        userId: "",
      },
      iosimg:"",
      angimg:""
    };
  },
  created() {
    this.she = localStorage.getItem("engs");
    this.setEng(this.she);
    this.tokens = localStorage.getItem("token");
    this.accountname = this.$store.state.accountName
    this.iosimg = window.localStorage.getItem("iosimg")
    this.andimg = window.localStorage.getItem("Androidsimg")
      this.getcustomer()
    var da = new Date();
    this.date = this.date.concat(
      da.getFullYear(),
      da.getMonth() + 1,
      da.getDate()
    );
    if (this.tokens) {
      // this.$store.commit("showLoading");
      this.getdata();
    } else {
      return;
      // this.$store.commit("hideLoading");
    }
  },
  components: {
    Loading,
  },
  computed: {
    ...mapState(["LOADING"]),
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  activated() {
    this.tokens = localStorage.getItem("token");
    this.she = localStorage.getItem("engs");
    this.$nextTick(() => {
      if (this.tokens) {
        this.getdata();
      this.getcustomer()
      } else {
        return;
      }
    });
  },
  methods: {
    ...mapMutations(["delToken"]),
    ...mapMutations(["delUserId"]),
    ...mapMutations(["delUser"]),
    ...mapMutations(["setEng"]),
    ...mapMutations(["setEng"]),
    ...mapMutations(["delAccountName"]),
    ...mapMutations(["setActions"]),
    ...mapMutations(["setActionss"]),
    ...mapMutations(["deleteOpen"]),
    ...mapMutations(["deleteSymbol"]),
    ...mapMutations(["deleteArr"]),
    ...mapMutations(["deleteorder"]),
    onConfirm(value, index) {
      if (value === "ENGLISH") {
        this.$i18n.locale = "en-US";
        localStorage.setItem("lang", "en-US");
        this.she = value;
        localStorage.setItem("engs", this.she);
        let arr = [{ name: "Close" }, { name: "Trade" }];
        this.setActions(arr);
        let arrs = [{ name: "Delete" }, { name: "Trade" }];
        this.setActionss(arrs);
      }

      if (value === "繁体中文") {
        this.$i18n.locale = "zh-TW";
        localStorage.setItem("lang", "zh-TW");
        this.she = value;
        localStorage.setItem("engs", this.she);
        let arr = [{ name: "平倉" }, { name: "交易" }];
        this.setActions(arr);
        let arrs = [{ name: "刪除" }, { name: "交易" }];
        this.setActionss(arrs);
      }
      if (value === "简体中文") {
        this.$i18n.locale = "zh-CN";
        localStorage.setItem("lang", "zh-CN");
        this.she = value;
        localStorage.setItem("engs", this.she);
        let arr = [{ name: "平仓" }, { name: "交易" }];
        this.setActions(arr);
        let arrs = [{ name: "删除" }, { name: "交易" }];
        this.setActionss(arrs);
      }
      this.lang = false;
      // this.$router.push({ name: "account",params:{id:this.sh} });
    },
    onChange(picker, value, index) {
    },
    onCancel() {
      this.lang = false;
    },
    getcustomer() {
       this.$http.get(api.social).then(({data})=>{
            this.group = data
        })

    },
    finish() {
      if(this.data.origin == "") {
         this.$toast("请输入原密码");
      }else if(this.data.newPwd == "") {
         this.$toast("新密码不能为空");

      } else if(this.data.verifyPwd == "") {
         this.$toast("确认密码不能为空");
      }  else {

      this.data.userId = this.$store.state.user;
      this.$http
        .post(api.changepassword, this.data, {
          headers: {
            "x-api-token": "TypwwEg8E21FlKYZ",
            "x-api-tenantid": "T002509",
            "Content-Type": "application/json",
            "cache-control": "no-cache",
          },
        })
        .then(({ data }) => {
          if (data.mcode === "m0000000") {
            this.$toast(this.$t("m.Modifiedsuccess"));
            this.$router.push("/account");
          } else if (data.mcode === "PUB_AUTH_0000062") {
            this.$toast(this.$t("m.Newpass"));
          } else if (data.mcode === "PUB_AUTH_0000054") {
            this.$toast(this.$t("m.Passworderror"));
          } else if (data.mcode === "PUB_AUTH_0000051") {
            this.$toast(this.$t("m.Passwordformaterror"));
          } else if (data.mcode === "PUB_AUTH_0000055") {
            this.$toast(this.$t("m.Passworddoes"));
          } else {
            this.$toast(this.$t("m.Changefailed"));
          }
        });

      }

    },
    shares() {
      this.share = true

    },
    closeshare() {
      this.share = false

    },
     

    getdata() {
      // this.$store.commit("showLoading");
      this.$http
        .get(api.AccountURL)
        .then(({ data }) => {
          if (data.code === 0) {
            // this.$store.commit("hideLoading");
            this.accountList = [];
            this.accountList.push(data.data);
            localStorage.setItem("balance", data.data.balance);
            console.log(this.accountList, " this.accountList");
          } else {
          }
        })
        .catch((error) => {
          // this.$store.commit("hideLoading");
        });
    },
    logout() {
      this.$http.post(api.LogoutURL).then(({ data }) => {
        if (data.code == 0) {
          // sessionStorage.clear();
          // localStorage.clear();
          localStorage.removeItem("token");
          this.delUserId();
          this.delUser();
          this.delAccountName();
          // this.deleteOpen()
          // this.deleteSymbol()
          // this.deleteArr()
          // this.deleteorder()
          // this.delToken();
          this.$router.push("/login");
        }
      });
    },
    history() {
      this.$router.push("/history");
    },
    toggle() {
      this.$router.push("/toggletransaction")

    },
    changePassword() {
      // this.$router.push("/changepassword");
      this.changepass = true
    },
    language() {
      // this.$router.push({ name: "language" });
      this.lang = true;
    },
    closecustomer() {
      this.customerdata = false;
    },
    closepassword() {
      this.changepass = false
      this.data.origin = ""
      this.data.newPwd = ""
      this.data.verifyPwd = ""
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
      this.customerdata = true
      // this.$router.push("/customer");
    },
  },
};
</script>