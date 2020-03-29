'use strict'

const glob = require('glob')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, 'src/**/index.js'))

  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index]

    const match = entryFile.match(/src\/(.*)\/index.js/)
    const entryName = entryFile.split('src/')[1].split('.js')[0]
    const pageName = match && match[1]

    entry[entryName] = entryFile
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }))
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
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
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({
                browsers: ['last 2 version', '>1%', 'ios 7']
              })
            ]
          }
        },
        {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75,
            remPrecision: 8
          }
        }
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
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error')
          process.exit(1)
        }
      })
    }
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only'
}
