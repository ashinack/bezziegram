import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../Actions/uploadAction';
import { updateUser } from '../../Actions/userAction';

function MyVerticallyCenteredModal(props) {
  const {data}=props
  console.log('1111');
  console.log(data);
  const {password,...other}=data;
  const [formData,setFormData]=useState(other)
  const [profileImage,setProfileImage]=useState(null)
  const [coverImage,setCoverImage]=useState(null)
  const dispatch=useDispatch()
  const param=useParams()
  const {user}=useSelector((state)=>state.authReducer.authData)

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
  const onImageChange=(event)=>{
    if(event.target.files&&event.target.files[0]){
      let img=event.target.files[0];
      event.target.name==="profileImage"
      ?setProfileImage(img)
      :setCoverImage(img)
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault(); 
    let UserData=formData;
    if(profileImage){
      const data=new FormData();
      const fileName=Date.now()+profileImage.name;
      data.append("name",fileName)
      data.append("file",profileImage);
      UserData.profilePicture=fileName;
      try {
        dispatch(uploadImage(data));
        
      } catch (error) {
        console.log(error);
      }
    }
    if(coverImage){
      const data=new FormData();
      const fileName=Date.now()+coverImage.name;
      data.append("name",fileName)
      data.append("file",coverImage);
      UserData.coverPicture=fileName;
      try {
        dispatch(uploadImage(data));
        
      } catch (error) {
        console.log(error);
      }
    }
   dispatch(updateUser(param.id,UserData))
   props.onHide()

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Your Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <Form>
         
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} value={formData.name}/>
       </Form.Group>

   
     <div style={{display:'flex'}}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Woks At</Form.Label>
        <Form.Control type="text" placeholder="Works At" name="workAt"  onChange={handleChange} value={formData.workAt}/>
      </Form.Group>
       
       
       <Form.Group className="mb-3 mx-5" controlId="formBasicPassword">
        <Form.Label>Lives In</Form.Label>
        <Form.Control type="text" placeholder="Lives In" name="Livesin"  onChange={handleChange} value={formData.Livesin}/>
      </Form.Group>
      </div>
      <div style={{display:'flex'}}>
      <Form.Group className="mb-3 " controlId="formBasicPassword">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" placeholder="Country" name="country"  onChange={handleChange} value={formData.country}/>
      </Form.Group>
     
      <Form.Group className="mb-3 mx-5" controlId="formBasicPassword">
        <Form.Label>RelationShip Status</Form.Label>
        <Form.Control type="text" placeholder="RelationShip status" name="relationship"  onChange={handleChange} value={formData.relationship}/>
      </Form.Group>
      </div>
      <div style={{display:'flex'}}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="file"  name="profileImage" onChange={onImageChange}/>
      </Form.Group>
      <Form.Group className="mb-3 mx-5" controlId="formBasicPassword" >
        <Form.Label>Cover Image</Form.Label>
        <Form.Control type="file" name="coverImage" onChange={onImageChange} />
      </Form.Group>
     </div>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
       update
      </Button>
    </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

export default MyVerticallyCenteredModal