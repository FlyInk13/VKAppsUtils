const path = require('path');

const config = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimize: false
  },
  devtool: 'source-map',
  mode: 'development',
  externals: [
    {
      'react': 'react',
      'prop-types': 'prop-types',
      'react-dom': 'react-dom'
    },
    /@vkontakte\/.+/
  ]
};

module.exports = config;
