import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import { Tabbar, TabbarItem, Icon,Loading,ActionSheet,Field,Popup,DatetimePicker,Picker,NoticeBar,Swipe, SwipeItem,Lazyload    } from 'vant';
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
Vue.use(NoticeBar)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
 
Vue.config.productionTip = false
Vue.prototype.$http = axios;
//注册到vue原型上
Vue.prototype.clipboard = clipboard;
Vue.prototype.ws = ws;
// axios.defaults.timeout = 5000 // 请求超时
// console.log( navigator.language,localStorage.getItem('lang'),"語言")
if (navigator.language === "zh-CN") {
  localStorage.setItem("engs", "简体中文");
  localStorage.setItem("lang", "zh-CN");

} else 
if (navigator.language === "en-US") {
  localStorage.setItem("lang", "en-US");
  localStorage.setItem("engs", "ENGLISH");
} else if (navigator.language === "zh-TW" || navigator.language === "zh-HK") {
  localStorage.setItem("lang", "zh-TW");
  localStorage.setItem("engs", "繁体中文");

} else {
  localStorage.setItem("engs", "简体中文");
  localStorage.setItem("lang", "zh-CN");

}
const i18n = new VueI18n({
  locale: localStorage.getItem('lang'),   // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'en-US': require('./common/lang/en'),   // 英文语言包
    'zh-TW': require('./common/lang/tc'),   // 繁體语言包
    'zh-HK': require('./common/lang/tc'),   // 繁體语言包
  },
  silentTranslationWarn: true,
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
