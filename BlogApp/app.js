var express=require("express");
var bodyParser=require("body-parser");
var app=express();

app.get("/",function(req,res){
    res.render("landing.ejs");    
});

app.get("/home",function(req,res){
   res.render("show.ejs"); 
});
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server start"); 
});