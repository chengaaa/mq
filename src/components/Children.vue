<template>
    <div>
       <button>{{message}}</button>
       <button @click="add">点我</button>
    </div>
</template>

<script>
    export default {
        props:["message"],
        methods: {
            add() {
                this.$emit("show", "李王茹")
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>