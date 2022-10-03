import * as UploadComment from '../Api/CommentRequest'

export const uploadComment= (id,data) => async(dispatch)=>{
    dispatch({type:"COMMAND_START"})
    try{
        const newCommand = await UploadComment.uploadComment(id,data)
        dispatch({type:'COMMAND_SUCCESS',data:newCommand.data})
    }catch (error){
        console.log(error);
        dispatch({type:"COMMAND_FAILED"})
    }
}