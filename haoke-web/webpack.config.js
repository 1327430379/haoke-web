const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {

    module:{//所有第三方模块的配置规则
        rules:[//第三方匹配规则
            {test:/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/},//千万别忘记添加exclude排除项
            {test:/\.css$/,use:['style-loader','css-loader','sass-loader']},//打包处理css样式
            // {test:/\.scss$/,use:['style-loader','css-loader?module&localIdentName=[path][name]-[local]-[hash:5]','sass-loader']}//打包处理scss文件的loader
            {test:/\.scss$/,loader:ExtractTextPlugin.extract(['css-loader','sass-loader'])}
        ]

    },
    resolve:{
        extensions:['.js','.jsx','.json','.vue'],//表示，这几个文件的后缀名，可以省略不写
        alias: {//表示别名
            '@':path.join(__dirname,'./src')//这样，@就可以表示项目根目录src的这一层目录
        }
    },
    devServer: {
        contentBase: "./public/",
        watchContentBase:true
    },
    plugins:[
        new ExtractTextPlugin("bundle.css"),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV":JSON.stringify("production")
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]

};
