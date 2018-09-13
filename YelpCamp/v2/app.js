var express   =require("express");
var bodyParser=require("body-parser");
var mongoose  =require("mongoose");
var app       =express();


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs")

//Schema setup

var campgroundShema=new mongoose.Schema({
   name:String,
   image:String,
   description:String
});
 var Campground=mongoose.model("Campground",campgroundShema);
// Campground.create({
     
//       name:"leh", image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",
//       description:"This si a my first try please load it "
     
// },function(err,campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("new Campground");
//         console.log(campground)
//     }
// });



app.get("/",function(req,res){
   
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
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
//render the campground
res.render("show",{campground:foundCampground});
        }
    });
   
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("V2 Server Start"); 
});