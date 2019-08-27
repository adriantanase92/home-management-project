const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.details_all = function (req, res) {
    User.find({}, function(err, users) { res.send(users); });
};

exports.create = function (req, res, next) {
    let user = new User(
        {
            fullname: `${req.body.fname} ${req.body.lname}`,
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            salary: req.body.salary,
            password: bcrypt.hashSync(req.body.password, 10),
            createdAt: new Date()
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send('User created successfully')
    })
};

exports.details = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.status(201).send(user);
    })
};

exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {useFindAndModify: false}, function (err, user) {
        if (err) return next(err);
        res.status(201).send('User udpated.');
    });
};

exports.delete = function (req, res, next) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.status(201).send('User deleted successfully!');
    })
};