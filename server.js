const app = require('express')()
const session = require('express-session');
const logger = require('morgan');
const birds = require('./birds')

const port = 8081

app.set('view engine', 'ejs');
app.use(logger('dev'));


// Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/birds', birds)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})