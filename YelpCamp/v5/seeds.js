var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
    {
        name:"Clou rest",
        image:"https://cdn.pixabay.com/photo/2018/05/02/18/36/tent-3369328__340.jpg",
        description:"when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
      {
        name:"Sun rest",
        image:"https://cdn.pixabay.com/photo/2018/05/02/18/36/tent-3369328__340.jpg",
        description:"when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
      {
        name:"Sky rest",
        image:"https://cdn.pixabay.com/photo/2018/05/02/18/36/tent-3369328__340.jpg",
        description:"when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
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
