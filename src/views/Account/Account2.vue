<template>
<section>

    <Search :searchList="searchList" @selectFunc="selectFunc" :selectValue="selectValue"></Search>
</section>
</template>
<script>
import Search from "../../components/Search"
export default {
    data(){
        return {
            searchList:["你好","新三国"],
             selectValue: {
          data: '1'
        },
        // 通过emit修改，规范写法
        selectValue2: ''
        }

        
    },
    components:{
        Search
    },
    methods:{
        selectFunc(value) {
        this.selectValue2 = value
        console.log(this.selectValue)
        console.log(this.selectValue2)
      }
    }
    
}
</script>
<style lang="scss">
    
</style>