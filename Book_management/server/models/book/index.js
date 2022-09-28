import mongoose from "mongoose";
let bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Author: {
        type: String,
        required: true,
    },
    coverImagrUrl: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    PageCount: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
});
export default mongoose.model("Book", bookSchema, "book");