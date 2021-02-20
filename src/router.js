import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      // component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
   
    
    { //首页
      path: '/home',
      name: 'home',
      // component: () => import(/* webpackChunkName: "about" */ './views/Parents.vue'),
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Home2.vue'),
      // component: () => import(/* webpackChunkName: "about" */ './views/Account/Ce.vue'),
      meta: {
        keepAlive: true
      }
    },
    { //新手交易指南
      path: '/tradingguide',
      name: 'tradingguide',
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Tradingguide.vue'),
    },
    { //下载APP
      path: '/down',
      name: 'down',
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Down.vue'),
    },
    { //充值提款教学
      path: '/teaching',
      name: 'teaching',
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Teaching.vue'),
    },
    { //充值提款教学
      path: '/teachingtrade',
      name: 'teachingtrade',
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Teachingtrade.vue'),
    },
    
    
    { //新人红包
      path: '/envelopes',
      name: 'envelopes',
      // component: () => import(/* webpackChunkName: "about" */ './views/Parents.vue'),
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Envelopes.vue'),
    },
    { //新人红包app
      path: '/envelope',
      name: 'envelope',
      // component: () => import(/* webpackChunkName: "about" */ './views/Parents.vue'),
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Envelope.vue'),
    },
    { //合伙人
      path: '/partnership',
      name: 'partnership',
      // component: () => import(/* webpackChunkName: "about" */ './views/Parents.vue'),
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Partnership.vue'),
    },
    { //合伙人app
      path: '/partnerships',
      name: 'partnerships',
      // component: () => import(/* webpackChunkName: "about" */ './views/Parents.vue'),
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Partnerships.vue'),
    },
    
    
    
    { //中转界面
      path: '/apply',
      name: 'apply',
      // component: () => import(/* webpackChunkName: "about" */ './views/Parents.vue'),
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Apply.vue'),
    },
  
    {//交易
      path: '/transaction',
      name: 'transaction',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        keepAlive: true
    },
      component: () => import(/* webpackChunkName: "about" */ './views/Transaction/Transactiondemo.vue'),
    },
    {//切换交易主题
      path: '/toggletransaction',
      name: 'toggletransaction',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        keepAlive: true
    },
      component: () => import(/* webpackChunkName: "about" */ './views/Account/Toggletransaction.vue'),
    },
    
     {//下单
      path: '/transaction-place',
      name: 'transaction-place',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // keepAlive: true
    },
      component: () => import(/* webpackChunkName: "about" */ './views/Transaction/Transaction-place1.vue'),
    },
    {//下单全部
      path: '/transaction-placeall',
      name: 'transaction-placeall',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // keepAlive: true
    },
      component: () => import(/* webpackChunkName: "about" */ './views/Transaction/Transaction-placeall.vue'),
    },
    
    {//行情
      path: '/quotation-deail',
      name: 'quotationdeail',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // keepAlive: true
    },
      component: () => import(/* webpackChunkName: "about" */ './views/Quotation/Quotation-deail2.vue'),
    },
     
 
    {//历史
      path: '/history',
      name: 'history',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // keepAlive: true
    },
      component: () => import(/* webpackChunkName: "about" */ './views/History/History.vue')
    },
     {//历史
      path: '/history-time/:id',
      name: 'history-time',
      meta: {
        // requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        keepAlive: true
    },
      component: () => import(/* webpackChunkName: "about" */ './views/History/History-time.vue')
    },
    {//账户
      path: '/account',
      name: 'account',
      meta: {
        // requireAuth: true,
        keepAlive: true
          // 添加该字段，表示进入这个路由是需要登录的
    },
      component: () => import(/* webpackChunkName: "about" */ './views/Account/Account.vue')
    },
   
     {//入金
      path: '/entry',
      name: 'entry',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
      component: () => import(/* webpackChunkName: "about" */ './views/Account/Entry.vue')
    },
       {//入金2
        path: '/entrys',
        name: 'entrys',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
        component: () => import(/* webpackChunkName: "about" */ './views/Account/Entrys.vue')
      },
    
     {//出金
      path: '/outtry',
      name: 'outtry',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
      component: () => import(/* webpackChunkName: "about" */ './views/Account/quttrys.vue')
    },
     {//echarts
      path: '/echarts',
      name: 'echarts',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
      component: () => import(/* webpackChunkName: "about" */ './views/Echarts/Demosuccess.vue')
    },
      {//echarts
        path: '/echartss',
        name: 'echartss',
        meta: {
          // requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
        component: () => import(/* webpackChunkName: "about" */ './views/Echarts/Echarts.vue')
      },
     {//语言
      path: '/language',
      name: 'language',
    //   meta: {
    //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    // },
      component: () => import(/* webpackChunkName: "about" */ './views/Account/Language.vue')
    },
       
   
    {//登录
      path: '/login',
      name: 'login',
      // component: Home,
      component: () => import(/* webpackChunkName: "about" */ './views/Login/Login2.vue')
    },
  
    {//注册
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register/Registertest.vue')
    },
   
    //  {//注册输入密码
    //   path: '/registerpassword',
    //   name: 'registerpassword',
    //   component: () => import(/* webpackChunkName: "about" */ './views/Register/Registerpassword.vue')
    // },

    {//下载app
      path: '/download',
      name: 'download',
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Download.vue')
    },
      {//添加全部
        path: '/addall',
        name: 'Addall',
        component: () => import(/* webpackChunkName: "about" */ './views/Quotation/Addall.vue'),
        meta: {
        	keepAlive: true  // 需要缓存
      	  }
      },
       {//删除
        path: '/delete',
        name: 'Delete',
        component: () => import(/* webpackChunkName: "about" */ './views/Quotation/Delete.vue'),
        meta: {
        	keepAlive: true  // 需要缓存
      	  }
      },
       {//全部详情
        path: '/detail/:id',
        name: 'detail',
        component: () => import(/* webpackChunkName: "about" */ './views/Quotation/Detail.vue'),
        props: true
      }
  ]
});
//使用router.beforeEach,注册一个全局前置守卫,判断用户是否登录
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token'); 
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    console.log("存在")
    // let token = store.state.Authorization
      if (token) { 
        // console.log(sessionStorage.getItem('Authorization')) // 获取当前的token是否存在
          next();
        
      }
      else if(!token){
        // next(false);
          next({
              path: '/apply',
              // query: {
              //   redirect: to.fullPath
              // }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
      }
      else {
        next();
      }

      if(to.fullPath === "/login" || to.fullPath === "/register" ){
        if(token){
            next({
            path:from.fullPath
            });
        }else {
            next();
        }
    }
})



export default router
