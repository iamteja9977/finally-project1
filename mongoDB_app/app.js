import express from "express";
const app=express()
const port=5000;

import "./DBconnect.js";
import hotelModel from "./modal/Hotels.js"

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("server is UP")
})
/****************************** */
//Booking Route
app.post("/booking",async (req, res) => {
    try {
        // console.log(req.body);
        let booking_data = new hotelModel(req.body);

        

        await booking_data.save();
        // console.log(booking_data);
        res.status(200).json({ "success": "Route is Working" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error" })
    }
})


/***************************** */
app.listen(port, (req,res)=>{
    console.log("server started at port", port);
})