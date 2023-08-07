const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// Dynamically set up entry points based on the files present in the 'apps' folder
const appDirectory = path.resolve(__dirname, 'src', 'apps');
const appFiles = fs.readdirSync(appDirectory);
const entryPoints = {};

appFiles.forEach(file => {
  const fileNameWithoutExtension = path.basename(file, path.extname(file));
  entryPoints[fileNameWithoutExtension] = path.resolve(appDirectory, file);
});

const htmlPlugins = Object.keys(entryPoints).map(name => new HtmlWebpackPlugin({
  template: './src/templates/template.html',
  filename: `${name}.html`,
  chunks: [name]
}));

module.exports = {
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: htmlPlugins,
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
  }
};