var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[id].js')
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
//      new webpack.optimize.UglifyJsPlugin({
//          compress: {
//              warnings: false
//          }
//      }),
        new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('css/[name].css'))
    ]
});
