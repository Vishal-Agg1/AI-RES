const User = require('../Models/User');
const Files = require('../Models/Files');
const express = require('express');

exports.fetchfiles=async(req,res)=>{
    try {
        const user = req.body.id;
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Error fetching user"
            })
        }
        const person = await User.findById(user).populate("files");
        if(!person){
            return res.status(100).json({
                success:false,
                message:"User doen not found"
            })
        }
        return res.status(200).json({
            success:true,
            files:person.files,
            message:"files fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error  fetching files"
        })
    }
}