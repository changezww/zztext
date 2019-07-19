import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import store from './store/store'
import {Provider} from 'react-redux'
import './fonts/iconfont.css'
import Home from './component/Home';
class App extends React.Component{
  constructor(pro){
    super(pro);
    this.state={

    }
  }
  render(){
    return (
      <Provider store={store}>
        <Home/>
      </Provider>
    )
  }
}

export default App;
