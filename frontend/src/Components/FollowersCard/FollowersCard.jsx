
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../Api/UserRequest'
import User from '../User/User'
import './FollowersCard.css'

const FollowersCard = () => {
 const [persons,setPersons]=useState([]);
 const {user}=useSelector((state)=>state.authReducer.authData)

 useEffect(()=>{
  const fetchPersons=async()=>{
    const {data}=await getAllUser(user._id);
    setPersons(data)
    console.log(data);
  }
  fetchPersons()
 },[])
  return (
   
    <div className="followersCard">
      
      {
        persons.map((person,id)=>{
          if(person._id!==user._id){

         
          return(
          <User person={person} key={id}/>
         
   
        )
         }
        })
      }
      </div>
    
   
  )
}

export default FollowersCard
