import { Router } from "express";
import { check } from "express-validator";
import {
    postUserOrAdmin,
    registerOnPage,
    postEditor,
    getUsers,
    getUserById,
    putUser,
    deleteUser,
    putMyUser,
    deleteMyUser,
    putMyPassword
} from "./user.controller.js";

import { doesEmailExists, existsUserById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validar-campos.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isDefaultOrAdminOrEditor ,isDefaultOrAdmin, isAdmin, isEditor, isUser } from "../middlewares/validate-role.js";
const router = Router();
router.get("/",
    [
        validateJWT,
        isDefaultOrAdmin
    ],
    getUsers
);
router.get("/:id",
    [
        validateJWT,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsUserById),
        validateFields
    ],
    getUserById
);
router.post("/",
    [
        check("name", "Name is not and optional field").not().isEmpty(),
        check("password", "Password is not optional").not().isEmpty(),
        check("password", "Password must be longer than 6 characters").isLength({min: 6}),
        check("email", "Email is not optional").not().isEmpty(),
        check("email", "This is not a valid email").isEmail(),
        check("email").custom(doesEmailExists),
        validateFields
    ],
    registerOnPage
)
router.post("/postUserOrAdmin",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("name", "Name is not an optional field").not().isEmpty(),
        check("password", "Password must be longer than 6 characters").isLength({min: 6}),
        check("email", "This is not a valid email").isEmail(),
        check("email").custom(doesEmailExists),
        validateFields
    ],
    postUserOrAdmin
);
router.post("/postEditor",
    [
        validateJWT,
        isDefaultOrAdmin,
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
        isDefaultOrAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsUserById),
        validateFields
    ],
    putUser,
);
router.put("/putMyAccount/:id",
    [
        validateJWT,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsUserById),
        validateFields
    ],
    putMyUser
)
router.put(
    "/putMyPassword/:id",
    [
        validateJWT,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsUserById),
        check("password", "The password isn't optional").not().isEmpty(),
        check("confirmPassword", "You have to confirm the new password").not().isEmpty(),
        validateFields,
    ],
    putMyPassword
);

router.delete("/:id",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsUserById),
        validateFields
    ],
    deleteUser,
);
router.delete("/deleteMyUser/:id",
    [
        validateJWT,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsUserById),
        validateFields
    ],
    deleteMyUser
)
export default router;

