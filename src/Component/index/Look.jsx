import React,{Component} from "react"
import {connect} from "react-redux"
import {getFiLeDetail} from "../../action/login"
import Result from "../../Common/result"
import NavBack from '../../Common/navback'

class Look extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        let {match,dispatch} = this.props,
            params = match.params.id;
        dispatch(getFiLeDetail(params));
    }
    render(){
        let {info} = this.props,
            resultType = '';
        if(info){
            let {filetype,fileurl} = info;
            console.log(/video/.test(filetype))
            if(/video/.test(filetype)){

                resultType = (
                    <video src={`http://localhost:3000/${fileurl.split("/")[1]}`} controls="controls">
                        您的浏览器不支持 video 标签。
                    </video>
                )
            }else if(/image/.test(filetype)){
                resultType = (
                    <img src={`http://localhost:3000/${fileurl.split("/")[1]}`}/>
                )
            }else{
                resultType = (
                    <p>暂不支持文档的预览</p>
                )
            }
        }
        if(this.props.error){
            return(
                <div>
                    <NavBack/>
                    <Result text = '数据错误' type="error"/>
                </div>
            )
        }
        return(
            <div>
                <NavBack/>
                <div className="detailBox">
                    {resultType}
                </div>
            </div>
            )
    }
}
function mapStateToProps(state,newdom) {
    console.log('dsdfasdfs')
    console.log(state)
    return{
       info : state.List.detail,
       error : state.User.error
    }
}

export default connect(mapStateToProps)(Look)