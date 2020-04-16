
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
    if (process.env.NODE_ENV === 'production') {
      // #region 启用 GZip 压缩
      // config.plugin('compression').use(CompressionPlugin, {
      //   asset: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: new RegExp(`\\.('${['js', 'css'].join('|')})$`),
      //   threshold: 10240,
      //   minRatio: 0.8,
      //   cache: true
      // }).tap(args => {})
      // #endregion
    }

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
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/style/_variables.scss";@import "@/style/_mixins.scss";@import "@/style/_common.scss";'
      },
      scss: {
        prependData: '@import "@/style/_variables.scss";@import "@/style/_mixins.scss";@import "@/style/_common.scss";'
      }
    }
  },
  // 代理配置
  devServer: {
    host: '127.0.0.1',
    port: '142',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '^/api': {
        target: process.env.BASE_URL,
        changeOrigin: true
      }
    }
  }
}
