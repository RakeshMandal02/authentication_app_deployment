const mongoose = require('mongoose')
require('dotenv').config({ path: './Config/.env' })
const mongo_url = process.env.MONGO_CONNECT


mongoose.connect(mongo_url)
.then(()=>{
console.log('MongoDb connected');

}).catch((err)=>{
    console.log(err);
    
})



