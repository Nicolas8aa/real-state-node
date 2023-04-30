import "dotenv/config.js";
import express from "express";

import userRoutes from "./routes/user.routes.js";
import dbConfig from "./config/db.js";

const app = express();

// connect to database
try {
  await dbConfig.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.set("view engine", "pug");
app.set("views", "./views");

// Public folder
app.use(express.static("public"));

app.use("/auth", userRoutes);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
