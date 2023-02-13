var express = require('express');
const controller = require("../controllers/controller");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.userId) {
    var movies = null;

    var sql = 'SELECT * FROM ranking NATURAL JOIN filmy ORDER BY Ocena DESC LIMIT 10;';
    controller.db.query(sql, (error, data) => {
      movies = data;
      res.render('top10', {movies: movies, userLogin: req.cookies.userLogin});
    });
  } else {
    res.redirect("/logowanie");
  }
});

module.exports = router;
