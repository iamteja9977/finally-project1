import express from "express";
import { loginValidation, registerValidation, errorMiddleware } from "../../middleware/validation/index.js"
import fs from "fs/promises";
import bcrypt from "bcrypt";
import config from "config";


import generateToken from "../../middleware/auth/generateToken.js";
import { randomString, sendEmail, sendSMS } from "../../utils/index.js"
const router = express.Router();


// router.use((req, res, next) => {
//     try {
//         console.log("HELLO WORLD FROM NEXT");
//         req.payload="HI QASIM";
//         req.adnan="HI ADNAN";
//         // res.status(200).json({ success: "Next Middleware" })
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error " })
//     }
// })

/*
METHOD : POST


PUBLIC
API Endpoint : /api/login
Body : 

email
password 
*/

router.post("/login", loginValidation(), errorMiddleware, async (req, res) => {
    try {
        let { email, password } = req.body;
        // if (!email || !password) {
        //     return res.status(400).json({ "error": "Some Fields Are Missing " });
        // }

        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);

        let userFound = fileData.find((ele) => ele.email == email)
        if (!userFound) {
            return res.status(401).json({ "error": "Invalid Credentials " });
        }
        // console.log(userFound);
        let matchPassword = await bcrypt.compare(password, userFound.password)
        // console.log(matchPassword);
        if (!matchPassword) {
            return res.status(401).json({ "error": "Invalid Credentials " });
        }

        let payload = {
            user_id: userFound.user_id,
            role: "user"
        }

        // let privatekey = "codeforindia";    

        //GENERATE A TOKEN
        const token = generateToken(payload);
        // console.log(token);

        res.status(200).json({ success: "Login is Successful", token })


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.post("/signup", registerValidation(), errorMiddleware, async (req, res) => {
    try {
        // console.log(req.body);
        let { firstname, lastname, email, password, password2, address, phone } = req.body;
        // // let body = req.body;

        // //Basic Validations
        // if (!email || !firstname || !lastname || !phone || !address || !password || !password2) {
        //     return res.status(400).json({ "error": "Some Fields Are Missing " });
        // }
        // if (password !== password2) {
        //     return res.status(400).json({ "error": "Passwords are Not Same" });
        // }
        //Check Duplication of Email & Mobile
        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);
        //
        // console.log(fileData);
        // console.log(email);

        let emailFound = fileData.find((ele) => ele.email == email)
        // console.log(emailFound);
        if (emailFound) {
            return res.status(409).json({ error: "User Email Already Registered. Please Login" });
        }

        let phoneFound = fileData.find((ele) => ele.phone == phone)
        if (phoneFound) {
            return res.status(409).json({ error: "User Phone Already Registered. Please Login." })
        }

        // fileData.forEach((ele) => {
        //     console.log(ele.email);
        // })

        password = await bcrypt.hash(password, 12);

        //Generate a 12 Digit Random String for user_id

        let user_id = randomString(16);
        // console.log(user_id);
        let userData = { user_id, firstname, lastname, email, password, address, phone };
        userData.tasks = []
        userData.isVerified = {
            phone: false,
            email: false
        }
        let phoneToken = randomString(20);
        let emailToken = randomString(20);
        userData.verifyToken = {
            phoneToken,
            emailToken
        }

        // userData.firstname = firstname;
        // console.log(userData)
        fileData.push(userData);
        await fs.writeFile("data.json", JSON.stringify(fileData));
        res.status(200).json({ success: "User Signed Up Succesfully" });
        sendSMS({
            body: `Thank you for Signing Up. Please click on the given link to verify your phone. ${config.get("URL")}/api/verify/mobile/${phoneToken}`,
            to: phone
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.get("/", (req, res) => {
    try {
        res.status(200).json({ "success": "Router GET is UP" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Interval Server Error" });

    }
})


export default router;