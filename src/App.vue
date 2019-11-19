<template>
  <div id="app">
    <router-view/>
    
     <tabbar></tabbar>
  </div>
</template>
<style lang="scss">
@import './common/resect.scss';
 * {
   margin: 0;
   padding: 0;
 }
 
body {
  // background: rgba($color: #0000, $alpha: 0.9);
  // min-width: 320px;
  // height: 2000px;
  
 
 
}
  
</style>
<script>
import Tabbar from './components/Tabbar'
export default {
  components: {
    Tabbar
  }
  
}
</script>