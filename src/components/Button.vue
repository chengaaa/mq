<template>
<div>
     <mt-button type="default" size="large" class="mt-button"  >
    <slot name="login"></slot>
     </mt-button>
     
     </div>
</template>
<style lang="scss">
 .mt-button {
     //    height: 200px;
     //    font-size: 30px;
        // margin-bottom: 25px;
        background: #ff6537;
        color: white;
        
      }
    
</style>
<script>
export default {
    data() {
         return {
              isDisabled: false
             
         }
    }
}
</script>