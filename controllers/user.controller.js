import { check, validationResult } from "express-validator";

import User from "../models/User.js";
import { generateId } from "../helpers/tokens.js";
import { registerEmail } from "../helpers/email.js";

export const loginForm = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

export const registerForm = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

export const register = async (req, res) => {
  await check("name", "Name is required").notEmpty().run(req);
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password must be at least 6 characters")
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage("Password is required")
    .run(req);
  await check("password-confirm", "Passwords do not match")
    .equals(req.body.password)
    .run(req);

  let result = validationResult(req);

  const { name, email, password } = req.body;
  if (!result.isEmpty()) {
    return res.render("auth/register", {
      title: "Register",
      errors: result.array(),
      user: {
        name,
        email,
      },
    });
  }

  // validate if user already exists
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.render("auth/register", {
      title: "Register",
      errors: [{ msg: "User already exists" }],
      user: {
        name,
        email,
      },
    });
  }

  // const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    token: generateId(),
  });

  // ? send email to user
  await registerEmail({
    name: user.name,
    email: user.email,
    token: user.token,
  });

  return res.render("templates/message", {
    title: "Register success",
    message: "Please check your email to confirm your account",
  });
};

export const confirm = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ where: { token } });

  if (!user)
    return res.render("templates/message", {
      title: "Error confirming account",
      error: true,
      message: "Sorry, this account does not exist",
    });

  user.confirmed = true;
  user.token = null;
  await user.save();
  return res.render("templates/message", {
    title: "Account confirmed",
    message: "Your account has been confirmed",
  });
};

export const forgotPassword = (req, res) => {
  res.render("auth/forgot-password", { title: "Recover your access" });
};
