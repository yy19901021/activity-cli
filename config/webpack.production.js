const path = require('path')
const config = require('./index.js').production
const base = require('./webpack.base.js')
const merge = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let PluginConfig = [
  new CleanWebpackPlugin(),
  new UglifyJsPlugin({ test: /\.js($|\?)/i, uglifyOptions: { output: { comments: false } } }),
]

let exportsConfig = {
  mode: 'production',
  devtool: 'none',
  output:{
    publicPath: config.publicPath,
    filename: config.jsFileName,
    path: path.join(__dirname, '../',config.publicPath)
  },
  plugins: PluginConfig,
}

module.exports = merge(base, exportsConfig)