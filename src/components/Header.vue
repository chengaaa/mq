<template>
    <div class="header">
        <!-- <router-link to="/delete"> -->
    <div class="header-left">
        <van-icon name="edit"  color="blue" id="van-icon"/>
    </div>
    <!-- </router-link> -->
    <div class="flex"> 
    <slot name="header"></slot>
    </div>
   
    <router-link to="/addall">
    <div class="header-right">
       <van-icon name="plus" color="blue" id="van-icon" />
      
    </div>
    </router-link>
    </div>
</template>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    padding: .4rem /* 30/75 */ .266667rem /* 20/75 */.4rem /* 30/75 */ .266667rem /* 20/75 */;
    border-bottom: .013333rem /* 1/75 */ solid black;
    .header-left {
        flex-grow:1;
        width:28%;
       
    }
    .header-right {
        flex-grow:1;
        width:15%;

    }
    .flex {
        flex-grow: 14;
        width: 57%;
       

    }
   
    #van-icon {
        font-size: .733333rem /* 55/75 */;
    }
}
    
</style>
<script>
export default {
    
}
</script>