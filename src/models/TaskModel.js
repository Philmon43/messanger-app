const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    lat: {
        type: String,
        required: true,
        trim: true
    },
    long: {
        type: String,
        required: true,
        trim: true
    }
})

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    restaurant: restaurantSchema,
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    completedBy: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true
})
const Task = mongoose.model("Task", taskSchema)
module.exports = Task