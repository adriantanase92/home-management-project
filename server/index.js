const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();

mongoose.connect('mongodb://localhost:27017/vue_express', {
    useNewUrlParser: true
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const users = require('./routes/api/users');

app.use('/api/users', users);

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));