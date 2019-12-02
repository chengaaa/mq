<template>
<div class="fixedA">
  <div class="fixed">
    <div class="fixed-left">
        <h1>BLITZ BOOK</h1>
        <P>移动交易，随时随地</P>
      
     
    </div>
    <div class="fixed-button">
      
      <input type="button" value="下载APP" @click="but">
    </div>
    
  </div>
   <!-- <div class="enlig">
      <h2>huobi global</h2>
  </div> -->
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
  padding: 0rem /* 0/75 */ .666667rem /* 50/75 */;
  align-items: center;
  box-sizing: border-box;
  .fixed-left {
     h1 {
          font-weight: 700;
      font-size: .533333rem /* 40/75 */;
      margin-bottom: .2rem /* 15/75 */;
     }
     p {
         font-size: .293333rem /* 22/75 */;
         text-align: center;
     }
     
  }
  .fixed-button {
      input {
          -webkit-appearance:none;
width: 2.666667rem /* 200/75 */;
      height: .933333rem /* 70/75 */;
    //   background:rgba($color: #ff7349, $alpha: 0.95);
      background: #ff6537;

      border-radius: .666667rem /* 50/75 */;
      color: white;
      font-size: .373333rem /* 28/75 */;
      font-weight: 700;
      }
      
  }
}

}
</style>
<script>
export default {
    data() {
        return{

        }
    },
    methods: {
        but() {
           this.$router.push('/download')
        }
    }
};
</script>