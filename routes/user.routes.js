import express from "express";
import {
  forgotPassword,
  loginForm,
  register,
  registerForm,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/login", loginForm);

router.get("/register", registerForm);
router.post("/register", register);

router.get("/forgot-password", forgotPassword);

export default router;
