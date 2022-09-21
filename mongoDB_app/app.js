import express from "express";
const app=express()
const port=5000;
import "./DBconnect.js";

app.get("/", (req,res)=>{
    res.send("server is UP")
})
app.listen(port, (req,res)=>{
    console.log("server started at port", port);
})