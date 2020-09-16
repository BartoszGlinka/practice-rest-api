const express = require('express');

const app = express();
const cors = require('cors');
const path = require('path');
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const testimonials = require('./routes/testimonials.routes');
const seats = require('./routes/seats.routes');
const concerts = require('./routes/concerts.routes');

const socket = require('socket.io');
const io = socket(server);

/*sockets */

io.on('connection', (socket) => {
  console.log('New socket!');
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(cors());


app.use('/api', testimonials); 
app.use('/api', seats);
app.use('/api', concerts);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})