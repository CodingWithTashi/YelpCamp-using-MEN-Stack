var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");

//CAMPGROUNG ROUTE
router.get("/",function(req,res){
    
   
   Campground.find({},function(err,allCampgrounds){
      if(err){
          console.log(err);
      } else{
         res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});  
      }
   });
  
     
    
});
//create ampgground
router.get("/new",function(req,res){
    res.render("campgrounds/new");
});
//create new campground
router.post("/",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground={name:name,image:image,description:desc}
   //create new camp and save to database;
   Campground.create(newCampground,function(err,newlyCreated){
      if(err){
          console.log(err);
      } else{
          //redirect to campground page with new image
          res.redirect("/campgrounds")
          
      }
   });
    
});

//Show more
router.get("/:id",function(req, res) {
    //find the campgrounds with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
//render the campground
res.render("campgrounds/show",{campground:foundCampground});
        }
    });
   
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")  
}
  
module.exports=router;