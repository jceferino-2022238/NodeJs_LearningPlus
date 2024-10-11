import { Router } from "express";
import { check } from "express-validator";
import {
    usersPost,
    postEditor,
    getUsers,
    getUserById,
    putUser,
    deleteUser
} from "./user.controller.js";

import { doesEmailExists, existsUserById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validar-campos.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isAdmin, isEditor, isUser } from "../middlewares/validate-role.js";
const router = Router();
router.get("/",
    [
        validateJWT,
    ],
    getUsers
);
router.get("/:id",
    [
        validateJWT,
        isAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsUserById),
        validateFields
    ],
    getUserById
);
router.post("/",
    [
        check("name", "Name is not an optional field").not().isEmpty(),
        check("password", "Password must be longer than 6 characters").isLength({min: 6}),
        check("email", "This is not a valid email").isEmail(),
        check("email").custom(doesEmailExists),
        validateFields
    ],
    usersPost
);
router.post("/postEditor",
    [
        validateJWT,
        isAdmin,
        check("name", "Name is not an optional field").not().isEmpty(),
        check("password", "Password must be longer than 6 characters").isLength({min: 6}),
        check("email", "This is not a valid email").isEmail(),
        check("email").custom(doesEmailExists),
        validateFields
    ],
    postEditor
)
router.put("/:id",
    [
        validateJWT,
        isAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsUserById),
        validateFields
    ],
    putUser,
);
router.delete("/:id",
    [
        validateJWT,
        isAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsUserById),
        validateFields
    ],
    deleteUser,
);
export default router;