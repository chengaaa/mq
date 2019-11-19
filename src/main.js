import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import fastclick from 'fastclick'
import Vant from 'vant';
import axios from 'axios';
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
axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = '/api'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
