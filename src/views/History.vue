<template>
    <div>History page</div>
</template>
<style lang="scss">
    
</style>
<script>
export default {
    created() {

    
     this.$http({
           method: 'get',
           url:'/market/symbol/USDCNH',
        //    headers: {
        //     Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzYWNjIjoiMjY5aG9peDdBWGs9IiwiaWF0IjoxNTc0NDE4MzczfQ.oOBHxSU7pKmfjK8GDgXILyPE3BM4_yxOfajK2kMr1Sk"
             
        //    }
       }).then((data) => {
           console.log(data)
       })
       }
}
</script>