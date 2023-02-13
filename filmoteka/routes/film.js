var express = require('express');
const controller = require("../controllers/controller");
var router = express.Router();

/* GET home page. */
router.get('/:movieId', function(req, res, next) {
    if(req.cookies.userId) {
        var movie = null;

        var sql = 'SELECT * FROM ranking NATURAL JOIN filmy WHERE IdFilmu=' + req.params.movieId + ';';
        controller.db.query(sql, (error, data) => {
            movie = data;
            res.render('film', {movie: movie[0], userLogin: req.cookies.userLogin});
        });
    } else {
        res.redirect("/logowanie");
    }
});

module.exports = router;