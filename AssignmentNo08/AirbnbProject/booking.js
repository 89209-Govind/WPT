const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router()

router.post("/", (request, response) => {
    const { propertyId, total, fromDate, toDate } = request.body;
    const userId = request.userId;
    const statement = `insert into bookings (userId, propertyId, total, fromDate, toDate) values (?, ?, ?, ?, ?)`;
    db.pool.execute(
        statement,
        [userId, propertyId, total, fromDate, toDate],
        (error, bookings) => {
            response.send(utils.createResult(error, bookings));
        }
    );
});

router.get("/", (request, response) => {
    const statement = `
    SELECT id, userId, propertyId, total, fromDate, toDate
    FROM bookings
    WHERE userId =? `;
    db.pool.execute(statement, [request.userId], (error, bookings) => {
        response.send(utils.createResult(error, bookings));
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const statement = `delete from bookings where id = ?`
    db.pool.execute(statement, [id], (error, data) => {
        res.send(utils.createResult(error, data))
    })
})
module.exports = router