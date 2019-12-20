<template>
  <div class="detail">
      <div  v-for="(item,index) in list" :key="index">
    <div class="detail-a">
      <Navheader class="navbar" ref="child" @click="backgo"></Navheader>
      <h2>{{item.symbolName}}</h2>
    </div>
    <div class="detail-b">
      <p>{{item.description.toUpperCase()}}</p>
    </div>
    <div class="detail-c">
      <div class="top">
        <p>小数位</p>
        <span>{{item.digits}}</span>
      </div>
      <div class="bottom">
        <p>合约数量</p>
        <span>{{item.contractSize}}</span>
      </div>
    </div>
  </div>
  </div>
</template>
<style lang="scss" scoped>
body {
  background: #efeef3;

  .detail {
    background: #efeef3;

    .detail-a {
      width: 100%;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      background: white;
      //  padding-top: .266667rem /* 20/75 */;
      h2 {
        text-align: center;
        font-size: 0.426667rem /* 32/75 */;
        // font-weight: 600;
      }
    }
    .detail-b {
      padding: 0.213333rem /* 16/75 */ 0rem /* 0/75 */ 0.213333rem /* 16/75 */
        0.586667rem /* 44/75 */;
      p {
        font-size: 0.293333rem /* 22/75 */;
      }
    }
    .detail-c {
      height: 2.4rem /* 180/75 */;
      background: white;
      border-bottom: 1px solid #666666;
      p {
        font-size: 0.373333rem /* 28/75 */;
      }
      span {
        font-size: 0.333333rem /* 25/75 */;
      }

      .top {
        height: 1.186667rem /* 89/75 */;
        line-height: 1.186667rem /* 89/75 */;
        margin-left: 0.466667rem /* 35/75 */;
        padding-right: 0.4rem /* 30/75 */;
        border-bottom: 1px solid #666666;
        display: flex;
        justify-content: space-between;
      }
      .bottom {
        height: 1.186667rem /* 89/75 */;
        line-height: 1.186667rem /* 89/75 */;
        display: flex;
        justify-content: space-between;
        padding-right: 0.4rem /* 30/75 */;
        padding-left: 0.466667rem /* 35/75 */;
      }
    }

    .navbar {
      padding-top: 0.266667rem /* 20/75 */;
    }
  }
}
</style>
<script>
import Navheader from "../../components/Navheader";
// import mixin from "../../common/mixin/mixin.js";
export default {
    //  mixins: [mixin],
    data() {
        return{
        list:[]
        }
    },
  components: {
    Navheader
  },
  methods: {
    backgo() {
      this.refs.child.navback();
    }
  },
  created() {
    let params = this.$route.params.id;
    console.log(params);
    this.$http.get("/market/symbol/" + params).then(({ data }) => {
        this.list.push(data.data)
        console.log(this.list)
      
    });
  }
};
</script>