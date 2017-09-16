// variables for packages
var express = require ("express");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");
var compression = require("compression");
var program = require('commander');
var multer = require('multer');
var path = require("path");
var mode = 'production';


var mysql = require('mysql');

var poolConfig = {
  host : "localhost",
  user : "amir",
  password : "#Lm%d0642cd",
  database : "testdb",
  connectionLimit : 20,
  connectTimeout: 120000 ,
	timeout: 120000
}

var con = mysql.createPool(poolConfig);

con.getConnection(function(err,connection){
  if(err) {
    throw err;
  } else {
    con.query("SELECT * FROM UserMaster",function(err, result, fields){
      if(err) {
        throw err;
      } else {
        for(var i = 0; i < result.length; i++) {
          console.log('Name: ' + result[i].FirstName + ' ' + result[i].LastName);
        }
      }
    });
    connection.release();
  }
});

program
    .version(require('./package.json').version)
    .option('-d, --debug','run in debug mode')
    .option('-p, --port [value]', 'specify the port number')
    .parse(process.argv);

if(!program.port) {

 console.log('Port number is required\nSyntax: --port=8080 (replace 8080 with your own port number)');
 return;

}

if(program.debug) {
  mode = 'debug';
}

var port = program.port;

// serving the static content,
app.engine('html', require('hogan-express'));
app.set('partials',{
  header: 'header',
  footer: 'footer'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression()); //compressing payload on every request
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/static",express.static(__dirname+"/static"));

var storage = multer.diskStorage({
	  destination: function (req, file, callback){
	    callback(null, './static/uploads');
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

app.listen(port, function(){
  console.log('\nApp is running at port: ' +
               port + ' in '+mode+' mode\nTo access locally go to:- "localhost:'+port+'"'+
              '\nTo access on network go to:- "IPv4:'+port+'" where IPv4 is your network IP address for example 192.168.88.111\nTo find your network IP address go to terminal/command prompt and type "ipconfig"' );
});
