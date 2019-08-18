const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: String,
  lname: String,
  username: {
    unique: true,
    type: String
  },
  password: String,
  email: String,
  phone: Number,
  salary: Number,  
})

const User = mongoose.model('User', userSchema);
module.exports = User;