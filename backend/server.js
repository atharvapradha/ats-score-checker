const express=require("express");
const cors=require("cors");
require("dotenv").config();
const app=express();
const resumeRoutes = require("./routes/resumeRoutes");
app.use("/api/resume", resumeRoutes);
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=> {
    res.send("ATS Checker Backend Running");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,() => {
 console.log('Server is Running on Port ${PORT}');
});