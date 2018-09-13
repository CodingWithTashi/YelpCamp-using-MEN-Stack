var express=require("express"),
     app=express(),
     mongoose=require("mongoose"),
     passport=require("passport"),
     bodyParser=require("body-parser"),
     localStrategy=require("passport-local"),
     passportLocalMongoose=require("passport-local-mongoose"),

     User=require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    //three parameter
    //secret code to encode
    secret:"Rusty is the best",
    resave:false,
    saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//++++++++++++++++++++++++++++
//Route

app.get("/",function(req,res){
   
   res.render("home");  
});
app.get("/secret",isLoggedIn,function(req,res){
   
   res.render("secret"); 
    
});
//auth route
app.get("/register",function(req,res){
    res.render("register");
});
//handle signup 
app.post("/register",function(req,res){
    
   User.register(new User({username:req.body.username}),req.body.password,function(err,user){
      if(err){
          console.log(err);
      } else{
     passport.authenticate("local")(req,res,function(){
         res.redirect("/secret");
     });     
      }
   });
});
//login route
app.get("/login",function(req,res){
   res.render("login"); 
});
//login logic
//middleware
app.post("/login",passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),function(req,res){
    
});
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server start");
})