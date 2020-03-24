import React, {Component} from 'react';
import {Button, Carousel, Toast} from "antd-mobile";
import {IMG_BASE_URL} from "../../common";

class New extends Component {
    handleMsg=()=>{
        Toast.info("dgsdg",1)
    }
    state={
        images:["http://image.haoke.com:8081//images/SH2158494573566107648.jpg"," http://image.haoke.com:8081//images/SH2121437456225009664.jpg"]
    }

    render() {
        const {images} = this.state;
        return (
            <div>
                <Button onClick={this.handleMsg}>点击</Button>
                <div className="slides">
                    <Carousel autoplay infinite>
                        {images.map(item=>(
                            <a key="33" href="http://www.alipay.com">
                                <img src={item} alt=""/>
                            </a>
                        ))}


                    </Carousel>
                </div>
            </div>
        );
    }
}

export default New;