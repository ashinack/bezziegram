import store from "../Store/ReduxStore";

const authReducer=(
    state={authData:null,loading:false,error:false},
    action
    
)=>{
    console.log(action);
    switch(action.type)
    {
        case "AUTH_START":
            return{...state,loading:true,error:false}
        case "AUTH_SUCCESS":
            localStorage.setItem("profile",JSON.stringify({...action?.data}));
            return {...state,authData:action.data,loading:false,error:false} 
        case "AUTH_FAIL":
            return{...state,loading:false,error:true } 

        case "UPDATING_START":
            return {...state,updateLoading:true,error:false} 
        case "UPDATING_SUCCESS":
             localStorage.setItem('profile',JSON.stringify({...action?.data})) 
            return {...state,authData:action.data,updateLoading:false,error:false}  
        case "UPDATING_FAIL":
            return{...state,updateLoading:false,error:true}         
        case "LOG_OUT":
            localStorage.clear(store)
            return {...state,authData:null,loading:false,error:false}

        default:
            return state       
    }
}

export default authReducer