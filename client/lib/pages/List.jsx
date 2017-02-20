import React from 'react'
import { Button, PageHeader, Table, Pagination } from 'react-bootstrap'
import api from '../api'

const pageSize = 50

class List extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      totalCount: 0,
      users: [],
      activePage: 1
    }
  }

  componentWillMount () {
    api.users.list()
    .then(data => {
      this.setState(data)
    })
  }

  handlePageSelect (pageNumber) {
    api.users.list({
      skip: pageNumber * pageSize
    })
    .then(data => {
      this.setState({
        users: data.users,
        totalCount: data.totalCount,
        activePage: pageNumber
      })
    })
  }

  render () {
    return (<div>
      <PageHeader> Users list </PageHeader>

      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(user => {
            return <tr>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          })}
        </tbody>
      </Table>

      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={Math.floor(this.state.totalCount / pageSize)}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handlePageSelect.bind(this)}
      />

    </div>)
  }
}

export default List
