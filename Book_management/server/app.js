import express from "express";
import  config from "config";

import "./dbConnect.js"

const port = config.get("PORT");
const app=express();


app.get("/", (req,res)=>{
    res.send("Hello world from Book_management")
})
app.listen(port, () => {
    console.log("Server Started at Port : ", port);
})
