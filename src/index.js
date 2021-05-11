require("./db/mongoose");
require('dotenv').config()
const express = require("express");
const User = require("./models/UserModel");
const auth = require("./middleware/auth");
const userRouter = require("./routers/user")
const taskRouter = require("./routers/tasks");
const Task = require("./models/TaskModel");
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())
app.use(userRouter)
app.use(taskRouter)
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.listen(port, () => console.log("Server is up on port ", port));