import React,{Component} from "react"
import propType from "prop-types"

class Pager extends Component{
    constructor(props){
        super(props);
    }
    pageCount(count){
        this.props.getPager(count)
    }
    render(){
        let total = Math.ceil(this.props.total/10),
            currentPage = this.props.currentPage,
            pageArray = [];
        for(let i=1;i<=total;i++){
            pageArray.push(i)
        }
        return (
            <div className="pager">
                {pageArray.map((item,index)=>{
                    return(
                        <a key={index} onClick={this.pageCount.bind(this,item)} className={currentPage==item?'current':''}>{item}</a>
                    )
                })}
            </div>
        )
    }
}

export default Pager
