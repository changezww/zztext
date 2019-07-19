import axios from 'axios'
export default function(obj){
    return function(next){
        let starr=['全部','新订单','未审核','已接单','已完成','暂无状态']
        let {ids,
            dateStart,
            dateEnd,
            minMoney,
            maxMoney,
            pStatus,
            type1,
            type2}=obj
        console.log(obj,starr.indexOf(pStatus)) 
        axios.get('http://localhost:3000/api/list?order='+ids).then(({data})=>{
            let alldata=data.data;
            //时间
            if(dateStart===''){
                
            }else{
                alldata=alldata.filter((item,index)=>{
                    return new Date(item.date)>=dateStart && new Date(item.date)<=dateEnd
                })
            }
            //处理状态
            alldata=alldata.filter((item,index)=>{
                if(starr.indexOf(pStatus)===0){
                    return true
                }else{
                    return item.handleState+1===starr.indexOf(pStatus)
                }
            })
            //金额范围
            alldata=alldata.filter((item,index)=>{
                return item.money>=minMoney && item.money<=maxMoney
            })  
            //转单类型
            if(type1===''){
                
            }else{
                alldata=alldata.filter((item,index)=>{
                    return item.type===type1
                })
            }
            //客服类型
            if(type2===''){
                
            }else{
                alldata=alldata.filter((item,index)=>{
                    return item.serviceName===type2
                })
            }
            alldata.forEach((item,index)=>{
                item.handleState=starr[item.handleState+1]
              })
            next({type:'ADD_DATA',data:alldata})
        })
    }
}
