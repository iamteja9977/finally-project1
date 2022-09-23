import mongoose from "mongoose";
async function connectDB (){
    try {
        await mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox.0vhyxil.mongodb.net/booking_rooms")
   console.log("mongo DB is connected")
    } catch (error) {
        console.log(error)
    }
}
connectDB();
// export default connectDB;