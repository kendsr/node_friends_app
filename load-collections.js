// Load data into Friends collection in mongodb
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/friends_app");

var friendSchema = new mongoose.Schema({
    name: String,
    email: String,
    comments: String        
});

var newFriend = mongoose.model("Friend", friendSchema);

// Friends
var friends=[
  {name:"Ray LaBlanc", email:"ray@gmail.com",
     comments:"Plays golf Mondays and Thursdays"},
  {name:"Richard Eisdorn", email:"rich@gmail.com",
     comments:"Rabid LSU fan. Loves to play golf."},
  {name:"Glen Console", email:"glen@gmail.com",
     comments:"Senior golfer with some skills."}
];
// Add Friends
friends.forEach(function(friend){
  newFriend.create(friend, function(err, newfriend){
    if(err){
        console.log("ERR " + err);
    } else {
        console.log("Friend added to database");
        console.log(newfriend);
    }
  });
});

// Friend.create({
//    name: "Raymond LaBlanc",
//    email: "ray@gmail.com",
//    comments: "Plays golf Mondays and Thursdays."
// }, function(err, friend){
//     if(err){
//         console.log("ERR " + err);
//     } else {
//         console.log("Friend added to database");
//         console.log(friend);
//     }
// });