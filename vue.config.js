
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

const baseUrl = process.env.BASE_URL;
console.log(baseUrl);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {

    chainWebpack: config => {
        // 修复HMR
        if(process.env.NODE_ENV !== "production"){
            config.resolve.symlinks(true);
        }
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('utils', resolve('src/utils'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('router',resolve('src/router'))
            .set('page',resolve('src/components/page'));
        if(process.env.NODE_ENV === "none"){
            config.plugin("webpack-report")
                .use(BundleAnalyzerPlugin, [{
                    // ...webpack-bundle-analyzer options here
                    analyzerPort : 27149
                }]);
        }
        // image min config
        config.module
            .rule("images")
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options({
                mozjpeg: { progressive: true, quality: 65 },
                optipng: { enabled: false },
                pngquant: { quality: "65-90", speed: 4 },
                gifsicle: { interlaced: false },
                webp: { quality: 75 }
            });
        // config.externals = {
        //     'vue': 'Vue',
        //     'element-ui': 'ELEMENT',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        //     'axios': 'axios'
        // }
        // config.output
        //     .filename('[name].js')
        //     .chunkFilename('[name][hash].js')

    },
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'avt',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    lintOnSave: true,
    publicPath: '/avt/manage/',
    outputDir: "dist",
    assetsDir: 'static',
    filenameHashing: true,
    productionSourceMap: true,
    devServer: {
        port: 1999, // 端口号
        host: 'localhost',
        open: true, //配置自动启动浏览器
        hotOnly: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            // add new  test  api  proxy
            '/admin': {
                context: ['/qd', '/logout'],
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {'^/admin' : ''}
            },
            // add new mock api proxy
            '/api': {
                target: 'https://easy-mock.com/mock/5c41912227fb9e228fadcb46/avt/', // 设置调用的接口域名和端口号
                changeOrigin: true,     // 跨域
                // pathRewrite: {
                //     '^/api': '/'
                // }
            }
        }
    },

    parallel: require('os').cpus().length > 1,
    runtimeCompiler: false,

};
