const express = require('express');

const peoplesRouter = express.Router();

const People = require('../models/People');

// Index Route - Get all people from the database 
peoplesRouter.get('/', (req, res) => {
    People.find({}, (err, people) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(people);
        }
    })
});

// Create Route - Add a new person to the database
peoplesRouter.post('/', (req, res) => { 
    People.create(req.body, (err, people) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(people);
        }
    })
});

// Read/Show Route - Get a single person from the database
peoplesRouter.get('/:id', (req, res) => {
    People.findById(req.params.id, (err, person) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(person);
        }
    })
});

// Update Route - Update a single person in the database
peoplesRouter.put('/:id', (req, res) => {
    People.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, person) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).redirect(`/api/people/${person._id}`);
        }
    })
});

// Delete Route - Delete a single person from the database
peoplesRouter.delete('/:id', (req, res) => {
    People.findByIdAndDelete(req.params.id, (err, person) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).redirect('/api/people');
        }
    })
});

module.exports = peoplesRouter;