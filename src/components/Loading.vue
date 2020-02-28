<template>
<div class="loading">
<van-loading class="lo" type="circular"  color="#ff6537" size="48"/>
</div>
</template>
<style lang="scss">
.loading {
   position: fixed;
    top:0;
    left:0;
    z-index:121;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    // background: white;
    display: table-cell;
    vertical-align: middle;
      text-align: center;
      .lo {
       margin: 7.5rem auto;

      }

 
}
    
</style>
<script>
export default {
    
}
</script>