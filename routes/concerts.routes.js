const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concerts.controllers');

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/:id', ConcertsController.getOne);

router.get('/concertsss/random', ConcertsController.getRandom);

router.post('/concerts', ConcertsController.addNew);

router.put('/concerts/:id', ConcertsController.updateOne);

router.delete('/concerts/:id', ConcertsController.deleteOne);