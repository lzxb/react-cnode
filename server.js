var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

// 相当于通过本地node服务代理请求到了http://cnodejs.org/api
var proxy = [{
    path: "/api/*",
    target: "https://cnodejs.org",
    host: "cnodejs.org"
}]
//启动服务
var app = new WebpackDevServer(webpack(config), {
    publicPath: './',
    proxy:proxy
});
app.listen(3000);