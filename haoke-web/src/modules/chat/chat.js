import React from 'react';
import ChatWindow from './chat-window.js';
import axios from 'axios';
import './chat.css';
import IMEvent from "./IMEvent";
import config from '../../common'
import {CHAT_URL, IMG_BASE_URL} from "../../common";
import {API} from "../utils/api";
import {Toast, Tabs, WhiteSpace, Button} from "antd-mobile";
import {Tab} from "semantic-ui-react";


const tabs = [
    {title: '聊天', key: 't1'},
    {title: "通知", key: 't2'}
]

class ChatPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: 'nihao',
            isShow: false,
            isLoading: false,
            list: [],
            chatInfo: null,
            client: null
        };
    }

    toChat = (e, p) => {
        console.log("p:" + JSON.stringify(p));
        this.setState({
            isShow: true,
            chatInfo: {
                to_user: p.item.targetId,
                from_user: p.item.userId,
                username: p.item.targetName,
                avatar: p.avatar
            }
        });
        console.log("state:" + JSON.stringify(this.state));
    }
    sendMsg = (msg) => {
        let pdata = {
            from_user: this.state.chatInfo.from_user,
            to_user: this.state.chatInfo.to_user,
            avatar: this.state.chatInfo.avatar,
            chat_msg: msg
        }
        this.state.client.emitEvent(IMEvent.MSG_TEXT_SEND, JSON.stringify(pdata));
    }
    hideChat = () => {
        this.setState({isShow: false});
    }
    componentDidMount = async () => {
        const token = localStorage.getItem("mytoken");
        const arr = token.split("_");
        console.log(arr);
        const uid = arr[0];
        if (uid === 'undefined' || uid == null) {
            Toast.fail("用户id不存在")
        }
        const res = await API.get(`${CHAT_URL}api/user/sessionList?fromId=${uid}`);

        console.log("res:" + JSON.stringify(res));
        this.setState({
            list: res.data,
            isLoading: true
        })

        // axios.post('/chats/list').then((data)=>{
        //   this.setState({
        //     list: data.data.list,
        //     isLoading: true
        //   })
        // })
    }


    render() {
        console.log(this.state.list)
        const isLoading = this.state.isLoading;
        let list = null;
        if (isLoading) {
            list = this.state.list.map(item => {
                return (
                    <li key={item.id} onClick={(e) => this.toChat(e, {item})}>
                        <div className="avarter">
                            <img src="http://image.haoke.com:8081/images/local/avatar.jpg" alt="avarter"/>
                            <span className="name">{item.targetName}</span>
                            <span className="info">{item.lastMessage}</span>
                            <span className="time">{item.beginTime}</span>
                        </div>
                    </li>
                )
            })
        }
        return (
            <div className='chat-container'>
                <div className="chat-title">聊天</div>
                <div className="chat-list">
                    <ul>{list}</ul>
                </div>
                {this.state.isShow ?
                    <ChatWindow chatInfo={this.state.chatInfo} wsclient={this.state.client} isShow={this.state.isShow}
                                hideChat={this.hideChat}/> : null}
            </div>
        )


    }
}

class NoticePane extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        role: 'owner',
        list: [],
    }

    async componentDidMount() {
        //加载通知数据
        const res = await API.get('notice/message');
        this.setState({
            list:res.data
        })
    }

    changeSeeHouseStatus = item => {

        let newList = [...this.state.list];
        if (item.seeHouseStatus === 1) {
            //点击已看 设置为已完成看房
            item.seeHouseStatus = 3
        } else {
            //点击未看 设置为完成未看房
            item.seeHouseStatus = 4
        }
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id === item.id) {
                newList.splice(i, 1);
            }
        }
        newList.push(item)
        this.setState({
            list: newList
        })

    }
    agreeSeeHouse = async (item, flag) => {
        console.log(item);
        let newList = [...this.state.list];

        if (flag === 1) {
            //同意看房 需要更改状态与发送通知消息
            item.seeHouseStatus = 1
            const res = await API.put(`see/house/updateRequestStatus?id=${item.dataId}&seeHouseStatus=${item.seeHouseStatus}`)
            if (res.resultCode === 200) {
                this.setState({
                    list: newList
                })

            } else {
                Toast.fail(res.resultMsg, 1);
            }
        } else {
            //拒绝看房 只需要给租户发送取消通知消息就ok
        }


    }

    render() {
        let list = this.state.list.map(item => {
            if (this.state.role === 'user') {
                return (
                    <li key={item.id}>
                        <div>
                            <div className='notice-item-title'>{item.title}</div>
                            {item.seeHouseStatus === 1 ? <div>
                                <Button size="small" inline onClick={() => {
                                    this.changeSeeHouseStatus(item)
                                }}>已看</Button>
                                <Button size="small" inline onClick={() => {
                                    this.changeSeeHouseStatus(item)
                                }}>未看</Button>
                            </div> : ''}
                            {item.seeHouseStatus === 3 ? <div>
                                <Button size="small" inline type='primary'>已完成</Button>

                            </div> : ''}
                            {item.seeHouseStatus === 4 ? <div>
                                <Button size="small" inline>已结束</Button>

                            </div> : ''}
                        </div>
                        <span>{item.content}</span>
                        <hr/>
                    </li>
                )
            } else {
                return (
                    <li key={item.id}>
                        <div>
                            <div className='notice-item-title'>{item.title}</div>
                            {item.seeHouseStatus === 0 ? <div>
                                <Button size="small" inline onClick={() => {
                                    this.agreeSeeHouse(item, 1)
                                }}>同意</Button>
                                <Button size="small" inline onClick={() => {
                                    this.agreeSeeHouse(item, 2)
                                }}>拒绝</Button>
                            </div> : ''}
                            {item.seeHouseStatus === 1 ? <Button className='notice-btn-disable' size='small' inline
                                                                 type='primary'>待看房</Button> : ''}
                            {item.seeHouseStatus === 2 ?
                                <Button className='notice-btn-disable' size='small' inline disabled>已取消</Button> : ''}
                        </div>
                        <span>{item.content}</span>
                        <hr/>
                    </li>
                )
            }
        })

        return (
            <div>
                <ul>{list}</ul>
            </div>

        )
    }
}

class Chat extends React.Component {


    render() {


        const panes = [
            {
                menuItem: '聊天', render: () => <Tab.Pane>
                    <ChatPane/>
                </Tab.Pane>
            },
            {
                menuItem: '通知', render: () => <Tab.Pane>
                    <NoticePane/>
                </Tab.Pane>
            },

        ]

        return (
            <div className='find-container'>
                <div className="find-topbar">微聊</div>
                <div className="find-content">
                    <Tab panes={panes}/>
                </div>
            </div>
        );


    }
}

export default Chat

