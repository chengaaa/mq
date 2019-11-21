import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : "",
    tabbarShow: true,
    
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
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    //控制tabbar显隐
    updateTabbarShow(state, payload){
      state.tabbarShow = payload
    },
    logout() {
      localStorage.removeItem('Authorization');
      state.Authorization = null
    }


  },
 
  actions: {

  }

})
