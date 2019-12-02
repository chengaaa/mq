/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from './store'
// import * as store from './store'
import router from './router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL =  '/api';

// http request 拦截器
axios.interceptors.request.use(
    config => {
         if (store.state.Authorization) {
            // console.log(config)
             let token = store.state.Authorization;
           // let token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzYWNjIjoiMjY5aG9peDdBWGs9IiwiaWF0IjoxNTc0NjU2NjM4fQ.yaM_G9n5dP81FTuqpoe7oPp4UQaxNg3BUuNU8hlxkfs'


            // console.log(token)

          config.headers.Authorization = token;
        // config.headers.common['Authorization'] = token;

        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(store.logout);
                    router.replace({
                        path: '/login',
                        // query: {redirect: router.currentRoute.fullPath}
                        query: {
                            redirect: this.$router.currentRoute.fullPath
                        }
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)
    });

export default axios;
