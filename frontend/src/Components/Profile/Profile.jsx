import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { Card, Col,  Dropdown,  Row } from 'react-bootstrap'
import Navbar from '../Navbar/Navbar'

import './Profile.css'

import { useDispatch, useSelector } from 'react-redux'
import { getUserPost } from '../../Actions/postAction'
import Post from '../Post/Post'
import { Link } from 'react-router-dom'
import ProfileSide from '../ProfileSide/ProfileSide'
import RightSideProfile from '../RightSideProfile.js/RightSideProfile'




const Profile = () => {
    const {user}=useSelector((state)=>state.authReducer.authData)
    const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
    console.log(user);
    console.log(user.name);
    const dispatch=useDispatch()
     const posts=useSelector((state)=>state.postReducer.posts)

     useEffect(()=>{
    dispatch(getUserPost(user._id))
  },[])

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
                         return<Post data={post} id={id}/>
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
