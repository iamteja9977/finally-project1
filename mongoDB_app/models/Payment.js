import mongoose from "mongoose";

// import {Schema} from "mongoose";

let paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    },
    payments: [
        {
            payment_medium: {
                type: String,
                required: true
            },
            payment_date: {
                type: String,
                required: true
            },
            isSuccessful: {
                type: Boolean,
                default: false
            }
        }
    ]
})

// const taskModel = new mongoose.model("Tasks", paymentSchema, "usertasks")
// export default taskModel;

export default mongoose.model("Payments", paymentSchema, "payments");