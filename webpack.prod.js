'use strict'

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jp(e)*g|gif|webp|svg|ico)/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // new HtmlWebpackPlugin({
    //   minify: {
    //     template: path.join(__dirname, 'src/index.html'),
    //     filename: 'index.html',
    //     chunks: 'index',
    //     inject: true,
    //     minify: {
    //       html5: true,
    //       collapseWhitespace: true,
    //       preserveLineBreaks: false,
    //       minifyCSS: true,
    //       minifyJS: true,
    //       removeComments: false
    //     }
    //   }
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html',
      chunks: 'search',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: 'index',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
  ]
}
