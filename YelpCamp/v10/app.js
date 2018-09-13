var express   =require("express"),
 bodyParser=require("body-parser"),
 app       =express(),
 mongoose  =require("mongoose"),
 passport=require("passport"),
 localStrategy=require("passport-local"),
 methodOverride=require("method-override"),

Campground=require("./models/campground"),
Comment=require("./models/comment"),
User=require("./models/user"),
seedDB=require("./seeds");

//Requiring route
var commentRoutes=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes=require("./routes/index")


mongoose.connect("mongodb://localhost/yelp_camp_v10");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
//seedDB(); seed data base
//PASSPORT CONFIGURE
app.use(require("express-session")({
    secret:"once again rusty wins",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
//during login..check
passport.use(new localStrategy(User.authenticate()));
//during new register
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);




app.listen(process.env.PORT,process.env.IP,function(){
   console.log("V10 Server Start"); 
});