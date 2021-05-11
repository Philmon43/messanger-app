const  jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const auth = async (req, res, next) => {
    const error = { error: "401 Unauthorized" }
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.SECRET_CODE)
        const user = await User.findOne({_id: decoded._id, "tokens.token": token})
        
        if (!user) {
            throw new Error();
        }
        req.token = token
        req.user = user
        next()
    }catch(e) {
        res.status(401).send(JSON.stringify(error))
    }

}

module.exports = auth;