import React,{Component} from "react"

class NavBack extends Component{
    goBack(){
        window.history.back();
    }
    render(){
        return(
            <div className="navback">
                <p onClick={this.goBack.bind(this)}>&lt;返回</p>
            </div>
        )
    }
}
export default NavBack