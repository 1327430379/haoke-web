import React, { Component } from 'react';
import './login.css';
import {Form, FormButton} from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router';
import {REQUEST_URL} from './common.js';
import {Redirect} from "react-router-dom";
import {Toast} from "antd-mobile";
import {API} from "./modules/utils/api";

class Login extends Component {
  state = { 
    username: '', 
    password: '' 
  }
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { username, password } = this.state
    const { history } = this.props
    API.post(REQUEST_URL+'user/app/login',{
      username: username,
      password: password
    }).then((ret)=>{
      if(ret.resultCode === 200) {
        // 登录成功,保存token信息并实现跳转
        localStorage.setItem('mytoken',ret.data.token);
        history.push('/home');
      } else {
        Toast.fail(ret.resultMsg,1);
      }
    }).catch((error)=>{
      console.log(error)
    })
    // axios.post(REQUEST_URL + 'user/app/login',{
    //   username: username,
    //   password: password
    // }).then(function(ret){
    //   console.log(ret)
    //   if(ret.resultCode === 200) {
    //     // 登录成功,保存token信息并实现跳转
    //     localStorage.setItem('mytoken',ret.data.token);
    //
    //
    //
    //     history.push('/home');
    //   } else {
    //     Toast.fail(ret.resultMsg,1);
    //   }
    // }).catch(function(data){
    //   console.log(data)
    // })
  }
  componentDidMount() {

  }

  render() {

    const { username, password } = this.state
    return (
      <div className='login-container'>
        <div className='login-title'>登录</div>
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
            <Form.Button positive content='登录'/>
            <FormButton  content='注册' onClick={()=>(<Redirect to='/home' />)}/>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
