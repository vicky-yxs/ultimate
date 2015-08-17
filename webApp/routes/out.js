var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  	
});

router.post('/', function(req, res, next) {
	req.session.username = null;
  	res.send({
		status : 1,
		data : ""
	});
});

module.exports = router;
