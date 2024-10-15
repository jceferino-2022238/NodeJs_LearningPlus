import { Router } from "express";
import { check } from "express-validator";
import { 
    coursePost,
    getCourses,
    getCourseById,
    putCourse,
    deleteCourse
} from "./course.controller.js";
import { existsCourseById, doesCourseExists} from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validar-campos.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isDefaultOrAdmin, isAdmin, isEditor, isUser, isAdminOrEditor } from "../middlewares/validate-role.js";

const router = Router();

router.get("/",
    [
        validateJWT,
    ],
    getCourses  
);

router.post(
    "/",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("title", "The title isn't optional").not().isEmpty(),
        check("title").custom(doesCourseExists),
        check("body", "The body isn't optional").not().isEmpty(),
        check("image", "The image isn't optional").not().isEmpty(),
        validateFields,
    ],
    coursePost
)
router.get(
    "/:id",
    [
        validateJWT,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsCourseById),
        validateFields,
    ],
    getCourseById
)
router.put(
    "/:id",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsCourseById),
        validateFields,
    ],
    putCourse
)
router.delete(
    "/:id",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").not().isEmpty(),
        validateFields,
    ],
    deleteCourse
)
export default router;