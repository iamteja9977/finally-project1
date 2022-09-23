import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../../middleware/auth/verifyToken.js";
import { scheduleJob, scheduledJobs, cancelJob } from "node-schedule";
import fs from "fs/promises";

import { randomString, sendEmail, sendSMS } from "../../utils/index.js";
import userModel from "../../model.js"

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        // let userData=new userModel(req.body)

        const payload = req.payload;
        // console.log(payload);
        if (!payload) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }

        //Check Req.body
      let { task_name, deadline } = req.body;

        if (!task_name || !deadline) {
            return res.status(400).json({ error: "Some Fields are Missing" });
        }

        let utc_deadline = new Date(deadline);
        //Check if format is Right or Not
        //Check if its Backdated or Not

        let present_time = new Date();
        // console.log(present_time);
        // console.log(utc_deadline < present_time);

        if (utc_deadline == "Invalid Date" || (utc_deadline < present_time)) {
            return res.status(400).json({ error: "Invalid Date Entered" });
        }
        // console.log(utc_deadline);

        //Check Validation for 30 mins and 30 Days
        let difference = utc_deadline - present_time;
        

        //Difference in Minutes
        let mins = difference / (1000 * 60)
        // console.log(mins);

        let days = difference / (1000 * 60 * 60 * 24);
        // console.log(days);

        //Not Less than 30 mins and Not more than 30 Days
        if (mins < 1 || days > 30) {
            return res.status(400).json({ error: "Invalid Date Entered, Deadline Should be More than 30 mins and Less than 30 Days" });
        }

        //Get Reminders
        let reminders = [];

        let reminder1 = new Date((+present_time) + (difference / 4));
        // console.log(reminder1);

        let reminder2 = new Date((+present_time) + (difference / 2));
        // console.log(reminder2);

        let reminder3 = new Date((+present_time) + (difference / (4 / 3)));
        // console.log(reminder3);

        reminders.push(reminder1, reminder2, reminder3, utc_deadline);
        // console.log(reminders);

let userFound= await userModel.findOne(payload.user_id)
     
        // console.log(userFound);
        let task_id = randomString(14)
        let task_data = {
            task_id,
            task_name,
            deadline: utc_deadline,
            isCompleted: false,
            reminders
        }


        task_data.reminders.forEach((ele, i) => {
            // console.log(ele);
            scheduleJob(`${task_id}_${i}`, ele, () => {
                sendEmail({
                    subject: "This is a  Reminder",
                    to: userFound.email,
                    html: `<p>Hi ${userFound.firstname}, <br>
                    This is a Reminder - ${i + 1} to Complete your Task ${task_name} <br>
                    <b>CFI Tasky App</b>
                    </p>`
                })
                //Add Logic for Body
                // console.log(`hey ${userFound.firstname}, this is your ${i + 1} reminder for your task : ${task_data.task_name}`);
                console.log(new Date());
            })
            // console.log(i);
        })
        console.log(scheduledJobs);
        console.log(userFound.tasks);
        userFound.tasks.push(task_data);

        
        await userFound.save();
        res.status(200).json({ success: "Task was Added" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.get("/tasks", (req, res) => {
    try {
        res.status(200).json({ "success": "TASK GET is UP" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Interval Server Error" });
    }
})

router.delete("/:task_id", async (req, res) => {
    try {
       
        let task_id = req.params.task_id;
        console.log(task_id);
    
        //Check for Authorisation
        let token = req.headers["auth-token"];
        if (!token) {
          return res.status(401).json({ error: "Unauthorised Access" });
        }
        const payload = jwt.verify(token, "codeforindia");
        // console.log(payload);
        if (!payload) {
          return res.status(401).json({ error: "Unauthorised Access" });
        }
    
   
let userFound= await userModel.findOne(payload.user_id)
        // console.log(userFound);
    
        //Find Index of Given Task
        let taskIndex = userFound.tasks.findIndex((ele) => ele._id == task_id);
        // console.log(taskIndex);
    
        if (taskIndex == -1) {
          return res.status(404).json({ error: "Task Not Found" });
        }
    
        //Delete Element with Given Index from an Array
        userFound.tasks.splice(taskIndex, 1);
        
        await userFound.save();
        res.status(200).json({ "success": "TASK DELETE is UP" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Interval Server Error" });

    }
})

export default router;