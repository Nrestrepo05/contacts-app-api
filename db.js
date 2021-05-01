const db = require('mongoose');

db.Promise = global.Promise;

async function connect(url, dbName) {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName,
  });
  console.log('[db] Connected successfully');
}

module.exports = connect;
