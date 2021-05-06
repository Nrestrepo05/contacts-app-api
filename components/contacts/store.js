const ContactModel = require('./model');

async function getContacts(page, search) {
  let numberOfContacts = 0;
  const searchRegex = new RegExp(search, 'i');
  const searchExpression = {
    $or: [
      { name: searchRegex },
      { last_name: searchRegex },
      { email: searchRegex },
      { phone_number: searchRegex },
      { company: searchRegex },
    ],
  };

  if (!search) {
    await ContactModel.estimatedDocumentCount((err, count) => {
      if (err) {
        console.log(err);
      } else {
        numberOfContacts = count;
      }
    });
  } else {
    await ContactModel.countDocuments(searchExpression, (err, count) => {
      if (err) {
        console.log(err);
      } else {
        numberOfContacts = count;
      }
    });
  }

  const contacts = await ContactModel.find(searchExpression)
    .limit(10)
    .skip((page - 1) * 10);
  return { contacts, numberOfContacts };
}

async function getContact(id) {
  const contact = await ContactModel.findById(id);
  return contact;
}

function addContact(contact) {
  const newContact = new ContactModel(contact);
  return newContact.save();
}

async function updateContact(id, contactInfo) {
  const contact = await ContactModel.findByIdAndUpdate(
    id, contactInfo, { new: true, runValidators: true },
  );
  return contact;
}

async function deleteContact(id) {
  return ContactModel.findByIdAndDelete(id);
}

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
