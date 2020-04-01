'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const smp = new SpeedMeasurePlugin()

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CopyWebpackPlugin([{
      from: { glob: 'assets/**/*.*' }
    }]),
    // new BundleAnalyzerPlugin()
    new webpack.DllReferencePlugin({
      manifest: require('./build/library/library.json')
    }),
    new HardSourceWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'all',
          minChunks: 2
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true
      })
    ]
  }
}

// module.exports = smp.wrap(merge(baseConfig, prodConfig))

module.exports = merge(baseConfig, prodConfig)
