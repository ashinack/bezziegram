import * as PostApi from '../Api/PostRequest'

export const getTimelinePosts=(id)=>async(dispatch)=>{
    dispatch({type:"RETREIVING_START"})
    try {
        const {data}=await PostApi.getTimelinePosts(id) //passing the id to backend
        dispatch({type:"RETREIVING_SUCCESS",data:data})    
    } catch (error) {
        dispatch({type:"RETREIVING_FAIL"})
        // console.log(error);
    }
}

export const getUserPost=(id)=>async(dispatch)=>{
    dispatch({type:"GETTING_START"})
    try {
        const {data}=await PostApi.getUserPost(id)
        dispatch({type:"GETTING_SUCCESS",data:data})
        
    } catch (error) {
        dispatch({type:"GETTING_FAILED"})
        // console.log(error);
    }
}