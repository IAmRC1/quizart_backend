const express = require('express');
const app = express();
const cors = require('cors')
const session = require('express-session');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const config = require('config');

const { serverStatus, log } = require('./utils/chalk');
const connectDB = require('./database/connect');

app.set('view engine', 'ejs');
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :remote-user'));
// morgan('combined', {
//   skip: function (req, res) { return res.statusCode < 400 }
// })

// Middlewares
app.use(cors());
app.use(errorhandler());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));
app.use(function (req, res, next) {
  console.log ("inside middleware");
  next();
});

// Connect to the database
connectDB();

// Error handling
app.use(function(err, req, res, next) {
  log(error(err.stack))
  res.status(500).send('Something broke!')
})

// Routes
app.use('/api/v1', require('./routes'));
// v2, v3 can be added here

// Start the server
const port = config.get('port');
app.listen(port, () => {
  log(serverStatus(`Server is running on port ${port}`))
});
