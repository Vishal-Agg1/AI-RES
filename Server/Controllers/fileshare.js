const express = require('express');
const User = require('../Models/User');
const nodemailer = require('nodemailer');
exports.fileshare = async(req,res)=>{
    try {
        const reciever = req.body.reciever;
        const file_id  = req.body.file_id;
        if(!reciever||!file_id){
            return res.send(400).json({
                success:false,
                message:"Please Give Complete Details"
            })
        }
        const user = await User.findOne({email:reciever});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Reciever is not Registered"
            })
        }
        const add = await User.findByIdAndUpdate(user._id, { $push: { recieved: file_id } }, { new: true });
        let transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            // true for port 465, false for other ports
            port: 465, // or the appropriate port
            secure: true, // true for port 465, false for other ports
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
        }});

        let info = await transport.sendMail({
            from:"docexchange",
            to:reciever,
            subject:"newfileuploaded",
            html:`Hi ${user.name},\n\nA new file has been added to your account.\n\nThank you!`
        });

        return res.status(200).json({
            success:true,
            message:"file sended Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}