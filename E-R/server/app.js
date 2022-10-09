import express from "express";
import config from "config";
//apiRouter is the alias of the router
import apiRouter from "./controllers/api/index2.js";
import taskRouter from "./controllers/tasks/index.js";
const app = express();

const port = config.get("PORT");

//APP LEVEL MIDDLE WARE
app.use(express.json());
import"./DBConnect.js";

app.get("/", (req, res) => {
    res.status(200).json({ success: "HELLO FROM EXPRESS" });
})

app.use("/api", apiRouter);
app.use("/api/task", taskRouter);


app.listen(port, () => {
    console.log("Server Started at Port : ", port);
})

