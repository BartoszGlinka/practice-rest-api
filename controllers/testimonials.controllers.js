const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getOne = async (req, res) => {

    try {
      const dep = await Testimonial.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
};

exports.getRandom = async (req, res) => {

    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Testimonial.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.addNew = async (req, res) => {

    try {
  
      const { id, author, text } = req.body;
      const clean = sanitize(req.params.author);
      const newSeat = new Testimonial({ id: id, author: clean, text: text});
      await newSeat.save();
      res.json({ message: 'OK' });      
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.updateOne = async (req, res) => {
    const { id, author, text } = req.body;
  
    try {
      const dep = await(Testimonial.findById(req.params.id));
      if(dep) {
        await Testimonial.updateOne({ _id: req.params.id }, { $set: {id: id, author: author, text: text}});
        res.json({ message: 'OK' });  
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
};

exports.deleteOne = async (req, res) => {

    try {
      const dep = await(Testimonial.findById(req.params.id));
      if(dep) {
        await Testimonial.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });  
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};
