import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import fastclick from 'fastclick'
import Vant from 'vant';
// import axios from 'axios';
import axios from './http';
import qs from 'qs'
Vue.prototype.$qs = qs;
import ws from './tools/websocket'

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import MintUI from 'mint-ui'
import 'vant/lib/index.css';
import "./assets/icon/iconfont.css";
import 'lib-flexible'
import 'mint-ui/lib/style.css'
import './registerServiceWorker'
fastclick.attach(document.body)
Vue.use(MintUI);
Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.ws = ws;
// axios.defaults.timeout = 5000 // 请求超时
// axios.defaults.baseURL = '/api'
const i18n = new VueI18n({
  locale: localStorage.getItem('lang')||'zh-CN',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'en-US': require('./common/lang/en')    // 英文语言包
  }
})



new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
