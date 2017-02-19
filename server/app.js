const express = require('express')
const CSVStream = require('csv-streamify')
const db = require('./db')

const app = express()
app.use(express.static('../client'));

app.get('/api/users', (req, res) => {
  db.getUsers(req.query)
  .then(users => res.send({users}))
})


app.post('/api/users/upload', (req, res) => {
  let rows = []
  const csv = req.pipe(new CSVStream({objectMode: true}))

  csv.on('data', chunk => {
    rows.push(chunk)

    if (rows.length > 50) {
      console.log(rows.length)
      csv.pause()

      db.saveUsers(rows)
      .then(() => {
        rows = []
        csv.resume()
      })
    } 
  })

  csv.on('end', () => {
    res.sendStatus(200)
  })
})

app.listen(3000)