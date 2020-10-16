<template>
  <div class="entry">
    <div class="entry-title">
      <van-icon name="arrow-left" color="#3e79dc" id="van-icon" @click="home" />
      <h2>{{$t('m.Deposit')}}</h2>
    </div>
    <div class="flex">
    <div class="flex-p">
      <p>{{$t('m.Enter')}}</p>
      <input type="text" v-model="num" @input="check"><span>USDT</span>
    </div>
    <div class="next" style="text-align:center">
    <input type="button" :value="$t('m.Next')" @click="next" >
    <!-- <input style="background:#88befa;color:white" type="button" :value="$t('m.Next')" v-show="!show"> -->
    </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

.entry {
  background-color: #262626;
  position: fixed;
  bottom: 0;
  top: 0;
  width: 100%;
  .entry-title {
    display: flex;
    align-items: center;
    height: 1.173333rem /* 88/75 */;
    padding-left: 0.32rem /* 24/75 */;
    padding-right: 0.32rem /* 24/75 */;
    border-bottom: 1px solid #3e3e3e;
     h2 {
      flex: 1;
      text-align: center;
      font-size: 0.493333rem /* 37/75 */;
      color: white;
    }
    #van-icon {
      width: 0.1rem;
      font-size: 0.56rem /* 42/75 */;
    }
  }
   .flex {
     width: 100%;
     position: absolute;
    left: 50%;
    // bottom: 50%;
    transform: translate(-50%);
      .flex-p {
        font-size: 20px;
        text-align: center;
        margin-top: 1.533333rem /* 40/75 */;
        input {
          width: 70%;
          height: 1.2rem /* 70/75 */;
          border: 1px solid #4b4b4b;
          margin-top: .4rem /* 30/75 */;
          margin-bottom: .666667rem /* 50/75 */;
          appearance: none;
          background: #262626;
          border-radius: 4px;
          color: white;
        }
        span {
          margin-left: .266667rem /* 20/75 */;
          color: #ffffff;
        }
        p {
          color: #ffffff;
        }
      }
        .next {
          input {
            width: 88%;
            height: 1.4rem;
            // border: 1px solid black;
            background: #2e7bfd;
            font-size: 18px;
            appearance: none;
            color: white;
            border-radius: 4px;
          }
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
      num:"",
      show:false
    };
  },
  created() {
  
  },

  methods: {
      home() {
      this.$router.push("/account");
    },
    next() {
      console.log(this.num)
      if(this.num != '' && this.num >= 0.01) {
        this.$router.push({name:"entrys",params:{id:this.num}})
      } else {
       this.$toast(this.$t("m.Penter"));
      }
    },
    check() {
      if(this.num != '' && this.num >= 0.01 ) {
        this.show = true
      } else {
        this.show = false

      }
      console.log(this.num)
    }
  }
};
</script>
