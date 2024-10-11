import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import { defaultAdmin } from "../src/user/user.controller.js";
import userRoutes from "../src/user/user.routes.js";
import authRoutes from "../src/auth/auth.routes.js"
import courseRoutes from "../src/courses/course.routes.js";
import profileRoutes from "../src/profiles/profile.routes.js"
import blogRoutes from "../src/blogs/blog.routes.js"
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = "/learningPlus/v1/users";
        this.authPath = "/learningPlus/v1/auth";
        this.coursePath = "/learningPlus/v1/course";
        this.profilePath = "/learningPlus/v1/profile";
        this.blogPath = "/learningPlus/v1/blog"

        this.middlewares();
        this.conectarDB();
        this.routes();

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
        await defaultAdmin();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan("dev"))
    }

    routes(){
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.coursePath, courseRoutes);
        this.app.use(this.profilePath, profileRoutes);
        this.app.use(this.blogPath, blogRoutes)
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log("Server running on port", this.port)
        })
    }
}

export default Server;
