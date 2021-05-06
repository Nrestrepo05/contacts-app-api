const store = require('./store');

async function getContacts(page, search) {
  return store.getContacts(page, search);
}

async function getContactById(id) {
  return store.getContact(id);
}

async function addContact(contact) {
  return store.addContact(contact);
}

async function updateContact(id, contactInfo) {
  return store.updateContact(id, contactInfo);
}

async function deleteContact(id) {
  return store.deleteContact(id);
}

module.exports = {
  addContact,
  updateContact,
  getContacts,
  getContactById,
  deleteContact,
};
