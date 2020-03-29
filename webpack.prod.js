'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'all',
          minChunks: 3
        }
      }
    }
  }
}

module.exports = merge(baseConfig, prodConfig)
