const px2rem = require('postcss-px2rem')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const UglifyJsPlugin = require('uglify-es-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

const postcss = px2rem({
  remUnit: 75  //基准大小 baseSize，需要和rem.js中相同
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
  }
}

const path = require('path')

// let target = '';
// if(env==='production'){  // 生产环境
//     target = proEnv.hosturl;
//     console.log(target,"target1")
// }else{ 
//    // 开发环境
//     target = devEnv.hosturl;
//     console.log(target,"target2")

// }
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
  // productionGzip:true,
  

  // webpack相关配置
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('vue$', 'vue/dist/vue.esm.js')
  //     .set('@', path.resolve(__dirname, './src'))
  // },
  // configureWebpack: (config) => {    
  // if (process.env.NODE_ENV === 'production') {      
  //     // 生产环境
  //     config.mode = 'production'
  //   } else {      
  //     // 开发环境
  //     config.mode = 'development'
  //   }
  // },  

  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;




  //   }



  // },
  configureWebpack: {
    externals: {
      'echarts': 'echarts',
      "moment": "moment",
      "vue":"vue"
      // 配置使用CDN
    }
  },


  chainWebpack: (config) => {
       config.module.rule("images")
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 6144, esModule: false }))
  },


  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            // filename:'[path].gz[query]',
            // algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
          }),
          new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            disable: process.env.NODE_ENV !== 'production', // Disable during development
            pngquant: {
              quality: '95-100'
            }
          })
        ],
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
                compress: {
                  // warnings: false,
                  drop_console: true, //注释console
                  drop_debugger: false,
                  pure_funcs: ['console.log'] //移除console       
                
              }
            })
          ],
          splitChunks: {
            cacheGroups: {
              vendor: {
                chunks: "all",
                test: /node_modules/,
                name: "vendor",
                minChunks: 1,
                maxInitialRequests: 5,
                minSize: 0,
                priority: 100,
              },
              common: {
                chunks: "all",
                test: /[\\/]src[\\/]js[\\/]/,
                name: "common",
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0,
                priority: 60
              },
              styles: {
                name: 'styles',
                test: /\.(sa|sc|c)ss$/,
                chunks: 'all',
                enforce: true,
              },
              runtimeChunk: {
                name: 'manifest'
              }
            }
          }
        },

      //   module:{
      //     rules:[
      //     {
      //       test:/\.(woff2?|eot|ttf|otf)(\?.*)$/,
      //       loader:'url-loader',
      //       options:{
      //         limit: 100,
              
      //       }
      //     }
      //   ]
      // }, 
         
      }
    }
  
  },








  // css相关配置
  css: {
    // 是否分离css（插件ExtractTextPlugin）
    // extract: true,    
    // // 是否开启 CSS source maps
    // sourceMap: false,   
    // // css预设器配置项
    // loaderOptions: {},    
    // // 是否启用 CSS modules for all css / pre-processor files.
    // modules: false
  },
  // 是否使用 thread-loader
  // parallel: require('os').cpus().length > 1, 
  // PWA 插件相关配置
  pwa: {},

  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    //  host: '192.168.1.226',
    //  host: '127.0.0.1',
    // host: '192.168.31.174',
    host: '192.168.1.7',
    //  host: '172.20.10.1',
    port: 8001,
    https: false,
    hotOnly: false,
    // http 代理配置
    proxy: {
      '/api': {
        // target: 'http://47.90.39.115:8001/v1',
        //  target: 'http://mt5test.tinytech.com.hk:8001/v1',
        target: 'http://35.180.177.89:8001/v1',
        //  target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/api': "/"
        }
      },
      '/tw': {
        // target: 'http://47.90.39.115:8001/v1',
        //  target: 'http://mt5test.tinytech.com.hk:8001/v1',
        target: 'http://blitzbook8.com:5000/v1/api',
        //  target:'https://account.api.lwork.com/v1/api',
        //  target:'http://192.168.1.111:5000/v1/api',

        //  target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/tw': ""
        }
      },
      '/tz': {
        // target: 'http://47.90.39.115:8001/v1',
        //  target: 'http://mt5test.tinytech.com.hk:8001/v1',
        target: 'http://blitzbook8.com:5000/v2/api',
        //  target:'https://account.api.lwork.com/v2/api',

        //  target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/tz': ""
        }
      },

    },
    before: (app) => { }
  },

  // 第三方插件配置
  pluginOptions: {


  },
}

