import React from 'react'
import asios from 'axios'
import config from '../../common.js'
import {hasToken} from "../utils/token";
import {Carousel, Flex, Modal, Toast} from "antd-mobile";
import styles from './index.module.scss'
import NavHeader from "../../common/NavHeader";
import {IMG_BASE_URL} from '../../common'
import FlexItem from "antd-mobile/es/flex/FlexItem";
import HousePackag from '../../common/HousePackage'

export default class Detail extends React.Component {

    state = {
        houseInfo: null,
        isFavorite: false
    }

    checkLove = async id => {
        asios.get('/usr/favorites/${id}').then(res => {
            this.setState({
                isFavorite: res.data.isFavorite
            })
        })
    }

    async componentDisCount() {
        //接收传来的参数id
        const id = this.props.match.params.id;
        this.id = id;
        const res = await asios.get('house/${id}')
        this.setState({
            //isFavorite: res.body.isFavorite
        })

        //发送请求判断是否收藏
        if (!hasToken()) return

        this.checkLove(id)
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
            await asios.post(`/usr/favorites/${this.id}`)
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

    render() {
        const {houseInfo} = this.state
        if (!houseInfo) {
            return null
        }
        const {
            community,
            houseImg,
            title,
            price,
            roomType,
            size,
            floor,
            oriented,
            tags,
            supporting,
            description
        } = houseInfo

        return (
            <div className={styles.detail}>
                <NavHeader
                    className="navHeader"
                    rightContent={[<i key="share" className="iconfont icon-share"/>]}
                >
                    {community}
                </NavHeader>
                {/*轮播图*/}
                <div className={slides}>
                    <Carousel autoplay infinite>
                        {houseImg.map(item => {
                            <a key={item} href="http://www.alipay.com">
                                <img src={`${IMG_BASE_URL}${item}`} alt=""/>
                            </a>
                        })}
                    </Carousel>
                </div>
                {/*房屋基础信息*/}
                <div className="info">
                    <h3 className="infoTitle">{title}</h3>

                    <Flex className="tags">
                        {/*<Flex.Item>{this.}</Flex.Item>*/}
                    </Flex>

                    <Flex className="infoPrice">
                        <FlexItem className="infoPriceItem">
                            <div>
                                {price}
                                <h3 className="month">/月</h3>
                                <div>租金</div>
                            </div>
                        </FlexItem>
                        <Flex.Item className="infoPriceItem">
                            <div>{roomType}</div>
                            <div>房型</div>
                        </Flex.Item>
                        <Flex.Item className="infoPriceItem">
                            <div>{size}平米</div>
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
                                {oriented.join('、')}
                            </div>
                            <div>
                                <span className="title">类型：</span>普通住宅
                            </div>
                        </FlexItem>
                    </Flex>
                </div>
                {/*渲染百度地图*/}
                <div className="map">
                    <div className="mapTitle">
                        小区：
                        <span>{community}</span>
                    </div>
                    <div className="mapContainer" id="map">
                        地图
                    </div>
                </div>
                {/*房屋配套*/}
                <div className="about">
                    <div className="houseTitle">房屋配套</div>
                    {supporting.length == 0 ? (
                        <div className="titleEmpty">暂无数据</div>
                    ) : (
                        <HousePackage list={supporting}/>
                    )}
                </div>
                {/*房屋概况*/}
                <div className="set">
                    <div className="houseTitle">房源概况</div>
                    <div>
                        <div className="contact">
                            <div className="user">
                                <img src={IMG_BASE_URL + '/img/avatar.png'} alt="头像"/>
                                <div className="userInfo">
                                    <div>王女士</div>
                                    <div className="userAuth">
                                        <i className="iconfont icon-auth"/>
                                        已认证房主
                                    </div>
                                </div>
                            </div>
                            <span className="userMsg">发消息</span>
                        </div>
                        <div className="descText">{description || '暂无房屋描述'}</div>
                    </div>
                </div>
                {/*推荐*/}

                //todo 需要添加推荐的代码

                {/*底部收藏按钮*/}
                <Flex className="fixedBotto">
                    <FlexItem onClick={this.handleFavorite}>
                        <img
                            src={
                                IMG_BASE_URL +
                                (this.state.isFavorite ? '/img/star.png' : '/img/unstar.png')
                            }
                            className="favoriteImg"
                            alt="收藏"
                        />
                        <span className="favorite">
                            {this.state.isFavorite ? '已收藏' : '收藏'}
                        </span>
                    </FlexItem>
                    <Flex.Item>在线咨询</Flex.Item>
                    <Flex.Item>
                        <a href="tel:400-618-4000" className="telephone">
                            电话预约
                        </a>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}