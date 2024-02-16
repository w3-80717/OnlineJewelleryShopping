const express = require("express")
const db = require("../database/db")
const utils = require("../utils")

const router = express.Router()

router.get("/", (request, response) => {
    
    const sql = `select
                    c.cart_id, c.pid, c.qty, c.price, c.total,
                    p.pname, p.cid 
                from 
                    cart c, products p 
                where 
                    (c.pid = p.pid) and (uid = 2)`
    db.query(sql, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

router.post("/", (request, response) => {
    const { pid, qty, price, total, uid } = request.body
    const sql = 
        `insert into cart
            ( pid, qty, price, total, uid )
        values
            (?,?,?,?,?)`
    db.query(sql, [pid, qty, price, total, request.user.uid], (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

router.put("/:cart_id", (request, response) => {
    const {cart_id} = request.params
    const { qty, price, total } = request.body
    const sql = 
        `update cart 
        set
            qty = ?, 
            price = ?, 
            total = ?
        where   
            cart_id = ?`
    db.query(sql, [qty, price, total, cart_id], (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

router.delete("/:cart_id", (request, response) => {
    const {cart_id} = request.params
    const sql = 
        `delete from cart 
        where   
            cart_id = ?`

    db.query(sql, [cart_id], (error, data) => {

        response.send(utils.createResult(error, data));
    });
});

module.exports = router