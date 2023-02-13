const mysql  = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'filmoteka'
})
db.connect((err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Database connected')
})


module.exports = {
    db
}