const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.find(item => item.id == req.params.id));
})

router.route('/concertsss/random').get((req, res) => {
    res.json(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
})

router.route('/concerts').post((req, res) => {
    const {author,text} = req.body;
    const id = db.concerts.length + 1;

    db.concerts.push({id, author, text});

    res.json({ message: 'OK' });
})

router.route('/concerts/:id').put((req, res) => {
    const { author, text } = req.body;
    const concerts = db.concerts.find(item => item.id == req.params.id);

    concerts.author = author;
    concerts.text = text;

    res.json({ message: 'OK' });
})

router.route('/concerts/:id').delete((req, res) => {

    db.concerts.splice(db.concerts.find(item => item.id == req.params.id), 1);

    res.json({ message: 'OK' });
})

module.exports = router;