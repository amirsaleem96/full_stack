// variables for packages
var express = require ("express");
var fs = require("fs");
var app = express();

// serving the static content
//app.set('view engine', 'html');
//app.set('views', __dirname + '/views');
app.use(express.static(__dirname+"/views"));
app.use(express.static(__dirname+"/static"));

console.log("Something is happenning...");

app.listen(3000, function(){
  console.log("listening to port:  " + 3000);
  console.log("On your network: 127.0.0.1:3000");
});
