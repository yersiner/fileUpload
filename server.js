const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const config = require("./webpack.config");

const server = new webpackDevServer(webpack(config),{
    publicPath:config.output.publicPath,
    proxy : {
        "/api/*":{
            target : 'http://localhost:9999/',
            secure : false
        },
        state:{
            color:true
        }
    }
})
// server.app.get("*",function (req,res) {
//     if(/\.css/.test(req.path)||/\.js/.test(req.path)){
//        let pathArr =  req.path.split("/");
//        let pathFile = pathArr[pathArr.length-1];
//         res.sendFile(`${__dirname}/dist/${pathFile}`)
//     }else{
//         res.sendFile(__dirname + '/index.html')
//     }
// })
server.listen(9999);