const { createProxyMiddleware } = require("http-proxy-middleware");
console.log(process.env.REACT_APP_BASE_API);

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            // target: "http://47.109.62.13:3000",
            target: "http://192.168.0.17:10022/no-paper-meeting/",
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            },
            ws: true
        })
    );
};
