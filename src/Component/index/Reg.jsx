import React,{Component} from "react"
import {connect} from "react-redux"
import {doReg} from "../../action/login"

class Reg extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            nickname : '',
            position : '',
            grade : '',
            admin : '',
            address : '',
            email : '',
            phone : '',
            createtime:+new Date(),
            worktime :'',
            pass : true,
            status : '提交'
        }
    }
    reg(){
        this.props.isReg(this.state);
        this.setState({status:'正在提交,请稍等'})
    }
    handlerChange(e){
        if(this.state.username&&this.state.password){
            this.setState({pass : false})
        }else{
            this.setState({pass : true})
        }
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    _changeState(obj){
        const timer = setTimeout(()=>{
            this.setState(obj);
            clearTimeout(timer);
        },1000)
    }
    render(){
        var status = this.state.status;
        if(this.props.error){
            status = "注册失败,请稍后再试";
            this._changeState({status : '提交'})
        }
        if(this.props.reg){
            status = "注册成功";
            this._changeState({status : '提交'})
        }
        return(
            <div id="MainForm" className="upload">
                <form htmlFor="upload">
                    <div className="form_group">
                        <label>用户名 : </label>
                        <input  type="text" name="username"
                                onChange={this.handlerChange.bind(this)}
                                value={this.state.username}
                                placeholder="请输入用户名"
                        />
                        <span className="isNeed">* 必填项</span>
                    </div>
                    <div className="form_group">
                        <label>密码 : </label>
                        <input type="password" name="password"
                            onChange={this.handlerChange.bind(this)}
                            value={this.state.password}
                            placeholder="请输入密码"
                        />
                        <span className="isNeed">* 必填项</span>
                    </div>
                    <div className="form_group">
                        <label>昵称 : </label>
                        <input type="text" name="nickname"
                            onChange={this.handlerChange.bind(this)}
                            value={this.state.nickname}
                            placeholder="请输入昵称"
                        />
                        <span className="isNotNeed">* 选填项</span>
                    </div>
                    <div className="form_group">
                        <label>职位 : </label>
                        <select name="position" onChange={this.handlerChange.bind(this)} value={this.state.position}>
                            <option value="">请选择教师类别</option>
                            <option value="0">语文老师</option>
                            <option value="1">数学老师</option>
                            <option value="2">英语老师</option>

                            <option value="3">物理老师</option>
                            <option value="4">化学老师</option>
                            <option value="5">生物老师</option>

                            <option value="6">地理老师</option>
                            <option value="7">历史老师</option>
                            <option value="8">思想品德老师</option>

                            <option value="9">体育老师</option>
                            <option value="10">计算机老师</option>
                        </select>
                        <span className="isNotNeed">* 选填项</span>
                    </div>
                    <div className="form_group">
                        <label>所任年级 : </label>
                        <select name="grade" onChange={this.handlerChange.bind(this)} value={this.state.grade}>
                            <option value="">请选择任职年级</option>
                            <option value="7">七年级</option>
                            <option value="8">八年级</option>
                            <option value="9">九年级</option>
                        </select>
                        <span className="isNotNeed">* 选填项</span>
                    </div>
                    <div className="form_group">
                        <label>账号类型 : </label>
                        <select name="admin" onChange={this.handlerChange.bind(this)} value={this.state.admin}>
                            <option value="">账户类型</option>
                            <option value="0">普通用户</option>
                            <option value="1">管理员</option>
                        </select>
                        <span className="isNotNeed">* 选填项</span>
                    </div>
                    <div className="form_group">
                        <label>手机 : </label>
                        <input type="text" name="phone"
                               onChange={this.handlerChange.bind(this)}
                               value={this.state.phone}
                               placeholder="请输入手机"
                        />
                        <span className="isNotNeed">* 选填项</span>
                    </div>
                    <div className="form_group">
                        <label>邮箱 : </label>
                        <input type="text" name="email"
                               onChange={this.handlerChange.bind(this)}
                               value={this.state.email}
                               placeholder="请输入邮箱"
                        />
                        <span className="isNotNeed">* 选填项</span>
                    </div>
                    <div className="form_group">
                        <label>地址 : </label>
                        <input type="text" name="address"
                               onChange={this.handlerChange.bind(this)}
                               value={this.state.address}
                               placeholder="请输入地址"
                        />
                        <span className="isNotNeed">* 选填项</span>
                    </div>
                    <div className="form_group">
                        <label>入职时间 : </label>
                        <input type="text" name="worktime"
                               onChange={this.handlerChange.bind(this)}
                               value={this.state.worktime}
                               placeholder="请输入入职时间"
                        />
                        <span className="isNotNeed">* 选填项</span>
                    </div>
                </form>
                <div id="BtmBtn">
                    <button onClick={this.reg.bind(this)} disabled={this.state.pass} className="up_submit">{status}</button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,dom) {
    return {
        error :state.User.error,
        isLogin : state.isLogin,
        reg : state.User.reg
    }
}
function mapDispatchToProps(dispatch,dom) {
    return{
        isReg : (payload)=>{
            dispatch(doReg(payload))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Reg)

