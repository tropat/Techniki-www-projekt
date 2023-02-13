var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies.userId) {
        var articles = null;
        var movies = null;

        var sql = 'SELECT * FROM aktualnosci ORDER BY Data DESC LIMIT 3;';
        controller.db.query(sql, (error, data) => {
            articles = data;

            sql = 'SELECT * FROM ranking NATURAL JOIN filmy ORDER BY Ocena DESC LIMIT 3;';
            controller.db.query(sql, (error, data) => {
                movies = data;

                res.render('index', {articles: articles, movies: movies, userLogin: req.cookies.userLogin});
            });
        });
    } else {
        res.redirect("/logowanie");
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie("userId");
    res.redirect('/logowanie');
});

module.exports = router;
