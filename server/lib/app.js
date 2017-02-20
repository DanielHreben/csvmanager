const express = require('express')
const bunyan = require('bunyan')
const path = require('path')
const fallback = require('express-history-api-fallback')

const logger = bunyan.createLogger({name: 'csvmanager'})
const staticPath = path.resolve(__dirname, '..', '..', 'client', 'public')

const app = express()
.use(express.static(staticPath))
.use(fallback('index.html', { root: staticPath }))

const initModel = require('./model')
const initControllers = require('./controllers')
const services = require('./services')

initModel()
.then(model => initControllers({app, services, model, logger}))
.then(() => app.listen(process.env.PORT || 3000))
.catch(error => logger.error(error))
