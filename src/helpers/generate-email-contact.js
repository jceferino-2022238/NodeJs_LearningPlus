import nodemailer from "nodemailer";
import { request, response } from "express";

export const sendEmailContact = async (emailFrom, emailDestiny, emailSubject, emailHTML) =>{
    try {
        let transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "platformlearningplus@gmail.com",
                pass: process.env.PASS
            },
        });
        const messageEmail = {
            from: emailFrom,
            to: emailDestiny,
            subject: emailSubject,
            html: emailHTML
        };

       await transporter.sendMail(messageEmail);
       return { success: true, message: "Email sent successfully"};
    } catch (error) {
        console.error("Error sending the email: ", error);
        throw new Error("Error sending the email")
    }
}