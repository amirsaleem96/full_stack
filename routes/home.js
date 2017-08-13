/***
home.js
This module contains all the view rendering.
What all is visible to the eyes comes right through here.
**/

var request = require("request");
var assetsMapper = require("../staticMapper.json");

module.exports = function(settings){
	var app = settings.app;
	var mode = settings.mode;
	var config = settings.config;
	var env = settings.env;
	var baseUrl =  config["baseUrl"];
	var buyerBaseUrl = config["buyerBaseUrl"];
	if(env=="local"){
		baseUrl = config["baseUrl_local"];
		buyerBaseUrl = config["buyerBaseUrl_local"];
	}
	function isAuthenticated(req, res, next) {
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    	if (req.session.authenticated)
        	return next();
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    	res.redirect('/sign-in');
	}

	app.get("/", isAuthenticated,function(req, res){
		res.render("index", {
			title: "Kisan Network - Operations",
			styles:  assetsMapper["index"]["styles"][mode],
			scripts: assetsMapper["index"]["scripts"][mode],
			baseUrl: baseUrl
		});
	});
	app.get("/sign-in", function(req,res){
		if (req.session.authenticated){
        	res.redirect("/");
        	return
		}
		res.render("sign-in",{
			styles: assetsMapper["sign-in"]["styles"][mode],
			scripts: assetsMapper["sign-in"]["scripts"][mode]
		})
	});

	app.get("/deal/create", function(req, res){
		res.render("create-deal",{
			styles: assetsMapper["create-deal"]["styles"][mode],
			scripts: assetsMapper["create-deal"]["scripts"][mode],
			baseUrl: baseUrl
		});
	});

	app.get("/task/create", function(req, res){
		res.render("create-task",{
			styles: assetsMapper["create-task"]["styles"][mode],
			scripts: assetsMapper["create-task"]["scripts"][mode],
			baseUrl: baseUrl
		});
	});

	app.get("/task/:taskID", function(req, res){
		var taskID = req.params.taskID || null;
		if(!taskID){
			res.redirect('/');
			return
		}
		res.render("task-details",{
			styles: assetsMapper["task-details"]["styles"][mode],
			scripts: assetsMapper["task-details"]["scripts"][mode],
			baseUrl: baseUrl,
			taskID: taskID
		});
	});

	app.get("/deal/:dealID", function(req, res){
		var dealID = req.params.dealID || null;
		if(!dealID){
			res.redirect('/');
			return
		}
		res.render("create-deal",{
			styles: assetsMapper["create-deal"]["styles"][mode],
			scripts: assetsMapper["create-deal"]["scripts"][mode],
			baseUrl: baseUrl,
			dealID: dealID
		});
	});

	app.get("/posting/create", function(req, res){
		res.render("create-posting",{
			styles: assetsMapper["create-posting"]["styles"][mode],
			scripts: assetsMapper["create-posting"]["scripts"][mode],
			baseUrl: baseUrl
		})
		return
	});

	app.get("/deal/inspection/all", function(req, res){

		res.render("inspection",{
			styles: assetsMapper["inspection"]["styles"][mode],
			scripts: assetsMapper["inspection"]["scripts"][mode],
			baseUrl: baseUrl
		});

	});

	app.get("/buyer/create_for_sale", function(req, res){
		res.render("buyer",{
			styles: assetsMapper["buyer"]["styles"][mode],
			scripts: assetsMapper["buyer"]["scripts"][mode],
			baseUrl: baseUrl,
			buyerBaseUrl : buyerBaseUrl
		});

	});

	app.get("/inspection/inspection-search", function(req, res){
		res.render("inspection-search",{
			styles: assetsMapper["inspection-search"]["styles"][mode],
			scripts: assetsMapper["inspection-search"]["scripts"][mode],
			baseUrl: baseUrl,
			buyerBaseUrl : buyerBaseUrl
		});

	});

	app.get("/deal/:dealID/inspection", function(req, res){
		var dealID = req.params.dealID || null;
		if(!dealID){
			res.redirect('/');
			return
		}
		res.render("inspection",{
			styles: assetsMapper["inspection"]["styles"][mode],
			scripts: assetsMapper["inspection"]["scripts"][mode],
			baseUrl: baseUrl,
			dealID: dealID
		});
	});

	app.get("/deal/:dealID/offers", function(req, res){
		var dealID = req.params.dealID;

		res.render("offer-list", {
			styles: assetsMapper["offer-list"]["styles"][mode],
			scripts: assetsMapper["offer-list"]["scripts"][mode],
			baseUrl: baseUrl,
			dealID: dealID
		})
		return
	})

	app.get("/deal/:dealID/inspection/:inspectionID/offer", function(req, res){
		var dealID = req.params.dealID,
			inspectionID = req.params.inspectionID,
			lotID = req.query.lotID || null;

		res.render("offer", {
			styles: assetsMapper["offer"]["styles"][mode],
			scripts: assetsMapper["offer"]["scripts"][mode],
			baseUrl: baseUrl,
			dealID: dealID,
			inspectionID: inspectionID,
			lotID: lotID
		})
		return
	})

	app.get("/aadhar/:phoneNumber", function(req, res){
		var phoneNumber = req.params.phoneNumber;

		var role = req.query.role || null;
		var vehicleNumber = req.query.vehicleNumber || null;
		if(!role){
			res.status(422).json({
				status: 'fail',
				message: 'missing parameters'
			});
			return
		}
		res.render("aadhar", {
			styles: assetsMapper["aadhar"]["styles"][mode],
			scripts: assetsMapper["aadhar"]["scripts"][mode],
			baseUrl: baseUrl,
			phoneNumber: phoneNumber,
			vehicleNumber: vehicleNumber,
			role : role
		})
		return
	})

	app.get("/bank-details/:phoneNumber", function(req, res){
		var phoneNumber = req.params.phoneNumber;

		var role = req.query.role || null;
		var vehicleNumber = req.query.vehicleNumber || null;

		if(!role){
			res.status(422).json({
				status: 'fail',
				message: 'missing parameters'
			});
			return
		}
		res.render("aadhar", {
			styles: assetsMapper["bank-details"]["styles"][mode],
			scripts: assetsMapper["bank-details"]["scripts"][mode],
			baseUrl: baseUrl,
			phoneNumber: phoneNumber,
			vehicleNumber: vehicleNumber,
			role : role
		})
		return
	})

	app.get("/user-details", function(req, res){
		res.render("aadhar-bank", {
			styles: assetsMapper["aadhar-bank"]["styles"][mode],
			scripts: assetsMapper["aadhar-bank"]["scripts"][mode],
			baseUrl: baseUrl
		})
		return
	})

	app.post("/sign-in", function(req, res){
		var userName = req.body.userName || null;
		var password = req.body.password || null;
		var appID = req.get("appID");
		var ua = req.get('User-Agent');
		request.post({
		  headers: {'content-type' : 'application/x-www-form-urlencoded', appID: appID, 'User-Agent': ua},
		  url:     baseUrl+'/sign-in',
		  body:  "userName="+userName+"&password="+password
		}, function(error, response, body){
			var jsonBody = JSON.parse(body);
		  if(jsonBody.status=="success")
		  	req.session.authenticated=true;
		  res.json(jsonBody)
		});

	});
	app.get("/logout", function(req,res){
		req.session = null;
		res.redirect("/");
	});

}
