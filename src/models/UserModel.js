const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./TaskModel")
const destinationSchema = mongoose.Schema({
    street: {
        type: String,
        trim: true
    },
    lat: {
        type: String,
        trim: true
    },
    lan: {
        type: String,
        trim: true
    },
    apartment: {
        type: String,
        trim: true
    }
})

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw "email is not valid";
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7
    },
    phoneNumber: {
        type: String,
        validate(val) {
            if (!validator.isMobilePhone(val)) {
                throw "error mobile phone"
            }
        }
    },

    location: destinationSchema,

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual("task", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
};
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user.id.toString()}, process.env.SECRET_CODE)
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new error("unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("unable to login")
    }

    return user
}

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
});

userSchema.pre("remove", async function (next) {
    const user = this;
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model("User", userSchema);
module.exports = User