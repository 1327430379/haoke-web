import React, {Component} from 'react';
import NavHeader from "../../../common/NavHeader";
import {Button, Flex, InputItem, Toast, WhiteSpace} from "antd-mobile";
import home from "../../home/home";
import FlexItem from "antd-mobile/es/flex/FlexItem";
import {Item} from "antd-mobile/es/tab-bar";
import styles from '../index.css'
import {Divider, Image, ItemImage} from "semantic-ui-react";
import IMG_BASE_URL from '../../../common'
import HouseItem from '../../../common/HouseItem/index'
const PlaceHolder = ({className = '', ...restProps}) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);

class Index extends Component {

    state = {
        houseId: ''
    }

    componentDidMount() {
        this.state.houseId = this.props.match.params.houseId;
        Toast.info(this.state.houseId, 1);
    }

    render() {
        return (
            <div className="appointment-container">
                <NavHeader key='appointment'
                           className="navHeader"
                           leftContent="back"
                           rightContent="取消预约"

                >
                    看房详情
                </NavHeader>
                <div className="house-msg">
                    <HouseItem houseInfo={{id:1,name:'333'}} >hello</HouseItem>

                    {/*<h4>房源信息</h4>*/}

                    {/*<Flex >*/}
                    {/*    <FlexItem className="house-img">*/}
                    {/*        <div >*/}
                    {/*            <Image src="http://image.haoke.com:8081/images/SH2131722044637708288.jpg"/>*/}

                    {/*        </div>*/}

                    {/*    </FlexItem>*/}

                    {/*    <FlexItem className="house-desc">*/}
                    {/*        <div>*/}
                    {/*            <h3>回龙观 三室一厅</h3>*/}
                    {/*            <span>4室1厅/120m2</span>*/}
                    {/*            <div>*/}
                    {/*                <span>押一付一</span>*/}
                    {/*            </div>*/}
                    {/*            <span className="rent">2000元/月</span>*/}

                    {/*        </div>*/}

                    {/*    </FlexItem>*/}

                    {/*</Flex>*/}
                    <hr/>
                    <Flex className="house-contact">
                        <FlexItem >
                            <div className="contact-item">地址</div>
                            <div className="contact-item">预约时间</div>
                            <div className="contact-item">联系方式</div>
                        </FlexItem>
                        <FlexItem>
                            <div className="contact-item">
                                湖南省衡阳县渣江镇
                            </div>
                            <div className="contact-item">

                                <InputItem value="17398798769" editable={false}/>
                            </div>
                            <div className="contact-item">

                                <InputItem value="2019-3-29" editable={false} />
                            </div>
                        </FlexItem>

                    </Flex>
                    <hr/>


                </div>


                <Flex className="bottom-btn">
                    <FlexItem>
                        <Button type="ghost" size="large">未看房</Button><WhiteSpace/>
                    </FlexItem>
                    <FlexItem>
                        <Button type="primary" size="large">已看房</Button><WhiteSpace/>
                    </FlexItem>
                </Flex>

            </div>
        );
    }
}

export default Index;