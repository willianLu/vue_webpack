const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Webpack = require('webpack');
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: resolve("dist"),
    filename: "static/js/[name].[hash:7].js"
  },
  devServer: {
    hot: true
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        'vue': {
          name: 'vue',
          test: /[\\/]node_modules[\\/]vue[\\/]|[\\/]node_modules[\\/]vue-router[\\/]|[\\/]node_modules[\\/]vuex[\\/]/,
          priority: -10,
          filename: '[name].[contenthash:7].js',
          reuseExistingChunk: true,
          chunks: 'all',
        },
        lodash: {
          name: 'lodash',
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          priority: -10,
          chunks: 'all',
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -15,
          reuseExistingChunk: true,
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /(\.css|\.less)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../../'
          },
        },
        'css-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            esModule: false,
            name: 'static/image/[name].[hash:7].[ext]'
          },
        }],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:7].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve("public")
        }
      ]
    }),
    // new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
  ]
}
