const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: {
      import: './src/index.js',
      dependOn: ['libs', 'projectHandler', 'taskHandler', 'display'],
    },
    projectHandler: {
      import: './src/modules/project-handler.js',
      dependOn: ['display', 'libs'],
    },
    taskHandler: {
      import: './src/modules/task-handler.js',
      dependOn: ['display', 'libs'],
    },
    display: {
      import: './src/modules/display.js',
      dependOn: 'libs',
    },
    libs: {
      import: ['date-fns', 'lodash'],
    },
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name].[hash][ext][query]',
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'The Odin Project—Todo List',
      template: './src/template.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        // generator: {
        //   outputPath: 'assets/',
        // },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
