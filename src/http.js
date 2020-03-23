/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from './store'
// import * as store from './store'
import { baseURL1, baseURL2 } from "./utls";

import router from './router'

var proEnv = require('../config/pro.env');  // 生产环境
var devEnv = require('../config/dev.env');  // 开发环境
const env = process.env.NODE_ENV;

// axios 配置
axios.defaults.timeout = 8000;
// axios.defaults.baseURL =  '/api';
// 默认是本地环境
// if (env === 'production') {  // 生产环境
//     axios.defaults.baseURL = proEnv.baseUrl
// } else {
//     //    // 开发环境
//     // axios.defaults.baseURL = devEnv.baseUrl

// }

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'




// http request 拦截器
axios.interceptors.request.use(
    config => {
        // console.log(baseURL1,"baseURL19999999")

        if (store.state.Authorization) {
            // console.log(config)
            let token = store.state.Authorization;
            // let token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzYWNjIjoiMjY5aG9peDdBWGs9IiwiaWF0IjoxNTc0NjU2NjM4fQ.yaM_G9n5dP81FTuqpoe7oPp4UQaxNg3BUuNU8hlxkfs'


            // console.log(token)

            config.headers.Authorization = token;
            // config.headers.common['Authorization'] = token;

        }

        // store.commit('showLoading')
        return config;
    },
    err => {
        // store.commit('hideLoading')
        return Promise.reject(err);
    });

// var path = router.options.routes.filter((item) => {
//     // console.log(item)
//     return item.path == "/registerphone" || item.path == "/registeremail"
// })





// http response 拦截器
axios.interceptors.response.use(
    response => {

        // store.commit('hideLoading')
        return response;
    },
    error => {
        if (error.response) {
            console.log(error.response.status, "error.response.status")
            switch (error.response.status) {
                // case 403:
                    // 403 清除token信息并跳转到登录页面
                    // if($route.path)
                    // console.log(router.options.routes,"router")
                    // store.commit("delToken");
                    // router.push("/loginphone")
                // router.replace({
                //     path: '/apply',
                //     // query: {redirect: router.currentRoute.fullPath}
                //     query: {
                //         redirect: this.$router.currentRoute.fullPath
                    // }
                // })
            }
        }
        // store.commit('hideLoading')
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)
    });
// }

export default axios;
