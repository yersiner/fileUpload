var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var publicPath = '/dist/'; //服务器路径
var path = __dirname + '/dist/';

var plugins = [];

if (process.argv.indexOf('-p') > -1) { //生产环境
    plugins.push(new webpack.DefinePlugin({ //编译成生产版本
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
    publicPath = '/dist/';
    path = __dirname + '/dist/';
}
plugins.push(new ExtractTextPlugin({
    filename:'[name].css'
})); //css单独打包

plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
    filename: '../index.html', //生成的html存放路径，相对于 path
    template: './src/template/index.html', //html模板路径
    hash: true,    //为静态资源生成hash值
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name : 'vender',
    children : true,
    async : true
}))
module.exports = {
    entry: {
        app: './src/App', //编译的入口文件
    },
    output: {
        publicPath, //编译好的文件，在服务器的路径
        path, //编译到当前目录
        filename: '[name].js', //编译后的文件名字
        chunkFilename: "[name].[chunkhash:5].chunk.js"
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['es2015','stage-2']
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            }, {
                test: /\.less/,
                exclude: /^node_modules$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader',
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            },{
                test :/\.scss/g,
                exclude : /node_modules/,
                use:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            },{
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
                // loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 20000,
                            name: '[name].[ext]'
                        }
                    }
                ]
                // loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }, {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "es2015",
                                "react"
                            ],
                            plugins: ['syntax-dynamic-import']
                        }
                    }
                ]
                // loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
            }
        ]
    },
    plugins,
    resolve: {
        extensions: ['.js', '.jsx'], //后缀名自动补全
    }
};
