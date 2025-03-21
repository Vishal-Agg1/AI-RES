const User = require('../Models/User');
const Files = require('../Models/Files');
const express = require('express');

exports.fetchfiles = async(req,res) => {
    try {
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }
        const person = await User.findById(userId).populate("files");
        if(!person){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            files: person.files,
            message: "Files fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching files:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching files"
        });
    }
}