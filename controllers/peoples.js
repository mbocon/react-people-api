const express = require('express');

const peoplesRouter = express.Router();
const People = require('../models/People');

const admin = require('firebase-admin');
const serviceAccount = require('../service-account-credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

async function isAuthenticated(req, res, next) {
    try {
        const token = req.get('Authorization');
        if (!token) throw new Error('No token found, please login');
        const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        if (!user) throw new Error('Something went wrong, invalid token');
        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

function index(req,res){
    People.find({uId: req.user.uid }, (err, people) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(people);
        }
    })
}

// Index Route - Get all people from the database 
peoplesRouter.get('/', isAuthenticated, (req, res) => {
   index(req,res)
});

// Create Route - Add a new person to the database
peoplesRouter.post('/', isAuthenticated, (req, res) => {
    req.body.uId = req.user.uid;
    People.create(req.body, (err, people) => {
        if (err) {
            res.status(400).json(err);
        } else {
            index(req,res)
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
peoplesRouter.put('/:id', isAuthenticated, (req, res) => {
    People.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, person) => {
        if (err) {
            res.status(400).json(err);
        } else {
            index(req,res)
        }
    })
});

// Delete Route - Delete a single person from the database
peoplesRouter.delete('/:id', isAuthenticated, (req, res) => {
    People.findByIdAndDelete(req.params.id, (err, person) => {
        if (err) {
            res.status(400).json(err);
        } else {
            index(req,res)
        }
    })
});

module.exports = peoplesRouter;