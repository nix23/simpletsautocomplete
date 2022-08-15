const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Webpack config for development: will start web-development-server
// in watch mode. Type `npm start` in console to launch this script.
module.exports = function (env) {
  return merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: {
        directory: path.resolve(__dirname, './public'),
      },
      hot: true,
      host: '0.0.0.0',
      port: 8080,
      historyApiFallback: {
        disableDotRule: true,
      },
      // proxy: {
      //   '/devapiproxy': {
      //     target: 'http://api.lh',
      //     pathRewrite: { '^/devapiproxy': '' },
      //     logLevel: 'debug',
      //   },
      // },
    },
    plugins: [
      // new BundleAnalyzerPlugin({
      //     analyzerMode: 'server',
      //     generateStatsFile: true,
      //     statsOptions: { source: false },
      // }),
    ],
  });
};