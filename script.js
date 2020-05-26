const socket=io('http://localhost:3000')
const messageForm=document.getElementById('send-container')
const messageInput=document.getElementById('message-input')
const messageContainer=document.getElementById('msg-container')

const appendMsg=(message)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    messageContainer.append(messageElement)
}

const name=prompt('What is your name?')
appendMsg('You joined')
socket.emit('new-user',name)

socket.on('user-connected',name=>{
    appendMsg(`${name} connected`)
})

socket.on('user-disconnected',name=>{
    appendMsg(`${name} disconnected`)
})

socket.on('chat-message',data=>{
    appendMsg(`${data.name}: ${data.message}`)
})

socket.on('play',(play)=>{
    playVideo()
})

socket.on('pause',(pause)=>{
    pauseVideo()
})
socket.on('click',(clicked)=>{
    console.log(clicked)
    document.getElementById("anchor").style.left = clicked+"%";
    player.seekTo(clicked/100*player.getDuration(), true);
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message=messageInput.value
    appendMsg(`You: ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value=''
})

const pauseVideoFunc=()=> {
    pauseVideo()
    socket.emit('pauseUser','pause')     
}

const playVideoFunc=()=> { 
    playVideo()
    socket.emit('playUser','play')  
}

const clickedFunc=(event)=>{
    let value=clicked(event)
    console.log(value)
    socket.emit('clicked',value)
}


//////////////////////////////////////////////////////////////////////
const pauseVideo=()=> {
    player.pauseVideo();
}
const playVideo=()=> { 
    player.playVideo();
    setInterval(anchorMovement,1000)
}
const anchorMovement=()=>{
    document.getElementById("anchor").style.left = player.getCurrentTime()/player.getDuration()*100+"%";
}
const clicked=(event)=>{
    console.log('clkldllmfslmlfmlm')
    var value=event.clientX/640*100
    document.getElementById("anchor").style.left = value+"%";
    player.seekTo(value/100*player.getDuration(), true);
    return value
} 
