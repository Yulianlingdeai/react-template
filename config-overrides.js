const {
    override,
    // fixBabelImports,
    addWebpackAlias,
    addPostcssPlugins,
    addLessLoader,
    watchAll
} = require("customize-cra");
const path = require("path");
const px2rem = require("postcss-px2rem-exclude");
const rewirePostcss = require("react-app-rewire-postcss");
// const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = override(
    // 配置按需加载
    // fixBabelImports("import", {
    //     libraryName: "antd-mobile",
    //     style: "css"
    // }),
    addWebpackAlias({
        "@": path.resolve(__dirname, "src")
    }),
    // addPostcssPlugins([require("postcss-px2rem-exclude")({ remUnit: 37.5 })]),
    // addPostcssPlugins([
    //     require('postcss-px2rem')({
    //       remUnit: 37.5,
    //       propList: ['*'],
    //       // exclude: /node_modules/,
    //     //   exclude: /node_modules\/antd-mobile/
    //     })
    // ]),
    // addPostcssPlugins([
    //     px2rem({
    //         remUnit: 37.5,
    //         exclude: /node_modules/i
    //     })
    // ]),
    addLessLoader({
        strictMath: true,
        noIeCompat: true,
        localIdentName: "[local]--[hash:base64:5]" // 如果使用了CSS模块，并且自定义了localIdentName，默认值是'[local]--[hash:base64:5]'
    }),
    (config, env) => {
        // 重写postcss
        console.log(env);
        rewirePostcss(config, {
            plugins: () => [
                //关键:设置px2rem
                px2rem({
                    remUnit: 37.5,
                    exclude: /node_modules/
                    // exclude: /^(?!.*node_modules).*$/
                }),
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                    autoprefixer: {
                        flexbox: "no-2009"
                    },
                    browsers: ["last 2 versions", "> 0.2%"],
                    stage: 3
                })
                // autoprefixer(), // 添加 autoprefixer 插件
            ]
        });
        return config;
    },
    (config, env) => {
        config.optimization = {
            ...config.optimization,
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    libs: {
                        name: "chunk-libs",
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: "initial" // only package third parties that are initially dependent
                    },
                    axios: {
                        test: /[\\/]node_modules[\\/]_?axios(.*)/,
                        name: "axios",
                        priority: 20,
                        chunks: "all"
                    },
                    reactImageGallery: {
                        test: /[\\/]node_modules[\\/]_?react-image-gallery(.*)/,
                        name: "react-image-gallery",
                        priority: 20,
                        chunks: "all"
                    },
                    reactModal: {
                        test: /[\\/]node_modules[\\/]_?react-modal(.*)/,
                        name: "react-modal",
                        priority: 20,
                        chunks: "all"
                    },
                    antdMobile: {
                        test: /[\\/]node_modules[\\/]_?antd-mobile(.*)/,
                        name: "antd-mobile",
                        priority: 20,
                        chunks: "all"
                    },
                    reactPdf: {
                        test: /[\\/]node_modules[\\/]_?(react-pdf|pdfjs-dist)(.*)/,
                        name: "react-pdf",
                        priority: 20,
                        chunks: "async"
                    }
                }
            }
        };
        return config;
    },
    (config, env) => {
        console.log("115===>>>>>>", process.env.NODE_ENV);
        if (process.env.NODE_ENV === "production") {
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: "static",
                    reportFilename: "report.html"
                })
            );
        }
        return config;
    },
    watchAll()
);
