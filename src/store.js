import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({ storage: localStorage })
export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : "",
    tabbarShow: true,
    arr: [],
    dataArr: [],
    order: [],
    contractsLists: [],
    mydata: [],
    mydata2:[],
    //60条数据
    addall: [],
    // userId:"",
    LOADING: false,
    user: "",
    depositAmount: "",
    accountName: "",
    max: "",
    max1: "",
    max2: "",
    low: "",
    low1: "",
    low2: "",
    actions: [],
    actionss: [],
    eng: ""
  },
  getters: {
    getTabbarShow(state) {
      return state.tabbarShow
    },
    getActive(state) {
      return state.active
    }
  },
  mutations: {
    //存储token
    setToken(state, token) {
      state.Authorization = token;
      // localStorage.setItem("Authorization",token.Authorization);    
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    delUserId(state) {
      state.userId = ""
    },
    //控制tabbar显隐
    updateTabbarShow(state, payload) {
      state.tabbarShow = payload
    },
    delToken(state) {
      state.Authorization = '';
      window.localStorage.removeItem(state)    //删除token
    },
    setArr(state, arr) {
      state.arr = arr;
    },
    setdataArr(state, dataArr) {
      state.dataArr = dataArr;
      // console.log("dataArr", dataArr)
    },
    setorder(state, order) {
      state.order = order
    },
    setcontractsList(state, contractsLists) {
      state.contractsLists = contractsLists
    },
    setAddall(state, addall) {
      state.addall = addall
    },
    //mydata
    MYDATA(state, mydata) {
      state.mydata = mydata;
    },
    //清空mydata
    RESET(state) {
      state.mydata = []
    },
     //mydata2
     MYDATA2(state, mydata2) {
      state.mydata2 = mydata2;
    },
    //清空mydata
    RESET2(state) {
      state.mydata2 = []
    },
    //控制loading
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    },
    //baseURL2
    setUser(state, user) {
      state.user = user
    },
    //userid
    delUser(state) {
      state.user = ""
    },
    //存款金额
    setDepositAmount(state, depositAmount) {
      state.depositAmount = depositAmount;
    },
    //accountName
    setAccountName(state, accountName) {
      state.accountName = accountName
    },
    setMax(state, max) {
      state.max = max
    },
    setMax1(state, max1) {
      state.max1 = max1
    },
    setMax2(state, max2) {
      state.max2 = max2
    },
    setLow(state, low) {
      state.low = low
    },
    setLow1(state, low1) {
      state.low1 = low1
    },
    setLow2(state, low2) {
      state.low2 = low2
    },
    setActions(state, actions) {
      state.actions = actions
    },
    setActionss(state, actionss) {
      state.actionss = actionss
    },
    //保存中英文名称
    setEng(state, eng) {
      state.eng = eng
    }

  },
  actions: {
    SAVE_MYDATA({ commit }, mydata) {
      commit("MYDATA", mydata)
    },
    REAET_MYDATA({ commit }) {
      commit("RESET")
    },
    SAVE_MYDATA2({ commit }, mydata2) {
      commit("MYDATA2", mydata2)
    },
    REAET_MYDATA2({ commit }) {
      commit("RESET2")
    },

  },
  //vuex持久化
  plugins: [vuexLocal.plugin]

})
