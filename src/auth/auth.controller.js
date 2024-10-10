import bcryptjs from "bcryptjs";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) =>{
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user && (await bcryptjs.compare(password, user.password))){
            const token = await generateJWT(user.id);
            res.status(200).json({
                msg: "Everything fine with the login :D",
                userDetails: {
                    id: user.id,
                    nombre: user.name,
                    rol: user.role,
                    token: token
                },
            });
        }
        if(!user){
            return res
                .status(400)
                .send(`Wrong credentials, ${email} doesn't exists in database`)
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).send("Wrong password")
        }
    } catch (e) {
        res.status(500).json({
            msg: "Internal Error, talk to an admin"
        })
    }
}