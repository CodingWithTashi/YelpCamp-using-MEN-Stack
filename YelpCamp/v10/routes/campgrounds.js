var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");

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
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});
//create new campground
router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    
    var newCampground={name:name,image:image,description:desc,author:author}
   
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

//Edit campground
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    //is User logged in
   
      Campground.findById(req.params.id,function(err,foundCampground){
       
       
            res.render("campgrounds/edit",{campground:foundCampground});

        });
  
});


//update campgrounds route 
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   //find and update the correct campground
   
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       }else{
           //redirect
           res.redirect("/campgrounds/"+req.params.id);
       }
   });
    
});
//destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
     if(err){
         res.redirect("/campgrunds")
     }  else{
         res.redirect("/campgrounds");
     }
   });
});

 
module.exports=router;