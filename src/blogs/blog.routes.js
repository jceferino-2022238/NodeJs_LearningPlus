import { Router } from "express";
import { check } from "express-validator";
import { 
    blogPost,
    getBlogs,
    getBlogById,
    putBlog,
    deleteBlog
} from "./blog.controller.js";
import { existsBlogById, doesBlogExists } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validar-campos.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isAdmin, isEditor, isAdminOrEditor, isUser } from "../middlewares/validate-role.js";

const router = Router();
router.get("/",
    [
        validateJWT,
    ],
    getBlogs
),

router.post(
    "/",
    [
        validateJWT,
        isAdmin,
        check("title", "The title isn't optional").not().isEmpty(),
        check("title").custom(doesBlogExists),
        check("body", "The body isn't optional").not().isEmpty(),
        check("image", "The image isn't optional").not().isEmpty(),
        validateFields,
    ],
    blogPost
)

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsBlogById),
        validateFields,
    ],
    getBlogById
)

router.put(
    "/:id",
    [
        validateJWT,
        isAdminOrEditor,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsBlogById),
        validateFields
    ],
    putBlog
)

router.delete(
    "/:id",
    [
        validateJWT,
        isAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").not().isEmpty(),
        validateFields,
    ],
    deleteBlog
)

export default router;