const express = require("express");
const router = new express.Router();
const Task = require("../models/TaskModel");
const auth = require("../middleware/auth");

router.post("/task", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(401).send(e)
    }
});


router.get("/get-tasks", auth, async (req, res) => {
    try {
        const tasks = await Task.find({completed: false})
        res.send(tasks)
    } catch (e) {
        
    }
});

router.patch("/task-completed/:id", auth, async (req, res) => {
    try {
        const completed = await Task.findOneAndUpdate({ _id: req.params.id }, { completed: true })
        res.send(completed)
    }catch(e){}
})

module.exports = router;