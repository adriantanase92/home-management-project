const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

const router = express.Router();


// Get Users
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray());
});

// Add Users
router.post('/', async (req, res) => {
    const users = await loadUsersCollection();
    await users.insertOne({
        fullname: `${req.body.fname} ${req.body.lname}`,
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        password: bcrypt.hashSync(req.body.password, 10),
        createdAt: new Date()
    });
    res.status(201).send();
});

// Load a specific User
router.get('/:id', async (req, res) => {
    const users = await loadUsersCollection();
    let id = req.params.id;
    users.find( { _id : new mongodb.ObjectID(id) } ).toArray(function (err, result) {
        res.json(result[0]);
    });
});

// Update User
router.put('/:id', async (req, res) => {
    const users = await loadUsersCollection();
    let editUser = {
        fullname: `${req.body.fname} ${req.body.lname}`,
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
    }
    let id = req.params.id;
    users.updateOne( { _id : new mongodb.ObjectID(id) }, { $set: editUser }, function (err, result) {
        res.status(201).send();
    });
});

// Delete Users
router.delete('/:id', async (req, res) => {
    const users = await loadUsersCollection();
    await users.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/vue_express', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('users');
}

module.exports = router;