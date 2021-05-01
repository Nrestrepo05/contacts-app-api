const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: /[\w\s]+/,
    minLength: 2,
    maxLength: 70,
  },
  last_name: {
    type: String,
    required: true,
    match: /[\w\s]+/,
    minLength: 2,
    maxLength: 70,
  },
  company: String,
  phone_number: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/,
  },
});

const contactModel = mongoose.model('contacts', ContactSchema);

module.exports = contactModel;
