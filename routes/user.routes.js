import express from "express";
import {
  forgetPassword,
  loginForm,
  registerForm,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/login", loginForm);

router.get("/register", registerForm);

router.get("/forget-password", forgetPassword);

export default router;
