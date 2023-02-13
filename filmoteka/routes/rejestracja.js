var express = require('express');
const controller = require("../controllers/controller");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('rejestracja');
});

router.post('/', function(req, res, next) {
    if(req.body.login != "" && req.body.pass != "") {
        var sql = 'INSERT INTO uzytkownicy VALUES(null, "'+ req.body.login +'", "'+ req.body.pass +'");';
        controller.db.query(sql, (error, data) => {
            res.redirect('/logowanie');
        });
    } else {
        res.redirect("/rejestracja");
    }
});



module.exports = router;
