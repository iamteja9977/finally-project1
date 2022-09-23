import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tasks = new Schema({
  task_name: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  reminders: {
    type: [Date],
  },
});


const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 2,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tasks: {
    type: [tasks],
  },
});

const userModel = new mongoose.model("User", userSchema, "users");
export default userModel;
