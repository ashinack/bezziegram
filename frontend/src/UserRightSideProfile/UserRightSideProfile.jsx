import React from 'react'

import { Card} from 'react-bootstrap'



const UserRightSideProfile = ({followUser}) => {
  return (
   <>
  
    <Card style={{ width: '18rem',marginTop:'1rem' }}>
      
      <Card.Body>
        
        <div className='UserI'>
        <Card.Title>Profile Info</Card.Title>
   
        </div>
        
        <br/>
      <i class='bx bxs-home-alt-2 home'> Lives in {followUser.Livesin}</i><br/>
      <i class='bx bxs-heart home'>  {followUser.relationship}</i><br/>
      <i class='bx bx-current-location home'>  {followUser.country}</i><br/>
      <i class='bx bxs-briefcase home'> Works at {followUser.workAt}</i>
    
     </Card.Body>
    </Card>
   
       
   </>
  )
}

export default UserRightSideProfile
