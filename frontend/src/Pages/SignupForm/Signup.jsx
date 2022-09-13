import React from 'react'
import { useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import './Signup.css'
import {useDispatch, useSelector} from 'react-redux'
import {  signUp } from '../../Actions/SignupAction'
import { Link } from 'react-router-dom'


const Signup = () => {
    
    const dispatch=useDispatch()
    const loading=useSelector((state)=>state.authReducer.loading)
    const error=useSelector((state)=>state.authReducer.error)
    const error1=error.message
    // const [isSignup,setSignup]=useState(false)
    console.log(loading);
    const [data,setData]=useState({name:"",email:"",mobileNumber:"",password:"",confirmpassword:""})
    const [confirmpass,setConfirmpass]=useState(true)
    const [validated, setValidated] = useState(false);
     

    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
          e.preventDefault();

          const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
          
          
           data.password===data.confirmpassword
           ?dispatch(signUp(data))
           :setConfirmpass(false)
         
         
          
    }
    const resetForm=()=>{
        setConfirmpass(true)
        setData({name:"",email:"",mobileNumber:"",password:"",confirmpassword:""})
    }
  return (
   <>
   <div className='signup'>
   
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
       
         <Form  noValidate validated={validated} onSubmit={handleSubmit}>
           
                <Form.Group className="mb-3"  controlId="validationCustomUsername">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name='name' onChange={handleChange} value={data.name} required/>

        <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
       
      </Form.Group>

             
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} value={data.email} required/>
         <Form.Control.Feedback type="invalid">
                        Enter a valid Email
                      </Form.Control.Feedback>
      </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mobile No</Form.Label>
        <Form.Control type="number" placeholder="Enter number" name='mobileNumber' onChange={handleChange} value={data.number} required/>
         <Form.Control.Feedback type="invalid">
                        Enter a valid Number
                      </Form.Control.Feedback>
      </Form.Group>

     
       

      <Form.Group className="mb-3 ms-auto" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name='password' onChange={handleChange} value={data.password} required/>
         <Form.Control.Feedback type="invalid">
                        Enter the password
                      </Form.Control.Feedback>
      </Form.Group>
     
         <Form.Group className="mb-3 ms-auto" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="ReEnter Password" name='confirmpassword' onChange={handleChange} value={data.confirmpassword} required/>
                 <Form.Control.Feedback type="invalid">
                        ReEnter the password
                      </Form.Control.Feedback>
      </Form.Group>

     
     
      <div className='ms-auto'>
      <Button variant="danger" type="submit" disabled={loading}>
        {loading?"Loading...": 'Signup'}
      </Button>
      </div>
      
    
        <span style={{display:confirmpass?"none":"block",color:'red'}}>
        *Please enter same password
      </span>
     
      <div>
        {error1?<span style={{color:'red'}}>{error1}</span>:""}
      </div>
      
      
      <span onClick={()=>{
        resetForm()
      }}>Have an Account ?<Link to='/login' className='link'>Login</Link> </span>
      
      
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

export default Signup


