// this is the entry point to the system
// whatever visible to eyes comes right through here
var request = require("request");
var assetsMapper = require("../staticMapper.json");

module.exports = function(settings){

  var app = settings.app;

  app.get("/",function(req, res){
     res.render("index", {
       title: 'Portfolio | Homepage',
       styles:  assetsMapper["index"]["styles"]["debug"],
       scripts: assetsMapper["index"]["scripts"]["debug"]
     });
   });

}
