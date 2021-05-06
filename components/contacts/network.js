const { Router } = require('express');
const controller = require('./controller');
const response = require('../../network/responses');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const {
      contacts,
      numberOfContacts,
    } = await controller.getContacts(req.query.page, req.query.search);

    return response.success(req, res, { contacts, pages: Math.ceil(numberOfContacts / 10) }, 200);
  } catch (error) {
    return response.error(req, res, 'Server Error', 500, error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await controller.getContactById(id);
    if (!contact) {
      const contactDoesNotExist = new Error('A contact with this ID does not exist');
      contactDoesNotExist.name = 'ContactDoesNotExist';
      throw contactDoesNotExist;
    }
    return response.success(req, res, contact, 200);
  } catch (error) {
    let errorMessage;
    let statusCode;

    if (error.name === 'ContactDoesNotExist') {
      errorMessage = error.message;
      statusCode = 400;
    } else {
      errorMessage = 'Server Error';
      statusCode = 500;
    }

    return response.error(req, res, errorMessage, statusCode, error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const contact = await controller.addContact(req.body.contact);
    return response.success(req, res, { contact }, 201);
  } catch (error) {
    const errors = {};
    let statusCode;
    if (error.name === 'MongoError') {
      console.log('im');
      if (error.message.includes('phone_number')) {
        console.log('in');
        errors.phone_number = 'phone number must be unique';
      }
      if (error.message.includes('email')) {
        errors.email = 'email must be unique';
      }
    }

    if (error.name !== 'MongoError') {
      if (error.errors.name) errors.name = error.errors.name.message;
      if (error.errors.last_name) errors.last_name = error.errors.last_name.message;
      if (error.errors.email) errors.email = error.errors.email.message;
      if (error.errors.phone_number) errors.phone_number = error.errors.phone_number.message;
      if (error.errors.company) errors.message = error.errors.company.message;
    }

    if (errors) { statusCode = 400; } else { statusCode = 500; }

    return response.error(req, res, errors || 'Server Error', statusCode, error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const contact = await controller.updateContact(req.params.id, req.body.contact);

    return response.success(req, res, { contact }, 200);
  } catch (error) {
    console.log('pet');
    const errors = {};
    let statusCode;
    if (error.name === 'MongoError') {
      console.log(error.message);
      if (error.message.includes('phone_number')) {
        errors.phone_number = 'phone number must be unique';
      }
      if (error.message.includes('email')) {
        errors.email = 'email must be unique';
      }
    }

    if (error.name !== 'MongoError') {
      if (error.errors.name) errors.name = error.errors.name.message;
      if (error.errors.last_name) errors.last_name = error.errors.last_name.message;
      if (error.errors.email) errors.email = error.errors.email.message;
      if (error.errors.phone_number) errors.phone_number = error.errors.phone_number.message;
      if (error.errors.company) errors.message = error.errors.company.message;
    }

    if (errors) { statusCode = 400; } else { statusCode = 500; }

    return response.error(req, res, errors || 'Server Error', statusCode, error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const contact = await controller.updateContact(req.params.id, req.body.contact);

    return response.success(req, res, { contact }, 200);
  } catch (error) {
    const errors = {};
    let statusCode;
    if (error.name === 'MongoError') {
      console.log(error.message);
      if (error.message.includes('phone_number')) {
        errors.phone_number = 'phone number must be unique';
      }
      if (error.message.includes('email')) {
        errors.email = 'email must be unique';
      }
    }

    if (error.name !== 'MongoError') {
      if (error.errors.name) errors.name = error.errors.name.message;
      if (error.errors.last_name) errors.last_name = error.errors.last_name.message;
      if (error.errors.email) errors.email = error.errors.email.message;
      if (error.errors.phone_number) errors.phone_number = error.errors.phone_number.message;
      if (error.errors.company) errors.message = error.errors.company.message;
    }

    if (errors) { statusCode = 400; } else { statusCode = 500; }

    return response.error(req, res, errors || 'Server Error', statusCode, error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const contact = await controller.deleteContact(req.params.id);

    if (!contact) {
      const contactDoesNotExist = new Error('A contact with this ID does not exist');
      contactDoesNotExist.name = 'ContactDoesNotExist';
      throw contactDoesNotExist;
    }

    return response.success(req, res, 'Deleted successfully', 200);
  } catch (error) {
    let errorMessage;
    let statusCode;

    if (error.name === 'ContactDoesNotExist') {
      errorMessage = error.message;
      statusCode = 400;
    } else {
      errorMessage = 'Server Error';
      statusCode = 500;
    }

    return response.error(req, res, errorMessage, statusCode, error.message);
  }
});

module.exports = router;
