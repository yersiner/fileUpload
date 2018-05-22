import React,{Component} from "react"
import {HashRouter,BrowserRouter,Redirect,Route,Switch} from "react-router-dom"

import Login from "../Component/Login"
import Index from "../Component/Index"


const Routes = [{
    path:'/login',
    main :  Login,
    exact: true,
},{
    path : '/index',
    main:Index
}]

let Router = process.env.NODE_ENV == 'production' ? BrowserRouter : HashRouter;

const Config = (
    <Router>
        <Switch>
            {
                Routes.map((item,index)=>{
                    return (
                        <Route
                            key={index}
                            exact={item.exact}
                            path = {item.path}
                            component={item.main}
                        />
                    )
                })
            }
            <Redirect from="" to='/login' />
        </Switch>
    </Router>
);


export default Config