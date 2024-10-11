import User from "../user/user.model.js";
import Course from "../courses/course.model.js";
import Profile from "../profiles/profile.model.js";
export const doesEmailExists = async (email = "") =>{
    const existsEmail = await User.findOne({email})
    if(existsEmail){
        throw new Error(`El correo ${email} ya existe`)
    }
}
export const doesCourseExists = async (title = "") =>{
    const existsCourse = await Course.findOne({title})
    if(existsCourse){
        throw new Error(`This course already exists!`)
    }
}
export const doesProfileExists = async (title = "") =>{
    const existsProfile = await Profile.findOne({title})
    if(existsProfile){
        throw new Error(`This profile ${title} already exists`)
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