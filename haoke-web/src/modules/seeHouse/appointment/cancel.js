import React, {Component} from 'react';
import NavHeader from "../../../common/NavHeader";
import {Button, List, Radio,Toast} from "antd-mobile";

const RadioItem = Radio.RadioItem

class Cancel extends Component {
    state = {
        value2: 0

    };
    onChange2 = (value) => {
        console.log('checkbox');
        this.setState({
            value2: value,
        });
    };
    handleCancel = ()=>{
        Toast.info("取消预约",100)
    }
    render() {
        const {value2} = this.state;
        const data2 = [
            {value: 0, label: '临时有事，另约时间', extra: 'details'},
            {value: 1, label: '已租到合适的房间了，不需要看房了', extra: 'details'},
            {value: 2, label: '临时变卦，不想看房了', extra: 'details'},
            {value: 3, label: '其他原因', extra: 'details'},
        ];

        return (
            <div>
                <NavHeader key='appointment'
                           className="navHeader"
                           leftContent="back"
                           rightContent="取消预约"

                >
                    取消预约
                </NavHeader>
                <List>
                    {data2.map(i => (
                        <RadioItem key={i.value} checked={value2 === i.value} onChange={() => this.onChange2(i.value)}>
                            {i.label}<List.Item.Brief>{i.extra}</List.Item.Brief>
                        </RadioItem>
                    ))}
                </List>
                <Button type='primary' size='large' style={{position:'fixed',bottom:'0px',width:'100%'}} onClick={this.handleCancel}>取消预约</Button>
            </div>
        );
    }
}

export default Cancel;