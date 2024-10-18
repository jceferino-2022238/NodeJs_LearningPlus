import { Router } from "express";
import { check } from "express-validator";
import { postContact } from "./contact.controller.js";

import { doesEmailExists } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validar-campos.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

import { isDefaultOrAdmin, isAdmin, isAdminOrEditor, isUser } from "../middlewares/validate-role.js";

const router = Router();
router.post("/",
    [
        validateJWT,
        check("email", "The destiny email isn't optional").not().isEmpty(),
        check("subject", "The subject of the email isn't optional").not().isEmpty(),
        check("message", "The message of the email isn't optional").not().isEmpty(),
        validateFields
    ],
    postContact
)

export default router;