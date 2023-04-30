import express from "express";
import {
  forgotPassword,
  loginForm,
  registerForm,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/login", loginForm);

router.get("/register", registerForm);

router.get("/forgot-password", forgotPassword);

export default router;
