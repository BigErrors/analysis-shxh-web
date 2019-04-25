const CompressionPlugin = require('compression-webpack-plugin')

module.exports = (() => {
  let option = {
    baseUrl: '/',
    outputDir: './docker/dist',
    lintOnSave: true,
    runtimeCompiler: false,
    productionSourceMap: false,
    configureWebpack: {
      plugins: [
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ]
    },
    devServer: {
      open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8888,
      https: false,
      hotOnly: false,
      proxy: {
        '/xuHuiWisdomJustice/V1.0.0': {
          target: 'http://192.168.22.63:8810',
          changeOrigin: true
          // pathRewrite: {
          //   '^/emergency': '/emergency'   //重写接口
          //   }
        }
      },
      before: app => {}
    }
  }
  option.devServer.proxy[`${process.env.LOCATION}`] = {
    target: process.env.TARGET,
    changeOrigin: true
  }
  return option
})()
