import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { getAllUser } from '../../Api/UserRequest';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function CustomizedTables() {
    const [user,setUser]=useState([])
     const posts=useSelector((state)=>state.postReducer.posts)
   useEffect(()=>{
    const fetchUser=async()=>{
        const {data}=await getAllUser()
        setUser(data)
      
    }
    fetchUser()
   }
    

   ,[])
    

  return (
    <Container className='pt-5'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Post</StyledTableCell>
            <StyledTableCell align="right">Number of Followers</StyledTableCell>
            <StyledTableCell align="right">Number of Following</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            {user.map((row,index)=>{
                return(
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{posts.filter((post)=>post.userId===row._id).length}</StyledTableCell>
              <StyledTableCell align="right">{row.followers.length}</StyledTableCell>
              <StyledTableCell align="right">{row.following.length}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
            </StyledTableRow>
         )
            })}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

