const { Router } = require('express');
const controller = require('./controller');
const response = require('../../network/responses');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const contacts = await controller.retrieveContacts();
    return response.success(req, res, { contacts }, 200);
  } catch (error) {
    return response.error(req, res, 'Server Error', 500, error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await controller.retrieveContactById(id);
    return response.success(req, res, contact, 200);
  } catch (error) {
    console.log(error);
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
    await controller.deleteContact(req.params.id, req.body.contact);
    return response.success(req, res, 'Deleted successfully', 200);
  } catch (error) {
    return response.error(req, res, 'Invalid information', 400, error.message);
  }
});

module.exports = router;
