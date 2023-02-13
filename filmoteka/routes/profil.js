var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.userId) {
    res.render('profil', {userLogin: req.cookies.userLogin});
  } else {
    res.redirect("/logowanie");
  }
});

module.exports = router;
