const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: { type: String },
  fname: { type: String, trim: true, required: true }, 
  lname: { type: String, trim: true, required: true },
  username: { unique: true, type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  email: { unique: true, type: String, trim: true, required: true },
  phone: { type: String, required: true },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;