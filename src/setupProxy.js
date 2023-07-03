const { createProxyMiddleware } = require("http-proxy-middleware");
console.log(process.env.REACT_APP_BASE_API);

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://47.109.100.216:5005/no-paper-meeting/",
            // target: "http://192.168.0.17:10022/no-paper-meeting/",
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            },
            ws: true
        })
    );
};
