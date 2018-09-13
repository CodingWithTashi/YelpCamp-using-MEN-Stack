var express   =require("express");
var bodyParser=require("body-parser");
var app       =express();
var mongoose  =require("mongoose"),
Campground=require("./models/campground"),
seedDB=require("./seeds");




mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
seedDB();


app.get("/",function(res,res){
   
    res.render("landing");
});
 
app.get("/campgrounds",function(req,res){
   
   Campground.find({},function(err,allCampgrounds){
      if(err){
          console.log(err);
      } else{
         res.render("index",{campgrounds:allCampgrounds});  
      }
   });
  
     
    
});
app.get("/campgrounds/new",function(req,res){
    res.render("new");
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
res.render("show",{campground:foundCampground});
        }
    });
   
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("V3 Server Start"); 
});