import express from "express";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken"
import randomString from "../../utils/randomString.js";
//IMPORT Models
import Users from "../../models/Users/index.js";
import Admin from "../../models/Admin/index.js";
import Book from "../../models/Book/index.js";
//IMport Validations
import { userRegisterValidatorRules, userLoginValidatorRules, errorMiddleware } from "../../middlewares/validation/index.js";
const router = express.Router();
/*
End Point : /api/login
Method POST
Access : Public
Validation :
        Email address is required field
        Password is not Empty
        Description: User Signup
*/
router.post("/login", userLoginValidatorRules(), errorMiddleware, async (req, res) => {
    try {
        let { email, password } = req.body;
        let userFound = await Admin.findOne({ email });
        if (!userFound) {
            userFound = await Users.findOne({ email });
            if (!userFound)
                return res.status(401).json({ "error": "Invalid Credentials" });
        }
        let matchPassword = await bcrypt.compare(password, userFound.password)
        if (!matchPassword) {
            return res.status(401).json({ "error": "Invalid Credentials" })
        }
        if (!userFound.userverified) {
            return res.status(401).json({ "error": "User Email is Not Verified. Please Verify" })
        }
        let payload = {
            _id: userFound._id,
            role: userFound.role
        }
        let privatekey = config.get("PRIVATE_KEY");
        //GENERATE A TOKEN
        const token = jwt.sign(payload, privatekey, { expiresIn: "1d" });
        res.status(200).json({
            "success": "User Logged In Successfully",
            token,
            role: userFound.role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error" })
    }
})
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
End Point : /api/books
Method GET
Access : Public
Description : GET ALL BOOKS
*/
router.get("/books", async (req, res) => {
    try {
        let booksData = await Book.find({});
        setTimeout(() => {
            res.status(200).json({ success: "Fetched Books Successfully", booksData });
        }, 5000);
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorised Access" });
    }
})
export default router;