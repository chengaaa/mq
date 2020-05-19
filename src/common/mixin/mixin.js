import { mapMutations } from "vuex";
var api = require("../../api/api")
export default {
    data() {
        return {
            name: 'mixin',
            list: [],
        }
    },
    created() {
        // console.log('mixin...', this.name);
        this.$http.get(api.MarketURL).then(({ data }) => {
            this.all = data.data;
            //  console.log(this.all,"shazi ")
            for (var i = 0; i < this.all.length; i++) {
                //  console.log(this.all[i],"zuil")
                this.all[i].bid = "0.00";
                this.all[i].ask = "0.00";
            }
            this.setArr(this.all);
        });
    },
    mounted() { },
    methods: {
        ...mapMutations(["setArr"]),

    }


}