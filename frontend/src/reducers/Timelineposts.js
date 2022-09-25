 const Timelinepost=(
    state={timelineposts:[],loading:false,error:false,uploading:false},
    action
    
 )=>{
   
    switch(action.type){
        case "RETREIVING_START":
            return {...state,uploading:true,error:false}
        case "RETREIVING_SUCCESS":
            return {
                ...state, timelineposts:[action.data,...state.posts],
                
            uploading:false,error:false}
           
        case "RETREIVING_FAIL":
            return {...state,uploading:false,error:true}
                 
        default:
            return state       
    }

 }

export default Timelinepost