import React, { useState } from 'react'
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import * as UserApi from '../../Api/UserRequest'
import MyVerticallyCenteredModal, {Modal} from './Modal.jsx'
import './RightSideProfile.css'

const RightSideProfile = () => {
    const dispatch=useDispatch()
    const params=useParams();

    const profileUserId=params.id
    const [profileUser,setProfileUser]=useState({})
    const [modalShow, setModalShow] =useState(false);

    const {user}=useSelector((state)=>state.authReducer.authData)

    useEffect(()=>{
        const fetchProfileUser=async()=>{
            if(profileUserId===user._id){
                setProfileUser(user)
                
            }else{
                const ProfileUser=await UserApi.getUser(profileUserId)
                setProfileUser(ProfileUser)
               
                
                 
            }
        }
        fetchProfileUser();
    },[user])
  return (
   <>
  
           <Card style={{ width: '18rem',marginTop:'1rem' }}>
      
      <Card.Body>
        {user._id===profileUserId?(
        <div className='UserI'>
        <Card.Title>Profile Info</Card.Title>
        <i class='bx bxs-edit-alt modalicon' onClick={() => setModalShow(true)}></i>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={user}
      />
   
        </div>
        ):("")}
        <br/>
      <i class='bx bxs-home-alt-2 home'> Lives in {profileUser.Livesin}</i><br/>
      <i class='bx bxs-heart home'>  {profileUser.relationship}</i><br/>
      <i class='bx bx-current-location home'>  {profileUser.country}</i><br/>
      <i class='bx bxs-briefcase home'> Works at {profileUser.workAt}</i>
    
     </Card.Body>
    </Card>
   
       
   </>
  )
}

export default RightSideProfile
