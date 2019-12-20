const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit:  75  //基准大小 baseSize，需要和rem.js中相同
})

module.exports = {
 
css: {
  loaderOptions: {
    postcss: {
      // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
      plugins: [
        require("postcss-px2rem")({
          remUnit: 75
        })
      ]
    }
  }
}}

const path = require('path')


module.exports = {  
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: './',  
  // 输出文件目录
  outputDir: 'dist',  
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,  
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,  
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,  
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,  
  // webpack相关配置
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('vue$', 'vue/dist/vue.esm.js')
  //     .set('@', path.resolve(__dirname, './src'))
  // },
  configureWebpack: (config) => {    
  if (process.env.NODE_ENV === 'production') {      
      // 生产环境
      config.mode = 'production'
    } else {      
      // 开发环境
      config.mode = 'development'
    }
  },  
 
  // css相关配置
  // css: {    
  //   // 是否分离css（插件ExtractTextPlugin）
  //   extract: true,    
  //   // 是否开启 CSS source maps
  //   sourceMap: false,   
  //   // css预设器配置项
  //   loaderOptions: {},    
  //   // 是否启用 CSS modules for all css / pre-processor files.
  //   modules: false
  // },  
  // 是否使用 thread-loader
  // parallel: require('os').cpus().length > 1, 
  // PWA 插件相关配置
  pwa: {}, 
  
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
  //  host: '192.168.1.226',
   host: '127.0.0.1',
    // host: '192.168.31.175',
    port: 8080,
    https: false,
    hotOnly: false,   
    // http 代理配置
    proxy: {      
      '/api': {
        target: 'http://47.90.39.115:8001/v1',
      //  target: 'http://192.168.1.169:8004/web/v1',

        // target: 'www.baidu.com',
        changeOrigin: true,
        pathRewrite: {          
            '^/api': ''
        }
      }
    },
    before: (app) => {}
  }, 
 
  // 第三方插件配置
  pluginOptions: {

   
  

  }
  
}
// if (process.env.NODE_ENV == 'development') {//开发环境
//   axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV == 'production') {//生产环境
//   axios.defaults.baseURL = 'http://xxx.com:2086/';
// }
