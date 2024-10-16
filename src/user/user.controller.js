import { response, request } from "express";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import User from "./user.model.js";
import { sendEmail } from "../helpers/generate-email.js";

dotenv.config();

export const postUserOrAdmin = async (req, res) =>{
    const {name, email, password, role} = req.body;

    const user = new User({name, email, password, role})
    const emailDestiny = email;
    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    try {
        const emailSubject = "Welcome to our Platform. LearningPlus";
        const emailHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to our Platform. LearningPlus</title>
                <style>
                    .container{
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header{
                        background-color: #008526;
                        text-align: center;
                        font-family: "Poppins", Sans-serif;
                        color: black;
                    }
                    .emailBody{
                        background-color: #edfff2;
                        justify-content: center;
                    }
                    .bodyHeader{
                        text-align: center;
                    }
                    .emailText{
                        text-align: justify;
                        text-justify: inter-word;
                    }
                    .accountInfo{
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img>
                        <h1>LearningPlus</h1>
                    </div>
                    <div class="emailBody">
                        <div class="bodyHeader">
                            <h1>Welcome to LearningPlus</h1>
                            <h2>Our administrators gave you access to our platform!</h2>
                        </div>
                        <div class="emailText">
                            <p>We are very excited to start this new journey with you, we hope you dont have
                            any problems when accessing the platform, feel free to contact us for any question</p>

                            <p>Here is the info of your account</p>
                            <div class="accountInfo">
                                <p><strong>User: </strong>${name}</p>
                                <p><strong>Email: </strong>${email}</p>
                                <p><strong>Password: </strong>${password}</p>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 LearningPlus. All rights deserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        await sendEmail(emailDestiny, emailSubject, emailHTML)
        res.status(201).json({ msg: "The user has been created", user})
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({msg: "Error with the proccess of email or user creation"})
    }
    /*
    res.status(200).json({
        user,
    })
    */
};

export const registerOnPage = async (req, res)=>{
    const {name, email, password} = req.body;
    const user = new User({name, email, password})
    const emailDestiny = email;
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save()

    try {
        const emailSubject = "Welcome to our Platform. LearningPlus";
        const emailHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to our Platform. LearningPlus</title>
                <style>
                    .container{
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header{
                        background-color: #008526;
                        text-align: center;
                        font-family: "Poppins", "Sans-serif";
                        color: black
                    }
                    .emailBody{
                        background-color: #edfff2;
                        justify-content: center;
                    }
                    .bodyHeader{
                        text-align: center;
                    }
                    .emailText{
                        text-align: justify;
                        text-justify: inter-word;
                    }
                    .accountInfo{
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img>
                        <h1>LearningPlus</h1>
                    </div>
                    <div class="emailBody">
                        <div class="bodyHeader">
                            <h1>Welcome to LearningPlus</h1>
                            <h2>Thank you for registrating in our platform!</h2>
                        </div>
                        <div class="emailText">
                            <p>We are very excited to start this new journey with you, we hope you dont have
                            any problems when accessing the problem, feel free to contact us for any question</p>
                            <p>Here is the info of your account</p>
                            <div class="accountInfo">
                                <p><strong>User: </strong>${name}</p>
                                <p><strong>Email: </strong>${email}</p>
                                <p><strong>Password: </strong>${password}</p>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 LearningPlus. All rights deserved</p>
                    </div>
                </div>
            </body>
        `;
        await sendEmail(emailDestiny, emailSubject, emailHTML)
        res.status(201).json({msg: "Register on page done correctly", user})
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({msg: "Error with the proccess of email or user creation"})
    }/*
    res.status(200).json({
        user,
    })*/
}

export const postEditor = async (req, res) =>{
    const {name, email, password} = req.body;
    const role = "EDITOR_ROLE";
    const user = new User({name, email, password, role})

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.status(200).json({
        user,
    })
}

export const getUsers = async (req = request, res = response) =>{
    const {limit, from} = req.query;
    const query = {state: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);
    res.status(200).json({
        total,
        users,
    });
}

export const getUserById = async (req, res) =>{
    const { id } = req.params;
    const user = await User.findOne({_id: id})
    res.status(200).json({
        user,
    })
}

export const putUser = async (req, res = response) =>{
    const {id} = req.params;
    const {_id, email, ...rest} = req.body;
    if(password){
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }
    await User.findByIdAndUpdate(id, rest)
    const user = await User.findOne({_id: id})

    res.status(200).json({
        msg: "User Updated",
        user
    })
}
export const putMyUser = async (req, res = response) =>{
    const { id } = req.params;
    const authUser = req.user;
    if(authUser._id != id){
        return res.status(401).json({
            msg: "You can't update another user's account"
        })
    }
    const {_id, password, ...rest} = req.body;
    if(password){
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }
    await User.findByIdAndUpdate(id, rest)
    const user = await User.findOne({_id: id})

    res.status(200).json({
        msg: "Account updated",
        user
    })
}
export const putMyPassword = async (req, res = response) => {
    try {
        const { id } = req.params; 
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(401).json({ msg: "The password and confirmPassword are not the same" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt);

        await User.findByIdAndUpdate(id, { password: hashedPassword });

        res.status(200).json({ msg: "Password Updated :D" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error updating password" });
    }
};
export const deleteMyUser = async (req, res) =>{
    const { id } = req.params;
    const authUser = req.user;
    if(authUser._id != id){
        return res.status(401).json({
            msg: "You can't delete another user's account"
        })
    }

    const emailDestiny = authUser.email;

    const user = await User.findByIdAndDelete(id);
    try {
        const emailSubject = "Leaving our Platform. LearningPlus"
        const emailHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Leaving our Platform. LearningPlus</title>
                <style>
                    .container{
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header{
                        background-color: #008526;
                        text-align: center;
                        font-family: "Poppins", "Sans-serif";
                        color: black;
                    }
                    .emailBody{
                        background-color: #edfff2;
                        justify-content: center;
                    }
                    .bodyHeader{
                        text-align: center;
                    }
                    .emailText{
                        text-align: justify;
                        text-justify: inter-word;
                    }
                    .contactInfo{
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img>
                        <h1>LearningPlus</h1>
                    </div>
                    <div class="emailBody">
                        <div class="bodyHeader">
                            <h1>Leaving LearningPlus</h1>
                            <h2>It has been a great journey at your side</h2>
                        </div>
                        <div class="emailText">
                            <p>We are very sorry you are leaving us, let us know why are you taking the decision of
                            deleting your account by contacting us and reviewing our page and services.</p>

                            <p>Our contact forms are the following: </p>

                            <div class="ContactInfo">
                                <p><strong>Email: </strong>platformlearningplus@gmail.com</p>
                            </div>
                        </div>   
                    </div>
                    <div class="footer">
                        <p&copy; 2024 LearningPlus. All rights deserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        await sendEmail(emailDestiny, emailSubject, emailHTML)
        res.status(200).json({
            msg: "User deactivated",
            user,
            authUser
        })
    } catch (error) {
        console.error("Error sending email", error);
        res.status(500).json({msg: "Error with the proccess of email or elimination of user"});
    }
}
export const deleteUser = async(req, res) =>{
    const {id} = req.params;
    const isDefault = await User.findById(id)
    const emailDestiny = isDefault.email;
    if(isDefault.role === "DEFAULT_ADMIN"){
        return res.status(401).json({
            msg: "You CAN'T delete the default admin user >:("
        })
    }
    const user = await User.findByIdAndDelete(id)
    try {
        const emailSubject = "Leaving our Platform. LearningPlus";
        const emailHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Leaving our Platform. LearningPlus</title>
                <style>
                    .container{
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header{
                        background-color: #008526;
                        text-align: center;
                        font-family: "Poppins", "Sans-serif";
                        color: black;
                    }
                    .emailBody{
                        background-color: #edfff2;
                        justify-content: center;
                    }
                    .bodyHeader{
                        text-align: center;
                    }
                    .emailText{
                        text-align: justify;
                        text-justify: inter-word;
                    }
                    .contactInfo{
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img>
                        <h1>LearningPlus</h1>
                    </div>
                    <div class="emailBody">
                        <div class="bodyHeader">
                            <h1>Leaving LearningPlus</h1>
                            <h2>It has been a great journey at your side</h2>
                        </div>
                        <div class="emailText">
                            <p>We are very sorry you are leaving us, your access to the platform has been removed by our team
                            . If you have any questions about the proccess, contact us to solve them</p>

                            <p>Our contact forms are the following: </p>

                            <div class="contactInfo">
                                <p><strong>Email: </strong>platformlearningplus@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 LearningPlus. All rights deserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        await sendEmail(emailDestiny, emailSubject, emailHTML)
        const authUser = req.user;
        res.status(200).json({
            msg: "User deactivated",
            user,
            authUser
        })
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({msg: "Error with the proccess of email or elimination of user"})
    }
    
}

export const defaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ email: "admin-learningP@gmail.com" });

        if (existingAdmin) {
            console.log("The admin default is already created:", existingAdmin);
            return;
        }
        const newAdmin = new User({
            name: "admin-learning",
            email: "admin-learningP@gmail.com",
            password: "admin123",
            role: "DEFAULT_ADMIN"
        });

        const salt = bcryptjs.genSaltSync();
        newAdmin.password = bcryptjs.hashSync(newAdmin.password, salt);
        
        await newAdmin.save();
        console.log("Admin has been created:", newAdmin);

    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.email) {
            console.error("Duplicate admin detected. An admin with this email already exists.");
        } else {
            console.error("An error occurred:", error.message);
        }
    }
};