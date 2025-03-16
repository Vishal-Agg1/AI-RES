const express = require('express');
const User = require('../Models/User');
exports.Profile = async(req,res)=>{
    try {
        const id = req.params.id;
        if(!id){
         res.status(400).json({
             success:false,
             message:"give the id please"
         })
        }
        const user = await User.findById(id);
        user.password = undefined;
        if(!user){
         res.status(400).json({
             success:false,
             message:"User not Found"
         })
        }
        res.status(200).json({
         success:true,
         data:user,
         message:"Details found successfully"
        })     
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}