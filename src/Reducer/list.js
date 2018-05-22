function List(state,action) {
    if(!state){
        return {}
    }
    switch (action.type){
        case "GETFILELIST":
            return {...state,...action.payload}
            break;
        case "DETAIL":
            return {...state,...action.payload}
            break;
        default:
            return state;
    }
}

export default {List}