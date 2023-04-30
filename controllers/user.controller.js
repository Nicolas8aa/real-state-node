const loginForm = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

const registerForm = (req, res) => {
  res.render("auth/register", { title: "Register" });
};
const forgotPassword = (req, res) => {
  res.render("auth/forgot-password", { title: "Recover your access" });
};

export { loginForm, registerForm, forgotPassword };
