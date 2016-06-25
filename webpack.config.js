var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app', //编译的入口文件
    },
    output: {
        publicPath: '/build/', //编译好的文件，在服务器的路径
        path: __dirname + '/build', //编译到当前目录
        filename: '[name].js' //编译后的文件名字
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: 'babel?presets=es2015'
        }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            }, {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }, {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
            }]
    },
    plugins: [
        // new webpack.DefinePlugin({ //编译成生产版本
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
        new ExtractTextPlugin('[name].css')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
    }
};