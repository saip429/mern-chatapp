import mongoose from "mongoose";

const messageSchema= mongoose.Schema({
    name: {
        type: String
        

    },
    message:{
        type: String
        
    },
    timestamp:{
        
        type: String
    },
    recieved: 
    {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('MessageContent',messageSchema)