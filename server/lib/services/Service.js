const LIVR = require('livr')
const ServiceError = require('./Error')

LIVR.Validator.defaultAutoTrim(true)

module.exports = class Service {
  constructor ({logger, model}) {
    this.logger = logger
    this.model = model
  }

  _validate (params, rules) {
    if (!rules) {
      return params
    }

    let validator = new LIVR.Validator(rules)
    let result = validator.validate(params)

    if (result) {
      return result
    }

    let fields = validator.getErrors()
    this.logger.info('Validation error:', fields)

    throw new ServiceError('Validation error', {
      fields: fields,
      code: 'FROMAT_ERROR'
    })
  }

  run (params) {
    return Promise.resolve()
    .then(() => this._validate(params, this.rules))
    .then(validatedParams => this.execute(validatedParams))
  }
}
