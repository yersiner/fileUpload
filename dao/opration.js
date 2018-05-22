const config = require("../config/mysqlConfig")
const mysql = require("mysql")

const connection = mysql.createConnection(config);
connection.connect(function (err) {
    if(err){
        console.log(`error connect ${err.stack}`)
        return;
    }
    console.log(`connect  id is ${connection.threadId}`)
})

module.exports = function (sql,value) {
    return new Promise((resolve,reject)=>{
        if(value){
            connection.query(sql,value,(error,result)=>{
                if(error){
                    console.log(error)
                    reject(error)
                }
                resolve(result);
            })
        }else{
            connection.query(sql,(error,result)=>{
                if(error){
                    console.log(error)
                    reject(error)
                }
                resolve(result);
            })
        }
    })
}
