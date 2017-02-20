const CSVStream = require('csv-streamify')
const Service = require('../Service')

const batchSize = 50

class Upload extends Service {
  execute (stream) {
    let rows = []
    let totalRowsCount = 0

    const csv = stream.pipe(new CSVStream({objectMode: true}))

    return new Promise((resolve, reject) => {
      csv.on('data', chunk => {
        rows.push(chunk)

        if (rows.length > batchSize) {
          csv.pause()
          totalRowsCount += rows.length

          this._saveUsers(rows)
          .then(() => csv.resume())
          .catch(reject)

          rows = []
        }
      })

      csv.on('end', () => {
        totalRowsCount += rows.length

        this._saveUsers(rows)
        .then(() => {
          resolve({
            users: {count: totalRowsCount}
          })
        })
      })

      csv.on('error', reject)
    })
  }

  _saveUsers (rows) {
    const createdAt = new Date()
    const users = rows.map(row => {
      return {
        firstName: row[0],
        lastName: row[1],
        email: row[2],
        createdAt
      }
    })

    return this.model.collection('users').insertMany(users)
  }
}

module.exports = Upload
