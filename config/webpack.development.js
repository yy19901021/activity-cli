const path = require('path')
const config = require('./index.js').development
const webpack = require('webpack')
const base = require('./webpack.base.js')
const merge = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const devServer = {
  host: config.host,
  port: config.port,
  contentBase:path.join(__dirname, config.publicPath),
  watchOptions: {
    poll: 1000
  },
  hot: true,
  publicPath: '/',
  open: true,
  proxy: {
    "/ditie": {
      target: 'http://activity.nsmetro.com/',
      changeOrigin: true
    }
  }
}
let exportsConfig = {
  mode: 'development',
  output:{
    publicPath: '/',
    filename: config.assetPath + config.jsFileName,
    path: path.join(__dirname, '../',config.publicPath)
  },
  devtool:'eval-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin(), new CleanWebpackPlugin({
    verbose: true,
  })],
  devServer
}

module.exports = merge(base, exportsConfig)