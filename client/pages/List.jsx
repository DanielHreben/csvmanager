import React from 'react'
import { Button, PageHeader, Table } from 'react-bootstrap'

class List extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [],
      page: 1
    }
  }

  componentWillMount () {
    fetch('/api/users')
    .then(response => response.json())
    .then(data => {
      this.setState({users: data.users})
    })
  }

  render () {
    return (<div>
      <PageHeader> Users list </PageHeader>

      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(user => {
            return <tr>
              <td>1</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>)
  }
}

export default List
