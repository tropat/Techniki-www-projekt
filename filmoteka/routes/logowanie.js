var express = require('express');
const controller = require("../controllers/controller");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('logowanie');
});

router.post('/', function(req, res, next) {
    if(req.body.login != "" && req.body.pass != "") {
        var sql = 'SELECT * FROM uzytkownicy WHERE Login="'+ req.body.login +'" AND Haslo="'+ req.body.pass +'";';
        controller.db.query(sql, (error, data) => {
            if(data.length) {
                res.cookie("userId", data[0].IdUzytkownika);
                res.cookie("userLogin", data[0].Login);
                res.redirect('/');
            } else {
                res.redirect("/logowanie");
            }
        });
    } else {
        res.redirect("/logowanie");
    }
});

module.exports = router;
