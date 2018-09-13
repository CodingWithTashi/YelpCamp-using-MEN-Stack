var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
    {
        name:"Clou rest",
        image:"https://cdn.pixabay.com/photo/2018/05/02/18/36/tent-3369328__340.jpg",
        description:"blah blah blah"
    },
      {
        name:"Sun rest",
        image:"https://cdn.pixabay.com/photo/2018/05/02/18/36/tent-3369328__340.jpg",
        description:"fdsf blah blah"
    },
      {
        name:"Sky rest",
        image:"https://cdn.pixabay.com/photo/2018/05/02/18/36/tent-3369328__340.jpg",
        description:"dsf blasdaash blah"
    }
    ]

function seedDB(){
    //remove all campground
 Campground.remove({},function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds");
        
        //add new one after remove
        data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
           if(err){
               console.log(err);
             } else{
               console.log("added");
               //comment create
               Comment.create(
                              {
                                text:"This is nice ",
                                author:"unknown"
                              },function(err,comment){
                                 if(err){
                                     console.log(err);
                                 } else{
                                  campground.comments.push(comment._id);
                                  campground.save();
                                  console.log("added comment");
                                 }
                              });
               
                    }
             });
        });
    
    });    
    
}

module.exports=seedDB;
