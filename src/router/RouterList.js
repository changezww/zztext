import List from "../views/List";
import Login from "../views/Login";
import Myhome from "../views/Myhome";
import Seeting from "../views/Seeting";
import Dk from '../views/Dk';
import Zd from '../views/Zd';
import Bx from '../views/Bx';

export const Routelist = [
    {
        path: '/list',
        component: List,
        children:[
            {
               path:'/list/myhome',
               component:Myhome
            },{
                path:'/list/seeting',
                component:Seeting
            },{
                path:'/list/order/dk',
                component:Dk
            },{
                path:'/list/order/zd',
                component:Zd
            },{
                path:'/list/order/bx',
                component:Bx
            }
        ]
    },{
        path: '/login',
        component: Login
    },{
        path: '/',
        redirect:'/list'
    }
]