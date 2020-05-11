<template>
   
    <div class="containers" v-show='isShow' >
    <div class="popup">
    <p >{{msg}}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Toastss',
    data() {
        return {
            msg: '',
            isShow: true
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .containers {
    position: fixed;
     top: 8rem /* 480/75 */;
    bottom: 0;
    left: 2.6rem /* 170/75 */;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.666667rem /* 350/75 */;
    height:2.666667rem /* 200/75 */;
    border-radius: 0.1rem;
  }
  .popup {
    // background: #FFFFFF;
    // box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    color: white;
    p {
    font-size: .48rem /* 36/75 */;
    text-align: center;

    }
  
  }
</style>