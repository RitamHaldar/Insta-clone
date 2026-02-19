const mongoose= require("mongoose");
const connecttodatabase= ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to Database");
    })
}
module.exports=connecttodatabase;