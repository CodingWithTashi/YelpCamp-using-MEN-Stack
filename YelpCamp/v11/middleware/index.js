//all middle ware
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middlewareObj={};
middlewareObj.checkCampgroundOwnership=function(req,res,next)
{
     if(req.isAuthenticated()){
        
          Campground.findById(req.params.id,function(err,foundCampground){
           
           if(err){
               req.flash("error","Campground not found");
                res.redirect("/back");
            }else{
            //does user own campground if so run code
            if(foundCampground.author.id.equals(req.user._id)){
                
                next();

            }else{
                req.flash("error","Permission required");
                res.redirect("back");  
            }
    
            }
     });
    }else{
        req.flash("error","Please logged in first");
       res.redirect("back");
    }
}  


middlewareObj.checkCommentOwnership=function(req,res,next)
{
     if(req.isAuthenticated()){
        
          Comment.findById(req.params.comment_id,function(err,foundComment){
           
           if(err){
                res.redirect("/back");
            }else{
            //does user own campground if so run code
            if(foundComment.author.id.equals(req.user._id)){
                
                next();

            }else{
                req.flash("error","You don't have permission");
                res.redirect("back");  
            }
    
            }
    });
    }else{
       req.flash("error","You don't have permission");

       res.redirect("back");
    }
} 

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","please login first!");
    res.redirect("/login")  
};

module.exports=middlewareObj;