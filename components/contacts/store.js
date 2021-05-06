const ContactModel = require('./model');

async function getContacts(page, search) {
  try {
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
    const contact = await ContactModel.findByIdAndUpdate(id, contactInfo, { new: true });
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
