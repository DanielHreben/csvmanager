const {get} = require('lodash')
const requireDirectory = require('require-directory')
const services = require('../services')
const classes = requireDirectory(module)

module.exports = function ({app, logger, model}) {
  function route (fullPath) {
    const parts = fullPath.split('.')
    const methodName = parts.pop()
    const Class = get(classes, parts)

    const object = new Class({
      logger,
      model,
      services
    })

    return object[methodName].bind(object)
  }

  app.get('/api/users', route('Users.list'))
  app.post('/api/users/upload', route('Users.upload'))
}
