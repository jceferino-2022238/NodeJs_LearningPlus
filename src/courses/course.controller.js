import Course from "./course.model.js";
import User from "../user/user.model.js";
import { request, response } from "express";
export const coursePost = async (req, res) =>{
    const {title, body, image} = req.body;
    const course = new Course({title, body, image})

    await course.save()
    res.status(200).json({
        course
    })
}

export const getCourses = async (req = request, res = response) =>{
    const authUser = req.user;
    console.log(authUser.role)
    if(authUser.role === "ADMIN_ROLE" || authUser.role === "DEFAULT_ADMIN"){
        const query = {state: true};
        const {limit, from} = req.query;
        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        return res.status(200).json({
            total,
            courses,
        })
    } else if(authUser.role === "USER_ROLE" || authUser.role === "EDITOR_ROLE"){
        const query = {state:true, platformState: "PUBLISHED"}
        const {limit, from} = req.query;
        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        return res.status(200).json({
            total,
            courses,
        })
    }
}

export const getCourseById = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findOne({_id: id})
    res.status(200).json({
        course,
    })
}

export const putCourse = async (req, res = response) =>{
    const {id} = req.params;
    const {_id, ...rest} = req.body;
    await Course.findByIdAndUpdate(id, rest)
    const course = await Course.findOne({_id: id})
    res.status(200).json({
        msg: "Course Upgraded",
        course
    })
}

export const unpublishCourse = async (req, res = response) =>{
    const { id } = req.params;
    const platformStatee = "UNPUBLISHED";
    await Course.findByIdAndUpdate(id, {platformState: platformStatee})
    const course = await Course.findOne({_id: id})
    res.status(200).json({
        msg: "Course unpublished",
        course
    })
}

export const publishCourse = async (req, res = response) =>{
    const { id } = req.params;
    const platformStatee = "PUBLISHED";
    await Course.findByIdAndUpdate(id, {platformState: platformStatee})
    const course = await Course.findOne({_id: id})
    res.status(200).json({
        msg: "Course published",
        course
    })
}

export const deleteCourse = async(req, res) =>{
    const {id} = req.params;
    const course = await Course.findByIdAndUpdate(id, {state: false})
    const authUser = req.user;
    res.status(200).json({
        msg: "Course deactivated",
        course,
        authUser
    })
}