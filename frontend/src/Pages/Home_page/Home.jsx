import React from 'react'


import Navbar from '../../Components/Navbar/Navbar'

import './Home.css'
import Mainpage from '../../Components/MainPage/Mainpage'
import { Container } from 'react-bootstrap'

const Home = () => {
  return (
    <>
      <Navbar/>
     
      <div className="container-fluid my-5">
      <Mainpage />
      </div>
      
      {/* <div className="homecontainer">
        <LeftSide/>
        <Feeds/>
        <RightSide/>
      </div> */}
       
    </>  
    
  )
}

export default Home
