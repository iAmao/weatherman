const path = require('path');
const base = require('./webpack.base.config');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const config = Object.assign({}, base);

// config.devServer = {
//   contentBase: path.join(__dirname, 'dist'),
//   compress: true,
//   port: 9000,
//   historyApiFallback: true,
// };

config.plugins.push(new WebpackBundleAnalyzer());

module.exports = config;
