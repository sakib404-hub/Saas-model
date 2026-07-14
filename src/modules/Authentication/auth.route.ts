import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/profile', auth(UserRole.USER, UserRole.ADMIN), authController.getProfile)

export const authRouter = router;