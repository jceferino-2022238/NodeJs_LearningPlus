import { sendEmailContact } from "../helpers/generate-email-contact.js";
import User from "../user/user.model.js";

export const postContact = async (req, res) =>{
    const {email, subject, message} = req.body;
    const authUser = req.user;
    const emailDestiny = email;
    const emailFrom = authUser.email
    try {
        const emailSubject = subject;
        const emailHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message from ${authUser.name}</title>
            <style>
                    .header{
                        justify-content: center;
                        padding-left: 30%;
                        background-color: #0B2545;
                        display: flex;
                        flex-direction: row;
                        color: white;
                    }
                    .header h1{
                        margin-top: 10%;
                        font-size:  35px;
                    }
                    .header img{
                        width: 180px;
                        height: 180px;
                    }
                    .emailBody{
                        padding: 20px;
                    }
                    .bodyHeader{
                        text-align: center;
                        color: #134074;
                    }
                    .bodyHeader h1{
                        font-size: 30px;
                    }
                    .emailText{
                        font-size: 15px;
                        color: black;
                    }
                    .footer{
                        text-align: center;
                        color: white;
                        background-color: #0B2545;
                        padding-top: 10px;
                        padding-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://i.postimg.cc/J4Z4b2sp/LEARNINGP-LOGO.png" alt="LearningPlus Logo">
                        <h1>LearningPlus</h1>
                    </div>
                    <div class="emailBody">
                        <div class="bodyHeader">
                            <h1>Message from ${authUser.name} - ${authUser.email}</h1>
                        </div>
                        <div class="emailText">
                            <p>${message}</p>
                        </div>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 LearningPlus. All rights deserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        await sendEmailContact(emailFrom, emailDestiny, emailSubject, emailHTML)
        res.status(201).json({msg: "Email sent to user"})
    } catch (error) {
        console.error("Error sending the email: ", error);
        res.status(500).json({msg: "Error with the proccess of email sending"})
    }
}