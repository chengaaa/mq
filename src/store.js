import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { reset } from '_ansi-colors@3.2.4@ansi-colors'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({storage: window.localStorage })

export default new Vuex.Store({
  state: {
     Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : "",
    tabbarShow: true,
    arr:[],
    dataArr: [],
    order:[],
    contractsLists:[],
    mydata: [],
    //60条数据
    addall:[]
    
  },
  getters:{
    getTabbarShow(state){
        return state.tabbarShow
    },
    getActive(state) {
        return state.active
    }
  },
  mutations: {
     //存储token
    setToken (state,token) {
      state.Authorization = token;
      // localStorage.setItem("Authorization",token.Authorization);    
    },

    //控制tabbar显隐
    updateTabbarShow(state, payload){
      state.tabbarShow = payload
    },
  
    delToken (state) {
      state.Authorization = '';
      window.localStorage.clear(state)    //删除token
    },
    setArr (state, arr) {
      state.arr = arr;
      console.log("store",arr);
    },
    setdataArr (state, dataArr) {
      state.dataArr = dataArr;
      // console.log("dataArr", dataArr)
    },
    setorder(state,order) {
      state.order = order
    },
    setcontractsList(state,contractsLists) {
     state.contractsLists = contractsLists
    },

    setAddall(state, addall) {
      state.addall = addall
    },

    //mydata
    MYDATA (state,mydata) {
       state.mydata = mydata;
    },
    //清空mydata
    RESET (state) {
      state.mydata = []
    }



  },
 
  actions: {
    SAVE_MYDATA ({commit},mydata) {
      commit("MYDATA",mydata)
    },
    REAET_MYDATA ({commit}) {
      commit("RESET")
    }
  },
  //vuex持久化
  plugins: [vuexLocal.plugin]

})
