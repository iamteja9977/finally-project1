import express from "express";
import config from "config";
//apiRouter is the alias of the router
import apiRouter from "./controllers/api/index.js";
import taskRouter from "./controllers/tasks/index.js";
const app = express();

const port = config.get("PORT");

//APP LEVEL MIDDLE WARE
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({ success: "HELLO FROM EXPRESS" });
})

app.use("/api", apiRouter);
app.use("/api/task", taskRouter);



app.get("/use", (req, res, next) => {
    try {
        console.log("HELLO FROM USE");
        console.log(req.payload);
        console.log(req.adnan);
        console.log(req.chetan);
        res.status(200).json({ success: "Next Middleware" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error " })
    }
})

app.listen(port, () => {
    console.log("Server Started at Port : ", port);
})

