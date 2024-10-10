import { Router } from "express";
import { check } from "express-validator";

import { login } from "./auth.controller.js";
import { validateFields } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/login",
    [
        check("email", "The email isn't optional").not().isEmpty(),
        check("email", "Email is not valid").isEmail(),
        check("password", "Password isn't optional").not().isEmpty(),
        validateFields
    ],
    login
)

export default router;