import axios from 'axios'
import {IMG_BASE_URL, REQUEST_URL} from "../../common";
import {removeToken, getToken} from "./token";

const API = axios.create({
    baseURL: REQUEST_URL
})
//配置拦截器
API.interceptors.request.use(config => {
    console.log(config)
    //判断路径是否已user开头，并且不能是登陆和注册接口
    let url = config.url;
    if (url.startsWith('user') && !url.startsWith('user/login') && !url.startsWith('user/registered')) {
        //给config配置token
        config.headers.authorization = getToken()
    }
    return config;
})
//配置响应的拦截器
API.interceptors.response.use(response => {
    //对响应数据做点什么
    //添加一个额外的判断，判断状态码是否为400，如果是400，说明token过期或者无效
    if (response.status === 400) {
        removeToken()
    }
    return response.data
},error=>{
    return Promise.reject(error)
    }
)
export {API}