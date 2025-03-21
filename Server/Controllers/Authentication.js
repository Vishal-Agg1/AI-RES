const User =require('../Models/User');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
exports.signup=async(req,res)=>{
    try {
        const {name,email,password,role} = req.body;

        const exuser = await User.findOne({email});
        if(exuser){
            return res.json({
                message:"user already exist"
            })
        }
        let pass;
        try {
            pass =await bcrypt.hash(password,10);
            const person = await User.create({
                name:name,
                email:email,
                password:pass,
                role:role || 'Job Seeker' // Use provided role or default to Job Seeker
            });
            return res.status(200).json({
                success:true,
                message:"Account created successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Failed in creation"
            })
        } 
        
        
    } catch (error) {
        res.status(400).json({
            success:true,
            message:"please try again"
        })
    }
}

exports.login=async(req,res)=>{
    try {
        const {email,password,role} = req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"enter complete data"
            })
         }
        const person = await User.findOne({email});
        if(!person){
            return res.status(500).json({
                success:false,
                message:"No User Found"
            })
        }
        
        // Verify that the role matches
        if(role && person.role !== role) {
            return res.status(403).json({
                success:false,
                message:"Invalid role for this account"
            });
        }
        
        const pass = await bcrypt.compare(password,person.password);
        if(pass){
            try {
                const token = jwt.sign(
                    { email: person.email, id: person._id.toString(), role: person.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "2h" }
                );
                person.password = undefined;
                res.cookie("auth", token, { httpOnly: true }).status(200).json({
                    success: true,
                    data: person,
                    message: "Logged in successfully",
                });
            } catch (error) {
                console.error("JWT Signing Error:", error.message);
                res.status(500).json({
                    success: false,
                    message: "Error generating token",
                    error: error.message,
                });
            }
        }
        else{
           return res.status(500).json({
                status:false,
                message:"Wrong Password"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"server issue"
        })
    }
}