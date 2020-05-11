<template>
  <div class="customer">
    <div class="customer-title">
      <van-icon name="arrow-left" color="#333333" id="van-icon" @click="home" />
      <h2>{{$t('m.ContactCustomer')}}</h2>
    </div>
    <div class="flex">
       <i class="iconfont icon-weixin"></i>
       <p>{{$t('m.AddWechat')}}: 15817080296</p>
    </div>
    <div class="flex">
       <i class="iconfont icon-telegram"></i>
       <p>{{$t('m.AddTelegram')}}: 15817080296</p>

    </div>
  </div>
</template>
<style lang="scss" scoped>
.customer {
  padding-left: 0.32rem /* 24/75 */;
  padding-right: 0.32rem /* 24/75 */;
  .customer-title {
    display: flex;
    align-items: center;
    height: 1.173333rem /* 88/75 */;
    margin-bottom: 0.4rem /* 30/75 */;
    h2 {
      flex: 1;
      text-align: center;
      font-size: 0.453333rem /* 34/75 */;
      color: #333333;
    }
    #van-icon {
      width: 0.1rem;
      font-size: 0.56rem /* 42/75 */;
    }
  }
  .flex {
      display: flex;
      justify-content: space-between;
      height: 1.6rem /* 120/75 */;
      border-bottom: 1px solid #eeeeee;
      align-items: center;
      font-size: .48rem /* 36/75 */;
      .icon-weixin {
          font-size: .8rem /* 60/75 */;
          color:#13c6fe;
      }
      .icon-telegram {
          font-size: .8rem /* 60/75 */;
          color:#00ca0c;

      }
  }
}
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    home() {
      this.$router.go(-1);
    }
  }
};
</script>