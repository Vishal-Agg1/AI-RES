const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running at port: ${port}`);
})
const router = require('./Router/Router');
app.use('/v1',router);
//db connection
const connect = require('./Config/Database');
connect();
//cloud connection
const cloudinary = require('./Config/Cloudinary');
cloudinary.cloudinaryconnect();
app.get('/',(req,res)=>{
    res.send("active");
})