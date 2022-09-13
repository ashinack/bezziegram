import * as AuthApi from '../Api/AuthRequest'

export const Adminlogin=(Formdata)=>async(dispatch)=>{
    dispatch({type:"ADMIN_START"})
   try {
     const {data}=await AuthApi.Adminlogin(Formdata)
     dispatch({type:"ADMIN_SUCCESS",data:data})
    
   } catch (error) {
    // console.log(error.response);
    dispatch({type:"ADMIN_FAIL"})
   }
}

export const logouts=()=>async(dispatch)=>{
    dispatch({type:"LOGOUT"})
}