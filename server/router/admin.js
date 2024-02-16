const express = require("express")
const db = require("../database/db")
const utils = require("../utils")

const router = express.Router()

router.get("/", (request, response) => {
    const sql = "select * from products";
    db.query(sql, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

router.post("/", (request, response) => {
    const { pname, price } = request.body
    const sql = 
        "insert into products( pname, price ) values(?,?)"
    db.query(sql, [pname, price], (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

router.put("/:pid", (request, response) => {
    const pid = request.params.pid;
    const { pname, price } = request.body;
    const sql = 
        "UPDATE products SET pname=?, price=? WHERE pid=?";
    db.query(sql, [pname, price, pid], (error, data) => {
        response.send(utils.createResult(error, data));
    });
});

router.delete("/:pid", (request, response) => {
    const pid = request.params.pid;

    const sql = 
        "DELETE FROM products WHERE pid=?";

    db.query(sql, [pid], (error, data) => {

        response.send(utils.createResult(error, data));
    });
});

module.exports = router