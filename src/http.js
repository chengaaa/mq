import axios from 'axios'
import store from './store'
import router from './router'
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
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token");
            config.headers.Authorization = token;
            // config.headers.common['Authorization'] = token;
        }
        // store.commit('showLoading')
        return config;
    },
    err => {
        store.commit('hideLoading')
        // Message.error({message:"网络错误"});
        return Promise.reject(err);
    });

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
                case 403:
                    // 403 清除token信息并跳转到登录页面
                    // if($route.path)
                    // console.log(router.options.routes,"router")
                    localStorage.removeItem("token")
                    // store.commit("delToken");
                    router.push("/apply")
                // router.replace({
                //     path: '/apply',
                // //     // query: {redirect: router.currentRoute.fullPath}
                // //     query: {
                // //         redirect: this.$router.currentRoute.fullPath
                //     // }
                // })
            }
        }
        store.commit('hideLoading')
            // this.$toast(this.$t('m.Networkerror'))
            // Message.error({message:"网络错误"});
        return Promise.reject(error.response)
    });
// }

export default axios;
