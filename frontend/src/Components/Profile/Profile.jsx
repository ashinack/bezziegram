import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { Card, Col,  Dropdown,  Row } from 'react-bootstrap'
import Navbar from '../Navbar/Navbar'

import './Profile.css'

import { useDispatch, useSelector } from 'react-redux'
import { getUserPost } from '../../Actions/postAction'
import Post from '../Post/Post'
import { Link, useParams } from 'react-router-dom'
import ProfileSide from '../ProfileSide/ProfileSide'
import RightSideProfile from '../RightSideProfile.js/RightSideProfile'
import { getUser } from '../../Api/UserRequest'
import { useState } from 'react'






const Profile = () => {
    
    const {user}=useSelector((state)=>state.authReducer.authData)
   
    
    const dispatch=useDispatch()
     const posts=useSelector((state)=>state.postReducer.posts)
    

  return (
    <div>
        <Navbar/>
      <Container>
      
       <ProfileSide/>
     

      
    <Row>
         <Col xs={12}  sm={12} md={4}>
         <RightSideProfile/>
         
         
         </Col>
        <Col xs={12} sm={12} md={4}>
          
           <div className='userpost'>
                {
                 
                    posts.map((post,id)=>{
                      if(post.userId===user._id){

                      
                         return<Post data={post} id={id}/>
                         }
                    })
                }

            </div>
        </Col>
        {/* <Col xs={12} sm={12} md={4}>
          xs=6 md=4
           
        </Col> */}
      </Row>
      </Container>
    </div>
  )
}

export default Profile
