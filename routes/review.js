const express= require('express')
const router= express.Router();
const reviewSchema= require("../models/review");
const jwt = require("jsonwebtoken");


//add a review
<<<<<<< HEAD
router.post("/", async(req,res) =>{

const {name, email}= req.body;
   //check if email is valid
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
if (!emailRegex.test(email))
  return res.status(400).json({ message: "Email is not valid" });
 
  
      //check if name is valid
      const nameRegex = /^[a-zA-Z ]{2,30}$/;
      if(!nameRegex.test(name)) return res.status(400).json({message:"Name is not valid"});
      
=======
router.post("/",validation, async(req,res) =>{
    const token= req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];
   if(token === undefined || token === null || token === ""){
         return res.status(401).json("You are not authorized"); 
    }
    const have_valid_token= jwt.verify(token, process.env.JWT_SECRET);
>>>>>>> b200c10cc9deb07c1decb36b3db4f1ae5f1eb866


    const review_collection= new reviewSchema({
       
        name:req.body.name,
        email:req.body.email,
        review:req.body.review, 
        rating:req.body.rating,
    });
    try {
        await review_collection.save();
        res.status(201).json("Review added");
    } catch (error) {
        res.status(400).send(error);
    }
});

//get all reviews
router.get("/", async(req,res) =>{
    const review_collection= await reviewSchema.find();
    try {
        res.status(200).json(review_collection);
    } catch (error) {
        res.status(400).send(error);
    }
});

//get a review
router.get("/:id", async(req,res) =>{
    const review_collection= await reviewSchema.findById(req.params.id);
    try {
        res.status(200).send(review_collection);
    } catch (error) {
        res.status(400).send(error);
    }
});

//update a review
router.patch("/:id",validation, async(req,res) =>{
    const review_collection= await reviewSchema.findByIdAndUpdate(req.params.id, req.body);
    try {
        res.status(200).json("Review updated");
    } catch (error) {
        res.status(400).send(error);
    }
});

//delete a review
router.delete("/:id", async(req,res) =>{
    const review_collection= await reviewSchema.findByIdAndDelete(req.params.id);
    try {
        res.status(200).json("Review deleted");
    } catch (error) {
        res.status(400).send(error);
    }
});

async function validation (req,res,next){
   
        const {name, email, review}= req.body;
        if( name === "" || email === "" || review === "" || 
             name === null || email === null || review === null ||
             name === undefined || email === undefined || review === undefined)
             {return res.status(400).json("Please fill all the fields");} 
             next();
            
    }


module.exports= router;