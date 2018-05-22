import React,{Component} from "react"
import {connect} from "react-redux"
import {getUserList} from "../../action/login"

class List extends Component{
    render(){
        let {index,username,nickname,createtime,address,position,grade,phone,email,admin} = this.props;
        const grades = ["七年级","八年级","九年级"]
        const postions = ["语文","数学","英语","物理","化学","生物","地理","历史","思想品德","体育","计算机"]
        const colorRandom = ["bgcB","bgcA",'bgcC','bgcD','']
        const randomNum = Math.floor(Math.random()*5);
        return(
            <tr className={colorRandom[randomNum]}>
                <td>{index+1}</td>
                <td>{username}</td>
                <td>{grades[grade-7]}</td>
                <td>{postions[position]}</td>
                <td>{nickname}</td>
                <td>{address}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>{admin===0?"普通用户":"管理员"}</td>
                <td>{new Date(+createtime).toLocaleString()}</td>
                <td><a href="#">编辑</a> | <a href="#">删除</a></td>
            </tr>
        )
    }
}
class Manage extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(getUserList())
    }
    render(){
        let content = ""
        if(this.props.list){
           content = (
               <table>
                   <thead>
                   <tr>
                       <th>序号</th>
                       <th>用户名</th>
                       <th>所任年级</th>
                       <th>所任科目</th>
                       <th>昵称</th>
                       <th>地址</th>
                       <th>联系方式</th>
                       <th>邮件</th>
                       <th>账户类型</th>
                       <th>创建时间</th>
                       <th>操作</th>
                   </tr>
                   </thead>
                   <tbody>
                   {this.props.list.map((item,index)=>(
                       <List key={index} index={index} {...item}/>
                   ))}
                   </tbody>
               </table>
           )
        }else{
            content = (<div>数据为空</div>)
        }
        return(
            <div id="MainForm">
                <div className="form_boxA">
                    <h2>年度预算列表</h2>
                    {content}
                    <div className="pagenation">
                        <p className="msg">共找到47条年度预算记录，当前显示从第1条至第10条</p>
                        <div className="pager"></div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,dom) {
    console.log(state)
    return {
        list : state.User.list
    }
}
export default connect(mapStateToProps)(Manage);