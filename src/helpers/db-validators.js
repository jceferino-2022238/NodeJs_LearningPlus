import User from "../user/user.model.js";
import Course from "../courses/course.model.js";
export const doesEmailExists = async (email = "") =>{
    const existsEmail = await User.findOne({email})
    if(existsEmail){
        throw new Error(`El correo ${email} ya existe`)
    }
}

export const existsUserById = async (id = "") =>{
    const existsUser = await User.findById(id)
    if(!existsUser){
        throw new Error(`El ID ${id} no existe`);
    }
}

export const existsCourseById = async (id="") =>{
    const existsCourse = await Course.findById(id)
    if(!existsCourse){
        throw new Error(`El ID ${id} no existe`);
    }
}