import { Router } from "express";
import { check } from "express-validator";
import { 
    profilePost,
    getProfiles,
    getProfileById,
    putProfile,
    deleteProfile,
    publishProfile,
    unpublishProfile
 } from "./profile.controller.js";
 import { existsProfileById, doesProfileExists } from "../helpers/db-validators.js";
 import { validateFields } from "../middlewares/validar-campos.js";
 import { validateJWT } from "../middlewares/validate-jwt.js";
 import { isDefaultOrAdmin ,isAdmin, isAdminOrEditor, isEditor, isUser } from "../middlewares/validate-role.js";

 const router = Router();

 router.get("/",
    [
        validateJWT
    ],
    getProfiles
 )
 router.get("/:id",
    [
        validateJWT,
        check("id", "Not a valid ID").isMongoId(),
        check("id").not().isEmpty(),
        validateFields,
    ],
    getProfileById
 )
 router.post("/",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("title", "The title isn't optional").not().isEmpty(),
        check("title").custom(doesProfileExists),
        check("body", "The body isn't optional").not().isEmpty(),
        validateFields,
    ],
    profilePost
 )
 router.put("/:id",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsProfileById),
        validateFields,
    ],
    putProfile
 )
 router.put("/unpublishProfile/:id",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsProfileById),
        validateFields
    ],
    unpublishProfile
 )
 router.put("/publishProfile/:id",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existsProfileById),
        validateFields
    ],
    publishProfile
 )
 router.delete("/:id",
    [
        validateJWT,
        isDefaultOrAdmin,
        check("id", "Not a valid ID").isMongoId(),
        check("id").not().isEmpty(),
        validateFields,
    ],
    deleteProfile
 )

 export default router; 