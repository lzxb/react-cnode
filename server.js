var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
	// 相当于通过本地node服务代理请求到了http://cnodejs.org/api
    proxy: {
	    "/api/*": {
		    target: "https://cnodejs.org",
		    secure: false
	    }
    },
    stats: {
        colors: true
    },
});

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

server.listen(3000);
