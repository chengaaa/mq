<template>
  <div>
    <div @click="ha">nihao</div>
  </div>
</template>
<style lang="">
</style>
<script>
import { Toast } from "mint-ui";
export default {
  components: {},
  methods: {
    ha() {
      // this.$toast("下单成功")
      Toast({
        message: "下单成功",
        duration: 1000
      });
    }
  }
};
</script>