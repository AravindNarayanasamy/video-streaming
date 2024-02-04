const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.render("login");
});

router.get("/Signup",(req,res)=>{
    res.render("Signup");
})

router.get("/welcome",(req,res)=>{
    res.render("Welcome");
})
router.get("/uploads",(req,res) =>{
    res.render("uploads")
})

module.exports =router;