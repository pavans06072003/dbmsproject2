const mysql = require('mysql2')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password",
    database: 'exam'
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;