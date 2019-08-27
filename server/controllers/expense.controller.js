const User = require('../models/user.model');
const Expense = require('../models/expense.model');

exports.details_all = function (req, res) {
    Expense.find({}, function(err, expenses) { res.send(expenses); });
};

exports.create = function (req, res, next) {

    let expense = new Expense(
        {
            name: req.body.name,
            type: req.body.type,
            fixedType: req.body.fixedType,
            start: req.body.date,
            end: req.body.date,
            cost: req.body.cost,
            status: req.body.status,
            color: req.body.color,
            paidBy: req.body.paidBy,
            details: req.body.details,
            createdAt: new Date()            
        }
    );

    expense.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send('Expense created successfully')
    })
};

exports.details = function (req, res, next) {
    Expense.findById(req.params.id, function (err, expense) {
        if (err) return next(err);
        res.status(201).send(expense);
    })
};

exports.update = function (req, res, next) {
    Expense.findByIdAndUpdate(req.params.id, {$set: req.body}, {useFindAndModify: false}, function (err, expense) {
        if (err) return next(err);
        res.status(201).send('Expense udpated.');
    });
};

exports.delete = function (req, res, next) {
    Expense.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.status(201).send('Expense deleted successfully!');
    })
};