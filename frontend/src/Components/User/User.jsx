import { Avatar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../Actions/userAction';


const User = ({person}) => {
  const dispatch=useDispatch()
   const {user}=useSelector((state)=>state.authReducer.authData)
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
  const handleFollow=()=>{
      dispatch(unFollowUser(person._id,user))
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
        
      <button className='button fc-button' onClick={handleFollow}>Follow</button>
    
    </div>
    </div>
  )
}

export default User
