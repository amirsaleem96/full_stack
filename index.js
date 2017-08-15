// variables for packages
var express = require ("express");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");
var compression = require("compression");

// serving the static content
app.engine('html', require('hogan-express'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression()); //compressing payload on every request
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/static",express.static(__dirname+"/static"));

var settings = {
  app : app
};

require(__dirname+'/routes/home.js')(settings);

app.listen(3000, function(){
  console.log("listening to port:  " + 3000);
  console.log("On your network: 192.168.88.111:3000");
});
