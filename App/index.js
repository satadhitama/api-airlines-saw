const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const multer = require('multer')

const routes = require('../Routes');
const datastore = require('../Datastore')
const config = require('../Config');

const app = express();
const upload = multer();

async function start() {
  await datastore.mongoDB.client.createClient().then(()=> {
    console.log('MongoDB Connected')
  }).catch(error => {
    console.log(error)
  })

  // await datastore.firebase.client.createClient()

  if (config.app.env == 'production') app.use(morgan('common'))
  else {
    app.use(morgan('dev'))
  }

  // Setting up View Engine For root
  // app.set('view engine', 'ejs')
  // app.set('views', './Views')

  // for parsing application/json
  app.use(express.json('*/*'));
  // for parsing application/xwww-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  // for parsing multipart/form-data
  app.use(upload.any());
  app.use(express.static('public'));

  // Setting up CORS
  app.use(cors({origin: config.cors.origin}))

  // app.use('/', routes.index) // Root
  app.use('/account', routes.account) // Account Base Routes
  app.use('/admin', routes.admin) // Admin Base Routes

  app.listen(config.app.port || 5000, ()=> {
    console.log('Application Running on Port', config.app.port)
  });
}

async function stop() {
  await datastore.mongoDB.closeClient().then(()=>{
    console.log('MongoDB disconected')
  })
  process.exit(1)
}

module.exports = {
  start, stop
}