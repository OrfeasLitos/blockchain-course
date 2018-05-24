require('dotenv').config()

const LISTEN_PORT = process.env.PORT || 3000
const winston = require('winston')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const passport = require('./auth')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session');

(async () => {
  app.use(helmet())
  app.use(cors({credentials: true}))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  app.use(session({
    secret: process.env.APP_SECRET || 'blockchain course default session secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  for (const url in routes) {
    app.use(url, routes[url])
  }

  app.listen(LISTEN_PORT, () => {
    winston.info('Blockchain Course API server running on port ' + LISTEN_PORT)
  })
})()
