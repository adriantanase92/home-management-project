const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', (err) => console.log(err));

// Imports routes
const user = require('./routes/api/user.route');
const expense = require('./routes/api/expense.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/users', user);
app.use('/api/expenses', expense);


const User = require('./models/user.model');
//routes
app.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: "server error",
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: "user not found",
                error: "invalid credentials"
            });
        }
        //incorrect password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                tite: "login failed",
                error: "invalid credentials"
            });
        }
        //IF ALL IS GOOD create a token and send to frontend
        let token = jwt.sign({ userId: user._id }, "secretkey");
        return res.status(200).json({
            title: "login sucess",
            token: token
        });
    });
});

app.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true});
});
