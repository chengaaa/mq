<template>
    <div class="change">  
 <div>原始密码</div>  
  <input type="password" v-model="data.origin" >
    <div>新密码</div>
    <input type="password" v-model="data.newPwd">
   <div>确认密码</div>
   <input type="password" v-model="data.verifyPwd">
   <div class="p">

   
   <div @click="finish">完成</div>

   </div>
    </div>
</template>
<style lang="scss">
   .change {
       div {
           font-size:.48rem /* 36/75 */;

       }
       input{
           width: 4rem /* 300/75 */;
           height:.666667rem /* 50/75 */;
           border:1px solid #000000;
           -webkit-appearance: none;
           font-size:.32rem /* 24/75 */;
           border-radius: .053333rem /* 4/75 */;
       }
       .p {
           div {

          
           width: 1.333333rem /* 100/75 */;
           height: .666667rem /* 50/75 */;
           background: turquoise;
            }
       }
   } 
</style>

<script>
import { baseURL1, baseURL2 } from "../../utls";

export default {
    data() {
        return {
       data:{
        origin:"",
        newPwd:"",
        verifyPwd:"",
        userId:""
       }
       
        }

    },
    methods:{
        finish() {
           this.data.userId = this.$store.state.user;
            this.$http.post(baseURL2 + "/user/pwd/set",
             this.data,{
                  headers: {
              "x-api-token": "TypwwEg8E21FlKYZ",
              "x-api-tenantid": "T002509",
              "Content-Type": "application/json",
              "cache-control": "no-cache"
            }
             }
            ).then(({data})=>{
                console.log(data,"o")
                if(data.mcode === "m0000000") {
                    this.$toast(this.$t('m.Modifiedsuccess'))
                    this.$router.push("/account")
                } else if(data.mcode === "PUB_AUTH_0000062") {
                    this.$toast(this.$t('m.Newpass'))
                } else if(data.mcode === "PUB_AUTH_0000054") {
                    this.$toast(this.$t('m.Passworderror'))

                } else if (data.mcode === "PUB_AUTH_0000051") {
                   this.$toast(this.$t('m.Passwordformaterror')) 
                } else if (data.mcode === "PUB_AUTH_0000055") {
                   this.$toast(this.$t('m.Passwordsareinconsistent')) 
                    
                }
            })
        }
    }
}
</script>