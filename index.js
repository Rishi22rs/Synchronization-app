const express=require('express')
const app=express()
const server=require('http').Server(app)
const io=require('socket.io')(server)
const cors=require('cors')

app.use(cors())
// app.use(express.static(__dirname)+'/../../build')

server.listen(3000,()=>{
    console.log('App is listening at port 3000')
})
const user={}

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
    socket.on('videoUrl',videoUrl=>{
        socket.broadcast.emit('thisVideo',videoUrl)
    })
})

