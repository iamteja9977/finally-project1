import   express  from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../../middleware/auth/verifyToken.js";
import { scheduleJob, scheduledJobs, cancelJob } from "node-schedule";

import { randomString, sendEmail, sendSMS } from "../../utils/index.js";

import userModel from "../../model.js"
import taskModel from "../../models/Tasks/index.js"


const router = express.Router();

/*
METHOD: POST
API Endpoint: /api/task
PRIVATE
BODY:
task_name
deadline
*/

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

let userFound= await userModel.findOne({_id: payload.user_id})
     
        // console.log(userFound);
        // let task_id = randomString(14)//no need of it becoz by default it gives us _id
        let task_data = {
            // task_id,
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
        //creating own object to store into DB
        const user_Data = await taskModel.findOne({ user: userFound._id.toString()}).populate("user");

         user_Data.tasks.push(task_data);

        await user_Data.save();
        res.status(200).json({ success: "Task was Added" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

//****************************** */

/*
METHOD: GET
API Endpoint: /api/tasks
BODY: none
PRIVATE
*/

router.get("/tasks", authMiddleware, async (req, res) => {
    try {

      const payload = req.payload;
      if (!payload) {
        return res.status(401).json({ error: "Unauthorised Access" });
      }
  
      let userFound = await userModel.findOne({ _id: payload.user_id });
      console.log(userFound);
  
      const user_Data = await taskModel.findOne({ user: userFound._id.toString()}).populate("user");
  
      res.status(200).json({ data: user_Data.tasks });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


/*
Fetch Specific Task
METHOD: GET
API Endpoint: /api/task/:task_id
PRIVATE
*/

router.get("/:task_id", authMiddleware, async (req, res) => {
    try {
      let task_id = req.params.task_id;
      
      const payload = req.payload;
  
      if (!payload) {
        return res.status(401).json({ error: "Unauthorised Access" });
      }

      let userFound = await userModel.findOne({ _id: payload.user_id });

      let task = await taskModel.findOne( { user: userFound._id.toString() },{ "tasks":{"$elemMatch":{_id: task_id.toString()} }});
       
    //   console.log("Task Variable",task)
    // task.tasks.length == 0
      if (task==-1) {
        return res.status(404).json({ error: "Task Not Found" });
      }
  
      res.status(200).json({ data: task });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
// ******************************/


router.delete("/:task_id", async (req, res) => {
    try {
       
        let task_id = req.params.task_id;
        // console.log(task_id);
    
        // //Check for Authorisation
        // let token = req.headers["auth-token"];
        // if (!token) {
        //   return res.status(401).json({ error: "Unauthorised Access" });
        // }
        // const payload = jwt.verify(token, "codeforindia");
        // // console.log(payload);
        if (!payload) {
          return res.status(401).json({ error: "Unauthorised Access" });
        }
    
   
let userFound= await userModel.findOne({ _id: payload.user_id })
        // console.log(userFound);
        let task = await taskModel.findOne( { user: userFound._id.toString() },{ "tasks":{"$elemMatch":{_id: task_id.toString()} }});

        if (task == -1) {
          return res.status(404).json({ error: "Task Not Found" });
        }
    
        await taskModel.updateMany( { user: userFound._id.toString() },{"$pull": {"tasks":{"_id": task_id.toString()}}});

        res.status(200).json({ "success": "TASK DELETE is UP" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Interval Server Error" });

    }
})

//********************** */

/*

METHOD: PUT
API Endpoint: /api/task/:task_id
PRIVATE

res: "reminder has been edited"
*/

router.put("/:task_id", authMiddleware, async (req, res) => {
    try {
  
  
  
  
      let task_id = req.params.task_id;
     
      const payload = req.payload;
      //checking the token is valid or not
      if (!payload) {
        return res.status(401).json({ error: "Unauthorised Access" });
      }
  
      //getting task_name, and deadline, isCompleted from body
      let { task_name, deadline, isCompleted } = req.body;
  
      //Check if taskname and deadline is empty
      if (!task_name || !deadline || !isCompleted) {
        return res.status(400).json({ error: "Some Fields are Missing" });
      }
  
      // converting ---> utc deadline
      let utc_deadline = new Date(deadline);
      // console.log(utc_deadline);
  
      //if date is in correct format AND date entered is already been passed
      let present_time = new Date(); //utc format
  
      if (utc_deadline == "Invalid Date" || utc_deadline < present_time) {
        return res.status(400).json({ error: "Invalid Data Entered" });
      }
  
      //Check Validation for 30 mins and 30 Days
  
      //will be getting diff in present time and deadline in milliseconds
      let difference = utc_deadline - present_time;
  
      //Difference --> Minutes
      let mins = difference / (1000 * 60);
      // console.log(mins);
  
      //Difference --> Days
      let days = difference / (1000 * 60 * 60 * 24);
      // console.log(days);
  
      //Not Less than 30 mins and Not more than 30 Days
      if (mins < 0 || days > 30) {
        return res.status(400).json({
          error:
            "Invalid Date Entered, Deadline Should be More than 30 mins and Less than 30 Days",
        });
      }
  
      let reminders = [];
  
      let reminder1 = new Date(+present_time + difference / 4);
      // console.log(reminder1);
  
      let reminder2 = new Date(+present_time + difference / 2);
      // console.log(reminder2);
  
      let reminder3 = new Date(+present_time + difference / (4 / 3));
      // console.log(reminder3);
  
      //populating reminders array
      reminders.push(reminder1, reminder2, reminder3, utc_deadline);
      // console.log(reminders);
  
      //--------------------------
      let userFound = await userModel.findOne({ _id: payload.user_id });
  
      //--------------------------
      //creating task_data object to push in tasks array
      let task_data = {
        task_id,
        task_name,
        deadline: utc_deadline,
        isCompleted,
        reminders,
      };
  
      //TODO: Add Reschedule Mail and SMS Logic if isCompleted is false
      task_data.reminders.forEach((ele, i) => {
        
        scheduleJob(`${task_data.task_id}_${i}`, ele, () => {
          if (reminders.length - 1 == i) {
            sendEmail({
              subject: "This is a Reminder",
              to: userFound.email,
              html: `<p>Hi ${userFound.firstname}, <br>
                          Your deadline for  ${task_name} has been passed. <br>
                          <b>CFI Tasky App</b>
                          </p>`,
            });
          } else {
            sendEmail({
              subject: "This is a Reminder",
              to: userFound.email,
              html: `<p>Hi ${userFound.firstname}, <br>
                          This is a Reminder - ${i + 1} to Complete your Task ${task_name} <br>
                          <b>CFI Tasky App</b>
                          </p>`,
            });
          }
        });
      });
  
      let task = await taskModel.findOne( { user: userFound._id.toString() },{ "tasks":{"$elemMatch":{_id: task_id.toString()} }});
  
      console.log(task)
  
      if (task.tasks.length == 0) {
        return res.status(404).json({ error: "Task Not Found" });
      }
  
      // db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
      await taskModel.updateMany( { user: userFound._id.toString() },{"$set": {"tasks":{"_id": task_id.toString()}}});
      //fileData will be updated bcoz of shallow copy when userFound updated
      // userFound.tasks.push(task_data);
      // userFound.tasks[taskIndex] = { ...task_data };
      // console.log(task);
  
      // await fs.writeFile("data.json", JSON.stringify(fileData));
      res.status(200).json({ success: "Reminder has been Edited" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

export default router;