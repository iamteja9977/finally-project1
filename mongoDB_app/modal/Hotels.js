import mongoose from "mongoose";
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
    user : {
        firstname : {
            type: String,
            required: true,
            maxlength: 25,
            minlength: 2
        },
        lastname : {
            type: String,
            required: true,
            maxlength: 25,
            minlength: 2
        },
        address : {
            type: String,
            required: true,
            maxlength: 300,
            minlength: 2
        },
        zipcode : {
            type: String,
            required: true
        },
        city : {
            type: String,
            required: true
        },
        state : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true,
            unique : true
        },
        phone : {
            type: String,
            required: true,
            unique : true
        }
    },
    hotel : {
            checkindate : {
            type: String,
            required: true
        },
            checkoutdate : {
            type: String,
            required: true
        },
            checkintime : {
            type: String,
            required: true
        },
            checkouttime : {
            type: String,
            required: true
        },
            noOfAdults : {
            type: Number,
            max : 5,
            min : 1
        },
            noOfChildren : {
            type: Number,
            max : 5,
            min : 1
        },
            noOfRooms : {
            type: Number,
            max : 5,
            min : 1
        },
            roomtype : {
            type : []
        },
            specialInstructions : {
            type : String,
            maxlength : 250
        }
    },
    typeofbooking:{
        type:String,
        default:"online"
    }
})
const hotelModel = new mongoose.model("Hotel", hotelSchema, "hotel_booking");
export default hotelModel;









