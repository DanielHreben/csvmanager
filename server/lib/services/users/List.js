const Service = require('../Service')

class List extends Service {
  get rules () {
    return {
      limit: [ 'integer', {min_number: 1} ],
      skip: [ 'integer', {min_number: 1} ]
    }
  }

  execute ({limit = 50, skip = 0}) {
    const users = this.model.collection('users')

    return Promise.all([
      users
      .find({})
      .sort({createdAt: 1})
      .limit(limit)
      .skip(parseInt(skip))
      .toArray(),

      users.count()
    ])
    .then(([data, count]) => {
      return {
        users: data.map(user => {
          return {
            id: user._id,
            createdAt: user.createdAt,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        }),
        totalCount: count
      }
    })
  }
}

module.exports = List
