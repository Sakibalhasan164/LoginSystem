const { text } = require("express");
const express=require("express")
const router=express.Router();
const userControlers=require("../controlars/userControlers")
// const User=require("../models/user")
const {requireAuth}=require("../auth")



//routes
router.get("/",userControlers.root_index)

//login page
router.get("/log-in",userControlers.login_index)

//register
router.get("/register",userControlers.register_index)

//post request from the register page
router.post("/register",userControlers.register_post)

//post request for the login
router.post("/log-in",userControlers.login_post)
//all posts
router.get("/allPosts",requireAuth,userControlers.allPost_rout)
//visit profile
// router.get("/:id",userControlers.Visit_profile)





module.exports=router;