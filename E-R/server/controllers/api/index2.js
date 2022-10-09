import express from "express";
import {loginValidation,registerValidation,errorMiddleware,} from "../../middleware/validation/index.js";
import fs from "fs/promises";
import bcrypt from "bcrypt";
import config from "config";

import userModel from "../../models/Users/index.js";
import taskModel from "../../models/Tasks/index.js"

import generateToken from "../../middleware/auth/generateToken.js";
import { randomString, sendEmail, sendSMS } from "../../utils/index.js";
const router = express.Router();

router.post("/signup",registerValidation(),errorMiddleware, async (req, res) => {
  try {
    
      let {firstname, lastname, email, password, password2, address, phone}=req.body;
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
   
    password = await bcrypt.hash(password, 12);
    	//making our own object to store in db
			let userData = { firstname, lastname, email, password, address, phone };

			//mongodb data
			//add user_id to our userData object and tasks array
			// userData.user_id = randomString(16);

			userData.tasks = [];

			// userData.userVerified = {
			// 	phone: false,
			// 	email: false,
			// };

			let phoneToken = randomString(20);
			let emailToken = randomString(20);

			userData.userverifytoken = {
        "phone": phoneToken,
				"email": emailToken,
			};

      let user_Data = new userModel(req.body);

    console.log(userData);
    await user_Data.save();

          // const payments = new Payment();
      //   payments.user = booking_data._id;
      //   payments.save();

      const task_Data = new taskModel();

      task_Data.user = user_Data._id.toString();

      task_Data.save();
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
    // let login_user=new userModel(req.body)
let {email,password}=req.body;
    let userFound = await userModel.findOne({email});
    if (!userFound) {
      return res.status(401).json({ error: "Invalid Credentials[user not found] " });
    }
  
    let matchPassword = await bcrypt.compare(password, userFound.password);
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
//*********************************************** */

/*
METHOD : GET
PUBLIC
API Endpoint : /api/verify/mobile/:phonetoken

*/
router.get('/verify/mobile/:phonetoken', async (req, res) => {
	try {
		let phoneToken = req.params.phonetoken;
		console.log(phoneToken);

		// let fileData = await fs.readFile('data.json');
		// fileData = JSON.parse(fileData);

		let userFound = await userModel.findOne({"userverifytoken.phone":phoneToken});

		console.log(userFound);

		if (userFound.userverified.phone == true) {
			return res.status(200).json({ success: 'Phone already Verified' });
		}
		userFound.userverified.phone = true;

		// await fs.writeFile('data.json', JSON.stringify(fileData));
    // const user_Data = new userModel(userFound);
  
    // await userFound.updateOne({"userFound.isVerified.phone":true});

    userFound.save();

		res.status(200).json({ success: 'Phone is Verified' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});


/*
METHOD : GET
PUBLIC
API Endpoint : /api/verify/email/:emailtoken

*/
router.get('/verify/email/:emailtoken', async (req, res) => {
	try {
		let emailToken = req.params.emailtoken;
		console.log(emailToken);

		// let fileData = await fs.readFile('data.json');
		// fileData = JSON.parse(fileData);

		let userFound = await userModel.findOne({"userverifytoken.email":emailToken});

		console.log(userFound);

		if (userFound.userverified.email == true) {
			return res.status(200).json({ success: 'Email already Verified' });
		}
		userFound.userverified.email = true;

		// await fs.writeFile('data.json', JSON.stringify(fileData));
    // const user_Data = new userModel(userFound);
  
    // await userFound.updateOne({"userFound.isVerified.phone":true});

    userFound.save();

		res.status(200).json({ success: 'Email is Verified' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// *********************************************
router.get("/", (req, res) => {
  try {
    res.status(200).json({ success: "Router GET is UP" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server Error" });
  }
});

export default router;
