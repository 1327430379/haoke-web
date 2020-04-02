import React, {Component} from 'react';
import {Flex} from "antd-mobile";
import FlexItem from "antd-mobile/es/flex/FlexItem";
import {Image} from "semantic-ui-react";

class Index extends Component {

    state={
        houseInfo: {}
    }
    constructor(props) {
        super(props);
        this.state.houseInfo = props.houseInfo;
        console.log(this.state)
    }
    render() {
        return (
            <div >
                <h4>房源信息</h4>

                <Flex >
                    <FlexItem className="house-img">
                        <div >
                            <Image src="http://image.haoke.com:8081/images/SH2131722044637708288.jpg"/>

                        </div>

                    </FlexItem>

                    <FlexItem className="house-desc">
                        <div>
                            <h3>回龙观 三室一厅</h3>
                            <span>4室1厅/120m2</span>
                            <div>
                                <span>押一付一</span>
                            </div>
                            <span className="rent">2000元/月</span>

                        </div>

                    </FlexItem>

                </Flex>
            </div>
        );
    }
}

export default Index;