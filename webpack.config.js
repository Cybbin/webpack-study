'use strict'

const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    index: './src/index/index.js',
    search: './src/search/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    },
    {
      test: /\.vue$/,
      use: 'vue-loader'
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(png|jp(e)*g|gif|webp|svg|ico)/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)/,
      use: 'file-loader'
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
