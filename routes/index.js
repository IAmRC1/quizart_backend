const app = require('express')();

app.use('/course', require('./course'));
// Further routes can be added here

module.exports = app;
