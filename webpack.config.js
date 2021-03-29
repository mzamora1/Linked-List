const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = ({
  entry: './src/index.ts',
  devtool: isProduction ? false : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          },
        ],
      },
      {
        test: /\.json$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
    new CopyPlugin({
      patterns: [ 
        {
          from: "./src/*.json",
          to: '[name][ext]',
        } 
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
      new JsonMinimizerPlugin(),
    ],
  },
  devServer: {
    open: true,
    openPage: 'index.html',
    hot: true,
    overlay: {
      errors: true
    },
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
  }
});