const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find(item => item.id == req.params.id));
})

router.route('/seatsss/random').get((req, res) => {
    res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
})

router.route('/seats').post((req, res) => {
    const {author,text} = req.body;
    const id = db.seats.length + 1;

    db.seats.push({id, author, text});

    res.json({ message: 'OK' });
})

router.route('/seats/:id').put((req, res) => {
    const { author, text } = req.body;
    const seats = db.seats.find(item => item.id == req.params.id);

    seats.author = author;
    seats.text = text;

    res.json({ message: 'OK' });
})

router.route('/seats/:id').delete((req, res) => {

    db.seats.splice(db.seats.find(item => item.id == req.params.id), 1);

    res.json({ message: 'OK' });
})

module.exports = router;