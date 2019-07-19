import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
class RouterView extends Component {
    constructor(pro){
        super(pro);
        this.state={

        }
    }
    render() {
        let  {routes}=this.props;
        let arrRedirect=routes.filter((item,index)=>{
            return item.redirect
        })
        let redirectdom=arrRedirect.map((item,index)=>{
            return <Redirect from={item.path} key={index} exact to={item.redirect}/>
        })
          routes=routes.filter((item,index)=>{
              return !item.redirect
          })
        return (
            <>
              <Switch>
                {routes.map((item,index)=>{
                    return <Route path={item.path} key={index} render={(props)=>{
                        return <>
                          {item.children && <item.component children={item.children} {...props}/>}
                          {!item.children && <item.component {...props}/>}
                         </>
                     }}></Route>     
                })}
                {redirectdom.length!==0 && redirectdom}    
              </Switch>  
            </>
        );
    }
}

export default RouterView;
