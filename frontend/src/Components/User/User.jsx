import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../Actions/userAction';


const User = ({person}) => {
  const dispatch=useDispatch()
   const {user}=useSelector((state)=>state.authReducer.authData)
   const [following,setFollowing]=useState(person.followers.includes(user._id))
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
  const handleFollow=()=>{
       following?
      dispatch(unFollowUser(person._id,user)):
      dispatch(followUser(person._id,user))
      setFollowing((prev)=>!prev)
  }
  return (
    <div>
      <div className='follower'>
        <div>
            <Avatar alt="Remy Sharp" src={person.coverPicture?serverPublic+person.profilePicture:serverPublic+"defaultProfile.png"} />
            {/* <img src={Image} alt="" /> */}
        
        <div className="name">
            
            <span>{person.name}</span><br/>
            <span>{person.username}</span>
        </div>
        </div>
        
      <button className='button fc-button' onClick={handleFollow}>{following?"unfollow":"Follow"}</button>
    
    </div>
    </div>
  )
}

export default User
