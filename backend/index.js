//imports
import  express  from "express";
import cors from 'cors'
import mongoose from "mongoose";
import MessageContent from "./dbMessages.js";
import Pusher from "pusher";

//config
const app= express()
const PORT= process.env.PORT ||5000


const pusher = new Pusher({
  appId: "", //App ID
  key: "", //key
  secret: "", //pusher secret
  cluster: "",
  useTLS: true
});



//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//DBconfig
 mongoose.connect('mongodb+srv://BigBoi0429:Saip12345@cluster0.voh8roy.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.catch(err => console.log(err))

const db= mongoose.connection
db.once('open',()=>{
    console.log('connected to db')
    const msg= db.collection('MessageContent')
    const changeStream = db.watch()
    changeStream.on('change',(change)=>{
        console.log(change)
        if(change.operationType === 'insert'){
            const msgdetails= change.fullDocument
            pusher.trigger('messages','inserted',{
                name: msgdetails.name,
                message: msgdetails.message,
                recieved: msgdetails.recieved
                
            })
        }
        else
    console.log('pusher failed')    }
   )

    
})

//APIs
app.get('/api/messages/sync',async(req,res)=>{
 MessageContent.find((err,data) =>{
    if(err)
    res.status(500).send(err)
    else
    res.status(201).send(data)
 })

})

app.post('/api/messages/new',async(req,res)=>{
    const dbmsg= req.body;
    
   await MessageContent.create(dbmsg,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get('/api/messages/latest',async(req,res)=>{
   const latest= await MessageContent.findOne()
    res.send(latest)
})

//route for testing only
app.delete('/',async(req,res)=>{
    await MessageContent.deleteMany()
    res.send('oh')
})

//Listener
app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})
