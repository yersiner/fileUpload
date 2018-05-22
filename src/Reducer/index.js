function User(state,action) {
    if(!state){
        return state={
            isLogin:null,
            success : null,
            error : null,
            reg : null,
            completed : 0,
            url : ''
        }
    }
    switch(action.type){
        case "LOGIN":
            return {...state,...action.payload,isLogin : true};
            break;
        case "REG":
            return {...state,...action.payload,reg : true}
            break;
        case "ERROR":
            return {...state,error : true,...action.payload}
        case "USERLIST":
            return {...action.payload}
            break;
        case "UPLOAD":
            return {...state,...action.payload}
            break;
        case "UPLOADED":
            return{...state,uploadSuccess : true,...action.payload}
        case "UPLOADINFO":
            return {...state,success:true,...action.payload}
        default:
            return {...state};
    }
}
export default {User}