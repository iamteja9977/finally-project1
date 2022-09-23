import express from "express";
import {loginValidation,registerValidation,errorMiddleware,} from "../../middleware/validation/index.js";
import fs from "fs/promises";
import bcrypt from "bcrypt";
import config from "config";

import userModel from "../../model.js";

import generateToken from "../../middleware/auth/generateToken.js";
import { randomString, sendEmail, sendSMS } from "../../utils/index.js";
const router = express.Router();

router.post("/signup",registerValidation(),errorMiddleware, async (req, res) => {
  try {
    
      let {email,phone}=req.body;
      //or you can comment previous line ,directly write email:req.body.email and phone:req.body.phone
   
      const mailFound = await userModel.findOne({ email });
    // console.log(mailFound);
    if (mailFound) {
      return res.status(409).json({ error: "email Already registered" });
    }

    const phoneFound = await userModel.findOne({ phone });
    // console.log(phoneFound);
    if (phoneFound) {
      return res.status(409).json({ error: "Phone Already registered" });
    }
   
    req.body.password = await bcrypt.hash(req.body.password, 12);
    let userData = new userModel(req.body);
    console.log(userData);
    await userData.save();
    res.status(200).json({ success: "User Signed Up Succesfully" });
    //   sendSMS({
    //     body: `Thank you for Signing Up. Please click on the given link to verify your phone. ${config.get(
    //       "URL"
    //     )}/api/verify/mobile/${phoneToken}`,
    //     to: phone,
    //   });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);


router.post("/login", loginValidation(), errorMiddleware, async (req, res) => {
  try {
    let login_user=new userModel(req.body)
let {email,password}=req.body;
    let userFound = await userModel.findOne({email});
    if (!userFound) {
      return res.status(401).json({ error: "Invalid Credentials[user not found] " });
    }
  
    let matchPassword = await bcrypt.compare(req.body.password, userFound.password);
    // console.log(matchPassword);
    if (!matchPassword) {
      return res.status(401).json({ error: "Invalid Credentials 'password not match' " });
    }

    let payload = {
      user_id: userFound.user_id,
      role: "user",
    };

  
    //GENERATE A TOKEN
    const token = generateToken(payload);
    // console.log(token);
    res.status(200).json({ success: "Login is Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get("/", (req, res) => {
  try {
    res.status(200).json({ success: "Router GET is UP" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server Error" });
  }
});

export default router;
