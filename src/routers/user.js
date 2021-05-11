const express = require("express");
const router = new express.Router()
const User = require("../models/UserModel")
const auth = require("../middleware/auth");


router.get("/", auth, async (req, res) => {
    res.send(req.user)
 });
 
 router.post("/users/register", async (req, res) => {
     const user = new User(req.body);
     try {
         await user.save()
         const token = await user.generateAuthToken();
         res.status(201).send({user, token})
     }catch(e){
         res.status(400).send(e)
     }
 })
 
 router.post("/users/login", async (req, res) => {
     try{
         const user = await User.findByCredentials(req.body.email, req.body.password)
         const token = await user.generateAuthToken();
         res.send({user, token})
     }catch(e) {
         res.status(400).send(e)
     }
 });
 
router.post("/users/logout", auth, async (req, res) => {
     try {
         req.user.tokens = req.user.tokens.filter((token) => {
             return token.token !== req.token
         })
         await req.user.save()
         res.send("you are logged out")
     }catch(e) {
         res.status(500).send(e)
     }
 })
 
 router.post("/users/logout/alldevices", auth, async (req, res) => {
     try {
         req.user.tokens = [];
         await req.user.save()
         res.send("you are logged out of all devices")   
         }catch(e) {
         res.status(500).send(e)
     }
 })

 router.delete("/user/delete/me", auth, async (req, res) => {
     try {
         await req.user.remove();
         res.send(req.user)
     }catch(e){
         res.status(500).send(e)
     }
 })

 router.get("/customer/:id", auth, async (req, res) => {
    try {
        const cutomer = await User.find({_id: req.params.id})
        res.send(cutomer)
    } catch (e) {
        
    }
})

module.exports = router;