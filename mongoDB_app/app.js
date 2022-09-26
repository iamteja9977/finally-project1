import express from "express";
const app=express()
const port=5000;

import "./DBconnect.js";
import hotelModel from "./models/Hotels.js"
import Payment from "./models/Payment.js"

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

        let {email}=req.body;
        const userdata= await hotelModel.findOne({email});
        console.log(userdata);
        if (userdata){
            return res.status(409).json({error:"Already registered"})
        }

        await booking_data.save();
        // console.log(booking_data);
        res.status(200).json({ "success": "Route is Working" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error" })
    }
})



app.post("/:user_id", async (req, res) => {
    try {
        let user_id = req.params.user_id;
        // console.log(req.params);
        const paymentData = await Payment.findOne({ user: user_id }).populate("user");
        console.log(paymentData);


        // paymentData.payments.push({
        //     "payment_medium": "credit_card",
        //     "payment_date": new Date("Mon Sep 26 2022 09:41:37 GMT+0530"),
        //     "isSuccessful": true
        // });
        // console.log(paymentData.payments[0].payment_date);
        // paymentData.save();

        res.status(200).json({ "success": "Route is Working" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error" })
    }
})


app.post("/:user_id/:payment_id", async (req, res) => {
    try {

        // let user_id = req.params.user_id;
        let payment_id = req.params.payment_id;

        const filter = { _id: payment_id };

        const update = { isSuccessful: false };

        let paymentModified = await Payment.findOneAndUpdate(filter, update);

        paymentModified.save();
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