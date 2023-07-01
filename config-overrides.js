const {
    override,
    addWebpackAlias,
    addPostcssPlugins,
    addLessLoader,
    watchAll
} = require("customize-cra");
const path = require("path");
const px2rem = require("postcss-px2rem-exclude");
const rewirePostcss = require("react-app-rewire-postcss");
// const autoprefixer = require('autoprefixer');
module.exports = override(
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
    addPostcssPlugins([
        px2rem({
            remUnit: 37.5,
            exclude: /node_modules/i
        })
    ]),
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
                    exclude: /node_modules\/antd-mobile/
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
    watchAll()
);
