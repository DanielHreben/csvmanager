const Datastore = require('nedb-promise')
const db = new Datastore({
  filename: '../users.json',
  autoload: true
})

db.ensureIndex({fieldName: 'firstName'})
db.ensureIndex({fieldName: 'lastName'})
db.ensureIndex({fieldName: 'email'})

function saveUsers(rows) {
  const users = rows.map(row => {
    return {
      firstName: row[0],
      lastName: row[1],
      email: row[2]
    }
  })

  return db.insert(users)
}

function getUsers({limit = 30, skip = 0}) {
  return db.cfind()
  .limit(limit)
  .skip(skip)
  .exec()
}

module.exports = {
  saveUsers,
  getUsers
}