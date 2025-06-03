require("dotenv").config();

const express= require("express");
const cors =require("cors")
const path = require("path")
const connectDB =require("./config/db.js");

const app= express();


app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
const authRoutes=require("./routes/authRoutes.js")
app.use("/api/v1/auth",authRoutes)
const pollRoutes = require("./routes/pollRoutes.js")
app.use("/api/v1/poll",pollRoutes)


app.use("/uploads",express.static(path.join(__dirname,"uploads")))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});



 