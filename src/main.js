import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import { Tabbar, TabbarItem, Icon,Loading,ActionSheet,Field,Popup,DatetimePicker,Picker  } from 'vant';
import axios from './http';
import toast from './components/Toasts'
import clipboard from 'clipboard';
import ws from './tools/websocket'
import VueI18n from 'vue-i18n'
import './assets/icon/iconfont.css';
import 'lib-flexible'
import './registerServiceWorker';
fastclick.attach(document.body)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Loading);
Vue.use(ActionSheet);
Vue.use(Field);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Picker);
Vue.use(VueI18n)
Vue.use(toast)
console.log(toast,"98")
Vue.config.productionTip = false
Vue.prototype.$http = axios;
//注册到vue原型上
Vue.prototype.clipboard = clipboard;
Vue.prototype.ws = ws;
// axios.defaults.timeout = 5000 // 请求超时
const i18n = new VueI18n({
  locale: localStorage.getItem('lang')||'zh-CN',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'en-US': require('./common/lang/en'),   // 英文语言包
    'tc-US': require('./common/lang/tc'),   // 繁體语言包
  },
  silentTranslationWarn: true,
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
