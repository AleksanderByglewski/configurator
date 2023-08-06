const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/template.html',
    }),
  ],
  module: {
    rules: [
      // Add loaders as needed
    ],
  },
  mode: 'development',
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
      },
  },

  
};