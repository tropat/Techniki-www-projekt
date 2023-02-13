var express = require('express');
const controller = require("../controllers/controller");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.userId) {
    var movies = null;

    var sql = 'SELECT * FROM filmy;';
    controller.db.query(sql, (error, data) => {
      movies = data;
      res.render('filmy', {movies: movies, userLogin: req.cookies.userLogin});
    });
  }  else {
    res.redirect("/logowanie");
  }
});

module.exports = router;
