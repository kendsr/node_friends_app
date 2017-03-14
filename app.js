var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override");
	title = "Friends";

var friendSchema = new mongoose.Schema({
		name: String,
		email: String,
		comments: String        
    });
var Friend = mongoose.model("Friend", friendSchema);
mongoose.connect("mongodb://localhost/friends_app");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); 

// Landing Page 
app.get("/", function(req, res){
	res.render("landing", {title:title});
})

//INDEX Route - list all friends
app.get("/friends", function(req, res){
	Friend.find({}, function(err, friends){
		if (err){
			console.log("ERR: " + err);
		} else {
			res.render("index", {title:title, friends:friends});
		}
	})
});

// NEW Route - show form to add new Friend
app.get("/friends/new", function(req, res){
	res.render("new", {title:title});
});

// Create Route - create a new friend and re-direct
app.post("/friends", function(req, res){
	Friend.create({name:req.body.name, 
					email: req.body.email,
					comments: req.body.comments},
		function(err, newFriend){
			if (err){
			console.log("ERR: " + err);
		} else {
			res.redirect("/friends");
		}	
		});

});

// SHOW Route - show info about one friend
app.get("/friends/:id", function(req, res){
	Friend.findById(req.params.id, function(err, foundFriend){
       if(err){
           console.log("ERR: " + err);
       } else {
           res.render("show", {friend:foundFriend, title:title});
       }
   });
});

// Edit Route - show edit form
app.get("/friends/:id/edit", function(req, res){
    Friend.findById(req.params.id, function(err, foundFriend){
        if(err){
            console.log("ERR: " + err);
        } else {
            res.render("edit", {friend: foundFriend});
        }
    });
})

// Update Route- update and re-direct
app.put("/friends/:id", function(req, res){
  //  req.body.friend.body = req.sanitize(req.body.friend.body)
   Friend.findByIdAndUpdate(req.params.id, req.body.friend, function(err, updatedBlog){
      if(err){
          console.log("ERR: " + err);
      }  else {
          res.redirect("/friends/" + req.params.id);
      }
   });
});

// Delete Route - delete and redirect
app.delete("/friends/:id", function(req, res){
   Friend.findByIdAndRemove(req.params.id, function(err){
       if(err){
          console.log("ERR: " + err);
       } else {
           res.redirect("/friends");
       }
   })
});

// Server Start Up
app.listen(3000, function(){
	console.log("Server is running under nodemon");
})