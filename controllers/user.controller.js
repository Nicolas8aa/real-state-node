import { check, validationResult } from "express-validator";

import User from "../models/User.js";

const loginForm = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

const registerForm = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

const register = async (req, res) => {
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
    token: "123456",
  });

  res.json(user);
};

const forgotPassword = (req, res) => {
  res.render("auth/forgot-password", { title: "Recover your access" });
};

export { loginForm, registerForm, forgotPassword, register };
