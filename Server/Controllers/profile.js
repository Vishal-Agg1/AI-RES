const express = require('express');
const User = require('../Models/User');

exports.profile = async(req,res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.password = undefined;
        return res.status(200).json({
            success: true,
            data: user,
            message: "Details found successfully"
        });     
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}