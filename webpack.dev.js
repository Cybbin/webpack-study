'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'minimal'
  },
  devtool: 'source-map'
}

module.exports = merge(baseConfig, devConfig)
