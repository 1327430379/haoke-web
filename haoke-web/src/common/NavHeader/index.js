import React from 'react'
import {NavBar} from "antd-mobile";
import style from './index.module.scss'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'

 class NavHeader extends React.Component{

    handleClick=()=>{
       this.props.history.push('/seeHouse/cancel')
    }
    static propTypes = {
        children:PropTypes.string.isRequired
    }
    render() {
        const {rightContent,className} = this.props
        return(
            <NavBar
            className = {classnames(style.navBar,className)}
            mode="light"
            icon={<i className="iconfont icon-back"/>}
            onLeftClick={()=>this.props.history.go(-1)}
            rightContent={<span onClick={this.handleClick}>{rightContent}</span>}
            >
                {this.props.children}

            </NavBar>
        )
    }

}
export default withRouter(NavHeader)