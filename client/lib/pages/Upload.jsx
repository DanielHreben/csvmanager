import React from 'react'
import { Button, PageHeader, ProgressBar, Alert, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import api from '../api'

class Upload extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      inProgress: false,
      alert: false
    }
  }

  handleUpload () {
    this.setState({
      inProgress: true
    })

    api.users.upload(this.state.file)
    .then(response => {
      this.setState({
        file: null,
        inProgress: false,
        alert: {users: response.users}
      })
    })
  }

  handleFileSelect (event) {
    console.log(event.target.files[0])
    this.setState({
      file: event.target.files[0]
    })
  }

  onAlertDismiss () {
    this.setState({
      alert: false
    })
  }

  render () {
    const fileinfo = this.state.file
      ? <ListGroup>
        <ListGroupItem>Size: {this.state.file.size / 1000} kb</ListGroupItem>
        <ListGroupItem>Last modified: {this.state.file.lastModifiedDate.toLocaleString()}</ListGroupItem>
      </ListGroup>
      : null

    const upload = this.state.inProgress
      ? <div>
        <b>Uploading...</b>
        <ProgressBar active now={100} />
      </div>
      : <div>
        <input type='file' accept='.csv' onChange={this.handleFileSelect.bind(this)} />
        <br />
        {fileinfo}
        <Button bsStyle='primary' disabled={!this.state.file} onClick={this.handleUpload.bind(this)}> Upload </Button>
      </div>

    const alert = this.state.alert
      ? <Alert bsStyle='success' onDismiss={this.onAlertDismiss.bind(this)}>
        <strong>Upload finished!</strong> Uploaded {this.state.alert.users.count} users
      </Alert>
      : null

    return (<div>
      <PageHeader> Add new users </PageHeader>
      <br />
      {alert}
      <Panel header='Select file to upload' bsStyle='primary'>
        {upload}
      </Panel>
    </div>)
  }
}

export default Upload
