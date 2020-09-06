const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.find(item => item.id == req.params.id));
})

router.route('/testimonialsss/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
})

router.route('/testimonials').post((req, res) => {
    const {author,text} = req.body;
    const id = db.testimonials.length + 1;

    db.testimonials.push({id, author, text});

    res.json({ message: 'OK' });
})

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;
    const testimonials = db.testimonials.find(item => item.id == req.params.id);

    testimonials.author = author;
    testimonials.text = text;

    res.json({ message: 'OK' });
})

router.route('/testimonials/:id').delete((req, res) => {

    db.testimonials.splice(db.testimonials.find(item => item.id == req.params.id), 1);

    res.json({ message: 'OK' });
})

module.exports = router;