import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox.0vhyxil.mongodb.net/tasky_09");
    console.log("Mongo DB is Connected");
  } catch (error) {
    console.log(error);
  }
}

connectDB();
