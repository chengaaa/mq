<template>
  <div class="delete">
    <div class="header">
      <router-link to="/quotation">
        <div class="header-left">
          <van-icon name="edit" color="blue" id="van-icon" />
        </div>
      </router-link>
      <router-link to @click.native="deletea()">
        <div class="header-right">
          <van-icon name="delete" color="blue" id="van-icon" />
        </div>
      </router-link>
    </div>
    <div id="par">
      <div v-for="(item,index) in deleteArr" :key="index">
        <div v-for="(items,indexs) in item" :key="indexs">
          <van-checkbox-group v-model="result">
            <van-checkbox
              :name="items.symbolName"
              icon-size="0.4rem"
              id="vancheckbox"
            >{{items.symbolName}}</van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.van-checkbox__icon .van-icon {
  border: 1px solid black;
}
</style>
<style lang="scss" scoped>
.delete {
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem /* 30/75 */ 0.266667rem /* 20/75 */ 0.4rem /* 30/75 */
      0.266667rem /* 20/75 */;
    border-bottom: 0.013333rem /* 1/75 */ solid black;
    #van-icon {
      font-size: 0.733333rem /* 55/75 */;
    }
  }
  #vancheckbox {
    font-size: 0.373333rem /* 28/75 */;
    height: 1.066667rem /* 80/75 */;
    border-bottom: 1px solid black;
    margin-left: 0.4rem /* 30/75 */;
  }
}
</style>
<script>
import store from "../../store";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      deleteArr: [],
      result: [],
      selected:false
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      console.log(store.state.arr);
      this.deleteArr = JSON.parse(JSON.stringify(store.state.arr));
      console.log(this.deleteArr, "第一个数组");
    },

    deletea(index) {
       this.deleteArr.splice(index,1)
     console.log(this.deleteArr,"777")
    }
  }
};
</script>