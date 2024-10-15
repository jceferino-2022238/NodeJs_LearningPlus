import User from "../user/user.model.js";
import Course from "../courses/course.model.js";
import Profile from "../profiles/profile.model.js";
import Blog from "../blogs/blog.model.js"
import { response, request } from "express";
export const doesEmailExists = async (email = "") =>{
    const existsEmail = await User.findOne({email})
    if(existsEmail){
        throw new Error(`The email ${email} already exists`)
    }
}
export const doesCourseExists = async (title = "") =>{
    const existsCourse = await Course.findOne({title})
    if(existsCourse){
        throw new Error(`This course ${title} already exists!`)
    }
}
export const doesProfileExists = async (title = "") =>{
    const existsProfile = await Profile.findOne({title})
    if(existsProfile){
        throw new Error(`This profile ${title} already exists`)
    }
}
export const doesBlogExists = async (title = "") =>{
    const existsBlog = await Blog.findOne({title})
    if(existsBlog){
        throw new Error(`This blog ${title} already exists`)
    }
}
export const existsUserById = async (id = "") =>{
    const existsUser = await User.findById(id)
    if(!existsUser){
        throw new Error(`The ID ${id} doesn't exist`);
    }
}

export const existsCourseById = async (id="") =>{
    const existsCourse = await Course.findById(id)
    if(!existsCourse){
        throw new Error(`The ID ${id} doesn't exist`);
    }
}
export const existsProfileById = async (id="") =>{
    const existsProfile = await Profile.findById(id)
    if(!existsProfile){
        throw new Error(`The ID ${id} doesn't exist`)
    }
}
export const existsBlogById = async (id="") =>{
    const existsBlog = await Blog.findById(id)
    if(!existsBlog){
        throw new Error(`The ID ${id} doesn't exist`)
    }
}/*
export const isDefaultAdminD = async (id="")=>{
    const idOfUser = id
    const res = response;
    const isDefault = await User.findById(idOfUser)
    if(isDefault.role === "DEFAULT_ADMIN"){
        res.status(401).json({
            msg: "You CANT delete the default admin user"
        })
    }
}*/