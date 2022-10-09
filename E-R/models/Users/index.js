import mongoose from "mongoose";

//This is Main User Schema
const userSchema = new mongoose.Schema({
    usertype: {
        type: String,
        default: "user" //This assigns default value user
    },
    firstname: {
        type: String,
        maxlength: 25,
        minlength: 2,
        required: true
    },
    lastname: {
        type: String,
        maxlength: 25,
        minlength: 2,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        maxlength: 500
    },
    userverified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        }
    },
    userverifytoken: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    // passwordresettoken: {
    //     type: String,
    //     default: null
    // },
    isSuspended: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Users", userSchema, "users");