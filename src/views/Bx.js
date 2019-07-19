import React, { Component } from 'react';
import { DatePicker, InputNumber,Radio,Select,Button,Table} from 'antd';
import {connect} from 'react-redux'
import axios from 'axios'
import changefn from '../savefn/changedata'
import cookies from 'js-cookie'
const columns = [
  {
    title: '订单号',
    width: 120,
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '下单时间',
    width: 160,
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: '用户名称',
    dataIndex: 'customerName',
    key: '1',
    width: 150,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: '2',
    width: 150,
  },
  {
    title: '转单类型',
    dataIndex: 'type',
    key: '3',
    width: 150,
  },
  {
    title: '贷款金额(万元)',
    dataIndex: 'money',
    key: '4',
    width: 150,
  },
  {
    title: '订单状态',
    dataIndex: 'handleState',
    key: '5',
    width: 150,
  },
  {
    title: '客服',
    dataIndex: 'serviceName',
    key: '6',
    width: 150,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <span>action</span>
  },
];
const { Option } = Select;
const {RangePicker} = DatePicker;

class Bx extends Component {
    constructor(pro){
        super(pro);
        this.state={
            dateStart:'',
            dateEnd:'',
            minMoney:0,
            maxMoney:20,
            pStatus:'',
            type1:'',
            type2:''
             }
        }
    onChange(value) {
      console.log(value)
      if(value.length!==0){
        this.setState({
          dateStart:value[0]._d*1,
          dateEnd:value[1]._d*1
         })
      }else{
        this.setState({
            dateStart:'',
            dateEnd:''
       })
      }
      
      }
    onChangenum1(date, dateString) {
        this.setState({
            minMoney: date
        })
    }
    onChangenum2(date, dateString) {
        this.setState({
            maxMoney: date
        })
    }
    handleChange1(value) {
        this.setState({
            type1:value
        })
    }
    handleChange2(value) {
      this.setState({
          type2:value
      })
  }
    componentDidMount(){     
      this.props.saveData((next)=>{
        let starr=['全部','新订单','未审核','已接单','已完成','暂无状态']
        axios.defaults.headers.common['authorization']=cookies.get('authorization')
            axios.get('http://localhost:3000/api/list?order=3').then(({data})=>{
                data.data.forEach((item,index)=>{
                  item.handleState=starr[item.handleState+1]
                })
                if(data.code===0){
                    next({type:'ADD_DATA',data:data.data})}
                else{console.log('请求有误')}
         }) 
      })
     
    }
    render() {
     
        return (
            <>
            <div className='showdata'>
              <div><span>处理时间</span> <RangePicker onChange={this.onChange.bind(this)} /></div>
              <div><span>金额范围</span> <InputNumber
                    defaultValue={1}
                    min={0}
                    formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChangenum1.bind(this)}
                    />
                    <InputNumber
                    defaultValue={20}
                    min={0}
                    formatter={value => `${value}`}
                    parser={value => value.replace('%', '')}
                    onChange={this.onChangenum2.bind(this)}
                    />
               </div>
              <div>
                   <span>处理状态</span>
                   <Radio.Group defaultValue="全部" onChange={(e)=>{
                   this.props.saveorder(e.target.value)
               }} buttonStyle="solid">
                    <Radio.Button value="全部">全部</Radio.Button>
                    <Radio.Button value="新订单">新订单</Radio.Button>
                    <Radio.Button value="未审核">未审核</Radio.Button>
                    <Radio.Button value="已接单">已接单</Radio.Button>
                    <Radio.Button value="已完成">已完成</Radio.Button>
                    <Radio.Button value="暂无状态">暂无状态</Radio.Button>
                  </Radio.Group>
                </div>
              <div>
                <span>转单类型</span>
                <Select defaultValue="请选择类型" style={{ width: 120 }} onChange={this.handleChange1.bind(this)}>
                    <Option value="disabled" disabled>请选择类型</Option>
                    <Option value="信用贷">信用贷</Option>
                    <Option value="押房贷">押房贷</Option>
                    <Option value="房乐贷">房乐贷</Option>        
                    <Option value="车乐贷">车乐贷</Option>    
                 </Select>
              </div>
              <div>
                <span>客服名称</span>
                <Select defaultValue="请选择类型" style={{ width: 120 }} onChange={this.handleChange2.bind(this)}>
                    <Option value="disabled" disabled>请选择类型</Option>
                    <Option value="李大维">李大维</Option>
                    <Option value="李小冉">李小冉</Option>
                    <Option value="李莉">李莉</Option>        
                    <Option value="张玲">张玲</Option>
                    <Option value="李家豪">李家豪</Option>    
                 </Select>
               </div>
               <Button type="primary" onClick={()=>{
                 let obj={
                          ids:3,
                          dateStart:this.state.dateStart,
                          dateEnd:this.state.dateEnd,
                          minMoney:this.state.minMoney,
                          maxMoney:this.state.maxMoney,
                          pStatus:this.props.status,
                          type1:this.state.type1,
                          type2:this.state.type2,
                      }
                  this.props.saveData(changefn(obj))
               }}>查询</Button>
            </div>
            <div>
            <Table rowKey='1' columns={columns} dataSource={this.props.datas} scroll={{ x: 1500, y: 300 }} />,
            </div>
            </>
        );
    }
}

let initGetStateToProps=(state)=>{
    return {
      datas:state.redux1,
      status:state.redux2
    }
}

let initGetDispatchToProps=(dispatch)=>{
    return {
        saveorder:(data)=>{
            dispatch({type:'SAVE_ORDER',data:data})
        },
        saveData:(fn)=>{
            dispatch(fn)
        }
    }
}

export default connect(initGetStateToProps,initGetDispatchToProps)(Bx);