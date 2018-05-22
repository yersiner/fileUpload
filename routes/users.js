const express = require('express')
const router = express.Router()
const opration = require("../dao/opration")
const merge = require("../config/ulit")
const secret = require("crypto")
const multi = require("multiparty")
const fs = require("fs")
const myAsync = require("async")

/* GET users listing. */
router.post('*', function(req, res, next) {
    console.log(req.body);
    next();
});
router.post("/reg",function (req,res,next) {
    let returnBody = {
        code : 200,
        msg : ''
    }
    let {username,password,nickname,createtime,position,grade,worktime,phone,email,address,admin} = req.body;
    if(!username){
        returnBody = Object.assign(returnBody,{code : 202,msg:'用户名不可为空'});
        res.json(returnBody);
    }
    if(!password){
        returnBody = Object.assign(returnBody,{code : 202,msg:'密码不可为空'});
        res.json(returnBody);
    }
    const md5 = secret.createHash("md5");
    md5.update(password)
    password = md5.digest("hex");
    const insertSql = "INSERT INTO user SET ?",
          selectSql = "select count(*) from `user` where username = ?";
    const post = {username,password,nickname,createtime,position,grade,worktime,phone,email,address,admin};
    opration(selectSql,[username])
        .then((ret)=>{
            let count = ret[0]["count(*)"];
            if(count<1){
                opration(insertSql,post)
                    .then((ret)=>{
                        returnBody = Object.assign(returnBody,{msg : '添加成功',info : ret});
                        res.json(returnBody)
                    })
                    .catch((e)=>{
                        returnBody = Object.assign(returnBody,{msg : '添加异常',code:500});
                        res.json(returnBody)
                    })
            }else{
                returnBody = Object.assign(returnBody,{msg : '此用户名已存在',code:205});
                res.json(returnBody)
            }
        })
        .catch((e)=>{
            returnBody = Object.assign(returnBody,{msg : '添加异常',code:500});
            res.json(returnBody)
        })
})
router.post("/login",function (req,res,next) {
    let {username,password} = req.body;
    let returnBody = {
      code : 200,
      msg : '登陆成功'
    }
    if(!username){
        returnBody = Object.assign(returnBody,{code : 202,msg : '用户名为空'});
        res.json(returnBody)
    }
    if(!password){
        returnBody = Object.assign(returnBody,{code : 202,msg : '密码为空'});
        res.json(returnBody)
    }
    const md5 = secret.createHash("md5");
    md5.update(password);
    password = md5.digest("hex");
    var SQL = "SELECT * FROM `user` WHERE username = ?";
    opration(SQL,[username])
        .then((ret)=>{
            console.log(password,ret[0].password)
            if(ret[0].password===password){
                delete ret[0].password;
                returnBody = Object.assign(returnBody,{info : ret[0]})
                console.log(returnBody);
                res.json(returnBody);
            }else{
                returnBody = Object.assign(returnBody,{code : 204,msg:'密码错误'});
                res.json(returnBody);
            }
        })
        .catch((e)=>{
            returnBody = Object.assign(returnBody,{code : 500,msg:'登录异常'});
            res.json(returnBody);
        })
})
router.post("/getUserList",function (req,res,next) {
    const mySQL = "SELECT * FROM `user`";
    opration(mySQL)
        .then((ret)=>{res.json({code : 200,list:ret});})
        .catch((e)=>{res.json({code : 500,msg:'操作异常'})})
})
router.post("/file",function (req,res,next) {
    let returnBody = {
        code : 200,
        msg : ''
    }
    const form  = new multi.Form();
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "uploads/";
    form.maxFieldsSize = 500*1024*1024;
    //设置单文件大小限制
    // form.maxFilesSize = 200 * 1024 * 1024;
    form.parse(req, function (err,fields,files) {
        files=files['data'][0];//获取bolb文件
        var index=parseInt(fields['index'][0]);//当前片数
        var total=parseInt(fields['total'][0]);//总片数
        var name=fields['name'][0];//文件名称
        var url='uploads/'+name+index;//临时bolb文件新名字
        fs.renameSync(files.path,url);//修改临时文件名字

        var pathname='uploads/'+name;//上传文件存放位置和名称
        if(index==total){//当最后一个分片上传成功，进行合并
            /*
                检查文件是存在，如果存在，重新设置名称
            */
            fs.access(pathname,fs.F_OK,(err) => {
                if(!err){
                    var myDate=Date.now();
                    pathname='uploads/'+myDate+name;
                    console.log(pathname);
                }
            });
            //这里定时，是做异步串行，等上执行完后，再执行下面
            setTimeout(()=>{
                /*进行合并文件，先创建可写流，再把所有BOLB文件读出来，
                    流入可写流，生成文件
                    fs.createWriteStream创建可写流
                    aname是存放所有生成bolb文件路径数组:
                    ['Uploads/img/3G.rar1','Uploads/img/3G.rar2',...]
                */
                var writeStream=fs.createWriteStream(pathname);
                var aname=[];
                for(var i=1;i<=total;i++){
                    var url='uploads/'+name+i;
                    aname.push(url);
                }
                //async.eachLimit进行同步处理
                myAsync.eachLimit(aname,1,function(item,callback){
                    //item 当前路径， callback为回调函数
                    console.log(item)
                    fs.readFile(item,function(err,data){
                        if(err)throw err;
                        //把数据写入流里
                        writeStream.write(data);
                        //删除生成临时bolb文件
                        fs.unlink(item,function(){console.log('删除成功');})
                        callback();
                    });
                },function(err){
                    if (err) throw err;
                    //后面文件写完，关闭可写流文件，文件已经成生完成
                    writeStream.end();
                    //返回给客服端，上传成功
                    returnBody = Object.assign(returnBody,{code:0,msg:'上传成功',index:index,url:pathname})
                    res.json(returnBody);//返回数据
                });
            },50);

        }else{//还没有上传文件，请继续上传
            returnBody = Object.assign(returnBody,{code:1,msg:'继续上传',index : index})
            res.json(returnBody);//返回数据
        }
    });
})
router.post("/fileInfo",function (req,res,next) {
    let returnBody = {
        code : 200,
        msg : ''
    }

    let {grade,term,course,tag,name,createtime,createname,size,type,url} = req.body;
    if(grade&&term&&course&&url){
        const mysql = `INSERT INTO \`fileset\`
                        SET \`createtime\` = '${createtime}',
                        \`tag\` = '${tag}',
                         \`filename\`= '${name}',
                         \`filesize\` = '${size}',
                         \`filetype\` = '${type}',
                         \`grade\` = '${grade}',
                         \`term\` = '${term}',
                         \`course\` = '${course}',
                         \`fileurl\`='${url}',
                         \`createname\` = '1282277054'`;
        opration(mysql)
            .then(ret=>{
                returnBody = Object.assign(returnBody,{msg : '上传成功'})
                res.json(returnBody)
            })
            .catch(e=>{
                returnBody = Object.assign(returnBody,{msg : '上传失败',code : 500})
                res.json(returnBody)
            })

    }else{
        returnBody = Object.assign(returnBody,{code : 500,msg:'请完整的填写信息'})
        res.json(returnBody)
    }

});
router.post("/getFileList",function (req,res,next) {
    let returnBody = {
        code : 200,
        msg : '',
        list :[]
    }
    let pager = {
        currentPage : 0,
        total : 10
    }
    let {currentPage,total} = req.body;
    pager = Object.assign(pager,{currentPage,total});
    const countSql = `
        select count(*) from fileset
    `
    const mySQL = `
        select * from fileset
    `
    opration(countSql)
        .then(ret=>{
            console.log(ret[0]['count(*)'])
            returnBody = Object.assign(returnBody,{count:ret[0]['count(*)']})
            opration(mySQL)
                    .then(ret=>{
                        returnBody = Object.assign(returnBody,{msg : '成功',list : ret})
                        res.json(returnBody)
                    })
                    .catch(e=>{
                        returnBody = Object.assign(returnBody,{code : 500,msg : '失败'})
                        res.json(returnBody)
                    })
            })
        .catch(e=>{
            returnBody = Object.assign(returnBody,{code : 500,msg : '失败'})
            res.json(returnBody)
        })

})
router.post("/getFileDetail",function (req,res,next) {
    let {id} = req.body;
    let returnBody = {
        code : 200,
        msg :'成功'
    }
    if(!id){
        returnBody = Object.assign(returnBody,{code : 500,msg:'参数不完整'})
        res.json(returnBody);
    }else{
      const mySQL = "select * from `fileset` where id = ?";
      const countSQL = "select count(*) from `fileset` where id = ?"
      opration(countSQL,[id])
          .then(ret=>{
              if(ret[0]["count(*)"]>0){
                  opration(mySQL,[id])
                      .then(ret=>{
                          returnBody = Object.assign(returnBody,{detail : ret[0]})
                          res.json(returnBody);
                      })
                      .catch(e=>{
                          returnBody = Object.assign(returnBody,{code : 500,msg : '数据异常'});
                          res.json(returnBody);
                      })
              }else{
                  returnBody = Object.assign(returnBody,{code : 400,msg : '数据不存在'})
              }
          })
          .catch(e=>{
              returnBody = Object.assign(returnBody,{code : 500,msg : '数据异常'});
              res.json(returnBody);
          })
    }

})
module.exports = router;
