import { Avatar } from '@mui/material'
import React from 'react'
import Image from '../../Images/images.jpg'
import './User.css'

const User = () => {
  return (
    <>
    <div className="follower">
        <div>
            <Avatar alt="Remy Sharp" src={Image} />
            {/* <img src={Image} alt="" /> */}
        </div>
        <div className="name">
            <span>name</span><br/>
            <span>@.username</span>
        </div>
        <div className='btn'>
      <button className='button fc-button'>Follow</button>
    </div>
      </div>
     </>
   
  )
}

export default User
