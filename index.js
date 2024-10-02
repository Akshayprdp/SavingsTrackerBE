const express =require("express");
const app = express();
require('dotenv').config()
const dbconnection=require('./config/dbconfig')
dbconnection.dbconfig()
const userRoutes=require("./Routes/userRoutes")
const cors = require('cors')





app.use(express.json());
app.use(cors())
app.use("/", userRoutes);




app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });

 


  
 