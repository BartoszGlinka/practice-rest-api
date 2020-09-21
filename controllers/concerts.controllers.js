const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getOne = async (req, res) => {

    try {
      const dep = await Concert.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
};

exports.getRandom = async (req, res) => {

    try {
      const count = await Concert.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Concert.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.addNew = async (req, res) => {

    try {
  
      const { id, performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ id: id, performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });      
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.updateOne = async (req, res) => {
    const { id, performer, genre, price, day, image } = req.body;
  
    try {
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        await Concert.updateOne({ _id: req.params.id }, { $set: {id: id, performer: performer, genre: genre, price: price, day: day, image: image  }});
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
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });  
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};
