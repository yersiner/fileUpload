import React,{Component} from "react"
import {connect} from "react-redux"
import Pager from "../../Common/pager"
import {getFileList} from "../../action/login"


class List extends Component{
    constructor(props){
        super(props)
        this.look = this.look.bind(this);
        this.downLoad = this.downLoad.bind(this);
    }
    downLoad(url){
        let baseURL = ""
        let resultUrl =url.split("/");
        window.location.href = `${baseURL}${resultUrl[1]}`
    }
    look(id){
        const {history} = this.props;
        console.log(JSON.stringify(history))
        history.push({pathname:`/index/look/${id}`})
    }
    render(){
        const {id,course,createname,createtime,filename,filetype,filesize,fileurl,grade,term} = this.props;
        const grades = ["七年级","八年级","九年级"]
        const postions = ["语文","数学","英语","物理","化学","生物","地理","历史","思想品德","体育","计算机"]
        const terms = ["上学期","下学期"]
        return(
            <tr>
                <td>{id}</td>
                <td>{filename}</td>
                <td>{filesize}M</td>
                <td>{filetype}</td>
                <td>{grades[7-grade]}</td>
                <td>{postions[course]}</td>
                <td>{terms[term]}</td>
                <td>{new Date(parseInt(createtime)).toLocaleDateString()}</td>
                <td>{createname}</td>
                <td><a href="javascript:void(0)" onClick={this.look.bind(this,id)}>查看</a> | <a href={`http://localhost:3000/${fileurl.split("/")[1]}`} download={`http://localhost:3000/${fileurl.split("/")[1]}`}>下载</a></td>
            </tr>
        )
    }
}
class Main extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(getFileList())
    }
    showPager(num){
        const {dispatch} = this.props;
        let pager = {
            currentPage : num,
            total : 10
        }
        dispatch(getFileList(pager))
    }
    render(){
        return(
            <div id="MainForm">
                <div className="form_boxA">
                    <h2>文件列表</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>文件ID</th>
                            <th>文件名称</th>
                            <th>文件大小</th>
                            <th>文件类型</th>
                            <th>年级</th>
                            <th>课程</th>
                            <th>学年</th>
                            <th>上传时间</th>
                            <th>上传者</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.list.map((item,index)=>(
                            <List key={index} index={index} {...item} {...this.props}/>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagenation">
                        <p className="msg">共 {this.props.count} 条</p>
                        <Pager total = {this.props.count} getPager={this.showPager.bind(this)} currentPage ='1' />
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,dom) {
    return {
        list : state.List.list||[],
        count : state.List.count
    }
}
export default connect(mapStateToProps)(Main);