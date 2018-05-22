import React,{Component} from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {Tip} from  "../Common/dialog"
import {doLogin} from "../action/login";
// console.log(import("../Action/login"))

class LoginInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : ''
        }
        this.handler = this.handler.bind(this);
    }
    handler(event){
        this.setState({[event.target.name]:event.target.value});
        this.props.hanlderChange(event.target.name)
    }
    login(){
        this.props.hanlderClick(this.state);
    }
    render(){
        var color = {
            color : "red"
        }
        return (
            <div className="logGet">
                <div className="bg_log">
                    <div className="logD logDtip">
                        <p className="p1">登录</p>
                    </div>
                    <div className="lgD">
                        <img className="img1" src={require('../Image/logName.png')} />
                        <input name="username" value={this.state.username} onChange={this.handler} type="text" placeholder={!!this.props.u_err?this.props.u_err:"输入用户名"} />
                    </div>
                    <div className="lgD">
                        <img className="img1" src={require('../Image/logPwd.png')} />
                        <input name="password" value={this.state.password} onChange={this.handler} type="text" placeholder={!!this.props.p_err?this.props.p_err:"输入用户密码"} />
                    </div>
                    <div className="logC">
                        <a href="javascript:void(0)" target="_self"><button onClick={this.login.bind(this)}>{this.props.loginText}</button></a>
                    </div>
                </div>
            </div>
        )
    }
}
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            u_err : "",
            p_err :""
        };
        this.login = this.login.bind(this);
        this.change = this.change.bind(this);
        console.log(this.props)
    }
    componentWillMount(){
        let info = window.localStorage.getItem("info"),
            {history} = this.props;
        if(info){
            history.push({pathname:'/index'})
        }
    }
    change(type){
        if(type=="username"){
            this.setState({u_err:''})
        }else{
            this.setState({p_err:''})
        }
    }
    login(data){
       if(!data.username&&!data.password){
           this.setState({u_err:'用户名不可为空',p_err:"密码不可为空"})
           return;
       }else if(!data.username&&data.password){
           this.setState({u_err:'用户名不可为空'})
           return;
       }else if(data.username&&!data.password){
            this.setState({p_err:'密码不可为空'})
            return;
        }else{
           this.setState({ u_err : "", p_err :""})
       }
        this.props.onLogin(data);
    }
    render(){
        let tipBox='登 录';

        if(this.props.isLogin){
            tipBox = "登录成功，正在跳转";
            window.localStorage.setItem("info",JSON.stringify(this.props.info));
            return (<Redirect to={{pathname:'/index',search:`?username=${this.props.info.phone}`,state:{login:true}}}/>)
        }
        if(this.props.error){
            tipBox = '登录失败，请稍后再试'
        }
        return(
            <div className="logContent">
                <LoginInput loginText = {tipBox} hanlderChange = {this.change} hanlderClick={this.login} u_err={this.state.u_err} p_err = {this.state.p_err}/>
            </div>
        )
    }
}
function mapStateToProps(state,dom) {
    console.log(state.User)
    return{
        isLogin : state.User.isLogin,
        info : state.User.info,
        error : state.User.error
    }
}
function mapDispatchToProps(dispatch,dom) {
    return {
        onLogin : (payload)=>{
            dispatch(doLogin(payload))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)