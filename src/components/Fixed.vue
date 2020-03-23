<template>
  <div class="fixedA">
    <div class="fixed">
      <div class="fixed-left">
        <h1>BLITZ BOOK</h1>
        <P>移动交易，随时随地</P>
      </div>
      <div class="fixed-button">
        <input type="button" :value="$t('m.DownloadAPP')" @click="but" />
      </div>
    </div>
    <!-- <div class="enlig">
      <h2>huobi global</h2>
    </div>-->
  </div>
</template>
<style lang="scss" >
.fixedA {
  width: 100%;

  .fixed {
    width: 100%;
    height: 2rem /* 150/75 */;
    //   background: rgba(0, 0, 0, 0.7);
    background: #2e2e2f;

    color: white;
    display: flex;
    justify-content: space-between;
    padding: 0rem /* 0/75 */ 0.666667rem /* 50/75 */;
    align-items: center;
    box-sizing: border-box;
    .fixed-left {
      h1 {
        font-weight: 700;
        font-size: 0.533333rem /* 40/75 */;
        margin-bottom: 0.2rem /* 15/75 */;
      }
      p {
        font-size: 0.293333rem /* 22/75 */;
        text-align: center;
      }
    }
    .fixed-button {
      input {
        -webkit-appearance: none;
    width: 2.65rem;
    height: 0.933333rem;
    background: #2e2e2f;
    /* border-radius: 0.666667rem; */
    color: white;
    font-size: 0.373333rem;
    /* font-weight: 700; */
    /* border-color: white; */
    border: 1px solid white;
      }
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
    but() {
      this.$router.push("/download");
    }
  }
};
</script>