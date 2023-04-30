const loginForm = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

const registerForm = (req, res) => {
  res.render("auth/register", { title: "Register" });
};
const forgetPassword = (req, res) => {
  res.render("auth/forget-password", { title: "Recover your access" });
};

export { loginForm, registerForm, forgetPassword };
