import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
const { SubMenu } = Menu;
class Slide extends Component {
    render() {
        return (
            <>
         <Menu mode="inline" style={{backgroundColor:'#001529'}}>
         <Menu.Item key="1" onClick={()=>{this.props.history.push('/list/myhome')
              this.props.saveHeader({id:0,name:'首页',path:'/list/myhome'})
        }}>
             <Icon type="mail" />
              <span>首页</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={()=>{this.props.history.push('/list/seeting')
         this.props.saveHeader({id:1,name:'设置',path:'/list/seeting'})
      }}>
              <Icon type="setting" />
              <span>设置</span>
        </Menu.Item>  
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="appstore" />
              <span>订单管理</span>
            </span>
          }
        >
          <Menu.Item key="3" onClick={()=>{this.props.history.push('/list/order/dk')
                 this.props.saveHeader({id:3,name:'贷款订单',path:'/list/order/dk'})
        }}>贷款订单</Menu.Item>
          <Menu.Item key="4" onClick={()=>{this.props.history.push('/list/order/zd')
                 this.props.saveHeader({id:4,name:'转单订单',path:'/list/order/zd'})
        }}>转单订单</Menu.Item>
          <Menu.Item key="5" onClick={()=>{this.props.history.push('/list/order/bx')
                 this.props.saveHeader({id:5,name:'保险订单',path:'/list/order/bx'})
        }}>保险订单</Menu.Item>
        </SubMenu>
      </Menu> 
            </>
        );
    }
}

let initGetStateToProps=(state)=>{
  return {
     
  }
}
let initGetDispatchToProps=(dispatch)=>{
  return {
      saveHeader:(data)=>{
        dispatch({type:'ADD_HEADER',data:data})
      }
  }
}

Slide=connect(initGetStateToProps,initGetDispatchToProps)(Slide)

export default withRouter(Slide);