<template>
  <div class="content">
    <div class="uni-form-item uni-column input-phone">
      <image src="../../static/pull.png" mode="" @tap="pull"></image>
      <div style="width:100%;color: #DD524D;">{{phonetittle}}</div>
      <input class="uni-input" @input="onKeyInput" placeholder="请输入手机号" />
    </div>
    <div class="international" > 
      <div v-for="(item,index) in listitem" :key="index">
        <div class="" @click="phone(item)">
          <p>{{item.en}}</p>
          <p>({{item.cn}})</p>
          <p>{{item.code}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import indexList from '../../utls'
  export default {
    data() {
      return {
       inputValue: '',
       listitem:indexList.list,
       show:false,
       phonetittle:'(中国)+86',
      }
    },
    onLoad() {

    },
    methods: {
        onKeyInput(event) {
           this.inputValue = event.target.value
        },
        pull(){
          this.show = this.show == false?true:false
        },
        phone(item){
          this.phonetittle = '('+item.cn +')'+ item.code
          this.code = item.code
          console.log(this.code,"啊哈哈哈")
        },
    }
  }
</script>

<style>
  .content {
    padding: 100rpx 50rpx;
    color: #666;
    font-size: 35rpx;
  }
  .international{
    width: 100%;
    height: 600rpx;
    overflow: scroll;
    font-size: 35rpx;
    line-height: 60rpx;
    margin-top: 20rpx;
    border: 1px solid #808080;
    border-radius: 10rpx;
  }
  text{
    padding: 20rpx;
  }
  image{
    width: 50rpx;
    height: 50rpx;
    padding-left: 20rpx;
  }
  .input-phone{
    border: 1px solid #808080;
    border-radius: 10rpx;
    display: flex;
  }
</style>
