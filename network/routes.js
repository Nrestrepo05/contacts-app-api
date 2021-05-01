const contacts = require('../components/contacts/network');

const routes = (server) => {
  server.use('/contacts', contacts);
};

module.exports = routes;
