import React from 'react'
import { Button, PageHeader } from 'react-bootstrap'

class Upload extends React.Component {
  handleUpload () {
    fetch('/api/users/upload', {
      method: 'POST',
      body: this.state.file
    })
    .then(() => {
      alert('Upload finished')
    })
  }

  handleFileSelect (event) {
    this.setState({
      file: event.target.files[0]
    })
  }

  render () {
    return (<div>
      <PageHeader> Select file to upload </PageHeader>
      <br />
      <input type='file' onChange={this.handleFileSelect.bind(this)} />
      <Button onClick={this.handleUpload.bind(this)}> Upload </Button>
    </div>)
  }
}

export default Upload
