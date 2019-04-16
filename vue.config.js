const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {

  // 部署应用包时的基本 URL
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',

  // 生产环境构建文件的目录 vue-cli-service build
  // 目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
  outputDir: 'dist',

  // 静态资源 (js、css、img、fonts) 目录 (相对于 outputDir)
  assetsDir: '',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir), 也可以是一个绝对路径
  indexPath: 'index.html',

  // 静态资源文件名中包含 hash
  filenameHashing: true,

  // 多页面
  // 执行 vue inspect > output.js 得到一份最终生效的 webpack 配置信息
  /*
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
  },
  */

  // eslint-loader 是否在每次保存时 lint 代码
  lintOnSave: !isProd, // 在生产构建时禁用 eslint-loader

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  // Babel 显式转译依赖 (默认 babel-loader 会忽略所有 node_modules 中的文件)
  transpileDependencies: [],

  // 生产环境 source map
  productionSourceMap: false,

  // 设置 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性
  // crossorigin: undefined,

  // 在 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  // 如果构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性
  integrity: false,

  // Webpack 设置 (Type: Object | Function)
  // 1. 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 2. 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，则使用函数 (该函数会在环境变量被设置之后懒执行)
  //    该方法的第一个参数会收到已经解析好的配置，可以直接修改配置，或者返回一个将会被合并的对象
  configureWebpack: config => {
    if (isProd) {
      // 为生产环境修改配置...
      // TerserPlugin
      config.optimization = config.optimization || {}
      config.optimization.minimizer = [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
          terserOptions: {
            compress: {
              drop_console: true, // 移除 console
              drop_debugger: true // 移除 debugger
            }
          }
        })
      ]

      // externals
      // 指定外部依赖, 不打包到 bundle 中, 在运行时(runtime)从外部获取
      /*
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios'
      }
      */
    } else {
      // 为开发环境修改配置...
    }
  },

  // 函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例
  // 对内部的 webpack 配置进行更细粒度的修改 (比如修改、增加Loader选项) (链式操作)
  chainWebpack: config => {
    // set alias
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },

  // 配置高于 chainWebpack 中关于 css loader 的配置
  css: {
    // false 时只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
    // true 时可以去掉文件名中的 .module， 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
    modules: false,

    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)
    // 使用 ExtractTextPlugin 插件
    extract: isProd, // 生产环境下是 true，开发环境下是 false

    // 是否构建样式地图，设置为 true 之后可能会影响构建的性能
    sourceMap: false,

    // 向 CSS 相关的 loader 传递选项
    loaderOptions: {
      // 给 css-loader 传递选项
      css: {
      },
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        data: `
          @import "~@/styles/_variables.scss";
          @import "~@/styles/_mixin.scss";
        `
      },
      // 给 postcss-loader 传递选项
      postcss: {
      }
    }
  },

  // 所有 webpack-dev-server 的选项都支持
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    /*
    open: false, // 是否自动打开浏览器
    host: '0.0.0.0', // 指定 Host
    port: 8080, // 端口
    https: false, // 使用 https
    hotOnly: true, // 热更新
    */

    // 设置任何未知请求 (没有匹配到静态文件的请求) 代理
    // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
    /*
    proxy: {
      '/api': {
        target: 'http://localhost/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
    */
  },

  // 是否为 Babel 或 TypeScript 使用 thread-loader
  // 默认: require('os').cpus().length > 1
  // parallel: require('os').cpus().length > 1,

  // 向 PWA 插件传递选项
  pwa: {},

  // 可以用来传递任何第三方插件选项
  pluginOptions: {}

}
