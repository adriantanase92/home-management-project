const config = require('../config');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(`${config.MONGODB_URI}`, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection Successful!");
    
    // define Schema
    const UserSchema = mongoose.Schema({
        fullname: { type: String },
        fname: { type: String, trim: true, required: true }, 
        lname: { type: String, trim: true, required: true },
        username: { unique: true, type: String, trim: true, required: true },
        password: { type: String, trim: true, required: true },
        email: { unique: true, type: String, trim: true, required: true },
        phone: { type: Number, required: true },
        salary: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now }
    });
 
    // compile schema to model
    const User = mongoose.model('User', UserSchema, 'users');
 
    // a document instance
    let adminUser = new User({ 
        _id: new ObjectID(),
        fullname: "Adrian Tanase",
        fname: "Adrian",
        lname: "Tanase",
        username: "adrian",
        password: bcrypt.hashSync("Administrator@1", 10),
        email: "tanase.adrian92@gmail.com",
        phone: 762615711,
        salary: 7200,
        createdAt: new Date()
    });
 
    // save model to database
    adminUser.save(function (err, user) {
      if (err) return console.error(err);
      console.log("Admin user was saved to users collection.");
    });
    
});