const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'name should have at least 2 characters'],
    maxLength: [70, 'name is too long'],
    match: [/^[A-Za-z\s]+$/, 'name can only contains letters'],
  },
  last_name: {
    type: String,
    required: true,
    minLength: [2, 'last name should have at least 2 characters'],
    maxLength: [70, 'last name is too long'],
    match: [/^[A-Za-z\s]+$/, 'last name can only contains letters'],
  },
  company: {
    type: String,
    minLength: 0,
    maxLength: [70, 'company is too long'],
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
