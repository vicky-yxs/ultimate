var express = require('express');
var router = express.Router();

var talkContentModel = require("../model/model").talkContentModel;

/*var http = require('http').Server(app);
var io = require('socket.io')(http);*/


/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.username){
  	res.redirect("/login");
  }else{
  	talkContentModel.find({},function(err, doc){
  		res.render('index', { 
  			username: req.session.username,
  			talkContent : doc
  		});
  	})
  }
  
});

module.exports = router;
