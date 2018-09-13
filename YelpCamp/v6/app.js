var express   =require("express"),
 bodyParser=require("body-parser"),
 app       =express(),
 mongoose  =require("mongoose"),
 passport=require("passport"),
 localStrategy=require("passport-local"),

Campground=require("./models/campground"),
Comment=require("./models/comment"),
User=require("./models/user"),
seedDB=require("./seeds");




mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
seedDB();
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


app.get("/",function(req,res){
   
    res.render("landing");
});
 
app.get("/campgrounds",function(req,res){
    
   
   Campground.find({},function(err,allCampgrounds){
      if(err){
          console.log(err);
      } else{
         res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});  
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

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    //findbyid
    Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
          
       } else{
              res.render("comments/new",{campground:campground});
 
       }
    });
});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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

//AUTH ROUTE
app.get("/register",function(req,res){
    res.render("register");
});
app.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
      if(err){
          console.log(err);
          return res.render("register");
      } 
      passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds"); 

      });
   });
   
});
app.get("/login",function(req,res){
   res.render("login"); 
});

app.post("/login",passport.authenticate("local",
    {successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),function(req,res){
     
});

app.get("/logout",function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("V6 Server Start"); 
});