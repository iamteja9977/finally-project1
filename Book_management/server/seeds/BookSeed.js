import mongoose from "mongoose";
import config from "config";

import "../dbConnect.js";

import Books from "../seeds/books.js";

import BookSchema from "../models/Book/index.js";

async function bookSeed(){
    try {
        await BookSchema.insertMany(Books);
        console.log("Books seeded successfully");
    } catch (error) {
        console.error(error);
    }
}
bookSeed();