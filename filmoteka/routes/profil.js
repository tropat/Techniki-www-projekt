var express = require('express');
const controller = require("../controllers/controller");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.userId) {
    var userData = null;
    var userRatings = null;

    var sql = 'SELECT * FROM uzytkownicy WHERE IdUzytkownika='+req.cookies.userId+';';
    controller.db.query(sql, (error, data) => {
      userData = data[0];

      sql = 'SELECT * FROM ocenyuzytkownika NATURAL JOIN filmy WHERE IdUzytkownika='+req.cookies.userId+';';
      controller.db.query(sql, (error, data) => {
        userRatings = data;

        res.render('profil', {userLogin: req.cookies.userLogin, userData: userData, userRatings: userRatings});
      });
    });
  } else {
    res.redirect("/logowanie");
  }
});

module.exports = router;
