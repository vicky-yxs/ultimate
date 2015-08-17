var express = require('express');
var router = express.Router();

var userModel = require("../model/model").userModel;

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('login', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  	userModel.find({
  		username : req.body.username
  	},function(error, doc){
  		if(doc.length == 0){
  			res.send({
				status : 0,
				data : ""
			});
  		}else{
  			if(req.body.username == doc[0].username && req.body.password == doc[0].password ){
				req.session.username = req.body.username;
				res.send({
					status : 1,
					data : ""
				});
			}else{
				res.send({
					status : 0,
					data : ""
				});
			}
  		}
		
  	});
});

module.exports = router;
