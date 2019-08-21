
const path = require('path')
const fs = require('fs')
const env = process.env.NODE_ENV
const cssName = require('./index.js').production.cssFileName

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let PluginConfig = [
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
  }),
  new MiniCssExtractPlugin({ 
    filename: cssName,
    allChunks: true
  }),
]
let entrys = {
  // common : "./lib/ts/common.ts"
}
let formatHtmlWebpackPlugin = function (files) {
  files.forEach((item) => {
    if (item.indexOf('.') == 0) {
      return
    }
    let config = new HtmlWebpackPlugin({
      filename: item + '/index.html',
      template: path.resolve(__dirname, '../src/pages/' + item + '/index.html'),
      inject: 'body',
      chunks: [item, 'common', 'vendors'],
      hash: true,
      title: "scdsdc"
    })
    PluginConfig.push(config)
    entrys[item] = path.resolve(__dirname, '../src/pages/' + item + '/index.ts')
  })
}
let HTMLFiles = fs.readdirSync(path.resolve(__dirname, '../src/pages'))
formatHtmlWebpackPlugin(HTMLFiles)

module.exports = {
  entry: entrys,
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "./lib"),
          path.resolve(__dirname, "./src")
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                "targets": {
                  "browsers": [ ">0.25%", "not ie 11", "not op_mini all"]
                },
                module: false
              }],
              // "stage-2"
            ],
            plugins: ['transform-runtime', 'syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "../lib"),
          path.resolve(__dirname, "../src")
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')(), //CSS浏览器兼容
            ]
          }
        }, 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')(), //CSS浏览器兼容
            ]
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4000,
            name: 'static/images/[name][hash].[ext]'
          }
        }
      },
      // {
      //   test: /\.(html)$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       minimize: true,
      //       removeComments: false,
      //       collapseWhitespace: false,
      //     }
      //   }
      // }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './lib'),
      '~': path.resolve(__dirname, './src/compontes')
    },
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: PluginConfig,
}