import * as React from 'react';
import Box from '@mui/material/Box';
import Story from '../../Components/Story/Story'
import Posts from '../PostsDisplay/Posts';
import './BlockDisplay.css'


export default function Block() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        component="span"
        sx={{
          display: 'block',
          p: 1,
          m: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 1,
          fontSize: '0.875rem',
          fontWeight: '700',
          overflow: 'auto'
        }}
      >
        <Story/>
      </Box>
      <div className="post">
      <Box
        component="span"
        sx={{
          display: 'block',
          p: 1,
          m: 3,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
       <Posts/>
      </Box>
      </div>
    </div>
  );
}
