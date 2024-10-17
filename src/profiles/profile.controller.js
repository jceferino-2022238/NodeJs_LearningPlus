import { request, response } from "express";
import Profile from "./profile.model.js";

export const profilePost = async(req, res) =>{
    const {title, body} = req.body;
    const profile = new Profile ({title, body})

    await profile.save()
    res.status(200).json({
        profile
    })
}

export const getProfiles = async (req = request, res = response) =>{
    const authUser = req.user;
    console.log(authUser.role)
    if(authUser.role === "ADMIN_ROLE" || authUser.role === "DEFAULT_ADMIN"){
        const query = {state: true};
        const {limit, from} = req.query;
        const [total, profiles] = await Promise.all([
            Profile.countDocuments(query),
            Profile.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        return res.status(200).json({
            total,
            profiles
        })
    } else if(authUser.role === "USER_ROLE" || authUser.role === "EDITOR_ROLE"){
        const query = {state: true, platformState: "PUBLISHED"}
        const {limit, from} = req.query;
        const [total, profiles] = await Promise.all([
            Profile.countDocuments(query),
            Profile.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        return res.status(200).json({
            total,
            profiles
        })
    }
}

export const getProfileById = async (req, res) =>{
    const {id} = req.params;
    const profile = await Profile.findOne({_id: id})
    res.status(200).json({
        profile,
    })
}

export const putProfile = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, ...rest} = req.body;
    await Profile.findByIdAndUpdate(id, rest)
    const profile = await Profile.findOne({_id: id})
    res.status(200).json({
        msg: "Profile updated",
        profile
    })
}
export const publishProfile = async (req, res = response) =>{
    const { id } = req.params;
    const platformStatee = "PUBLISHED";
    await Profile.findByIdAndUpdate(id, {platformState: platformStatee})
    const profile = await Profile.findOne({_id: id})
    res.status(200).json({
        msg: "Profile published",
        profile
    })
}
export const unpublishProfile = async (req, res = response) =>{
    const { id } = req.params;
    const platformStatee = "UNPUBLISHED";
    //const {_id} = req.body;
    await Profile.findByIdAndUpdate(id, {platformState: platformStatee})
    const profile = await Profile.findOne({_id: id})
    res.status(200).json({
        msg: "Profile unpublished",
        profile
    })
}
export const deleteProfile = async (req, res)=>{
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, {state: false})
    const authUser = req.user;
    res.status(200).json({
        msg: "Profile deleted",
        profile,
        authUser
    })
}
