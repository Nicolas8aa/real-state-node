const loginForm = (req, res) => {
  res.render("auth/login", { user: "json" });
};

const registerForm = (req, res) => {
  res.render("auth/register", { user: "json" });
};

export { loginForm, registerForm };
