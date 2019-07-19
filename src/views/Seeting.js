import React, { Component } from 'react';
import cookies from 'js-cookie'
import axios from 'axios'
class Seeting extends Component {
    constructor(pro){
        super(pro);
        this.state={
            current: 'mail',
            imgs:'',
            teel:''
        }
    }
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
            <div className='topimgs'>
                  <h2>
                      <img src={'http://localhost:3000'+this.state.imgs} alt=''/>
                  </h2>
                  <p>{this.state.teel}</p>
                </div>
        );
    }
}

export default Seeting;