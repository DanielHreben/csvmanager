const Controller = require('./Controller')

class Users extends Controller {
  upload (req, res) {
    this.runService('users.Upload', req, res)
  }

  list (req, res) {
    this.runService('users.List', req.query, res)
  }
}

module.exports = Users
