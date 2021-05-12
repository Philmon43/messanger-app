require("./src/db/mongoose")
require('dotenv').config()
const express = require("express")
const userRouter = require("./src/routers/user")
const taskRouter = require("./src/routers/tasks")
const cors = require('cors')
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
app.use(taskRouter)
const port = process.env.PORT || 5000

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.listen(port, () => console.log("Server is up on port ", port));