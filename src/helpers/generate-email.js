import nodemailer from "nodemailer"
import { response } from "express";
export const sendEmail = async (emailDestiny, emailSubject, emailHTML) =>{
    let res = response;
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "platformlearningplus@gmail.com",
                pass: process.env.PASS
            },
        });
        const messageEmail = {
            from: "platformlearningplus@gmail.com",
            to: emailDestiny,
            subject: emailSubject,
            html: emailHTML
        };

        transporter.sendMail(messageEmail, (err, result)=>{
            if(err){
                console.log(err)
                res.json("An error occured")
            }else{
                res.json("thanks for the error reviewing")
            }
        })
    } catch (error) {
        console.error("Error sending the email: ", error);
        throw new Error("Error sending the email")
    }
}