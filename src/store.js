import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({storage: window.localStorage })

export default new Vuex.Store({
  state: {
     Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : "",
    tabbarShow: true,
    arr:[],
    dataArr: []
    
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
      state.token = '';
      localStorage.removeItem("Authorization");    //删除token
    },
    setArr (state, arr) {
      state.arr = arr;
      console.log("store",arr);
    },
    setdataArr (state, dataArr) {
      state.dataArr = dataArr;
      console.log("dataArr", dataArr)
    }



  },
 
  actions: {

  },
  //vuex持久化
  plugins: [vuexLocal.plugin]

})
