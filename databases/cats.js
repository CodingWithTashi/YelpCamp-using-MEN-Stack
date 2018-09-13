var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catShema=new mongoose.Schema({
   name:String,
   age:Number,
   temperament:String
});

 var Cat=mongoose.model("Cat",catShema);

// var george=new Cat({
//   name:"norras",
//   age:31,
//   temperament:"evil"
// });

// george.save(function(err,cat){
//     if(err){
//         console.log("wrong occur")
//     }
//     else{
//                 console.log(" save");
//                 console.log(cat);

//     }
// });
Cat.create({
   name:"white",
   age:25,
   temperament:"good"
},function(err,cat){
    if(err){
    console.log(err);
    }
    else{
        console.log(cat);
    }
});

Cat.find({},function(err,cats){
    if(err){
        console.log("error");
    }
    else{
        console.log(cats);
    }
    
});









