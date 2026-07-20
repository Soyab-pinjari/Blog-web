const cors = require('cors');
require('dotenv').config();
const express = require('express');
const connection = require('./Config/db');
const app = express();
const path = require('path')
const blogRoute = require('./Routes/blogRoute');
const userRoutes = require('./Routes/userRoute');
app.use(cors());
connection();  // Database connection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use('/user',userRoutes);
app.use('/blog',blogRoute);

app.listen(3000,(req,res)=>{
    console.log(`server running on http://localhost:3000`);
})


//  "username":"admin",
//     "email":"admin@gmail.com",
//     "password":"admin123"