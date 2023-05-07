import express from "express";
import {
  forgotPassword,
  loginForm,
  register,
  registerForm,
  confirm,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/login", loginForm);

router.get("/register", registerForm);
router.post("/register", register);
router.get("/confirm/:token", confirm);

router.get("/forgot-password", forgotPassword);

export default router;
