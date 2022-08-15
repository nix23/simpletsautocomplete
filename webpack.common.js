const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Core webpack config: it is used both by dev/prod builds. 
// In real projects this file usually also contains logic to
// create third type of build which will be used in node for SSR.
module.exports = function (env) {
  var isDev = env.NODE_ENV == 'development';
  var isNode = env.target == 'node';
  var minimizeOff = env.minimizeOff;
  //var isDev = env.NODE_ENV && env.NODE_ENV == 'development';

  var entryFile = 'index.tsx';
  var outputDir = '';
  var target = 'web';

  console.log('NODE_ENV: ' + (isDev ? 'DEV' : 'PROD'));

  var config = {
    target: target,
    context: path.resolve(__dirname),
    entry: {
      app: [/*'babel-polyfill',*/ './src/index.tsx'],
    },
    output: {
      path: path.resolve(__dirname, './public/' + outputDir.toLowerCase()),
      filename: '[name].bundle.js', //'[name]-bundle-[chunkhash:8].js'
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: [/node_modules/],
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                // Use babelrc only with react-native.
                babelrc: false,
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                  'babel-plugin-root-import',
                  '@babel/plugin-proposal-class-properties',
                ],
              },
            },
          ],
        },
        // Use css-loader 5.2.6 with url-loader. If > -> fonts will not load because of bug.
        // || use > and upgrade from url-loader to https://webpack.js.org/guides/asset-modules/
        // {
        //   test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         name: '[name].[ext]',
        //         outputPath: 'fonts/',
        //       },
        //     },
        //   ],
        // },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        // {
        //   test: /\.html?$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         name: '[name].[ext]',
        //         outputPath: '/'
        //       }
        //     }
        //   ]
        // },
        {
          test: /\.css|\.scss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [
                    'src/',
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8000, // Inline max 8kb
                name: 'images/[hash]-[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'server',
      //   //analyzerMode: 'static',
      //   generateStatsFile: true,
      //   statsOptions: { source: false },
      // }),
      new ProgressBarPlugin(),
      new MiniCssExtractPlugin(),
      //new LoadablePlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
  };

  if (minimizeOff) {
    config.optimization = {
      minimize: false,
    };
  }

  return config;
};
