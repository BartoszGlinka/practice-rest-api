const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getOne = async (req, res) => {

    try {
      const dep = await Seat.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
};

exports.getRandom = async (req, res) => {

    try {
      const count = await Seat.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Seat.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.addNew = async (req, res) => {

    try {
  
      const { id, day, seat, client, email } = req.body;
      const newSeat = new Seat({ id: id, day: day, seat: seat, client: client, email: email});
      await newSeat.save();
      res.json({ message: 'OK' });      
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.updateOne = async (req, res) => {
    const { id, day, seat, client, email } = req.body;
  
    try {
      const dep = await(Seat.findById(req.params.id));
      if(dep) {
        await Seat.updateOne({ _id: req.params.id }, { $set: {id: id, day: day, seat: seat, client: client, email: email }});
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
};

exports.deleteOne = async (req, res) => {

    try {
      const dep = await(Seat.findById(req.params.id));
      if(dep) {
        await Seat.deleteOne({ _id: req.params.id });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};
