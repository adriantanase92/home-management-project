const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get Expenses
router.get('/', async (req, res) => {
    const expenses = await loadExpensesCollection();
    res.send(await expenses.find({}).toArray());
});

// Add Expenses
router.post('/', async (req, res) => {
    const expenses = await loadExpensesCollection();
    await expenses.insertOne({
        name: req.body.name,
        type: req.body.type,
        fixedType: req.body.fixedType,
        month: req.body.month,
        cost: req.body.cost,
        status: req.body.status,
        paidBy: req.body.paidBy,
        details: req.body.details,
        createdAt: new Date()       
    });
    res.status(201).send();
});

// Load a specific Expense
router.get('/:id', async (req, res) => {
    const expenses = await loadExpensesCollection();
    let id = req.params.id;
    expenses.find( { _id : new mongodb.ObjectID(id) } ).toArray(function (err, result) {
        res.json(result[0]);
    });
});

// Update Expense
router.put('/:id', async (req, res) => {
    const expenses = await loadExpensesCollection();
    let editUser = {
        name: req.body.name,
        type: req.body.type,
        fixedType: req.body.fixedType,
        month: req.body.month,
        cost: req.body.cost,
        status: req.body.status,
        paidBy: req.body.paidBy,
        details: req.body.details
    }
    let id = req.params.id;
    expenses.updateOne( { _id : new mongodb.ObjectID(id) }, { $set: editUser }, function (err, result) {
        res.status(201).send();
    });
});

// Delete Expense
router.delete('/:id', async (req, res) => {
    const expenses = await loadExpensesCollection();
    await expenses.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadExpensesCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/vue_express', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('expenses');
}

module.exports = router;