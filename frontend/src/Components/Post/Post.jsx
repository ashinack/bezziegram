import React from 'react'
import Like from '../../Images/like.png'
import Comment from '../../Images/comment2.png' 
import Share from '../../Images/share2.webp'  
import NotLike from '../../Images/notlike.png'
import './Post.css'
import { useSelector} from 'react-redux'
import { useState } from 'react'
// import { likePost } from '../../Api/PostRequest'




const Post = ({data}) => {
  const user=useSelector((state)=>state.authReducer.authData)

  const [liked,setLiked]=useState(data.likes.includes(user.newUser._id))
  const [likes,setLikes]=useState(data.likes.length)

  const handleLike=()=>{
    setLiked((prev)=>!prev)
    // likePost(data._id,user.newUser._id)
    liked?setLikes((prev)=>prev-1):setLikes((prev)=>prev+1)
  }
  return (
    <div className='Post'>
    <img src={data.image?process.env.REACT_APP_PUBLIC_FOLDER+data.image:""}></img>
    <div className='postReact'>
        <img src={liked?Like:NotLike} alt='' className='like' style={{cursor:"pointer"}} onClick={handleLike}></img>
        <img src={Comment} alt='' className='comment'></img>
        <img src={Share} alt='' className='share'></img>
       
    </div>
    <span style={{textAlign:'left'}}>{likes} likes</span>
    <div className="detail">
        <span><b>{data.name}</b></span>
        <span>{data.desc}</span>
    </div>
    </div>
  ) 
}

export default Post
