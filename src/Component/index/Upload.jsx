import React,{Component} from "react"
import {connect} from "react-redux"
import {upLoadFileAndInfo} from "../../action/login"
import File from "../../Common/file"

class ButtonSubmit extends Component{
    constructor(props){
        super(props);
        this.state = {
            btnMsg : '上传'
        }
    }
    upLoadFile(){
       this.props.onSubmit();
       this.setState({btnMsg:'正在上传...'})
    }
    render(){
        var msg = this.state.btnMsg;
        if(this.props.error){
            msg = '上传失败，请稍后再试';
        }
        if(this.props.success){
            msg = "上传成功"
        }
        return(
            <button onClick={this.upLoadFile.bind(this)} className="up_submit" disabled={this.props.pass}>{msg}</button>
        )
    }
}
class Upload extends Component{
    constructor(props){
        super(props);
        this.getUploadUrl = this.getUploadUrl.bind(this);
        this.state = {
                grade : '',
                term : '',
                course : '',
                tag : '',
                url : '',
                name : '',
                size : 0,
                type : '',
                createtime : +new Date(),
                createname : '',
                pass : true,
        }
    }
    upLoadFile(){
        this.props.onUpload(this.state)
    }
    getUploadUrl(data){
        let {size,type,name} = data;
        this.setState({size : size,type : type,name:name})
    }
    handlerChange(e){
        const {grade,term,course,tag,name} = this.state;
        if(!!grade&&!!term&&!!course&&!!tag&&!!name){
            this.setState({pass:false})
        }else{
            this.setState({pass:true})
        }
        this.setState({[e.target.name] : e.target.value})
    }
    componentWillReceiveProps(props){
       this.setState({url : props.url})
    }
    render(){
        return(
            <div id="MainForm" className="upload">
                <form htmlFor="upload">
                    <div className="form_group">
                        <label>文件</label>
                        <File pullUrl = {this.getUploadUrl}/>
                    </div>
                    <div className="form_group">
                        <label>年级</label>
                        <select className="two" name="grade" onChange={this.handlerChange.bind(this)}>
                            <option value=''>请选择文件所属年级</option>
                            <option value="7">七年级</option>
                            <option value="8">八年级</option>
                            <option value="9">九年级</option>
                        </select>
                        <select className="two" name="term" onChange={this.handlerChange.bind(this)}>
                            <option value=''>请选择学年期</option>
                            <option value="0">第一学期</option>
                            <option value="1">第二学期</option>
                        </select>
                        <span className="isNeed">*必填项</span>
                    </div>
                    <div className="form_group">
                        <label>科目</label>
                        <select name="course" onChange={this.handlerChange.bind(this)}>
                            <option value=''>请选择文件所属科目</option>
                            <option value='0'>语文</option>
                            <option value='1'>数学</option>
                            <option value='2'>英语</option>

                            <option value='3'>物理</option>
                            <option value='4'>化学</option>
                            <option value='5'>生物</option>

                            <option value='6'>地理</option>
                            <option value='7'>历史</option>
                            <option value='8'>思想品德</option>

                            <option value='9'>体育</option>
                            <option value='10'>计算机</option>
                        </select>
                        <span className="isNeed">*必填项</span>
                    </div>
                    <div className="form_group">
                        <label>标签</label>
                        <input type="text" name="tag"
                               value={this.state.tag}
                               onChange={this.handlerChange.bind(this)}
                               placeholder="请输入标签多个以逗号或者空格隔开"
                        />
                        <span className="isNeed">*必填项</span>
                    </div>
                </form>
                <div id="BtmBtn">
                    {/*<button onClick={this.upLoadFile.bind(this)} className="up_submit" disabled={this.state.pass}>提交</button>*/}
                    <ButtonSubmit
                        onSubmit={this.upLoadFile.bind(this)}
                        pass={this.state.pass}
                        success = {this.props.success}
                        error = {this.props.error}
                    />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,newdom) {
    return{
        url : state.User.url,
        error : state.User.error,
        success : state.User.success,
        msg : state.User.msg
    }
}
function mapDispatchToProps(dipatch,newdom) {
    return{
        onUpload : (payload)=>{
            dipatch(upLoadFileAndInfo(payload));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Upload)