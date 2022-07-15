import './App.css';
import Sidebar from './components/sidebar';
import Chat from './components/chat';
import axios from './axios'
import { useEffect , useState} from 'react';
import Pusher from 'pusher-js'
function App() {
  const [messages,setMessages]= useState([])

  useEffect(()=>{
axios.get('/api/messages/sync').then(res=>{
  setMessages(res.data)
})
  },[])

  useEffect(()=>{
    const pusher = new Pusher('f3f32a523ccc42cb246b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data)=>{
      
      setMessages([...messages, data])
    });

   
      return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
  }
    
  },[messages])
  return (
    <div className='app'>
    <div className='app--body'>
    <>
      
      <Sidebar />
      
      <Chat messages={messages}  /></>
    </div>
    </div>
  );
}

export default App;
