// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: "gmail",

//     auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//     }
// });

// async function sendEmail(
//  email,
//  otp   
// ){
//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: email,

//         subject: "Verify your email",

//         text:`your OTP is ${otp}`
//     });
// }

// module.exports = sendEmail;



// const nodemailer = require("nodemailer");

// const transporter =
// nodemailer.createTransport({

// service:"gmail",

// auth:{

// user:
// process.env.EMAIL_USER,

// pass:
// process.env.EMAIL_PASS

// }

// });

// async function sendEmail(
// email,
// otp
// ){
//     try{
//         const info = await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: "Verify your email",
//             text: `Your OTP is ${otp}`
//         });
//         console.log("EMAIL SENT:", info.response);
//     }

//     catch(error){
//         console.error("EMAIL ERROR:", error.message);
//         throw error;

//     }
// }
// try 
// {

// await transporter.sendMail({

// from:
// process.env.EMAIL_USER,

// to:
// email,

// subject:
// "Verify your email",

// text:
// `Your OTP is ${otp}`

// });

// }
// }

// import { Resend } from 'resend';

require("dotenv").config();
const {Resend} = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(
    email,
    otp

){
    try{
        const{data, error } =
        await resend.emails.send({

            from: process.env.EMAIL_FROM,

            to: email,

            subject: "Verify your email",
            html: `<h2> Email Verification </h2> 
            <p> Your OTP is: </p>
            <h1>${otp}</h1>
            <p>This OTP expires in 5 minutes. </p>`

        });

        if(error) {
            console.error( "EMAIL ERROR:", error);
            throw error;
        }
        console.log("EMAIL SENT:", data);
    }

    catch(error){
        console.error( "EMAIL SENT FAILED:", error);

        throw error;
    }
}

module.exports =
sendEmail;