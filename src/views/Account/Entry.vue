<template>
  <div class="entry">
    <div class="entry-title">
      <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home" />
      <h2>{{$t('m.Deposit')}}</h2>
    </div>
    <div class="flex">
    <div class="flex-p">
      <p>{{$t('m.Enter')}}</p>
      <input type="text" v-model="num" @input="check" placeholder="USDT">
    </div>
    <div class="next" style="text-align:center">
    <input style="color:white" type="button" :value="$t('m.Next')" @click="next" v-show="show" >
    <input style="background:#88befa;color:white" type="button" :value="$t('m.Next')" v-show="!show">
    </div>
    </div>
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
      font-size: 0.493333rem /* 37/75 */;
      color: #333333;
    }
    #van-icon {
      width: 0.1rem;
      font-size: 0.56rem /* 42/75 */;
    }
  }
   .flex {
     position: absolute;
    left: 50%;
    // bottom: 50%;
    transform: translate(-50%);
      .flex-p {
        font-size: 20px;
        text-align: center;
        margin-top: .533333rem /* 40/75 */;
        input {
          width: 5.066667rem /* 380/75 */;
          height: .933333rem /* 70/75 */;
          border: 1px solid black;
          margin-top: .4rem /* 30/75 */;
          margin-bottom: .666667rem /* 50/75 */;
          appearance: none;
        }
      }
        .next {
          input {
            width: 6.666667rem /* 500/75 */;
            height: 1.733333rem /* 130/75 */;
            // border: 1px solid black;
            background: #127df6;
            font-size: 18px;
            appearance: none;
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
      this.$router.push({name:"entrys",params:{id:this.num}})
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
