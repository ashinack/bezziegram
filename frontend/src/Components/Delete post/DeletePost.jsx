import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../Api/PostRequest';



const ITEM_HEIGHT = 48;

export default function LongMenu({data}) {
   const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.authReducer.authData)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
   
  const handleDelete=()=>{
   deletePost(data._id,data.userId);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
       
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {
       data.userId==user._id?
         <div>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Cancel</MenuItem>
        </div>
        :
         <div>
        <MenuItem>Unfollow</MenuItem>
        <MenuItem onClick={handleClose}>Cancel</MenuItem>
        </div>
       }
       
      </Menu>
      
    </div>
  );
}
