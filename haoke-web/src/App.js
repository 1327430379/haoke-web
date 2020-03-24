import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './modules/assets/fonts/iconfont.css';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Main from './modules/main.js';
import Login from './Login';
import Show from './Show';
import axios from 'axios';
import config from './common.js';
import House from './modules/home/list';
import Detail from './modules/house/Detail'
import New from './modules/new/index'

axios.defaults.baseURL = config.apiBaseUrl;
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('mytoken');
  config.headers.Authorization = token ;
  console.log("token:"+token);
  if(!config.url.includes('/login')&&token==null){
    var router = new BrowserRouter();


  }

  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

class App extends Component {
   handleMsg = ()=>{
    console.log(333);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/show" component={Show}/>
          <Route path="/home" component={Main}/>
          <Route path="/abc" component={House} />
          <Route path="/detail/:id" component={Detail} />
          <Route path='/new' component={New}/>
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
