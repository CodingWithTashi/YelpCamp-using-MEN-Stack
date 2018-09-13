var express=require("express");
var router=express.Router({mergeParams:true}); //access id (since it merge campground and comment)
var Campground=require("../models/campground");
var Comment=require("../models/comment");

//Comment New

router.get("/new",isLoggedIn,function(req,res){
    //findbyid
    Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
          
       } else{
              res.render("comments/new",{campground:campground});
 
       }
    });
});
//Comment Create
router.post("/",isLoggedIn,function(req,res){
    //look up campground using id
    Campground.findById(req.params.id,function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err)
               } else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+campground._id);
               }
            });
        }
    }) ;
});

//MiddleWare 
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports=router;