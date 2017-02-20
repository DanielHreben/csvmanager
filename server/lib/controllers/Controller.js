const ServiceError = require('../services/Error')
const {get} = require('lodash')

module.exports = class Route {
  constructor ({analytics, logger, model, queue, services}) {
    this.logger = logger
    this.model = model
    this.services = services
  }

  runService (name, params, res) {
    const Service = get(this.services, name)

    if (!Service) {
      throw new Error(`Can't find service by name:`, name)
    }

    const serviceCall = new Service({
      model: this.model,
      logger: this.logger
    })
    .run(params)

    return this._renderPromise(serviceCall, res)
  }

  _renderPromise (promise, res) {
    Promise.resolve(promise).then(data => res.send(data))
    .catch(error => {
      if (error instanceof ServiceError) {
        return res.status(400).json({error: error.toJSON()})
      }

      this.logger.error({
        msg: 'Unexpected error',
        err: error
      })

      res.status(500).json({error: {
        message: 'Something went wrong! Please, try again later.',
        code: 'UNEXPECTED_ERROR'
      }})
    })
  }
}
