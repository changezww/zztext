import React, { Component } from 'react';
import { Layout } from 'antd';
import Slide from '../component/Slide'
import { Button ,Modal} from 'antd';
import RouterView from '../router/RouterView'
import cookies from 'js-cookie'
import {connect} from 'react-redux'
import {Icon} from 'antd'
import {NavLink} from 'react-router-dom'   
import axios from 'axios'
const { confirm } = Modal; 
const { Header, Sider, Content } = Layout;

class List extends Component {
    constructor(pro){
        super(pro);
        this.state={
            current: 'mail',
            imgs:'',
            teel:''
        }
    }
    showConfirm() {
        let that=this;
        confirm({
          title: 'Do you Want to delete these items?',
          content: 'Some descriptions',
          onOk() {
            console.log('OK');
            cookies.remove('authorization')
            that.props.clearHeader('KONG')
            that.props.history.push('/login')
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };
    componentDidMount(){
       if(cookies.get('authorization') && cookies.get('authorization')!==''){
        axios.defaults.headers.common['authorization']=cookies.get('authorization')
          axios.get('http://localhost:3000/api/islogin').then(({data})=>{
              console.log(data)
              this.setState({
                  imgs:data.info.facePhoto,
                  teel:data.info.phone
              })
          }).catch();
       }else{
           this.props.history.push('/login')
       }
    }
    render() {
        return (
            <>
        <Layout>
            <Sider className='mains'>
                <div className='topimg'>
                  <h2>
                      <img src={'http://localhost:3000'+this.state.imgs} alt=''/>
                  </h2>
                  <p>{this.state.teel}</p>
                </div>
                <Slide/>
                <div className='btns'>
                    <Button onClick={this.showConfirm.bind(this)}>退出</Button>
                    <Button onClick={()=>{
                        this.props.history.push('/list/seeting')
                        this.props.saveHeader({id:1,name:'设置',path:'/list/seeting'})
                    }}>设置</Button>
                </div>
            </Sider>
            <Layout>
                <Header style={{backgroundColor:'#ccc'}}>
                    {this.props.headerlist.map((item,index)=>{                              
                        return <NavLink to={item.path}  key={index} activeClassName='active'>{item.name} 
                            <Icon type="close" onClick={()=>{
                                this.props.removeHeader(item)
                            }}/>
                        </NavLink> 
                    })}
                
                </Header>
                <Content>                  
                    <RouterView routes={this.props.children}/>     
                </Content>   
            </Layout>
        </Layout>
            </>
        );
    }
}
let initGetStateToProps=(state)=>{
    return {
       headerlist:state.redux3
    }
  }
  
  let initGetDispatchToProps=(dispatch)=>{
    return {
        saveHeader:(data)=>{
          dispatch({type:'ADD_HEADER',data:data})
        },
        removeHeader:(data)=>{
            dispatch({type:'REMOVE_HEADER',data:data})
        },
        clearHeader:(data)=>{
            dispatch({type:'CLEAR_HEADER',data})
        }
    }
  }

export default connect(initGetStateToProps,initGetDispatchToProps)(List);