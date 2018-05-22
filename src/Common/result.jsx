import React,{Component,PropTypes} from "react"
class Error extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let classSet = '',
            icon = '';
        if(this.props.type==='error'){
            classSet = "netError"
            icon = "×"
        }
        if(this.props.type==='success'){
            classSet = "netSuccess"
            icon = '√'
        }
        return(
            <div className={classSet}>
                <p className="icon"><span>{icon}</span></p>
                <p className="des">{this.props.text}</p>
            </div>
        )
    }
}
Error.propTypes={
    text : PropTypes.any,
    type : PropTypes.any
}
Error.defaultProps = {
    text : '数据异常',
    type : 'error'
}
export default Error