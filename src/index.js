require("./db/mongoose");
require('dotenv').config()
const express = require("express");
const userRouter = require("./routers/user")
const taskRouter = require("./routers/tasks");
const cors = require('cors')
const path = require("path")

const app = express();
app.use(express.json());
app.use(cors())
app.use(userRouter)
app.use(taskRouter)
const port = process.env.PORT || 5000;

const publicDirectory = path.join(__dirname, "../client/build");

// console.log(path.join(__dirname, "../client/build"))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(publicDirectory))
}

app.listen(port, () => console.log("Server is up on port ", port));