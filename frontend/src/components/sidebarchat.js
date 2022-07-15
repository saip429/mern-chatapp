import { Avatar } from '@mui/material'
import React from 'react'
import './sidebarchat.css'
function Sidebarchat(props) {
  return (
    <div className='sidebarchat'>
        <Avatar src={props.av} />
        <div className='sidebarchat--info'>
<h2>{props.name}</h2>
<p>{props.latestMsgName}: {props.latestMsg}</p>

        </div>
    </div>
  )
}

export default Sidebarchat