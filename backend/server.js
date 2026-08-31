const cors = require("cors");
require("dotenv").config();

const express = require("express");
const connection = require("./Config/db");
const app = express();
const path = require("path");

const blogRoute = require("./Routes/blogRoute");
const userRoutes = require("./Routes/userRoute");
const categoryRoutes = require("./Routes/categoryRoutes");

app.use(
    cors({
        origin: "https://blog-web-eta-nine.vercel.app",
    })
);

connection();
app.use((req, res, next) => {
  console.log("🔥 REQUEST RECEIVED");
  console.log(req.method, req.originalUrl);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

app.use("/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/blog", blogRoute);


app.get("/", (req, res) => {
    res.send("Backend is running successfully");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//  "username":"admin",
//     "email":"admin@gmail.com",
//     "password":"admin123"