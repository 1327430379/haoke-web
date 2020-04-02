import React from 'react'
import asios from 'axios'
import config from '../../common.js'
import {hasToken} from "../utils/token";
import {Carousel, Flex, Modal, Toast, Button} from "antd-mobile";
import styles from './index.css'
import NavHeader from "../../common/NavHeader";
import {IMG_BASE_URL} from '../../common'
import FlexItem from "antd-mobile/es/flex/FlexItem";
import HousePackage from '../../common/HousePackage'
import {API} from "../utils/api";
import {REQUEST_URL} from "../../common";
import classnames from 'classnames'

export default class Detail extends React.Component {

    state = {
        houseInfo: {
            houseOwnerId:'',
            id: '',
            img: ['http://image.haoke.com:8081/images/SH2158494573566107648.jpg', 'http://image.haoke.com:8081/images/SH2158494573566107648.jpg'],
            image: '',
            title: "",
            rent: '',
            houseType: '',
            floor: '',
            orientation: '',
        },
        isFavorite: false
    }

    checkLove = async id => {
        asios.get('/user/favorites/${id}').then(res => {
            this.setState({
                isFavorite: res.data.isFavorite
            })
        })
    }

    async componentDidMount() {
        this.state.houseInfo.id = this.props.match.params.id;
        //接收传来的参数id
        const id = this.state.houseInfo.id
        console.log(id)
        const res = await API.get(`${REQUEST_URL}house/resources/${id}`)
        console.log(res)
        this.setState({
            //isFavorite: res.body.isFavorite
            houseInfo: res.data

        })

        //发送请求判断是否收藏
        // if (!hasToken()) return
        //
        // this.checkLove(id)
    }

    //添加收藏
    handleFavorite = async () => {
        if (!hasToken()) {
            //用户没登录
            return Modal.alert('提示', "登录后才能收藏房源，是否去登录", [
                {text: '取消'},
                {
                    text: '确定',
                    onPress: () => {
                        this.props.history.push('/login', {from: this.props.location})
                    }
                }
            ])
        }
        //已经登录了
        if (this.state.isFavorite) {
            //已经收藏过了
            await asios.delete(`/usr/favorites/${this.id}`).then(res => {
                if (res.status === 200) {
                    Toast.success("取消收藏")
                    this.setState({
                        isFavorite: false
                    })
                } else {
                    Modal.alert('提示', "token过期了，是否去登录?", [
                        {text: '取消'},
                        {
                            text: '确定',
                            onPress: () => {
                                this.props.history.push('/login', {from: this.props.location})
                            }
                        }
                    ])
                }
            })
        } else {
            //没有收藏 则收藏
            const res = API.post(`user/favorites/${this.id}`)
            if (res.status === 200) {
                Toast.success("添加收藏")
                this.setState({
                    isFavorite: true
                })
            } else {
                Modal.alert('提示', 'token过期了，是否去登录?', [
                    {text: '取消'},
                    {
                        text: '确定',
                        onPress: () => {
                            this.props.history.push('/login', {from: this.props.location})
                        }
                    }
                ])
            }

        }
    }
    handleMsg = () => {
        console.log("gg");
        Toast.info("gdg", 1);
    }

    sendMsg = ()=>{

    }

