const io=require('socket.io')(8800,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let activeUsers=[]

io.on("connection",(socket)=>{
        //add new user
        socket.on('new-user-add',(newUserId)=>{
              // if user is not added previously
            if (!activeUsers.some((user) => user.user===newUserId)){
                activeUsers.push({
                    userId:newUserId,
                    socketId:socket.id
                })
            }
            console.log("connected Users", activeUsers);
             io.emit('get-users',activeUsers)
        })

        //send message
        socket.on("send-message",(data)=>{
             const {receiverId}=data;
             const user=activeUsers.find((user)=>user.userId===receiverId)
             console.log("sending from socket to:",receiverId);
             console.log("Data",data);
             if(user){
                io.to(user.socketId).emit("receive-message",data)
             }
        })

    socket.on("disconnect",()=>{
        activeUsers=activeUsers.filter((user)=>user.socketId!==socket.id)
        console.log("User disconnected",activeUsers)
        io.emit('get-users',activeUsers)
    })
   

})