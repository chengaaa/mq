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
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Home.vue'),
      meta: {
        
        keepAlive: true
      }
    

    },
    { //首页
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
      component: () => import(/* webpackChunkName: "about" */ './views/Transaction/Transaction.vue'),
     
    },
     {//下单
      path: '/transaction-place',
      name: 'transaction-place',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // keepAlive: true

    },
      component: () => import(/* webpackChunkName: "about" */ './views/Transaction/Transaction-place.vue'),
     
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
       {//修改单价
        path: '/transaction-modify',
        name: 'transaction-modify',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          // keepAlive: true
  
      },
        component: () => import(/* webpackChunkName: "about" */ './views/Transaction/Transaction-modify.vue'),
       
      },
      
    
    {//行情
      path: '/quotation',
      name: 'quotation',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // keepAlive: true

    },
      component: () => import(/* webpackChunkName: "about" */ './views/Quotation/Quotation.vue'),
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
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
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
     {//echarts
      path: '/echarts/:id',
      name: 'echarts',
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
      path: '/loginphone',
      name: 'loginphone',
      // component: Home,
      component: () => import(/* webpackChunkName: "about" */ './views/Login/Loginphone.vue')

    },
    {//邮箱登录
      path: '/loginemail',
      name: 'loginemail',
      // component: Home,
      component: () => import(/* webpackChunkName: "about" */ './views/Login/Loginemail.vue')

    },
    {//注册手机
      path: '/registerphone',
      name: 'registerphone',
      component: () => import(/* webpackChunkName: "about" */ './views/Register/Registerphone.vue')
    },
    {//注册邮箱
      path: '/registeremail',
      name: 'registeremail',
      component: () => import(/* webpackChunkName: "about" */ './views/Register/Registeremail.vue')
    },
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
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    console.log("存在")
    // let token = localStorage.getItem('Authorization'); 
    let token = store.state.Authorization
    console.log(token)
    console.log(token)
      if (token) { 
        console.log(sessionStorage.getItem('Authorization')) // 获取当前的token是否存在
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
            // console.log("query",this.$router.query)
        }
      }
      else {
        next();
      }
})



export default router
