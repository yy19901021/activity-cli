const path = require('path')
const config = {
  production: {
    cssFileName: 'static/css/[name][contenthash:8].css',
    jsFileName: 'static/js/[name][chunkhash:8].js',
    sourceMap: false,
    publicPath: '/h5/'
  },
  development: {
    cssFileName: 'css/[name][hash:8].css',
    jsFileName: '[name][hash:8].js',
    sourceMap: true,
    host: '127.0.0.1',
    port: '9000',
    publicPath: '/h5/',
    assetPath: 'static/js/'
  }
}
module.exports = config