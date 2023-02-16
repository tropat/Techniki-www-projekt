var express = require('express');
const controller = require("../controllers/controller");
var router = express.Router();

/* GET home page. */
router.get('/:movieId', function(req, res, next) {
    if(req.cookies.userId) {
        var movie = null;
        var rating = 0;

        var sql = 'SELECT * FROM ranking NATURAL JOIN filmy WHERE IdFilmu=' + req.params.movieId + ';';
        controller.db.query(sql, (error, data) => {
            movie = data;

            sql = 'SELECT * FROM ocenyuzytkownika WHERE IdFilmu='+req.params.movieId+' AND IdUzytkownika='+req.cookies.userId+';';
            controller.db.query(sql, (error, data) => {
                if(data.length != 0) {
                    rating = data[0].Ocena;
                }
                res.render('film', {movie: movie[0], userLogin: req.cookies.userLogin, userId: req.cookies.userId, rating:rating});
            });

        });
    } else {
        res.redirect("/logowanie");
    }
});

router.post('/rate/:userId/:movieId/:number', function(req, res, next) {
    if(req.cookies.userId) {
        var sql = 'SELECT * FROM ocenyuzytkownika WHERE IdFilmu='+req.params.movieId+' AND IdUzytkownika='+req.params.userId+';';
        controller.db.query(sql, (error, data) => {
            if(data.length != 0) {
                sql = 'UPDATE ocenyuzytkownika SET Ocena='+req.params.number+' WHERE IdFilmu='+req.params.movieId+' AND IdUzytkownika='+req.params.userId+';';
                controller.db.query(sql, (error, data) => {});
            } else {
                sql = 'INSERT INTO ocenyuzytkownika VALUES(null, '+req.params.userId+','+req.params.movieId+','+req.params.number+');';
                controller.db.query(sql, (error, data) => {});
            }
        });
    } else {
        res.redirect("/logowanie");
    }
});

module.exports = router;