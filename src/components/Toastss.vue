<template>
  <div class="container">
    <div class="popup">
   <h5 >{{$t(routerData)}}</h5>
    <p>{{$t(routerData2)}}</p> 
    <!-- <h5 >提交成功</h5>
    <p>你的入金申请已经提交，我们会尽快调整你的账户余额</p> -->
    </div>
    <div class="yes">
    <input type="button" value="OK" @click="back">
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup',
  data() {
      return{
         
      }
  },
  props:['routerData','routerData2'],
  methods:{
   back() {
       this.$router.push("/home")
   }
  }

}
</script>
<style <style lang="scss">
  .container {
   width:6.666667rem /* 500/75 */;

   position: absolute;
   top: 60%;
   left: 50%;
   transform: translate(-3.3rem,-2.2rem);
   color:white;
 
   h5 {
       font-size: .4rem /* 30/75 */;
        text-align: center;  
        margin-bottom: .2rem /* 15/75 */;    
   }
   p {
        text-align: center;  
       font-size: .306667rem /* 23/75 */;
       line-height: .4rem /* 30/75 */;
   }

  .popup {
    height:2rem /* 210/75 */;
   background: rgba(0, 0, 0, .5);
   
   padding:  .666667rem /* 50/75 */ .4rem /* 30/75 */ 0rem /* 0/75 */  .4rem /* 30/75 */  ;
   
  }
  .yes {
      height: 1.066667rem /* 80/75 */;
      line-height:1.066667rem /* 80/75 */ ;
            text-align: center;
       input {
            -webkit-appearance: none;
   background: rgba(0, 0, 0, .7);
width: 100%;
font-size: .466667rem /* 35/75 */;
       }
  }
  }
  
</style>
