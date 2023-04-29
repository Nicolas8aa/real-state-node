import express from "express";

import userRoutes from "./routes/user.routes.js";

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

// Public folder
app.use(express.static("public"));

app.use("/auth", userRoutes);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
