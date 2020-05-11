import Toast from './Toast.vue'
const plugin = {}
// 拓展插件
plugin.install = Vue => {
    // 创建组件构造器
    let NewToast = Vue.extend(Toast);
    // 拓展vue
    Vue.prototype.$toast = msg => {
        // 创建组件对象
        let toast = new NewToast();
        // 挂载元素
        toast.$mount(document.createElement('div'));
        // // 上树
        document.body.appendChild(toast.$el);
        // // 赋值
        toast.msg = msg;
           

        setTimeout(()=>{
            document.body.removeChild(toast.$el);
            // toast.isShow = false
        },1000)
    }
}
export default plugin