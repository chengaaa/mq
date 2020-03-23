import { mapMutations } from "vuex";
import { baseURL1,baseURL2 } from "../../utls";



export default {
    data() {
        return {
            name: 'mixin',
            list: [],
        }
    },
    created() {
        console.log('mixin...', this.name);
      
        this.$http.get(baseURL1 + "/market/symbols").then(({ data }) => {
            this.list = data.data;
            //    console.log(data);
       this.setAddall(this.list)
            
              
          });
    },
    mounted() { },
    methods: {
        ...mapMutations(["setAddall"]),

    }


}