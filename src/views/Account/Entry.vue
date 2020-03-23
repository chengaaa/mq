<template>
  <div class="entry">
    <div>
      <div>入金金额</div>
      <input type="number" placeholder="请输入金额" id="blance" />
      <div id="blance1" class="message none"></div>
    </div>
    <div>
      <div>选择币种</div>
      <select class="bs-select form-control" v-model="selecte">
        <option selected>USDT</option>
      </select>
    </div>
    <div>
      <label for>备注</label>
      <input type="text" placeholder="申请备注" id="comment" />
      <div id="blance2" class="message none"></div>
    </div>
    <div @click="apply">提交申请</div>
  </div>
</template>
<style lang="scss">
.entry {
  input {
    border: 1px solid black;
    &:focus {
      border: 1px solid #ff6537;
    }
  }
  #blance1 {
    color: red;
    font-size: 0.32rem /* 24/75 */;
    position: relative;
    //   top: -0.666667rem;
    //   left: 0.266667rem /* 20/75 */;
  }
  #blance2 {
    color: red;
    font-size: 0.32rem /* 24/75 */;
    position: relative;
    //   top: -0.666667rem;
    //   left: 0.266667rem /* 20/75 */;
  }
}
</style>
<script>
import { checkEntry } from "../../tools/check.js";

export default {
  data() {
    return {
      selecte: "USDT"
    };
  },
  methods: {
    apply() {
      checkEntry();
      var blance = document.getElementById("blance").value;
      var comment = document.getElementById("comment").value;
      if (blance === "" || comment === "") {
        return;
      } else {
        console.log("好了");
      }
    }
  }
};
</script>