const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controllers');


router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getOne);

router.get('/seats/random', SeatController.getRandom);

router.post('/seats', SeatController.addNew);

router.put('/seats/:id', SeatController.updateOne);

router.delete('/seats/:id', SeatController.deleteOne);