var express=require("express");
var bodyParser=require("body-parser");
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")

app.get("/",function(req,res){
   
    res.render("landing");
});
 var campgrounds=[
       {name:"leh", image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg"},
       {name:"delhi", image:"https://cdn.pixabay.com/photo/2016/04/09/23/10/girl-1319115__340.jpg"},
       {name:"dhasa", image:"https://cdn.pixabay.com/photo/2018/04/13/13/19/grill-party-3316524__340.jpg"}
       ];
app.get("/campgrounds",function(req,res){
   
  
       res.render("campgrounds",{campgrounds:campgrounds});
    
});
app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    campgrounds.push({name:name,image:image});
    
    
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server Start"); 
});