const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/socialDb')

module.exports = mongoose.connection;

