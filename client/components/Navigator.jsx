import React from 'react'
import { withRouter } from 'react-router'
import { Nav, NavItem, Navbar } from 'react-bootstrap'

const linksBar = {
  list: {
    title: 'Users list',
    links: [ 'upload' ]
  },
  upload: {
    title: 'Upload CSV',
    links: [ 'list' ]
  },
  notFound: {
    title: 'This page not found',
    links: [ 'list', 'upload' ]
  }
}

class Navigator extends React.Component {
  handleSelect (key) {
    this.props.router.push(key)
  }

  render () {
    const currentPath = this.props.location.pathname.substring(1) || 'list'
    const navLinks = (linksBar[currentPath] || linksBar.notFound).links.map(link => {
      return <NavItem key={link} eventKey={'/' + link}> {linksBar[link].title}</NavItem>
    })

    return (<Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          CSV manager
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form>
          <Nav
            bsStyle='tabs'
            activeKey={this.props.location.pathname}
            onSelect={this.handleSelect.bind(this)}>
            {navLinks}
          </Nav>
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>)
  }
}

export default withRouter(Navigator)
