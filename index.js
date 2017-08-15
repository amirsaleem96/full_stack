// variables for packages
var express = require ("express");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");
var compression = require("compression");
var program = require('commander');
var multer = require('multer');
var path = require("path");
var mode = 'prod';

program
    .version(require('./package.json')['version'])
    .option('-d, --debug','run in debug mode')
    .option('-p, --port [value]', 'specify the port number')
    .option('-pa, --prod','run in production mode')
    .parse(process.argv);

if(!program.port) {

 console.log('Port number is required');
 return;

}

if(program.debug) {
  mode = 'debug'
}

var port = program.port;

// serving the static content,
app.engine('html', require('hogan-express'));
app.set('partials',{
  header: 'header',
  footer: 'footer'
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression()); //compressing payload on every request
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/static",express.static(__dirname+"/static"));

var storage = multer.diskStorage({
	  destination: function (req, file, callback){
	    callback(null, './uploads');
	  },
	  filename: function (req, file, callback){
	    callback(null,file.originalname);
	  }
	});

var upload = multer({storage : storage}).single('uploadImage');

app.post('/upload', function(req,res){
	  upload(req,res, function(err){
	    if(err){
	      return res.end("Error while uploading file: " + err);
	    } else {
	      res.end('File uploaded successfully');
	    }
	  });
});

var settings = {
  app : app,
  mode : mode
};

require(__dirname+'/routes/home.js')(settings);

app.listen(port);
