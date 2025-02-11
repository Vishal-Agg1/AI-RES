const mongoose = require('mongoose');

const Files = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fileurl:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
Files.post("save", async function(doc){
    try {
        console.log(doc);
        let user = await doc.populate('userid');
        const mail = doc.userid[0].email;
        let transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            // true for port 465, false for other ports
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
        }});
        let info = transport.sendMail({
            from:"Shareit",
            to:mail,
            subject:"New Upload Success",
            html:`<h1>${doc.name} Upload Successfull</h1>
            <p>Your File Upload is successfull. Keep using Shareit for further File Sharing</p>
            <h2>Thanks for ssing Shareit</h2>`
        });
        console.log(info);
    } catch (error) {
        console.log(error);
    }
})
module.exports = mongoose.model("Files",Files);