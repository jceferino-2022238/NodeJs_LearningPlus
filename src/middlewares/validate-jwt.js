import jwt from "jsonwebtoken"
import User from "../user/user.model.js"

export const validateJWT = async (req, res, next) => {

    let token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        token = token.replace(/^Bearer\s+/, '')
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(decoded.uid);
        if(!user){
            return res.status(401).send('Invalid Token');
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid token, user with false state'
            });
        }
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
}