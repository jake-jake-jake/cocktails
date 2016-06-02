var webpack = require('webpack');

module.exports = {
  entry: [
    './src/main'
  ],
  output: {
    path: __dirname + '/buildJS',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test:/\.js?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};