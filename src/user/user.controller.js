import { response, request } from "express";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import User from "./user.model.js";
export const usersPost = async (req, res) =>{
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save()
    res.status(200).json({
        user,
    })
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
        throw new Error(`You can't edit another user's account`)
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
export const deleteMyUser = async (req, res) =>{
    const { id } = req.params;
    const authUser = req.user;
    if(authUser._id != id){
        throw new Error(`You can't delete another user's account`)
    }
    const user = await User.findByIdAndUpdate(id, {state: false})
    res.status(200).json({
        msg: "Your Account has been deleted, Goodbye",
        user,
        authUser
    })
}
export const deleteUser = async(req, res) =>{
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {state: false})
    const authUser = req.user;
    res.status(200).json({
        msg: "User deactivated",
        user,
        authUser
    })
}

export const defaultAdmin = async () =>{
    try {
        const existingAdmin = await User.findOne({email: "admin-learningP@gmail.com"})
        if(existingAdmin){
            console.log("Admin is already created")
        }else{
            const newAdmin = new User({
                name: "admin-learning",
                email: "admin-learningP@gmail.com",
                password: "admin123",
                role: "ADMIN_ROLE"
            })
            const salt = bcryptjs.genSaltSync();
            newAdmin.password = bcryptjs.hashSync(newAdmin.password, salt)
            await newAdmin.save();
            consoleLog("Admin has been created", newAdmin)
        }
    } catch (error) {
        console.log("Error creating the admin default user")
    }
}