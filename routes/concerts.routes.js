const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concerts.controllers');

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/performer/:performer', ConcertsController.getPerformer);

router.get('/concerts/genre/:genre', ConcertsController.getGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertsController.getPrice);

router.get('/concerts/day/:day', ConcertsController.getDay);

router.get('/concerts/:id', ConcertsController.getOne);

router.get('/concertsss/random', ConcertsController.getRandom);

router.post('/concerts', ConcertsController.addNew);

router.put('/concerts/:id', ConcertsController.updateOne);

router.delete('/concerts/:id', ConcertsController.deleteOne);

module.exports = router;