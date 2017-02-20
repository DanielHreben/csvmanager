import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Navigator from './Navigator.jsx'

class Container extends React.Component {
  render () {
    return (<div className='container'>
      <Navigator />
      <Jumbotron>
        {this.props.children}
      </Jumbotron>
    </div>)
  }
}
export default Container
