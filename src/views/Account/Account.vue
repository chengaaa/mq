<template>
  <div class="account">

    <loading v-show="LOADING"></loading>

      <div class="account-A">
          <h3>{{$t("m.Account")}}</h3>
          <!-- <a href="http://www.blitzbook8.com/">账户</a> -->
      </div>
      <div class="account-B" v-for="(item,index) in accountList" :key="index">
          <h5 >{{item.accountName}}</h5>
          <span>{{item.account}}</span><span>-{{item.group}}</span>
          
      </div>
      <div class="account-C" @click=entry>入金</div>
      <div class="account-C">出金</div>
      <div class="account-C" @click="language">
         {{$t("m.Interface")}}
      </div>
     
      <div class="account-D">
          <router-link tag="h6" @click.native="logout" to="/">{{$t("m.Logout")}}</router-link>
      </div>


    
  </div>
</template>
<style lang="scss" scoped>
.account {
    .account-A {
        width: 100%;
        height: 1.333333rem /* 100/75 */;
        background: white;
        font-size: .466667rem /* 35/75 */;
        text-align: center;
        line-height: 1.466667rem /* 110/75 */;
        margin-bottom: .8rem /* 60/75 */;
        
    }
    .account-B {
        background: white;
        width: 100%;
        padding: .266667rem /* 20/75 */  0rem /* 0/75 */;
        box-sizing: border-box;
        text-align: center;
        line-height: .4rem /* 30/75 */;
        border-bottom:.013333rem /* 1/75 */ solid #b9b6b6;
        h5 {
            font-size: .466667rem /* 35/75 */;
        }
        span {
            font-size: .333333rem /* 25/75 */;
        }
    }
    .account-C {
        height: 1.333333rem /* 100/75 */;
        background: white;
        font-size: .4rem /* 30/75 */;
        line-height: 1.333333rem /* 100/75 */;
        margin-bottom: .8rem /* 60/75 */;
        padding-left:.266667rem /* 20/75 */;
        font-size: .48rem /* 36/75 */;

    } 
    .account-D {
        height: 1.2rem /* 90/75 */;
        background: white;
        font-size:.4rem /* 30/75 */;
        padding-left:.266667rem /* 20/75 */;
        line-height: 1.2rem /* 90/75 */;

        h6 {
        font-size: .48rem /* 36/75 */;

        }



    }
}

</style>
<script>
import { mapMutations } from "vuex";
import Loading from "../../components/Loading";
import { baseURL1,baseURL2 } from "../../utls";


import {mapState} from 'vuex'





export default {
  data() {
    return {
      accountList: [],
      accounts:[]
    };
  },
  created() {
      this.$store.commit('showLoading')
     this.getdata();
     console.log(this.$store.state.word,"word")
  },
  components: {
Loading
  },
  computed:{

  ...mapState([
                'LOADING'
            ])
  },
  
  methods: {
    ...mapMutations(["delToken"]),
    ...mapMutations(["delUserId"]),
    ...mapMutations(["delUser"]),
    ...mapMutations(["delPassword"]),

    getdata() {
      this.$store.commit('showLoading')
  
      this.$http.get(baseURL1 + "/account").then(({ data }) => {
         this.$store.commit('hideLoading')
        console.log(data,"dadtadtadta");
        this.accountList.push(data.data)
        console.log(this.accountList);
      });
      

     
    },
    logout() {
        this.$http.post(baseURL1 +"/logout").then(({data})=> {
           console.log(data)
           if (data.code == 0) {
               this.delToken();
               this.delUserId();
               this.delUser();
               this.delPassword();
               this.$router.push("/loginphone")
           }
        })
    },
    language() {
      this.$router.push({name:"language"})
    },
    entry() {
      this.$router.push("/entry")

    }
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#eee");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  }
};
</script>