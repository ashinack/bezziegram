import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { Card, Col,  Row } from 'react-bootstrap'
import Navbar from '../Navbar/Navbar'
import Bus from '../../Images/bus.webp'
import './Profile.css'
import profileimg from '../../Images/post1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPost } from '../../Actions/postAction'
import Post from '../Post/Post'




const Profile = () => {
    const user=useSelector((state)=>state.authReducer.authData)
    console.log(user);
    console.log(user.newUser.name);
    const dispatch=useDispatch()
     const {posts}=useSelector((state)=>state.postReducer)

     useEffect(()=>{
    dispatch(getUserPost(user.newUser._id))
  },[])

  return (
    <div>
        <Navbar/>
      <Container>
        
       <Row>
        {/* <Col>1 of 3</Col> */}
        <Col className='mt-3'>
             <Card>
     <Card.Img variant="top" src={Bus}  className="coverpic"/>
      <Card.Body>
         <div className='main'>
                <div>
            <img src={profileimg} alt='' className='profileimg'></img>
            </div>
            <div className='my-3 mx-3'>
            <h4>{user.newUser.name}</h4>
            </div>
            </div>
            <div className='rightside '>
           <div>
            <span >Post</span>
            </div>
           <div>
            <span>Friends</span>
            </div>
           <div >
            <span>Home</span>
            </div>
           
            </div>

            
      </Card.Body>
    </Card>
        </Col>
        {/* <Col>3 of 3</Col> */}
      </Row>
      <Row className="justify-content-md-center">
        
        <Col md="auto">
           
           
      
       <div className='userpost'>
                {
                    posts.map((post,id)=>{
                         return<Post data={post} id={id}/>
                    })
                }

            </div>
        
      
    
        </Col>
        
      </Row>
      </Container>
    </div>
  )
}

export default Profile
