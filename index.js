const io=require('socket.io')(3000)
const cors=require('cors')
const express=require('express')

const app=express()

const user={}
app.use(cors())
io.on('connection',socket=>{
    socket.on('new-user',name=>{
        user[socket.id]=name
        socket.broadcast.emit('user-connected',name)
    })
    socket.on('send-chat-message',message=>{
        socket.broadcast.emit("chat-message",{message:message,name:user[socket.id]})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',user[socket.id])
        delete user[socket.id]
    })
    socket.on('playUser',()=>socket.broadcast.emit('play','play'))
    socket.on('pauseUser',()=>socket.broadcast.emit('pause','pause'))
    socket.on('clicked',value=>{
        console.log(value)
        socket.broadcast.emit('click',value)
    })
})

