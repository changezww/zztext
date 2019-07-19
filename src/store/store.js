import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

let redux1=(state=[],action)=>{
    switch(action.type){
       case 'ADD_DATA' :
        state=action.data;
        return [...state];
       default :
        return [...state]
    }
}
let redux2=(state='全部',action)=>{
    switch(action.type){
       case 'SAVE_ORDER' :
        state=action.data;
        return state;
       default :
        return state
    }
}
let redux3=(state=[],action)=>{
    switch(action.type){
       case 'CLEAR_HEADER':
         return []
       case 'ADD_HEADER':
           let ishave=state.some((item,index)=>{
               return item.id===action.data.id
           })
         if(ishave){
           state.forEach((item,index)=>{
               if(item.id===action.data.id){
               let removedata=state.splice(index,1)[0]
                state.unshift(removedata)
               }
           })
         }else{
           state.unshift(action.data);
         
         }    
        return state;
        case 'REMOVE_HEADER':
            state.forEach((item,index)=>{
                if(item.id===action.data.id){
                   state.splice(index,1)
                }
            }) 
         return state;
       default :
        return [...state]
    }
}


let reducer=combineReducers({redux1,redux2,redux3})

export default createStore(reducer,applyMiddleware(thunk))