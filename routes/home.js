// static content

var request = require("request");
var assetsMapper = require("../staticMapper.json");

module.exports = function(settings){

  var app = settings.app;

  app.get("/",function(req, res){
     res.render("index", {
       styles:  assetsMapper["index"]["styles"]["debug"],
       scripts: assetsMapper["index"]["scripts"]["debug"]
     });
   });

}
