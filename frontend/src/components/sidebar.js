import React, { useEffect, useState } from 'react'
import './sidebar.css'
import axios from '../axios'
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import Sidebarchat from './sidebarchat';

function Sidebar() {
    const [latestMsg, setLatestMsg]= useState([])
useEffect(()=>{
    axios.get('/api/messages/latest').then(res=>{
            setLatestMsg(res.data)
    })
})
    

  return (
    <div className='sidebar'>
    <div className='sidebar--header'>
        <IconButton>
    <Avatar />
    </IconButton>
       <div className='sidebar--header--right'>
        <IconButton>
        <ChatIcon fontSize='large'  />
        </IconButton>
        <IconButton>
        <DonutLargeIcon fontSize='large' />

        </IconButton>
        <IconButton>
            <MoreVertIcon fontSize='large' />
        </IconButton>
       </div>

    </div >
<div className='sidebar--search '>
    <div className='sidebar--search--cnt'>
        <SearchIcon fontSize='large' />
        <input className='search--searchbox' placeholder='search for a chat' type='text' autoComplete='off' />
        
    </div>
</div>

<div className='sidebarchat--cnt'>
<Sidebarchat name='group name' av='' latestMsgName={`${latestMsg.name}`} latestMsg={`${latestMsg.message}`} />

</div>
    </div>
  )
}

export default Sidebar