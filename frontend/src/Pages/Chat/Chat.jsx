import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userChats } from '../../Api/ChatRequest'
import ChatBox from '../../Components/ChatBox/ChatBox'
import Conversation from '../../Components/Conversation/Conversation'
import {io} from 'socket.io-client'



import Navbar from '../../Components/Navbar/Navbar'
import './Chat.css'

const Chat = () => {
    const {user}=useSelector((state)=>state.authReducer.authData)
    const [chats,setChats]=useState([])
    const [currentChat,setCurrentChat]=useState(null)
    const [OnlineUsers,setOnlineUsers]=useState([])
    const [sendMessage,setSendMessage]=useState(null)
    const [recieveMessage,setRecieveMessage]=useState(null)
   

    const socket=useRef()

 //sending message to socket server

    useEffect(()=>{
        if(sendMessage!==null){
            socket.current.emit('send-message',sendMessage)
        }
    },[sendMessage])
 

    useEffect(()=>{
        socket.current=io('http://localhost:8800');
        socket.current.emit("new-user-add",user._id)
        socket.current.on('get-users',(users)=>{
            setOnlineUsers(users)
        })
    },[user])




    //receive message from socket server
    
    useEffect(()=>{
        socket.current.on("receice-message",(data)=>{
            setRecieveMessage(data)
        })

    },[])



    useEffect(()=>{
        const getChats=async()=>{
            try {
                const {data}=await userChats(user._id);
                setChats(data)
                console.log(data);
            } catch (error) {
                console.log(error);
                
            }
        }
        getChats()
    },[user])

    
   const checkOnlineStatus=(chat)=>{
           const chatMember  =chat.members.find((member)=>member!==user._id)
           const online=OnlineUsers.find((user)=>user.userId===chatMember)
           return online?true:false
   }

  return (
    <>
    <Navbar/>
    <div className="Chat">
        
        {/* leftside */}
        <div className="Left-side-chat">
            <div className="Chat-container">
        
         <div className="Chat-list">
           {
            chats.map((chat)=>(
                <div onClick={()=>setCurrentChat(chat)}>
                  <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}></Conversation>
                </div>
            ))
           }
         </div>
         </div>
        </div>

        {/* rightside */}
        <div className="Right-side-chat">
          <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage}  recieveMessage={recieveMessage}></ChatBox>
        </div>
    </div>
    </>
  )
}

export default Chat
