const {MongoClient} = require('mongodb')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/csvmanager'
module.exports = () => {
  return MongoClient.connect(url)
  .then(db => {
    return db.collection('users').createIndex({createdAt: 1})
    .then(() => db)
  })
}
