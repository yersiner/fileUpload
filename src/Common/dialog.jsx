import React,{Component} from "react"

export class Tip extends Component{
    constructor(props){
        super(props);
        console.log(props)
    }
    render(){
        var stated = this.props.status===true?"block":"none";
        var isStated = {
            display : stated
        }
        return (
            <div className="tipBox" style={isStated}>
                {this.props.text}
            </div>
        )
    }
}
