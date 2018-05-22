import React,{Component} from "react"
import {NavLink,Route,Switch,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import Main from "../Component/index/Main"
import Manage from "../Component/index/Manage"
import Upload from "../Component/index/Upload"
import Reg from "./index/Reg";
import Look from "./index/Look";

class Head extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            nickname : '',
            admin : ''
        }
    }
    componentWillMount(){
        let info = window.localStorage.getItem("info"),
            {history} = this.props;
        info = JSON.parse(info)
            if(!info){
                history.push({pathname : "/login"})
            }else{
                var {username,nickname,admin} = info;
                this.setState({username,nickname,admin});
            }

            this.props.mapState(admin);
    }
    exit(){
        window.localStorage.removeItem("info");
        let {history} = this.props;
        history.push({pathname : "/login"})
    }
    render(){
        console.log(JSON.stringify(this.state))
        return (
            <div className="head">
                <div className="headL">
                    <img className="headLogo" src={require('../Image/logLOGO.png')}/>
                </div>
                <div className="headR">
                    <span>欢迎：{this.state.nickname}</span> <a onClick={this.exit.bind(this)} href="javascript:void(0)" rel="external">【退出】</a>
                </div>
            </div>
        )
    }
}
class Content extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {match} = this.props;
        let isAdmin = this.props.admin,
            isAdminStr = '';
        if(!!isAdmin){
            isAdminStr = (
                <div>
                    <NavLink to={`/index/manage`}>
                        <div className="line">
                            <img src={require("../Image/user.png")} />&nbsp;&nbsp;用户管理
                        </div>
                    </NavLink>
                    <NavLink to={`/index/reg`}>
                        <div className="line">
                            <img className="upload_icon" src={require("../Image/reg.png")} />&nbsp;&nbsp;注册
                        </div>
                    </NavLink>
                </div>
            )
        }
        return(
            <div className="container">
                <div className="leftsidebar_box">
                    <NavLink to='/index/main' activeClassName="active" exact>
                        <div className="line">
                            <img src={require("../Image/coin01.png")} />&nbsp;&nbsp;首页
                        </div>
                    </NavLink>
                    <NavLink to={`/index/upload`}>
                        <div className="line">
                            <img className="upload_icon" src={require("../Image/upload.png")} />&nbsp;&nbsp;上传
                        </div>
                    </NavLink>
                    {isAdminStr}
                </div>
               <div className="right_side_content" id="Contents">
                   <Switch>
                       <Route path={`/index/main`} component={Main} exact/>
                       <Route path={`/index/manage`} component={Manage} />
                       <Route path={`/index/upload`} component={Upload} />
                       <Route path={`/index/reg`} component={Reg} />
                       <Route path={`/index/look/:id`} component={Look}/>
                       <Redirect to="/index/main"/>
                   </Switch>
               </div>
            </div>
        )
    }
}


class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            admin : ''
        }
    }
    getState(data){
        this.setState({admin : data})
    }
    render(){
        return(
            <div>
                <Head {...this.props} mapState={this.getState.bind(this)}/>
                <Content {...this.props} {...this.state}/>
            </div>
        )
    }
}
const mapStateToProps=(state,dom)=>{
   return {

   }
}
export default connect(mapStateToProps)(Index);