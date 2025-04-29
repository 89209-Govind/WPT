const express = require('express');
const db = require('./db');
const utils = require('./utils');
const multer = require('multer');

const upload = multer({ dest: 'images' });

const router = express.Router();

router.get('/', (request, response) => {
    const statement = `SELECT * FROM category;`;
    db.pool.query(statement, (error, results) => {
        response.send(utils.createResult(error, results));
    });
});

router.post('/', upload.single('icon'), (request, response) => {
    const { title, details } = request.body;

    const fileName = request.file.filename;
    const statement = `INSERT INTO category (title, details, image) VALUES (?, ?, ?)`;

    db.pool.execute(
        statement,
        [title, details, fileName],
        (error, results) => {
            response.send(utils.createResult(error, results));
        }
    );
});

module.exports = router;