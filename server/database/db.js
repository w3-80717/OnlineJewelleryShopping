const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "manager",
  database: "DmcProjectDb",
})

connection.connect()

module.exports = connection
