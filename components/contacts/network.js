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
    return response.success(req, res, contact, 200);
  } catch (error) {
    return response.error(req, res, 'Información invalida', 400, error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    await controller.addContact(req.body.contact);
    return response.success(req, res, 'Created successfully', 201);
  } catch (error) {
    return response.error(req, res, 'Información invalida', 400, error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await controller.updateContact(req.params.id, req.body.contact);
    return response.success(req, res, 'Updated successfully', 200);
  } catch (error) {
    return response.error(req, res, 'Invalid information', 400, error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await controller.updateContact(req.params.id, req.body.contact);
    return response.success(req, res, 'Updated successfully', 200);
  } catch (error) {
    return response.error(req, res, 'Invalid information', 400, error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await controller.deleteContact(req.params.id);
    return response.success(req, res, 'Deleted successfully', 200);
  } catch (error) {
    return response.error(req, res, 'Invalid information', 400, error.message);
  }
});

module.exports = router;
