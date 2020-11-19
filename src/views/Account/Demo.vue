<template>
  <div>
    <input style="width:100px;height:50px;border:1px solid black" type="text" v-model="one" @blur="ones">
    <input style="width:100px;height:50px;border:1px solid black" type="text" v-model="two" @blur="twos">
    <input style="width:100px;height:50px;border:1px solid black" type="text" v-model="three" @blur="threes">
  </div>
</template>
<script>
export default {
  data() {
    return {
      one:"",
      two:"",
      three:""
    }
  },
  methods: {
    ones() {
      console.log(this.two,this.three,"999999")
    },
    twos() {
      console.log(this.one,this.three,"999999")

    },
    threes() {
      console.log(this.two,this.one,"999999")

    }
    
  },
}
</script>