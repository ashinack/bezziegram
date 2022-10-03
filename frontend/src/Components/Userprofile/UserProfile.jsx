import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserProfile = ({followUser}) => {
    const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
    const posts=useSelector((state)=>state.postReducer.posts)
  return (
    <div>
      
        <Row>
        {/* <Col>1 of 3</Col> */}
        <Col className='mt-3'>
             <Card>
     <Card.Img variant="top" src={followUser.coverPicture?serverPublic+followUser.coverPicture:serverPublic+"defaultCover.jpg"}  className="coverpic"/>
      <Card.Body>
         <div className='main'>
                <div>
            <img src={followUser.profilePicture?serverPublic+followUser.profilePicture:serverPublic+"defaultProfile.png"} alt='' className='profileimg'></img>
            </div>
            <div className='my-3 mx-3'>
            <h4>{followUser.name}</h4>
            <div style={{display:'flex'}}>
              <div>
            {/* <span>following</span>
            <h6>{followUser.following.length}</h6> */}
            </div>
            <div>
           {/* <span style={{marginLeft:'1rem'}}>followers</span>
            <h6  style={{marginLeft:'1rem'}}>{followUser.followers.length}</h6> */}
           </div>
            </div>
            </div>
            </div>
            <div className='rightside '>
           <div>
            <span >Post</span>
            <h6>{posts.filter((post)=>post.userId===followUser._id).length}</h6>
            </div>
           <div>
            <span>Friends</span>
            </div>
           <div >
            <span><Link to='/home' className='homelink'>Home</Link></span>
            </div>
           
            </div>

            
      </Card.Body>
    </Card>
        </Col>
       
      </Row>
     
    </div>
  )
}

export default UserProfile
