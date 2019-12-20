<template>
    
  <div id="app">
  <select v-model="selected">
    <option value="A">AA</option>
    <option value="B">BB</option>
    <option value="C">CC</option>
  </select>
  <span>Selected: {{ selected }}</span>


  <input type="radio" id="small" value="small_value" v-model="picked">
  <label for="small">small</label>
  <br>
  <input type="radio" id="big" value="big_value" v-model="picked">
  <label for="big">big</label>
  <br>
  <span>Picked: {{ picked }}</span>
  <div @click="button">按钮</div>
    </div>
   
  

</template>
<style lang="scss">
    
</style>
<script>
export default {
      data() {
    return {
      show: false,
      actions: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '描述信息' }
      ],
      selected: '',
      picked: ''
    };
  },
  created() {
this.getdata()
  },
   methods: {
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
    //   Toast(item.name);
    },
    selectType(event){
   
     this.show = true
    
  },
  getdata() {
      this.$http.get("position/contracts").then(({data})=>{
          console.log(data,"hahahahahaahahh")
      })
  },
  button() {
      let obj = {name:'fiona-SUN'};
    //   console.log( JSON.parse(JSON.stringify(obj)))
let copyObj = JSON.parse(JSON.stringify(obj))
console.log(copyObj)
console.log(obj)
console.log(obj === copyObj)
  }
  }
}
</script>