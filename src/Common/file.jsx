import React,{Component} from "react"
import {connect} from "react-redux"
import {upLoadFile} from "../action/login"
import MyAsync from "async"

class File extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            total : 0,
            value :0,
            width : 0,
            hasFile : false,
            name : '',
            type : '',
            shardCount : 0
        }
    }
    handlerChange(e){
        const file = e.target.files[0];
        let originalSize  = file.size,//总大小
         shardSize  = 2*1024*1024,//每片的大小
         size = (file.size/1024/1024).toFixed(2),
         attr = [],
         shardCount = Math.ceil(originalSize / shardSize);
        this.setState({
            total:size,
            hasFile:true,
            name : file.name,
            type : file.type,
            width : Math.ceil(100/shardCount),
            shardCount : shardCount
        })
        this.props.pullUrl({size:size, name : file.name, type : file.type})
        const form = new FormData();
        form.append("data",file);
        for(let i=0;i<shardCount;i++){
            attr.push(i);
        }
        MyAsync.eachLimit(attr,1,(item,cb)=>{
            let i = item,
                start = i * shardSize,
                end = Math.min(originalSize,start + shardSize),
                form = new FormData();
            form.append("data",file.slice(start,end));
            form.append("name",file.name);
            form.append("total",shardCount);
            form.append("index",i+1);
            this.props.onUpload(form);
            cb()
        })
    }
    render(){
        let fileInfo = "",
            progressInfo = "",
            getValue = 0,
            getWidth = this.state.width;
        if(this.props.completed){
            getValue = this.props.completed;
        }
        let result = Math.ceil(getValue*getWidth)
        var width = {
            width : result<100?result+"px":"100px"
        }
        if(this.state.hasFile){
             fileInfo =(
                <div className="fileInfo">
                    <p>文件名称 : {this.state.name}</p>
                    <p>文件大小 : {this.state.total}M</p>
                    <p>文件类型 : {this.state.type}</p>
                    <p className="colBlue">{this.props.uploadSuccess?"上传完成":''}</p>
                </div>
            );
            progressInfo = (
                <div className="progress">
                    <p style={width}>
                        <span>{(getValue/this.state.shardCount)*100}%</span>
                    </p>
                </div>
            )

        }
        return(
            <div className="fileContent">
                <div className="file_area">
                    <div className="input_auto">
                        <input type="file" onChange={this.handlerChange.bind(this)}/>
                    </div>
                    {progressInfo}
                </div>
                {fileInfo}
            </div>
        )
    }
}
function mapStateToProps(state,dom) {
    return{
        completed : state.User.completed,
        uploadSuccess : state.User.uploadSuccess
    }
}
function mapDispatchToProps(dispatch,dom) {
    return{
        onUpload : (data)=>{
            dispatch(upLoadFile(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(File)