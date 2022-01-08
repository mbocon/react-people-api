// Dependencies

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Initialize the app
const app = express();
require('dotenv').config();

const { PORT = 4000, DATABASE_URL } = process.env;

// Configure middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Configure routes
app.use('/api/people', require('./controllers/peoples'));

// Configure database connection
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to database');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});