import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'js-cookie'
class Login extends Component {
    constructor(pro){
        super(pro);
        this.state={
            yzm:'获取验证码',
            tel:'',
            psd:'',
            yz:''
        }
    }
    saveyzm(){
      axios.get('http://localhost:3000/api/checkCode').then(({data})=>{
        this.setState({
            yzm:data.Verification
        })
      })
    }
    componentDidMount(){
         
    }
    render() {
        return (
            <div className='logins'>
                <div className='loginleft'>
                    <h1>Welcome</h1>
                    <p>赚赚金融 开创信贷“1＋N”模式的综合互联网金融服务共享平台</p>
                </div>
                <div className='loginlist'>
                   <h3><i className="icon iconfont icon-twitter"></i></h3>
                   <p>赚赚金融渠道管理系统</p>
                   <ul>
                       <li>
                           <input type='text' value={this.state.tel} placeholder='手机号' onChange={(e)=>{
                                this.setState({
                                    tel:e.target.value
                                })
                           }}/>
                       </li>
                       <li>
                           <input type='password' value={this.state.psd} placeholder='登录密码' onChange={(e)=>{
                                this.setState({
                                    psd:e.target.value
                                })
                           }}/>
                       </li>
                       <li>
                           <input type='text' value={this.state.yz} placeholder='验证码' onChange={(e)=>{
                                this.setState({
                                    yz:e.target.value
                                })
                           }}/>
                           <span onClick={()=>{
                               this.saveyzm()
                           }}>{this.state.yzm}</span>
                       </li>
                       <li>
                           <button onClick={()=>{
                               axios.post('http://localhost:3000/api/login',{'password':this.state.psd,'phone':this.state.tel,'checkcode':this.state.yz}).then(({data})=>{
                                   if(data.code===0){
                                       cookie.set('authorization',data.sessionId)
                                       this.props.history.push('/list/myhome')
                                   }else{
                                       alert('账号密码有误')
                                   }
                               })
                           }}>登录</button>
                       </li>
                   </ul>
                </div>
            </div>
        );
    }
}

export default Login;