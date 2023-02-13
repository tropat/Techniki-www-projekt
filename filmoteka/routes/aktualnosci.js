var express = require('express');
const controller = require("../controllers/controller");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.userId) {
    var articles = null;
    var sql = 'SELECT * FROM aktualnosci ORDER BY Data DESC;';
    controller.db.query(sql, (error, data) => {
      articles = data;
      res.render('aktualnosci', {articles: articles, userLogin: req.cookies.userLogin});
    });
  } else {
    res.redirect("/logowanie");
  }
});

module.exports = router;
