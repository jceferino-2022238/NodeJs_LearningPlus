import Course from "./course.model.js";
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
    const {limit, from} = req.query;
    const query = {state: true};

    const [total, courses] = await Promise.all([
        Course.countDocuments(query),
        Course.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);
    res.status(200).json({
        total,
        courses,
    })
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
        msg: "Course Updagted",
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