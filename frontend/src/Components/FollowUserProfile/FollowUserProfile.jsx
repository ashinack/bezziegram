import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../Api/UserRequest';
import UserRightSideProfile from '../../UserRightSideProfile/UserRightSideProfile';
import Navbar from '../Navbar/Navbar'
import Post from '../Post/Post';
import UserProfile from '../Userprofile/UserProfile';

const FollowUserProfile = () => {
     const [followUser,setFollowUserData]=useState({})
     const posts=useSelector((state)=>state.postReducer.posts)

     const {id}=useParams();

     useEffect(()=>{
    const fetchPersons=async()=>{
    const {data}=await getUser(id);
    setFollowUserData(data)
  }
  fetchPersons()
},[])
  
  return (
    <div>
        <Navbar/>
      <Container>
      
      <UserProfile followUser={followUser}/>
      
      

      
    <Row>
         <Col xs={12}  sm={12} md={4}>
           <UserRightSideProfile followUser={followUser}/>
         </Col>
        <Col xs={12} sm={12} md={4}>
          
           <div className='userpost'>
                {
                  
                  posts.map((post,id)=>{
                      if(post.userId===followUser._id){

                      
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

export default FollowUserProfile
