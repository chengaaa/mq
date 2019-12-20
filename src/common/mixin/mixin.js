import { mapMutations } from "vuex";


export default {
    data() {
        return {
            name: 'mixin',
            list: [],
        }
    },
    created() {
        console.log('mixin...', this.name);
      
        this.$http.get("/market/symbols").then(({ data }) => {
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