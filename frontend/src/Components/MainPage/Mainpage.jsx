import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Hidden } from '@mui/material';
import BlockDisplay from '../BlockDispaly/BlockDispaly'
import FollewersCard from '../FollowersCard/FollowersCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 1 ,mt: 2}}>
      <Grid container spacing={10} columnSpacing={{  lg: 3 }}>
        <Hidden lgDown>
        <Grid item lg >
          <Item> 
            <div className='mt-3'>
          <p>Hide Me On XS View Port Width.</p>
          </div>
     </Item>
        </Grid>
         </Hidden>
        <Grid item xs={12} lg={6} >
          <Item>
            <div className='mt-5'>
           <BlockDisplay/>
           </div>
          </Item>
        </Grid>
        <Hidden lgDown>
        <Grid item lg>
          <Item>
            <div className='mt-3'>
            <FollewersCard/>
            </div>
          </Item>
        </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
}