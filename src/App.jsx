 import React,{Component} from "react"
 import {render} from "react-dom"
 import {Provider} from "react-redux"

 import store from "./Store/index"
 import route from "./Route/routes"
 import "./Style/style.css"

 render(<Provider store={store}>
     {route}
 </Provider>,document.getElementById("root"));