const express = require('express');
const db = require('./db');
const utils = require('./utils');
const multer = require('multer');

const upload = multer({ dest: 'images' });

const router = express.Router()

router.post('/', (request, response) => {
    const { categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent } = request.body
    const statement = `insert into property(categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    db.pool.execute(
        statement,
        [
            categoryId,
            title,
            details,
            address,
            contactNo,
            ownerName,
            isLakeView,
            isTV,
            isAC,
            isWifi,
            isMiniBar,
            isBreakfast,
            isParking,
            guests,
            bedrooms,
            beds,
            bathrooms,
            rent
        ],
        (error, properties) => {
            response.send(utils.createResult(error, properties))
        }
    )
})

router.get('/', (req, res) => {
    const statement = `select * from property`
    db.pool.query(statement, (error, result) => {
        res.send(utils.createResult(error, result))
    })

})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const statement = `select * from property where id = ?`
    db.pool.query(statement, [id], (error, result) => {
        res.send(utils.createResult(error, result))
    })
})

router.put('/', upload.single('icon'), (req, res) => {
    const { id } = req.body
    const filename = req.file.filename
    const statement = `update property set profileImage = ? where id = ?`
    db.pool.query(statement, [filename, id], (error, result) => {
        res.send(utils.createResult(error, result))
    })
})


module.exports = router