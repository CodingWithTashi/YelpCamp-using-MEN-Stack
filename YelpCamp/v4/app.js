var express   =require("express");
var bodyParser=require("body-parser");
var app       =express();
var mongoose  =require("mongoose"),

Campground=require("./models/campground"),
Comment=require("./models/comment"),
seedDB=require("./seeds");




mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
seedDB();


app.get("/",function(req,res){
   
    res.render("landing");
});
 
app.get("/campgrounds",function(req,res){
   
   Campground.find({},function(err,allCampgrounds){
      if(err){
          console.log(err);
      } else{
         res.render("campgrounds/index",{campgrounds:allCampgrounds});  
      }
   });
  
     
    
});
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});
app.post("/campgrounds",function(req,res){
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
app.get("/campgrounds/:id",function(req, res) {
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

//==============
//comment route

app.get("/campgrounds/:id/comments/new",function(req,res){
    //findbyid
    Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
          
       } else{
              res.render("comments/new",{campground:campground});
 
       }
    });
});

app.post("/campgrounds/:id/comments",function(req,res){
    //look up campground usig id
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

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("V4 Server Start"); 
});