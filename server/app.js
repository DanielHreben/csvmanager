const express = require('express')
const app = express()

const CSVStream = require('./CSVStream')
const db = require('./db')

app.use(express.static('../client'));

app.get('/api/users', (req, res) => {
  db.getUsers(req.query)
  .then(users => res.send({users}))
})


app.post('/api/users/upload', (req, res) => {
  let rows = []
  const csv = req.pipe(new CSVStream())

  csv.on('data', chunk => {
    rows = rows.concat(chunk)

    if (rows.length > 20) {
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