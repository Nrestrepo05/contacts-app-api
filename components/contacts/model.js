const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 70,
    match: [/^[A-Za-z]+$/, 'name can only contains letter'],
  },
  last_name: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, 'last name can only contains letter'],
  },
  company: {
    type: String,
    minLength: 0,
    maxLength: 70,
  },
  phone_number: {
    type: String,
    match: [/[+]*[\d]{0,4}[\d]{3,4}[0-9]{7,9}/, 'phone number must be valid'],
    unique: [true, 'Phone number must be unique'],
  },
  email: {
    type: String,
    unique: true,
    match: [/[\w-.]+@([\w-]+\.)+[\w-]{2,4}/, 'email must be valid'],
  },
});

const contactModel = mongoose.model('contacts', ContactSchema);

module.exports = contactModel;
