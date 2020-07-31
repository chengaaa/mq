<template>
<div class="apply">
    <div class="apply-all">
        <!-- <div class="apply-title"> -->
        <!-- <h2>{{$t('m.Hello')}},</h2>
     <p>{{$t('m.Welcometo')}} BLITZ BOOK 8</p>
        <span>{{$t('m.Use')}}</span> -->
        <!-- </div> -->

        <!-- <div class="button"> -->
            <!-- <input type="button" :value="($t('m.Login'))" @click="login"> -->
            <!-- <input type="button" :value="($t('m.Register'))" @click="register"> -->
        <!-- </div> -->
       {{$t('m.Charts')}}...
    </div>
</div>

</template>
<style lang="scss" scoped>

    .apply {
    width: 100%;
    height: 100%;
    position: fixed;
    //  background:#127df6;
    
     .apply-all {
         width:80%;
         height: 7.2rem /* 540/75 */; 
         margin: 0 auto;
         text-align: center;
         position:relative;
         top:50%;
         margin-top: -2rem /* 300/75 */;
         font-size: 21px;
         .apply-title {
             margin-bottom: 3.066667rem /* 230/75 */;
             font-size:.56rem /* 42/75 */;
             color: white;
             h2,p{
               margin-bottom: .32rem /* 24/75 */;
             }
         }
         .button {
             input {
                 width: 3.4rem /* 255/75 */;
                 height: 1.2rem /* 90/75 */;
                 border-radius: 4px;
                 font-size: .373333rem /* 28/75 */;
                 appearance: none;
             }
             :nth-child(1) {
                 margin-right: .32rem /* 24/75 */;
                 background: white;
                 color:#127df6;
             }
               :nth-child(2) {
                 background: #127df6;
                 border:1px solid white;
                 color:white;

             }
         }
         
     }
    }
</style>
<script>
export default {
 
}
</script>
