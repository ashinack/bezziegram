import * as React from 'react';
import {useState,useRef} from 'react'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ImageIcon from '@mui/icons-material/Image';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import { TextField } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './CreatePost.css'
import {useDispatch, useSelector} from 'react-redux'
import { uploadImage, uploadPost } from '../../Actions/uploadAction';

 
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
 
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const {user}=useSelector((state)=>state.authReducer.authData)
  const loading=useSelector((state)=>state.postReducer.uploading)
  const [open, setOpen] = React.useState(false);
  const [image,setImage]=useState(null)
  const imageRef=useRef()
  const dispatch=useDispatch()
  const desc=useRef()

  const onImageChange=(event)=>{
    if(event.target.files&&event.target.files[0]){
        let img=event.target.files[0];
        setImage(img)
    }
  }

  const reset=()=>{
    setImage(null);
    desc.current.value=""
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    const newPost={
      userId:user._id,
      desc:desc.current.value
    }
    if(image){
      const data=new FormData()
      const filename=Date.now()+image.name;
      data.append("name",filename)
      data.append("file",image)
      newPost.image=filename
      console.log(newPost);
      try {
        dispatch(uploadImage(data))
        console.log('1111');
        console.log(data);
        reset()
        
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button > */}
        <IconButton
              size="large"
              aria-label="show 17 new notifications"
             style={{color:'#481f3f'}}
              onClick={handleClickOpen}
            >
             
                <AddBoxIcon/>
               
              
            </IconButton>
        
      {/* </Button> */}
      <BootstrapDialog
         onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title"  onClose={handleClose}>
              Create post
        </BootstrapDialogTitle>
        <DialogContent dividers>
        
          <div className='postdiv'>
          <Typography gutterBottom>
           <div>
            <TextField inputRef={desc} required label="Desc for your post" color="secondary" focused />
            </div>
            <div style={{color:'secondary'}}>
                <div onClick={()=>imageRef.current.click()}>
            <ImageIcon />
            photo
            </div>
            <AddLocationIcon/>
            <SlowMotionVideoIcon/>
            <CalendarMonthIcon/>
            </div>
           
           
          </Typography>
          </div>
          {image&&(
            <div className='previewImage'>
              <CloseIcon onClick={()=>setImage(null)}/>
              <img src={URL.createObjectURL(image)} alt=""/>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} disabled={loading}>
            {loading?"Uploading.....":"Share"}
          </Button>
          <div style={{display:'none'}}>
            <input type='file' name="myImage" ref={imageRef} onChange={onImageChange}></input>
          </div>

          
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
