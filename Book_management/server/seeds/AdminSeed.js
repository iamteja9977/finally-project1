import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

import "../dbConnect.js";
// import adminModel from "../models/Admin/index.js"

let adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    userverified: {
        type: Boolean,
        default: "admin"
    }
});

let adminModel = new mongoose.model("Admin", adminSchema, "admin");


async function insertAdmins() {
    try {
        let admin = {
            name: "TEJAVATH THIRUPATHI",
            password: "Thiru123@",
            email: "thiru21ssc@gmail.com",
            role: "admin"
        }
        admin.password = await bcrypt.hash(admin.password, 12)
        let adminData = new adminModel(admin);
        await adminData.save();
        console.log("Admin Seeded Successfully")
    } catch (error) {
        console.error(error);
    }
}

insertAdmins();