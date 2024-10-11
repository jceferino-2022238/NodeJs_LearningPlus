import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    body:{
        type: String,
        required: [true, "Body is required"]
    },
    state: {
        type: Boolean,
        default: true
    }
})
ProfileSchema.methods.toJSON = function(){
    const {__v, _id, ...profile} = this.toObject();
    profile.pid = _id;
    return profile;
}
export default mongoose.model("Profile", ProfileSchema)