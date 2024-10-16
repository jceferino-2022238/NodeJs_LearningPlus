import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    body:{
        type: String,
        required: [true, "Body is required"]
    },
    image:{
        type: String,
        required: [true, "Image is required"]
    },
    platformState: {
        type: String,
        enum: ["PUBLISHED", "UNPUBLISHED"],
        default: "PUBLISHED"
    },
    state: {
        type: Boolean,
        default: true
    }
})
BlogSchema.methods.toJSON = function(){
    const {__v, _id, ...blog} = this.toObject();
    blog.bid = _id;
    return blog;
}
export default mongoose.model("Blog", BlogSchema)