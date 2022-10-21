import { Router } from 'express';
import bcrypt from 'bcrypt';
import config from "config"
import jwt from "jsonwebtoken";
import {
	errorMiddleware,
	loginValidation,
	registerValidation,
} from '../../middleware/validation/index.js';

import { randomString, sendEmail, sendSMS } from '../../utils/index.js';
import generateToken from '../../middleware/auth/generateToken.js'

import userModel from '../../models/Users/index.js';
import taskModel from '../../models/Tasks/index.js';

const router = Router();


router.get('/', ( _ , res) => {
	res.send(200).json({ status: 'api Route is UP' });
});

/*
METHOD: POST
API Endpoint: /api/signup
BODY:

firstname:
lastname
phone
email
password
password2
address
*/

router.post(
	'/signup',
	registerValidation(),
	errorMiddleware,
	async (req, res) => {
		try {

			let { firstname, lastname, email, password, password2, address, phone } = req.body;

		
      let emailFound = await userModel.findOne({"email":email});
      console.log(emailFound);

			if (emailFound) {
				return res
					.status(409)
					.json({ error: 'User Email Already Registered. Please Login' });
			}

			//if phone number already exist in db
	let phoneFound = await userModel.findOne({"phone":phone});
      // console.log(phoneFound,"on line 81")
			if (phoneFound) {
				return res
					.status(409)
					.json({ error: 'User Phone Already Registered. Please Login.' });
			}

			//Hashing the password
			password = await bcrypt.hash(password, 12); //applying 12 rounds of salt

			//making our own object to store in db
			let userData = { firstname, lastname, email, password, address, phone };

	
			let phoneToken = randomString(20);
			let emailToken = randomString(20);

			userData.userverifytoken = {
               "phone": phoneToken,
				"email": emailToken,
			};

      const users= new userModel(userData);
			//pushing our userData object to empty filedata
			// fileData.push(userData);

			//writing the fileData to db
			// await fs.writeFile('data.json', JSON.stringify(fileData));

      await users.save();

      // const payments = new Payment();
      //   payments.user = booking_data._id;
      //   payments.save();

      const task_Data = new taskModel();

      task_Data.user = users._id;

      task_Data.save();


			res.status(200).json({success:"User Successfully Registered"});
			// console.log("hello")

			//TODO: Add SMS and EMAIL Verification calls

			// sendSMS({
			// body: `Thank you for Signing Up. Please click on the given link to verify your phone. ${config.get("URL")}/api/verify/mobile/${phoneToken}`,
			// to: phone
			// })

		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server error' });
		}
	}
);



/*
METHOD: POST
API Endpoint: /api/login
BODY:

email
password
*/
router.post('/login', loginValidation(), errorMiddleware, async (req, res) => {
	try {
		//destructuring from body
		let { email, password } = req.body;

		let userFound = await userModel.findOne({"email":email});
    // console.log(userFound);

		if (!userFound) {
			return res.status(401).json({ error: 'Invalid Credentials ' });
		}

		//checking hashed password matching with entered password
		let matchPassword = await bcrypt.compare(password, userFound.password);

		if (!matchPassword) {
			return res.status(401).json({ error: 'Invalid Credentials ' });
		}

		//GENERATE A JWT TOKEN
		let payload = {
			user_id: userFound._id,
			role: 'user',
		};

		//using auth middleware
		const token=generateToken(payload);

		//passing token in response
		res.status(200).json({ success: 'Login is Successful', token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});


/*
End Point : /api/auth
Method GET
Access : Public
Description : Authorise the User
*/

router.get("/auth", async (req, res) => {
    try {
        let token = req.headers["auth-token"];
        if (!token) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        let privatekey = config.get("PRIVATE_KEY");
        let payload = jwt.verify(token, privatekey);
        res.status(200).json({ success: "Authentication Successful", payload });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorised Access" });
    }
})



/*
METHOD : GET
PUBLIC
API Endpoint : /api/verify/mobile/:phonetoken

*/
router.get('/verify/mobile/:phonetoken', async (req, res) => {
	try {
		let phoneToken = req.params.phonetoken;
		console.log(phoneToken);

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

export default router;
