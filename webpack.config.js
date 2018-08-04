/**
 * Webpack config for public-facing deployment
 */

const path = require('path');

module.exports = {
  // ['@babel/polyfill',]
  entry: ['./src/public/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  devtool: 'source-map'
};