import fetch from "isomorphic-fetch"

export function doLogin(payload) {
    return dispatch=>{
        return fetch("http://192.168.1.136:3000/users/login",{method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }, body:JSON.stringify(payload)})
            .then(response=>response.json())
            .then(json=>{
                console.log(json)
                if(json.code==200){
                    dispatch({type:'LOGIN',payload:json})
                }else{
                    dispatch({type:'ERROR',payload:json})
                }
            })
            .catch(e=>{
                dispatch({type : 'ERROR'})
            })
    }
}
export function doReg(payload) {
    return dispatch=>{
        return fetch("http://192.168.1.136:3000/users/reg",{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json',},body:JSON.stringify(payload)})
            .then(response =>response.json())
            .then(json=>{
                if(json.code==200){
                    dispatch({type : 'REG',payload:json})
                }else{
                    dispatch({type:'ERROR',payload:json})
                }
            })
            .catch(e=>{
                dispatch({type : 'ERROR'})
            })
    }
}
export function getUserList() {
    return dispatch=>{
        return fetch("http://192.168.1.136:3000/users/getUserList",{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json',}})
            .then(response =>response.json())
            .then(json=>{
                if(json.code==200){
                    dispatch({type : 'USERLIST',payload:json})
                }else{
                    dispatch({type:'ERROR',payload:json})
                }
            })
            .catch(e=>{
                dispatch({type : 'ERROR'})
            })
    }
}
export function upLoadFile(data) {
    return dispatch=>{
        return fetch("http://192.168.1.136:3000/users/file",{method:'POST',headers:{'Accept':'application/json'},body:data})
            .then(response =>response.json())
            .then(json =>{
                if(json.code===1){
                    dispatch({type:"UPLOAD",payload : {completed : json.index}})
                }else{
                    dispatch({type:"UPLOADED",payload : {completed : json.index,url : json.url}})
                }
            })
            .catch(e=>{
                dispatch({type : 'ERROR'})
            })
    }
}
export  function upLoadFileAndInfo(data) {
    return dispatch=>{
        return fetch("http://192.168.1.136:3000/users/fileInfo",{method:"POST",headers:{'Accept':'application/json','Content-Type':'application/json',},body : JSON.stringify(data)})
            .then(response=>response.json())
            .then(json=>{
                if(json.code===200){
                    dispatch({type : 'UPLOADINFO',payload:json});
                }else{
                    dispatch({type : 'ERROR',payload:json})
                }
            })
            .catch(e=>{
                dispatch({type : 'ERROR'})
            })
    }
}
export  function getFileList(data) {
    return (dispatch)=>{
        return fetch("http://192.168.1.136:3000/users/getFileList",{method:"POST",headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(data)})
            .then((response)=>response.json())
            .then((json)=>{
                if(json.code===200){
                    dispatch({type:'GETFILELIST',payload:json})
                }else{
                    dispatch({type : 'ERROR',payload:json})
                }
            })
            .catch(e=>{
                dispatch({type : 'ERROR'})
            })
    }
}
export function getFiLeDetail(id) {
    return dispatch=>{
        return fetch("http://192.168.1.136:3000/users/getFileDetail",{method:"POST",headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({id:id})})
            .then(response=>response.json())
            .then(json=>{
                if(json.code===200){
                    dispatch({type:'DETAIL',payload:json})
                }else{
                    dispatch({type : 'ERROR'})
                }
            })
            .catch(e=>{
                dispatch({type : 'ERROR'})
            })
    }
}