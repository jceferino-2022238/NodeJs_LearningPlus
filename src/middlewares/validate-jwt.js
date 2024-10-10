import jwt from "jsonwebtoken"
import User from "../user/user.model.js"

export const validateJWT = async(req, res, next) =>{
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            msg: "There is now token in the petition",
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if(!user){
            return res.status(401).json({
                msg:"User not found in the database"
            })
        }
        if(!user.state){
            return res.status(401).json({
                msg:"No validate Token - user with state: false"
            })
        }
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "No validate Token",
        });
    }
}