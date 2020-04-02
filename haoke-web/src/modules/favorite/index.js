import React, {Component} from 'react';
import NavHeader from "../../common/NavHeader";
import {API} from "../utils/api";
import {REQUEST_URL} from "../../common";

class Index extends Component {
    state = {
        id:'',
        houseId:'',
        userId:''
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        //接收传过来的id
        API.POST(`${REQUEST_URL}favorite/queryByPage`,{
            "userId":localStorage.getItem("uid")
        });

    }

    render() {
        return (
            <div>
                <NavHeader key="favorite"
                           className="navHeader"
                           rightContent={[<i key="share" className="iconfont icon-share"/>]}
                ></NavHeader>
            </div>
        );
    }
}

export default Index;