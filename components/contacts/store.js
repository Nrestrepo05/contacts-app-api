const ContactModel = require('./model');

async function getContacts() {
  try {
    const contacts = await ContactModel.find();
    return contacts;
  } catch (error) {
    return error;
  }
}

async function getContact(id) {
  try {
    const contact = await ContactModel.findById(id);
    return contact;
  } catch (error) {
    return error;
  }
}

function addContact(contact) {
  try {
    const newContact = new ContactModel(contact);
    return newContact.save();
  } catch (error) {
    return error;
  }
}

async function updateContact(id, contactInfo) {
  try {
    const contact = await ContactModel.findByIdAndUpdate(id, contactInfo);
    return contact;
  } catch (error) {
    return error;
  }
}

async function deleteContact(id) {
  try {
    return await ContactModel.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
}

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
