const express = require("express")
const db = require("../database/db")
const utils = require("../utils")

const router = express.Router()

router.post("/register", (request, response) => {
  const { uname,mobile,email,password,address } = request.body
  // const sql =
  //   "INSERT INTO users(first_name,last_name,email,password,mobile) VALUES(?,?,?,?,?)"
    const sql =
    "INSERT INTO users(uname,mobile,email,password,address) VALUES(?,?,?,?,?)"
  db.query(
    sql,
    [uname,mobile,email,password,address],
    (error, data) => {
      response.send(utils.createResult(error, data))
    }
  )
})

router.post("/login", (request, response) => {
  const { email, password } = request.body;
  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  
  db.query(sql, [email, password], (error, data) => {
    if (error) {
      const result = utils.createResult(error, null);
      return response.send(result);
    }

    if (data.length === 1) {
      const user = data[0];
      // Redirect based on user role
      if (user.role === 'admin') {
        response.redirect('/admin');
      } else {
        response.redirect('/');
      }
    } else {
      const result = utils.createResult('Invalid credentials', null);
      response.send(result);
    }
  });
});


module.exports = router
