import React from 'react'
import asios from 'axios'
import config from '../../common.js'
import {hasToken} from "../utils/token";
import {Carousel, Flex, Modal, Toast} from "antd-mobile";
import styles from './index.module.scss'
import NavHeader from "../../common/NavHeader";
import {IMG_BASE_URL} from '../../common'
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
                        {houseImg.map(item=>{
                            <a key={item} href="www.alipay.com">
                                <img src={`${IMG_BASE_URL}${item}`} alt=""/>
                            </a>
                        })}
                    </Carousel>
                </div>
                {/*房屋基础信息*/}
                <div className="info">
                    <h3 className="infoTitle">{title}</h3>
                    <Flex className="tags"></Flex>
                </div>
            </div>
        )
    }
}