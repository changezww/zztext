import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Routerconfig from '../router/RouterView'
import {Routelist} from '../router/RouterList'
class Home extends Component {
    constructor(pro){
        super(pro);
        this.state={
    
        }
      }
    render() {
        return (
            <Router>
                <Routerconfig routes={Routelist}/>
            </Router>
        );
    }
}

export default Home;