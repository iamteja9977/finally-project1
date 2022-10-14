/*
TODO:
email done
SMS verification
reminder sms logic

less than 30min in put and post
sms verification in signup

edit route fix
*/

import express from "express";
import config from "config";

import apiRouter from "./controllers/api/index.js";
import taskRouter from "./controllers/tasks/index.js";

import "./dbConnect.js";

//instantiate express
const app = express();

//declaring port numbers
const port = config.get("PORT");

//Allowing only json (APP LEVEL MIDDLEWARE)
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: "Welcome To The Tasky Application" });
});

app.use("/api", apiRouter);
app.use("/api/task", taskRouter);

//listening for server
app.listen(port, () => {
  console.log(`Server Started at ${config.get("URL")}`);
});
