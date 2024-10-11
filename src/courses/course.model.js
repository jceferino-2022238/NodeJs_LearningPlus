import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Image is required"],
    },
    body:{
        type: String,
        required: [true, "Body is required"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    }
})
CourseSchema.methods.toJSON = function(){
    const {__v, _id, ...course} = this.toObject();
    course.cid = _id;
    return course;
}
export default mongoose.model("Course", CourseSchema);