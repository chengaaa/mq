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
    },
    methods: {
            
          sendisDisabled(){
             //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
             this.$emit('func',this.isDisabled)
         }
    }
}
</script>