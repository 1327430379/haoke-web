import React from 'react'

import {
    Flex,
    List,
    InputItem,
    Picker,
    ImagePicker,
    TextareaItem,
    Modal,
    Toast
} from "antd-mobile";
import NavHeader from "../../../common/NavHeader";
import HousePackage from "../../../common/HousePackage";
import styles from './index.module.scss'
import {API} from "../../utils/api";
import LinePath from "echarts/src/chart/helper/LinePath";
import FlexItem from "antd-mobile/es/flex/FlexItem";

const alert = Modal.alert
const Item = List.Item
// 房屋类型
const houseTypeData = [
    {label: '一室', value: 'ROOM|d4a692e4-a177-37fd'},
    {label: '二室', value: 'ROOM|d1a00384-5801-d5cd'},
    {label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2'},
    {label: '四室', value: 'ROOM|ce2a5daa-811d-2f49'},
    {label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f'}
]
// 朝向：
const orientedData = [
    {label: '东', value: 'ORIEN|141b98bf-1ad0-11e3'},
    {label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e'},
    {label: '南', value: 'ORIEN|61e99445-e95e-7f37'},
    {label: '北', value: 'ORIEN|caa6f80b-b764-c2df'},
    {label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977'},
    {label: '东北', value: 'ORIEN|67ac2205-7e0f-c057'},
    {label: '西南', value: 'ORIEN|2354e89e-3918-9cef'},
    {label: '西北', value: 'ORIEN|80795f1a-e32f-feb9'}
]
// 楼层
const floorData = [
    {label: '高楼层', value: 'FLOOR|1'},
    {label: '中楼层', value: 'FLOOR|2'},
    {label: '低楼层', value: 'FLOOR|3'}
]


export default class Index extends React.Component {
    state = {
        rent: '',
        title: '',
        houseType: [],
        floor: [],
        orientation: [],
        files: [],
        description:'',
    }

    componentDidMount() {
        console.log(this.props.location)
        const {state} = this.props.location
        // if(state){
        //     this.setState({})
        // }
    }

    //取消编辑，返回上一页
    onCancel = () => {
        alert('提示', '放弃发布房源？', [
            {
                text: '放弃',
                onPress: async () => this.props.history.go(-1)
            }, {
                text: '继续编辑'
            }
        ])
    }

    addHouse = async ()=>{
        const {
            rent,
            title,
            houseType,
            floor,
            orientation,
            files
        } = this.state
        //1、上传图片
        const uploadFiles = new FormData()
        // if(files.length<1){
        //     return Toast.info('至少上传一张图片',1)
        // }
        console.log(files)
        files.forEach(item=>uploadFiles.append('file',item.file))
        const res = await API.post('pic/upload/batch',{"uploadFiles":uploadFiles},{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        //2、发送请求，添加房源信息
        const addRes = await API.post('user/house',{
            title,
            image:res.body.join('|'),
            orientation,
            rent,
            houseType: houseType[0],
            fllor:floor[0]
        })
        if(addRes.status===200){
            this.props.history.push('/rent')
        }
    }
    handleChange = (name,value)=>{
        console.log(name,value)
        this.setState({
            [name]:value
        })

    }

    onChange (files,type,index){
        this.setState({
            files
        });
    }

    render() {
        const{history} = this.props
        const {
            rent,
            title,
            houseType,
            floor,
            orientation,
            files,
            description
        } = this.state

        return (
            <div className='rent-add' >
                <NavHeader className='NavHeader'></NavHeader>
                <List className='header' renderHeader={()=>'房源信息'}>
                    <InputItem
                    placeholder='请输入租金/月'
                    extra='￥/月'
                    value={rent}
                    onChange={this.handleChange.bind(this,'rent')}
                    >
                        租金
                    </InputItem>
                    <InputItem
                    placeholder='请输入房屋面积'
                    extra="㎡"
                    value={orientation}
                    onChange={this.handleChange.bind(this,'orientation')}>
                    房屋面积
                    </InputItem>
                    <Picker
                    data={houseTypeData}
                    value={houseType}
                    cols={1}
                    onChange={this.handleChange.bind(this,'houseType')}
                    >
                        <Item arrow='horizontal'>
                            户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
                        </Item>

                    </Picker>
                    <Picker
                    data={floorData}
                    value={floor}
                    cols={1}
                    onChange={this.handleChange.bind(this,'floor')}>
                        <Item arrow='horizontal'>所在楼层</Item>

                    </Picker>
                </List>
                <List
                className='title'
                renderHeader={()=>'房屋标题'}
                data-role='rent-list'
                >
                    <InputItem
                    placeholder='请输入标题（例如：整租 小区名 2室 5000元)'
                    value={title}
                    onChange={this.handleChange.bind(this,'title')}
                    >

                    </InputItem>
                </List>
                <List
                className='pics'
                renderHeader={()=>'房源图片'}
                >
                    <ImagePicker
                    files={files}
                    multpic={true}
                    className='imgpicker'
                    onChange={this.onChange.bind(this)}
                    >

                    </ImagePicker>

                </List>
                {/*<List*/}
                {/*className='supporting'*/}
                {/*renderHeader={()=>'房屋配置'}*/}
                {/*data-role='rent-list'*/}
                {/*>*/}
                {/*    <HousePackage*/}
                {/*    onSelect={values=>{*/}
                {/*        this.suppor*/}
                {/*    }}*/}
                {/*    />*/}
                {/*</List>*/}
                <List
                className='desc'
                renderHeader={()=>'房屋描述'}
                data-role='rent-list'
            >
                <TextareaItem
                    rows={5}
                    placeholder='请输入房屋描述信息'
                    autoHeight
                    value={description}
                    onChange={this.handleChange.bind(this,'description')}
                />

            </List>

                <Flex className='bottom'>
                    <FlexItem className='cancel' onClick={this.onCancel}>
                        取消
                    </FlexItem>
                    <FlexItem className='confirm' onClick={this.addHouse}>
                        提交
                    </FlexItem>
                </Flex>

            </div>
        );
    }
}

