const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum: ['Job Seeker', 'Employer'],
        default: 'Job Seeker',
        required:true
    },
    files:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Files"
        }
    ],
    recieved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Files"
    }]
})
module.exports = mongoose.model("User",User);