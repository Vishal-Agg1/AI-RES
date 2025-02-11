const mongoose = require('mongoose');
require('dotenv').config();
const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE)
    .then(()=>{console.log("connection successfull")})
    .catch((error)=>{console.log(`connection failed ${error}`)});
}
module.exports = dbconnect;