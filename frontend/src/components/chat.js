import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import axios from '../axios'
import MicIcon from '@mui/icons-material/Mic';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import './chat.css'
import { Avatar, IconButton } from '@mui/material';


function Chat({messages}) {
  const [smessage, setSmessage]=useState([''])
  function sendmessage(){
   
    axios.post('/api/messages/new',{
      name: 'you',
      timestamp: `${Date().toLocaleLowerCase()}`,
      message: smessage,
      recieved: true
    })
  }


  

  return (
    <div className='chat'>
      <div className='chat--header'>
        <IconButton>
        <Avatar  />
        </IconButton>
     
     <div className='chat--header--info'>
      <h3>Group name</h3>
      <p>group members</p>

     </div>
     <div className='chat--header--right'>
      <IconButton>
      <SearchIcon />
      </IconButton>
      <IconButton>
       <AttachFileIcon />
        </IconButton>
        <IconButton>
        <MoreVertIcon />
        </IconButton>
      
     </div>
      </div>   
      <div className='chat--body'>
       {messages.map(message=>{
        return(
          
            <><p className={`${!message.recieved ? 'chat--msg': 'no--render'}`}>

            <span className='chat--name'>
              {message.name}
            </span><br></br>

            {message.message}<br></br>
            <span className='chat--timestamp'>
              {message.timestamp}
            </span>

          </p>
          <p className={`${message.recieved ? 'chat--reciever' : 'no--render'}`}>
              <span className='chat--name'>
                you
              </span><br></br>
              {message.message} <br></br>
              <span className='chat--timestamp'>
                {message.timestamp}
              </span>
            </p></>)
          
       })}

        
      </div>
        <div className='chat--footer'>
  <IconButton><InsertEmoticonIcon /></IconButton>
  
<form className='chat--msg--form'>
  <input value={smessage} placeholder='type a message...' type='text' onChange={event=> setSmessage(event.target.value)} />
  <button   type='submit' title='send message' onClick={sendmessage} >
    <SendRoundedIcon  />
  </button>
  </form>  
  <div>
  <AttachFileIcon />
  <MicIcon />
  </div>
        </div>
    </div>
  )
}

export default Chat