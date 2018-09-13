var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

//root route
router.get("/",function(req,res){
   
    res.render("landing");
});
 

//Register form route
router.get("/register",function(req,res){
    res.render("register");
});
//handle sign up logic
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
      if(err){
          req.flash("error:",err.message);
          return res.render("register");
      } 
      passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome "+user.username);
            res.redirect("/campgrounds"); 

      });
   });
   
});
//Login Form
router.get("/login",function(req,res){

   res.render("login"); 
});
//Handle login logic
router.post("/login",passport.authenticate("local",
    {successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),function(req,res){
     
});
//Logout route
router.get("/logout",function(req, res) {
   req.logout();
   req.flash("success","successfully logged out");
   res.redirect("/campgrounds");
});



module.exports=router;