    render() {
        const {houseInfo} = this.state
        if (!houseInfo) {
            // return null
        }
        const {
            houseOwnerId,
            img,
            image,
            title,
            rent,
            houseType,
            floor,
            orientation,

        } = houseInfo
        houseInfo.img = ['http://image.haoke.com:8081/images/SH2158494573566107648.jpg', 'http://image.haoke.com:8081/images/SH2158494573566107648.jpg']
        console.log("gdgd" + houseInfo.img.length)
        return (

            <div className="detail">

                <NavHeader key='ggg'
                           className="navHeader"
                           rightContent={[<i key="share" className="iconfont icon-share"/>]}
                >
                    {/*{community}*/}
                </NavHeader>
                {/*轮播图*/}
                <div className="slides">
                    <Carousel autoplay infinite>
                        {houseInfo.img.map(item => (
                            <a key={item} href="http://www.alipay.com">
                                {/*`${IMG_BASE_URL}images/${image}`*/}
                                <img src={item} alt=""/>
                            </a>
                        ))}


                    </Carousel>
                </div>
                房屋基础信息
                <div className="info">
                    <h3 className="infoTitle">{title}</h3>

                    {/*<Flex className="tags">*/}
                    {/*    /!*<Flex.Item>{this.}</Flex.Item>*!/*/}
                    {/*</Flex>*/}

                    <Flex className="infoPrice">
                        <FlexItem className="infoPriceItem">
                            <div>
                                {rent}/月
                                <div>租金</div>
                            </div>
                        </FlexItem>
                        <Flex.Item className="infoPriceItem">
                            <div>{houseType}</div>
                            <div>房型</div>
                        </Flex.Item>
                        <Flex.Item className="infoPriceItem">
                            <div>{orientation}平米</div>
                            <div>面积</div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="infoBasic">
                        <FlexItem>
                            <div>
                                <span className="title">装修：</span>
                                精装
                            </div>
                            <div>
                                <span className="title">楼层：</span>
                                {floor}
                            </div>
                        </FlexItem>
                        <FlexItem>
                            <div>
                                <span className="title">朝向：</span>
                                {/*{oriented.join('、')}*/}
                            </div>
                            <div>
                                <span className="title">类型：</span>普通住宅
                            </div>
                        </FlexItem>
                    </Flex>
                </div>
                {/*渲染百度地图*/}
                {/*<div className="map">*/}
                {/*    <div className="mapTitle">*/}
                {/*        小区：*/}
                {/*        <span>{community}</span>*/}
                {/*    </div>*/}
                {/*    <div className="mapContainer" id="map">*/}
                {/*        地图*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*房屋配套*/}
                {/*<div className="about">*/}
                {/*    <div className="houseTitle">房屋配套</div>*/}
                {/*    {supporting.length == 0 ? (*/}
                {/*        <div className="titleEmpty">暂无数据</div>*/}
                {/*    ) : (*/}
                {/*        <HousePackage list={supporting}/>*/}
                {/*    )}*/}
                {/*</div>*/}
                {/*房屋概况*/}
                <div className="set">
                    <div className="houseTitle">房源概况</div>
                    <div>
                        <div className="contact">
                            <div className="user">
                                {/*<img src={IMG_BASE_URL + '/img/avatar.png'} alt="头像"/>*/}
                                <div className="userInfo">
                                    <div>王女士</div>
                                    <div className="userAuth">
                                        <i className="iconfont icon-auth"/>
                                        已认证房主
                                    </div>
                                </div>
                            </div>
                            <span className="userMsg" onClick={this.sendMsg}>发消息</span>
                        </div>
                        <div className="descText">{'暂无房屋描述'}</div>
                    </div>
                </div>
                {/*推荐*/}


                <Flex className="fixedBottom">
                    <FlexItem onClick={this.handleFavorite}>
                        {/*<img*/}
                        {/*    src={*/}
                        {/*        IMG_BASE_URL +*/}
                        {/*        (this.state.isFavorite ? '/images/local/unfavorite.png' : '/images/local/favorite.png')*/}
                        {/*    }*/}
                        {/*    className="favoriteImg"*/}
                        {/*    alt="收藏"*/}
                        {/*/>*/}
                        <span className="favorite">
                            {this.state.isFavorite ? '已收藏' : '收藏'}
                        </span>
                    </FlexItem>
                    <Flex.Item>在线咨询</Flex.Item>
                    <Flex.Item>
                        <a className="telephone"
                           onClick={() => this.props.history.push(`/seeHouse/appointment/${this.state.houseInfo.id}`)}>
                            看房预约
                        </a>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}