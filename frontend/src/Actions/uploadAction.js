import * as UploadApi from '../Api/UploadRequest'

export const uploadImage=(data)=>async(dispatch)=>{
    try {
        await UploadApi.uploadImage(data)
    } catch (error) {
        // console.log(error);
    }
}

export const uploadPost=(data)=>async(dispatch)=>{
    dispatch({type:"UPLOAD_START"})
    try {
       const newPost=await UploadApi.uploadPost(data) 
       dispatch({type:'UPLOAD_SUCCESS',data:newPost.data})
    } catch (error) {
    //    console.log(error); 
       dispatch({type:"UPLOAD_FAILED"})
    }
}

//upload comments

// export const uploadComment = (id,data) => async (dispatch) => {
//     dispatch({ type: "UPLOAD_START" })
//     try {
//         const newComment = await UploadApi.uploadComment(id,data)
//         dispatch({ type: 'UPLOAD_SUCCESS', data: newComment.data })
//     } catch (error) {
//         //    console.log(error); 
//         dispatch({ type: "UPLOAD_FAILED" })
//     }
// }
