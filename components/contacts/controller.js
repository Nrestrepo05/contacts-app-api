const store = require('./store');

async function getContacts(page, search) {
  try {
    return await store.getContacts(page, search);
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

async function getContactById(id) {
  try {
    return await store.getContact(id);
  } catch (error) {
    return error;
  }
}

async function addContact(contact) {
  try {
    return store.addContact(contact);
  } catch (error) {
    console.error(error.message);
    return error;
  }
}

async function updateContact(id, contactInfo) {
  try {
    return await store.updateContact(id, contactInfo);
  } catch (error) {
    return error;
  }
}

async function deleteContact(id) {
  try {
    return await store.delete(id);
  } catch (error) {
    return error;
  }
}

module.exports = {
  addContact,
  updateContact,
  getContacts,
  getContactById,
  deleteContact,
};
