var express = require('express')
var router= express.Router()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./store2.sqlite3')

router.get('/users', (req, res)=>{

    db.serialize(() => {//serializer all of these following instructions must run in sequence.

        db.all('SELECT * FROM users', (error, rows) => {
            res.json(rows) //db.all = select all the query, take all those rows and return
        })
    })

})

module.exports = router
