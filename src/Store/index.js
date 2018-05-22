import {createStore,combineReducers,applyMiddleware} from "redux"
import reducerUser from "../Reducer/index"
import reducerList from "../Reducer/list"
import Thunk from "redux-thunk"

var store = createStore(
    combineReducers({...reducerUser,...reducerList}),
    applyMiddleware(Thunk)
)
export default store