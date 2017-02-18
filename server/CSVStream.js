const {Transform} = require('stream')

class CSVStream extends Transform {
  constructor(source) {
    super({objectMode: true})
    this._unfinishedRow = ''
  }

  _write(chunk, encoding, callback) {
    const rows = chunk.toString().split(/^/m)

    if (this._unfinishedRow) {
      const row = this._unfinishedRow + rows.shift()
      console.log(this._unfinishedRow)
      this._unfinishedRow = ''
      rows.unshift(row)
    } 

    const lastRow = rows.pop()
      
    if (lastRow) {
      if (lastRow.endsWith('\n')) {
        rows.push(lastRow)
      } else {
        this._unfinishedRow = lastRow
      }
    }

    this.push(rows.map(row => {
      return row.trim().split(/\s*,\s*/)
    }))

    callback()
  }
}

module.exports = CSVStream