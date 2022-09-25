import React, { useState } from 'react'
import { useEffect } from 'react'
import { getUser } from '../../Api/UserRequest'

const Conversation = ({data,currentUserId}) => {
    const [userData,setUserData]=useState(null)
    useEffect(()=>{
        const userId=data.members.find((id)=>id!==currentUserId)
        const getUserData=async()=>{
            try {
                const {data}=await getUser(userId)
                setUserData(data)
                
            } catch (error) {
                console.log(error)
            }
           
          
        }
        getUserData(); 
    },[])
  return (
    <>
     <div className="follower conversation">
        <div>
            <div className="online-dot"></div>
            <img src={userData?.profilePicture?process.env.REACT_APP_PUBLIC_FOLDER+userData.profilePicture:process.env.REACT_APP_PUBLIC_FOLDER+"defaultProfile.png"} alt=""
            className='followerImage'
            style={{width:'50px',height:'50px'}}
            ></img>
            <div className="name" style={{fontsize:" 0.8rem" }}>
                <span>{userData?.name}</span>
                <span>Online</span>
                </div> 
        </div>

     </div>
     <hr style={{width:'85%',border:'0.1px solid rgb(151 146 146)'}}/>
     </>
  )
}

export default Conversation
