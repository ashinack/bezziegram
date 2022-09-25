import * as React from 'react';
import './Navbar.css'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';

import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import GroupIcon from '@mui/icons-material/Group';

import Post from '../Create Post/CreatePost'
import { Avatar } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Actions/SignupAction';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(25),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const {user}=useSelector((state)=>state.authReducer.authData)
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut=()=>{
    dispatch(logout())
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
         <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Link style={{textDecoration:'none',color:'inherit'}} to={`/profile/${user._id}`}>
            <AccountCircle></AccountCircle>
            </Link>
            </IconButton>
        Profile
        </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          
            <BookmarkIcon/>
            </IconButton>
        Saved
        </MenuItem>
       <MenuItem onClick={handleMenuClose}>
         <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          
            <SettingsIcon/>
            </IconButton>
        Settings
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
           <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
         
        >
          
            <LogoutIcon  onClick={handleLogOut}/>
            </IconButton>
          Logout
          </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          
            < HomeIcon />
          
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <Link style={{textDecoration:'none',color:'#481f3f'}} to='../chat'>
            <MailIcon />
            </Link>
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
       <MenuItem>
        {/* <IconButton
          size="large"
          aria-label="show 17 new notifications"
        //   color="success"
        style={{color:'#481f3f'}}
        > */}
{/*           
            <AddBoxIcon/> */}
             
            
            <Post/>
          
        {/* </IconButton> */}
        <p>Add Post</p>
      </MenuItem>
     <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
        //   color="inherit"
        style={{color:'#481f3f'}}
        >
          
            <  GroupWorkIcon />
          
        </IconButton>
        <p>Add Reels</p>
      </MenuItem>
     
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
        //   color="inherit"
        style={{color:'#481f3f'}}
        >
          <Badge badgeContent={17} color="error">
            <GroupIcon />
          </Badge>
        </IconButton>
        <p>Friends</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          style={{color:'#481f3f'}}
        >
          {/* <AccountCircle /> */}
          
          
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#ad7fa4' }}>
        <Toolbar>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            // onClick={()=>{
            //   navigate('/home')
            // }}
           
          >
            <span className='text'>Bezziegram</span>
          </IconButton>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
             <IconButton
              size="large"
              aria-label="show 17 new notifications"
              style={{color:'#481f3f'}}
            >
              
                < HomeIcon/>
             
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" style={{color:'#481f3f'}}>
              <Badge badgeContent={4} color="error">
                <Link style={{textDecoration:'none',color:'#481f3f'}} to='../chat'>
                <MailIcon />
                </Link>
              </Badge>
            </IconButton>
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
             style={{color:'#481f3f'}}
            > */}
             
                {/* <AddBoxIcon/> */}
                <Post/>
              
            {/* </IconButton> */}
             <IconButton
              size="large"
              aria-label="show 17 new notifications"
              style={{color:'#481f3f'}}
            >
             
                <GroupWorkIcon/>
              
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              style={{color:'#481f3f'}}
            >
              <Badge badgeContent={17} color="error">
                <GroupIcon />
              </Badge>
            </IconButton>
           
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
             style={{color:'#481f3f',marginLeft:'4px'}}
            >
              
              <Avatar alt="Remy Sharp" src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defaultProfile.png"} />
            
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
         
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    
  );
}
