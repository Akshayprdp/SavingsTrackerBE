const mongoose=require("mongoose")

module.exports={dbconfig:async()=>{
    try{await mongoose.connect('mongodb+srv://Akshay:ph12345@cluster0.wnnox.mongodb.net/').then(()=>{console.log('data base connected successfully')})}

    catch(Error){console.log(Error)}


}}