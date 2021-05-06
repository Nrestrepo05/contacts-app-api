const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'name is required'],
    minLength: [2, 'name should have at least 2 characters'],
    maxLength: [70, 'name is too long'],
    match: [/^[a-zA-Z\u00C0-\u017F\s]+$/, 'name can only contains letters'],
  },
  last_name: {
    type: String,
    trim: true,
    required: [true, 'last name is required'],
    minLength: [2, 'last name should have at least 2 characters'],
    maxLength: [70, 'last name is too long'],
    match: [/^[a-zA-Z\u00C0-\u017F\s]+$/, 'last name can only contains letters'],
  },
  company: {
    type: String,
    trim: true,
    minLength: 0,
    maxLength: [70, 'company is too long'],
  },
  phone_number: {
    type: String,
    trim: true,
    match: [/^[+]*[\d]{0,4}[\d]{3,4}[0-9]{7,9}$/, 'phone number must be valid'],
    index: true,
    unique: [true, 'Phone number must be unique'],
    sparse: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'email is required'],
    unique: [true, 'email must be unique'],
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'email must be valid'],
  },
});

const contactModel = mongoose.model('contacts', ContactSchema);

module.exports = contactModel;
