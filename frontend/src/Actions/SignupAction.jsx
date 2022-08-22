import * as AuthApi from '../Api/AuthRequest'

export const logIn=(FormData)=>async(dispatch)=>{
    dispatch({type:"AUTH_START"})
   try {
     const {data}=await AuthApi.logIn(FormData)
     dispatch({type:"AUTH_SUCCESS",data:data})
    
   } catch (error) {
    console.log(error);
    dispatch({type:"AUTH_FAIL"})
   }
}

export const signUp=(FormData)=>async(dispatch)=>{
    dispatch({type:"AUTH_START"})
   try {
     const {data}=await AuthApi.signUp(FormData)
     dispatch({type:"AUTH_SUCCESS",data:data})
    
   } catch (error) {
    console.log(error);
    dispatch({type:"AUTH_FAIL"})
   }
}