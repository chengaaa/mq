import { mapMutations } from "vuex";
import store from "../../store";
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
            console.log(this.all, "shazi ")
            for (var i = 0; i < this.all.length; i++) {
                // this.all[i].ask = "0.00"
                // this.all[i].bid = "0.00"
                //         this.all[i].bid = data1.bid
                if (store.state.mydata.length != 0) {


                    for (var j = 0; j < store.state.mydata.length; j++) {
                        var data0 = this.all[i]
                        var data1 = store.state.mydata[j]
                        if (data0.symbolName === data1.symbol) {
                            this.all[i].ask = data1.ask
                            this.all[i].bid = data1.bid
                        } else {
                            return
                        }
                    }
                    console.log(this.all[i], "zuil")
                    console.log(store.state.mydata[j], "hahhahahhaha")

                } else {

                    this.all[i].ask = "0.00";
                    this.all[i].bid = "0.00";
                }

            }

            this.setArr(this.all);
        });
    },
    mounted() { },
    methods: {
        ...mapMutations(["setArr"]),

    }


}