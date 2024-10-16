import Blog from "./blog.model.js";
import { response, request } from "express";
export const blogPost = async(req, res) =>{
    const {title, body, image} = req.body;
    const blog = new Blog({title, body, image})
    await blog.save();
    res.status(200).json({
        blog
    })
}

export const getBlogs = async (req = request, res = response) =>{
    const authUser = req.user;
    console.log(authUser.role)
    if(authUser.role === "ADMIN_ROLE" || authUser.role === "DEFAULT_ADMIN"){
        const query = {state: true};
        const {limit, from} = req.query;
        const [total, blogs] = await Promise.all([
            Blog.countDocuments(query),
            Blog.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        return res.status(200).json({
            total, 
            blogs
        })
    } else if(authUser.role === "USER_ROLE" || authUser.role === "EDITOR_ROLE"){
        const query = {state: true, platformState: "PUBLISHED"}
        const {limit, from} = req.query;
        const [total, blogs] = await Promise.all([
            Blog.countDocuments(query),
            Blog.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        return res.status(200).json({
            total,
            blogs
        })
    }
}

export const getBlogById = async (req, res) =>{
    const { id } = req.params;
    const blog = await Blog.findOne({_id: id})
    res.status(200).json({
        blog
    })
}

export const putBlog = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, ...rest} = req.body;
    await Blog.findByIdAndUpdate(id, rest)
    const blog = await Blog.findOne({_id: id})
    res.status(200).json({
        msg: "Blog upgraded",
        blog
    })
}
export const publishBlog = async (req, res = response) =>{
    const { id } = req.params;
    const platformStatee = "PUBLISHED";
    await Blog.findByIdAndUpdate(id, {platformState: platformStatee})
    const blog = await Blog.findOne({_id: id})
    res.status(200).json({
        msg: "Blog published",
        blog
    })
}
export const unpublishBlog = async (req, res = response) =>{
    const { id } = req.params;
    const platformStatee = "UNPUBLISHED";
    await Blog.findByIdAndUpdate(id, {platformState: platformStatee})
    const blog = await Blog.findOne({_id: id})
    res.status(200).json({
        msg: "Blog unpublished",
        blog
    })
}
export const deleteBlog = async(req, res) =>{
    const { id } = req.params;
    const blog  = await Blog.findByIdAndUpdate(id, {state: false})
    const authUser = req.user;
    res.status(200).json({
        msg: "Blog deactivated",
        blog,
        authUser
    }) 
}