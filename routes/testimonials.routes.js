const express = require('express');
const router = express.Router();

const TestimonialsController = require('../controllers/testimonials.controllers');


router.get('/testimonials', TestimonialsController.getAll);

router.get('/testimonials/:id', TestimonialsController.getOne);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.post('/testimonials', TestimonialsController.addNew);

router.put('/testimonials/:id', TestimonialsController.updateOne);

router.delete('/testimonials/:id', TestimonialsController.deleteOne);