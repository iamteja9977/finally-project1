import mongoose from "mongoose";

// import {Schema} from "mongoose";

let taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    tasks: [
        {
            taskname: {
                type: String,
                required: true
            },
            deadline: {
                type: Date,
                required: true
            },
            reminders: {
                type: [Date],
                required: true,
                // maxlength: 4
            },
            isCompleted: {
                type: Boolean,
                default: false
            }
        }
    ]
})

// const taskModel = new mongoose.model("Tasks", taskSchema, "usertasks")
// export default taskModel;

export default mongoose.model("Tasks", taskSchema, "usertasks");
