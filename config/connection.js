const { connect, connection } = require('mongoose');

connect(process.env.MONGO_DB)

module.exports = connection;

