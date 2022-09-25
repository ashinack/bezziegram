import React, { useState } from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'


import { getTimelinePosts } from '../../Actions/postAction'
import Post from '../Post/Post'

const Posts = () => {
  // const[state,setState]=useState([])
   const {user}=useSelector((state)=>state.authReducer.authData)
  const dispatch=useDispatch()
 
  
  const {posts,loading}=useSelector((state)=>state.postReducer)

 
  useEffect(()=>{
  
    
    dispatch(getTimelinePosts(user._id))

    
  },[])
 
  return (
    <div className='Posts'>
     {loading?"Fetchin Posts..."
     :posts.map((post,id)=>{
     
      return<Post data={post} id={id}/>
    
     })}
    </div>
  )
}

export default Posts
