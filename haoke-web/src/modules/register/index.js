import React, {Component} from 'react';
import {Form, FormButton} from "semantic-ui-react";
import {Redirect} from "react-router-dom";
import {Toast} from "antd-mobile";
import {API} from "../utils/api";
import {withRouter} from "react-router-dom";

class Index extends Component {
    state = {
        username: '',
        password: '',
    }
    handleSubmit  = async () => {
        const {username, password} = this.state;
       const res = await API.post('user/register',{
            username: username,
            password: password
        })
        console.log("res:"+JSON.stringify(res));
        if(res.resultCode === 200){
            Toast.success("注册成功，跳转到登录页面",1);
            setTimeout(()=>{ this.props.history.push('/login');},3000)

        }else{
            console.log(res)
            Toast.fail(res.resultMsg,1);
        }

    }
    handleChange = (e, {name, value}) => {
        this.setState({[name]: value})
    }

    render() {
        const {username, password} = this.state;
        return (
            <div className='login-container' style={{backgroundColor: '#ffffff'}}>
                <div className='login-title' style={{backgrounColor: '#dgsdg9'}}>注册</div>
                <div className='login-form'>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input
                            icon='user'
                            required
                            size='big'
                            iconPosition='left'
                            name='username'
                            value={username}
                            onChange={this.handleChange}
                            placeholder='请输入用户名...'
                        />
                        <Form.Input
                            type='password'
                            icon='lock'
                            required
                            size='big'
                            iconPosition='left'
                            name='password'
                            value={password}
                            onChange={this.handleChange}
                            placeholder='请输入密码...'
                        />
                        <Form.Button positive content='确认注册'/>

                    </Form>
                </div>
            </div>

        );
    }
}

export default withRouter(Index);