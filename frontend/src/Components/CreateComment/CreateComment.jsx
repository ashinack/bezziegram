import * as React from 'react';
import {useRef} from 'react'
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

import { Avatar, TextField } from '@mui/material';

import './CreateComment.css'
import Comment from '../../Images/comment2.png' 
import { useDispatch, useSelector } from 'react-redux';
import { uploadComment } from '../../Actions/CommentAction';
import { useEffect } from 'react';
import { useState } from 'react';
import { getComment } from '../../Api/CommentRequest';




 
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

export default function CustomizedDialogs({datas}) {
  console.log('postt',datas._id);
  const {user}=useSelector((state)=>state.authReducer.authData)
  const loading=useSelector((state)=>state.postReducer.uploading)
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
  const [open, setOpen] = React.useState(false);
   const comments=useRef()
   const[comment,setComment]=useState([])
   const[cmts,setCmts]=useState(false)
  const dispatch=useDispatch()

   const reset = () => {
    comments.current.value = " ";
  };

  useEffect(()=>{
    console.log('kkkkk');
    const fetchComment=async()=>{
      const {data}=await getComment(datas._id)
      console.log('////',data);
      setComment(data)
    }
    fetchComment()
    
  },[cmts])

  const handleSubmit=(e)=>{
    e.preventDefault();
   const newComment={
      userId:user._id,
      comments:comments.current.value
    }
    
    dispatch(uploadComment(datas._id,newComment))
    setCmts(!cmts)

     reset();
   
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
             style={{color:'#481f3f',marginTop:'12px'}}
              onClick={handleClickOpen}
            >
                <img src={Comment} alt='' className='comment'></img>
                
                {/* <AddBoxIcon /> */}
                
               
              
            </IconButton>
        
      {/* </Button> */}
      <BootstrapDialog
         onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title"  onClose={handleClose}>
              Create Comment
        </BootstrapDialogTitle>
        <DialogContent dividers>
        
          <div className='postdiv'>
          <Typography gutterBottom>
           <div>
            <TextField inputRef={comments}  required label="Add Comments" color="secondary" focused />
            </div>
            <div style={{color:'secondary'}}>
                {/* <div onClick={()=>imageRef.current.click()}>
            <ImageIcon />
            photo
            </div> */}
            {/* <AddLocationIcon/>
            <SlowMotionVideoIcon/>
            <CalendarMonthIcon/> */}
            </div>
           
           
          </Typography>
          
          </div>
         
          <Button onClick={handleSubmit} autoFocus  disabled={loading}>
            {loading?"Uploading.....":"Share"}
          </Button>
        </DialogContent>
        <DialogActions>
          <div className='maindiv'>
         {
          comment.map((e)=>{
            return(
              <div className='comments'>
               
                <Avatar className='cmtimg' src={
                        e.userId.profilePicture
                        ? serverPublic + e.userId.profilePicture
                        : serverPublic + "defaultProfile.png"
                    }></Avatar>
                    <div className='cmname'>
                    <span>{e.userId.name}</span>
                    </div>
                    <div className='usercm'>
                      <span>{e.comments}</span>
                    </div>
              </div>
            )
          })
         }
         </div>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
