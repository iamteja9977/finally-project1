import mongoose from "mongoose";
let bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    pageCount: {
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