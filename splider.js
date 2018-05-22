const url = ["?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxExn5@_5zdxpcac9z3YLQ5U=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxFnuMZ7@0wNsBgxvFtqseWQ=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxL76ctLMhIRBYcH7lXmpYEM=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxBOCfpEeWorbDhJuKWRHYWo=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxJpIiz3Ov7XKHZ5zXzI72PY=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxGfYoxnAYF2F7OZzgcZL5hs=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxAgVLkP71h4hCGqmCOVnrUs=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxJb0rVeJSbae3QMI8ArVUPA=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxCcRoEkbNLEX2lgi6Zc2dj4=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxNEbL5zIDPDFzRQ@SQwZlV4=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxCucJRhlAMCtHv8JlDNLmyM=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxMSAqFJeNNaeyxo@q385X1A=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxMG5ArJ1vvwByImQQNVOPaw=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxNj9qrMTr3owf4b73qJP_Vo=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxM94FKhGSaEOtG45rgh9PEw=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxJQBEf5lXQ@SNWQ4rE5UFvA=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxC4fBg8bkqGeZTIBSl4jF9c=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxCGAiKotIB59sYN0OP53Kcs=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxJIOX_WOXyD@fxgHbSzAshY=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxInfuyRpyBmIJ_q3s_SZsrU=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxFY38wia3eiANirWXeI2LqU=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxPu0gFbNlsZxiUqQcpd0hYU=",
    "?img=Hs92T42xAvvT6ZnQb3pc9JGAklJO9g5QP4cW8aYF@MX7jBw6qcMGxFfKtW82dnAke7Sll@12CwU="]
const baseUrl = "http://view45.book118.com/img/";

const http = require("http");
const fs = require("fs");
function getImageUrl(url,index) {
    var fullUrl = baseUrl + url;
    http.get(fullUrl,function (res) {
        var imageData = "";
        res.setEncoding("binary");
        res.on("data",function (chunk) {
            imageData +=chunk;
        });
        res.on("end",function () {
            fs.writeFile(`${__dirname}/splider/${index}.png`,imageData,"binary",function (err) {
                console.log(err)
            })
        })
    })
}
url.forEach((item,index)=>{
    getImageUrl(item,index);
})