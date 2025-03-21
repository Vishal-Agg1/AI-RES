const User = require('../Models/User');
const Files = require('../Models/Files');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

exports.fileupload = async (req, res) => {
    try {
        const data = req.files.file;
        const email = req.body.id;
        if(!data){
            res.json({
                success:false,
                message:"Pleasse Provide File to upload"
            })
        }
        const person = await User.findById(email);
        if(!person){
            res.json({
                success:false,
                message:"user not found"
            })
        }
        console.log(person);
        console.log(data);
        const name = data.name;
        const temppath = data.tempFilePath;
        const response = await cloudinary.v2.uploader.upload(temppath)
         const url = response.secure_url;                
        const setfile = await Files.create({
            name:name,
            fileurl:url,
            userid:person._id
        });
        
        const update_user = await User.findByIdAndUpdate(person._id,{$push:{files:setfile._id}},{new:true})
        if (!update_user) {
            return res.status(500).json({
                success: false,
                message: "Failed to update user's file list"
            });
        }
        res.status(200).json({
            success:true,
            message:"Upload Successfull"
        })
    } catch (error) { 
        console.log(error);  
        res.status(500).json({
            success:false,
            message:error
        })
    }
}