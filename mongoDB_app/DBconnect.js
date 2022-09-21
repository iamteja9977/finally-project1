import mongoose from "mongoose";
async function connectDB (){
    try {
        await mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox.0vhyxil.mongodb.net/test?authSource=admin&replicaSet=atlas-ubhfuj-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
   console.log("mongo DB is connected")
    } catch (error) {
        console.log(error)
    }
}
// connectDB();
export default connectDB;