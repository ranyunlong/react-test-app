const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    // app 是express
    app.use(proxy('/proxyapi', {
        target: "http://console.ranyunlong.com:8080",
        changeOrigin: true,
        pathRewrite: {
            '^/proxyapi': "/renren-fast"
        }
    }))
}