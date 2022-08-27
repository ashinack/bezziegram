
import React from 'react'
import { useState } from 'react';
import { Button, Card, Container, Form, Row} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { Link,} from 'react-router-dom';
import { logIn } from '../../Actions/SignupAction';

import './Login.css'


const Login = () => {
  
   const [data,setData]=useState({name:"",email:""})
  const dispatch=useDispatch()
  
  const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
 
  const handleSubmit=(e)=>{
     e.preventDefault()
    
     dispatch(logIn(data))
     
  }
  return (
  <>
            <div className='login'>
              <Container>
                <Row>

                </Row>
              </Container>
              <div className='container'>
               
                <div className='row'>

                <div className='col-lg-6 my-5 ml-5'>
                  <h3 className='loginLogo'>Bezziegram</h3>
                  <span>
                    Connect with friends and the world around you on Bezziegram.
                  </span>
                  </div>
                <div className='col-lg-6'>
                <Card style={{width: '18rem'}} className='my-5 cardcolor'>
      <Card.Body>
         <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  name="email" value={data.email} onChange={handleChange}/>
       
      </Form.Group>

      <Form.Group className="mb-3 ms-auto" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={data.password}  onChange={handleChange}/>
      </Form.Group>
      <div className='ms-auto'>
      <Button variant="danger" type="submit">
        Submit
      </Button>
      </div>
    <h6 style={{textAlign:'center'}}>OR</h6>
    <h6 style={{textAlign:'center'}}>Forget Password</h6>
    <span>Don't have an Account?<Link to='/auth' className='link'> Signup</Link></span>
    </Form>
      </Card.Body>
    </Card>
    </div>
    </div>
    
    </div>

  </div>
         
    </>
  )
}

export default Login